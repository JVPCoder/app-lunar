import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
}

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('/database/db.json')
      .then(response => response.json())
      .then(data => {
        setAllProducts(data.produtos);
        const selectedProduct = data.produtos.find((prod: Product) => prod.id.toString() === (productId));
        if (selectedProduct) {
          setProduct(selectedProduct);
        } else {
          console.error(`Produto com ID ${productId} não encontrado.`);
        }
      })
      .catch(error => console.error('Erro ao buscar os detalhes do produto:', error));
  }, [productId]);

  useEffect(() => {
    if (allProducts.length > 0 && productId) {
      const filteredProducts = allProducts.filter(prod => prod.id !== Number(productId));
      const randomProducts = getRandomProducts(filteredProducts, 3);
      setSimilarProducts(randomProducts);
    }
  }, [allProducts, productId]);

  const getRandomProducts = (products: Product[], count: number): Product[] => {
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  if (!product) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="product-details">
      <Header onclick={handleCartClick} />
      <div className="container mx-auto p-4 mt-10 mb-20">
        <div className="flex flex-row items-top">
          <Card.Root size='detailed'>
            <Card.Title font='ralewayblackdetailed' link={product.id} titleSrc={product.name} /> {/* Convertendo product.id para string */}
            <Card.Image produtoSrc={require(`../../assets/imgs/product-images/${product.imgs[0]}`)} />
            <Card.Texts>
              <Card.Text content='Tamanho Disponível:' font='interblackdetailed' />
              <Card.Text content={`Tamanho ${product.size}`} font='intergraydetailed' />
            </Card.Texts>
            <Card.Texts>
              <Card.Text content='Valor:' font='interblackdetailed' />
              <Card.Text content={`R$${product.price.toFixed(2)}`} font='intergreendetailed' />
            </Card.Texts>
            <Card.Actions style='justifyCenter'>
              <Button.Root style='blackText' onclick={() => addToCart(product)}>
                <Button.Text content='Adicionar ao Carrinho' font='ralewaywhitebolddetailed' />
              </Button.Root>
            </Card.Actions>
          </Card.Root>

          <div className="flex flex-col">
            <div className='m-5 ml-16'>
              <h1 className="text-5xl text-left mt-5 font-raleway font-semibold">Detalhes do Item</h1>
              <ul className='m-5 ml-12 list-disc font-raleway text-4xl'>
                <li className='mt-12 mb-12'>Fabricação: {product.manufacturing}</li>
                <li className='mt-12 mb-12'>Estado de Conservação: {product.state}</li>
                <li className='mt-12 mb-12'>Local de Envio: {product.sent}</li>
              </ul>
              <p className='mt-20 mb-20 font-raleway text-gray-500 text-2xl'>
                Nossos estoques são limitados. Os produtos adicionados no carrinho não representam uma reserva, portanto, para garantir a compra efetiva, o pedido deve ser concluído em todas as suas etapas.
              </p>
              <p className='mt-20 mb-20 font-raleway text-gray-500 text-2xl'>
                O produto só será liberado após a aprovação do pagamento. A aprovação feita pelo banco/cartão não garante a compra. A venda só será efetivada depois de aprovada pelo sistema antifraude.
              </p>
              <p className='mt-20 mb-20 font-raleway text-gray-500 text-2xl'>
                Obs: Por se tratar de produtos de coleção, é permitido apenas uma unidade por CPF. Compras com mais unidades de um mesmo modelo serão recusadas.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-10 border-t-2 border-gray-200">
          <h1 className="text-4xl text-left m-5 font-raleway font-semibold">Itens Similares</h1>
          <div className="flex flex-row justify-evenly">
            {similarProducts.map(similarProduct => (
              <Card.Root key={similarProduct.id}>
                <Card.Image produtoSrc={require(`../../assets/imgs/product-images/${similarProduct.imgs[0]}`)} />
                <Card.Title link={similarProduct.id} titleSrc={similarProduct.name} /> {/* Convertendo similarProduct.id para string */}
                <Card.Texts>
                  <Card.Text content='Tamanho:' font='interblack' />
                  <Card.Text content={`Tamanho ${similarProduct.size}`} font='intergray' />
                </Card.Texts>
                <Card.Texts>
                  <Card.Text content='Valor:' font='interblack' />
                  <Card.Text content={`R$${similarProduct.price.toFixed(2)}`} font='intergreen' />
                </Card.Texts>
                <Card.Actions>
                  <Button.Root style='blackImg' onclick={() => addToCart(similarProduct)}>
                    <Button.Image icon='cart' />
                  </Button.Root>
                </Card.Actions>
              </Card.Root>
            ))}
          </div>
        </div>
      </div>
      <CartModal isOpen={isCartOpen} onClose={handleCartClick}/>
      <Footer />
    </div>
  );
};

export default ProductDetails;
