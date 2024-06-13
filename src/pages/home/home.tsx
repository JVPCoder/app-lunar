import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/output.css';
import Header from '../../components/header';
import CartModal from '../../components/Cart/CartModal';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Banner } from '../../components/Banner';
import Footer from '../../components/footer';
import { useCart } from '../../context/CartContext';

interface Product {
  id: number;
  name: string;
  size: number;
  price: number;
  imgs: string[];
  addedToCart: boolean;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart, cartItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filterName, setFilterName] = useState<string>('');
  const [filterPriceRanges, setFilterPriceRanges] = useState<boolean[]>([false, false, false]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showNoProductsMessage, setShowNoProductsMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/database/db.json')
      .then(response => response.json())
      .then(data => {
        const productsWithAddedToCart = data.produtos.map((product: Product) => ({
          ...product,
          addedToCart: cartItems.some(item => item.id === product.id)
        }));
        setProducts(productsWithAddedToCart);
        setFilteredProducts(productsWithAddedToCart);
      })
      .catch(error => console.error('Erro ao buscar os produtos:', error));
  }, [cartItems]);

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleProductRedirect = (productId: number) => {
    navigate(`/details/${productId}`);
  };

  const handleFilter = () => {
    let filteredProductsByName: Product[] = products;

    if (filterName.trim() !== '') {
      filteredProductsByName = filteredProductsByName.filter(product =>
        product.name.toLowerCase().includes(filterName.toLowerCase())
      );
    }

    if (filterPriceRanges.some(range => range === true)) {
      const filteredProductsByPrice = filteredProductsByName.filter(product => {
        if (filterPriceRanges[0] && product.price <= 1000) return true;
        if (filterPriceRanges[1] && product.price > 1000 && product.price <= 1500) return true;
        if (filterPriceRanges[2] && product.price > 1500) return true;
        return false;
      });
      setFilteredProducts(filteredProductsByPrice);
    } else {
      setFilteredProducts(filteredProductsByName);
    }

    if (filteredProductsByName.length === 0) {
      setShowNoProductsMessage(true);
    } else {
      setShowNoProductsMessage(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    const updatedProducts = products.map(p =>
      p.id === product.id ? { ...p, addedToCart: true } : p
    );
    setProducts(updatedProducts);
  };

  return (
    <div className="Home">
      <Header onclick={handleCartClick} />
      <div className="container mx-auto p-4">
        <div className="flex flex-col sm:flex-row justify-between">
          <h1 className="text-4xl text-left mt-5 font-raleway font-semibold">Produtos</h1>
          <div className="flex flex-col sm:flex-row sm:space-x-4 items-center relative mt-4 sm:mt-0">
            <div className="flex items-center mb-4 sm:mb-0">
              <input
                type="text"
                placeholder="Filtrar por nome/modelo"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded"
              />
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <label>
                <input
                  type="checkbox"
                  checked={filterPriceRanges[0]}
                  onChange={(e) =>
                    setFilterPriceRanges([e.target.checked, filterPriceRanges[1], filterPriceRanges[2]])
                  }
                /> Entre R$0-1000
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={filterPriceRanges[1]}
                  onChange={(e) =>
                    setFilterPriceRanges([filterPriceRanges[0], e.target.checked, filterPriceRanges[2]])
                  }
                /> Entre R$1000-1500
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={filterPriceRanges[2]}
                  onChange={(e) =>
                    setFilterPriceRanges([filterPriceRanges[0], filterPriceRanges[1], e.target.checked])
                  }
                /> R$1500+
              </label>
            </div>
            <Button.Root onclick={handleFilter}>
              <Button.Image icon='filter'/>
            </Button.Root>
            {/* Exibindo o número de itens no carrinho */}
            {cartItems.length > 0 && (
            <div className="absolute top-[-125px] right-[-150px] transform translate-x-2 -translate-y-2 bg-green-700 rounded-full w-5 h-5 flex items-center justify-center text-white font-bold text-xs">
              {cartItems.length}
            </div>
          )}
          </div>
        </div>
        {showNoProductsMessage && filteredProducts.length === 0 && (
          <p className="text-center mt-4 text-red-500">Nenhum produto encontrado com os filtros aplicados.</p>
        )}
        <div className="flex flex-wrap justify-center mt-5 mb-5">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div className="m-3 sm:m-9" key={product.id + index}>
                <Card.Root>
                  <Card.Image produtoSrc={require(`../../assets/imgs/product-images/${product.imgs[0]}`)} />
                  <Card.Title link={product.id} onClick={() => handleProductRedirect(product.id)} titleSrc={product.name} />
                  <Card.Texts>
                    <Card.Text content='Tamanho:' font='interblack' />
                    <Card.Text content={`${product.size}`} font='intergray' />
                  </Card.Texts>
                  <Card.Texts>
                    <Card.Text content='Valor:' font='interblack' />
                    <Card.Text content={`R$${product.price.toFixed(2)}`} font='intergreen' />
                  </Card.Texts>
                  <Card.Actions>
                    <Button.Root
                      style={product.addedToCart ? 'greenImg' : 'blackImg'}
                      onclick={() => handleAddToCart(product)}
                      disabled={product.addedToCart}
                      transition={product.addedToCart ? 'transition ease-in-out duration-200 scale-95' : ''}
                    >
                      <Button.Image
                        icon={product.addedToCart ? 'checked' : 'cart'}
                      />
                    </Button.Root>
                  </Card.Actions>
                </Card.Root>
              </div>
            ))
          ) : (
            <p className="text-center w-full mt-4">Nenhum produto encontrado.</p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row mt-5 mb-5 px-4 sm:space-x-4">
          <div className="flex-1 mb-4 sm:mb-0 text-center sm:text-left">

            <Banner.Root>
              <Banner.Title title='Quem Somos' />
              <Banner.Text content='Alcance o topo do estilo, acompanhe nossas redes' />
              <Banner.Actions>
                <div className="flex flex-col justify-center sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <Button.Root onclick={() => alert('Visitando Instagram')}>
                    <Button.Image icon='instagram' />
                  </Button.Root>
                  <Button.Root onclick={() => alert('Visitando X')}>
                    <Button.Image icon='x' />
                  </Button.Root>
                  <Button.Root onclick={() => alert('Visitando Whatsapp')}>
                    <Button.Image icon='whatsapp' />
                  </Button.Root>
                </div>
              </Banner.Actions>
            </Banner.Root>

          </div>

        </div>
      </div>
      <CartModal isOpen={isCartOpen} onClose={handleCartClick}/>
      <Footer />
    </div>
  );
};

export default Home;
