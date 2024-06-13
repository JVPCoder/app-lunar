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
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/database/db.json')
      .then(response => response.json())
      .then(data => setProducts(data.produtos))
      .catch(error => console.error('Erro ao buscar os produtos:', error));
  }, []);

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleProductRedirect = (productId: number) => {
    navigate(`/details/${productId}`);
  };

  const handleFilter = () => {
    alert('Abrindo filtros');
  };

  const redirectSocial = () => {
    alert('Visitando Rede Social');
  };

  return (
    <div className="Home">
      <Header onclick={handleCartClick} />
      <div className="container mx-auto p-4">
        <div className="flex justify-between">
          <h1 className="text-4xl text-left mt-5 font-raleway font-semibold">Produtos</h1>
          <Button.Root onclick={handleFilter}>
            <Button.Image icon='filter'/>
          </Button.Root>
        </div>
        <div className="flex flex-wrap justify-center mt-5 mb-5">
          {products.map((product) => (
            <div className="m-9" key={product.id}>

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
                  <Button.Root style='blackImg' onclick={() => addToCart(product)}>
                    <Button.Image icon='cart' />
                  </Button.Root>
                </Card.Actions>
              </Card.Root>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-5 mb-5">
          <Banner.Root>
            <Banner.Title title='Quem Somos'></Banner.Title>
            <Banner.Text content='Alcance o topo do estilo, acompanhe nossas redes' />
            <Banner.Actions>
              <Button.Root onclick={redirectSocial}>
                <Button.Image icon='instagram' />
              </Button.Root>
              <Button.Root onclick={redirectSocial}>
                <Button.Image icon='x' />
              </Button.Root>
              <Button.Root onclick={redirectSocial}>
                <Button.Image icon='whatsapp' />
              </Button.Root>
            </Banner.Actions>
          </Banner.Root>
        </div>
      </div>
      <CartModal isOpen={isCartOpen} onClose={handleCartClick}/>
      <Footer />
    </div>
  );
};

export default Home;
