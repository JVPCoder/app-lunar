import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/header';
import Footer from '../../components/footer';
import CartModal from '../../components/Cart/CartModal';
import { useCart } from '../../context/CartContext';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';

interface Product {
  id: number;
  name: string;
  price: number;
  state: string;
  manufacturing: number;
  sent: string;
  size: number;
  imgs: string[];
  isInCart: boolean;
}

const Details: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems, addToCart } = useCart();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/database/db.json")
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data.produtos);
        const selectedProduct = data.produtos.find(
          (prod: Product) => prod.id.toString() === productId
        );
        if (selectedProduct) {
          setProduct(selectedProduct);
          setSelectedImage(selectedProduct.imgs[0]); // Define a primeira imagem como a imagem selecionada inicialmente
        } else {
          console.error(`Produto com ID ${productId} não encontrado.`);
        }
      })
      .catch((error) =>
        console.error("Erro ao buscar os detalhes do produto:", error)
      );
  }, [productId]);

  useEffect(() => {
    if (allProducts.length > 0 && productId) {
      const filteredProducts = allProducts.filter(
        (prod) => prod.id !== Number(productId)
      );
      const randomProducts = getRandomProducts(filteredProducts, 3);
      setSimilarProducts(randomProducts);
    }
  }, [allProducts, productId]);

  useEffect(() => {
    if (similarProducts.length > 0 && cartItems.length > 0) {
      const updatedSimilarProducts = similarProducts.map((similarProduct) => ({
        ...similarProduct,
        isInCart: cartItems.some((item) => item.id === similarProduct.id),
      }));
      setSimilarProducts(updatedSimilarProducts);
    }
  }, [cartItems, similarProducts]);

  const getRandomProducts = (products: Product[], count: number): Product[] => {
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const handleAddToCartRedirect = (product: Product) => {
    addToCart(product);
    navigate("/checkout");
  };

  const handleImageClick = (img: string) => {
    setSelectedImage(img);
  };

  if (!product) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="product-details">
      <Header onclick={handleCartClick} />
      <div className="container mx-auto p-4 mt-10 mb-20">
        <div className="flex flex-col md:flex-row items-center md:items-start relative">
          <Card.Root size="detailed">
            <Card.Title
              font="ralewayblackdetailed"
              link={product.id}
              titleSrc={product.name}
            />
            <Card.Image
              produtoSrc={require(`../../assets/imgs/product-images/${selectedImage}`)}
            />
            <div className="flex flex-col md:flex-row justify-center h-20 md:h-24 m-10 md:gap-10">
              <div className="imgTray flex flex-row justify-center bg-white shadow-2xl border-2 rounded-lg px-10 h-24 gap-5">
                {product.imgs.map((img, index) => (
                  <img
                    key={index}
                    src={require(`../../assets/imgs/product-images/${img}`)}
                    alt={`Produto ${index + 1}`}
                    className={`w-20 h-20 cursor-pointer m-2 ${
                      selectedImage === img
                        ? "border-2 border-gray-400 rounded-md"
                        : ""
                    }`}
                    onClick={() => handleImageClick(img)}
                  />
                ))}
              </div>
            </div>
            <Card.Texts>
              <Card.Text
                content="Tamanho Disponível:"
                font="interblackdetailed"
              />
              <Card.Text
                content={`Tamanho ${product.size}`}
                font="intergraydetailed"
              />
            </Card.Texts>
            <Card.Texts>
              <Card.Text content="Valor:" font="interblackdetailed" />
              <Card.Text
                content={`R$${product.price.toFixed(2)}`}
                font="intergreendetailed"
              />
            </Card.Texts>
            <Card.Actions style="justifyCenter">
              <Button.Root
                style="blackText"
                onclick={() => handleAddToCartRedirect(product)}
              >
                <Button.Text
                  content="Comprar Agora"
                  font="ralewaywhitebolddetailed"
                />
              </Button.Root>
            </Card.Actions>
          </Card.Root>

          <div className="flex flex-col md:ml-16 mt-10 md:mt-0 w-full md:w-auto">
            <div className="m-5">
              <h1 className="text-3xl md:text-5xl text-left mt-5 font-raleway font-semibold">
                Detalhes do Item
              </h1>
              <ul className="m-5 ml-8 list-disc font-raleway text-xl md:text-2xl">
                <li className="mt-6 mb-6 md:mt-10 md:mb-10">
                  Fabricação: {product.manufacturing}
                </li>
                <li className="mt-6 mb-6 md:mt-10 md:mb-10">
                  Estado de Conservação: {product.state}
                </li>
                <li className="mt-6 mb-6 md:mt-10 md:mb-10">
                  Local de Envio: {product.sent}
                </li>
              </ul>
              <p className="mt-10 mb-10 md:mt-16 md:mb-16 font-raleway text-gray-500 text-lg md:text-xl">
                Nossos estoques são limitados. Os produtos adicionados no
                carrinho não representam uma reserva, portanto, para garantir a
                compra efetiva, o pedido deve ser concluído em todas as suas
                etapas.
              </p>
              <p className="mt-10 mb-10 md:mt-16 md:mb-16 font-raleway text-gray-500 text-lg md:text-xl">
                O produto só será liberado após a aprovação do pagamento. A
                aprovação feita pelo banco/cartão não garante a compra. A venda
                só será efetivada depois de aprovada pelo sistema antifraude.
              </p>
              <p className="mt-10 mb-10 md:mt-16 md:mb-16 font-raleway text-gray-500 text-lg md:text-xl">
                Obs: Por se tratar de produtos de coleção, é permitido apenas
                uma unidade por CPF. Compras com mais unidades de um mesmo
                modelo serão recusadas.
              </p>
            </div>
          </div>

          {cartItems.length > 0 && (
            <div className="absolute top-[-165px] right-[-150px] transform translate-x-2 -translate-y-2 bg-green-700 rounded-full w-5 h-5 flex items-center justify-center text-white font-bold text-xs">
              {cartItems.length}
            </div>
          )}
        </div>

        <div className="flex flex-col mt-10 border-t-2 border-gray-200">
          <h1 className="text-3xl md:text-4xl text-left m-5 font-raleway font-semibold">
            Itens Similares
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {similarProducts.map((similarProduct) => (
              <Card.Root key={similarProduct.id} size="normal">
                <Card.Image
                  produtoSrc={require(`../../assets/imgs/product-images/${similarProduct.imgs[0]}`)}
                />
                <Card.Title
                  link={similarProduct.id}
                  titleSrc={similarProduct.name}
                />
                <Card.Texts>
                  <Card.Text content="Tamanho:" font="interblack" />
                  <Card.Text
                    content={`Tamanho ${similarProduct.size}`}
                    font="intergray"
                  />
                </Card.Texts>
                <Card.Texts>
                  <Card.Text content="Valor:" font="interblack" />
                  <Card.Text
                    content={`R$${similarProduct.price.toFixed(2)}`}
                    font="intergreen"
                  />
                </Card.Texts>
                <Card.Actions>
                  {similarProduct.isInCart ? (
                    <Button.Root
                      style="greenImg"
                      onclick={() => navigate("/checkout")}
                    >
                      <Button.Image icon="checked" />
                    </Button.Root>
                  ) : (
                    <Button.Root
                      style="blackImg"
                      onclick={() => handleAddToCart(similarProduct)}
                    >
                      <Button.Image icon="cart" />
                    </Button.Root>
                  )}
                </Card.Actions>
              </Card.Root>
            ))}
          </div>
        </div>
      </div>
      <CartModal isOpen={isCartOpen} onClose={handleCartClick} />
      <Footer />
    </div>
  );
};

export default Details;
