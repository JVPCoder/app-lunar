import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import visa from '../../assets/imgs/ui-images/visa.svg';
import mastercard from '../../assets/imgs/ui-images/mastercard.svg';
import { Button } from '../../components/Button';
import Header from '../../components/header';
import Footer from '../../components/footer';

const Checkout: React.FC = () => {
  const { cartItems, removeFromCart, removeCartAll } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<string>('Cartao');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    cardCPF: '',
    expirationDate: '',
    cvv: '',
    installments: 1,
  });

  const [addressDetails, setAddressDetails] = useState({
    address: '',
    cep: '',
  });

  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);
  const shippingCost = Math.random() * 20; // Frete randômico, ajuste conforme necessário
  const totalAmountWithShipping = totalAmount + shippingCost;

  const simulatePayment = (): boolean => {
    // Simula o pagamento com 50% de chance de sucesso
    const isSuccess = Math.random() < 0.5;
    return isSuccess;
  };

  const handleConfirmPayment = async () => {
    try {
      if (paymentMethod === 'Pix') {
        alert('Pix não foi implementado');
      } else {
        const paymentSuccess = simulatePayment();

        if (paymentSuccess) {
          // Simula um tempo de espera para o pagamento
          await new Promise(resolve => setTimeout(resolve, 2000));

          // Pagamento bem-sucedido
          alert('Pagamento confirmado com Cartão de Crédito!');

          // Mostra mensagem de agradecimento
          alert('Obrigado pela sua compra!');

          // Limpa o carrinho após pagamento bem-sucedido
          removeCartAll();

          // Navega de volta para a página inicial
          navigate('/');
        } else {
          // Pagamento falhou
          alert('Falha no pagamento. Por favor, tente novamente.');
        }
      }
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      alert('Ocorreu um erro ao processar o pagamento. Por favor, tente novamente mais tarde.');
    }
  };

  const handleReturn = () => {
    navigate('/');
  };

  return (
    <div className="checkout">
      <Header isButtonVisible='no' onclick={handleReturn} />
      <div className="container mx-auto mt-10 p-6">
        <h1 className="text-3xl font-semibold mb-5">Checkout</h1>
        <div className="flex flex-col space-y-6">
          {/* Card de Itens no Carrinho */}
          <div className="bg-white p-6 rounded-lg w-full shadow-2xl border-2 mb-10">
            <h2 className="text-xl font-semibold mb-4">Itens no Carrinho</h2>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id} className="mb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className='font-raleway'>{item.name}</p>
                      <p className='font-inter text-gray-400'>Tamanho {item.size}</p>
                    </div>
                    <div className="flex items-center">
                      <p className='font-inter font-bold text-green-700 mr-4'>R${item.price.toFixed(2)}</p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-800 text-lg"
                      >
                        &times;
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className='mt-4 border border-gray-300'></div>
            <div className='mt-4 flex justify-between'>
              <p>Total:</p>
              <p className='font-inter font-bold text-green-700 mr-6'>R${totalAmount.toFixed(2)}</p>
            </div>
          </div>
          {/* Título para Método de Pagamento */}
          <h2 className="text-3xl font-semibold mt-4 mb-2">Escolha seu método de pagamento</h2>
          {/* Card de Método de Pagamento */}
          <div className="bg-white p-6 shadow-2xl border-2 rounded-lg w-full">
            <div className='flex justify-center mb-5'>
              <h3 className='font-raleway font-medium text-xl'>Métodos de Pagamento</h3>
            </div>
            <div className="flex justify-center space-x-4">
              <Button.Root style='blackImg' onclick={() => setPaymentMethod('Cartao')}>
                <Button.Image icon='cc'></Button.Image>
              </Button.Root>
              <Button.Root style='blackImg' onclick={() => {
                  setPaymentMethod('Pix');
                  alert('Pix não foi implementado');
                }}>
                <Button.Image icon='pix'></Button.Image>
              </Button.Root>
            </div>
            <div className='mt-4 border border-gray-300 mb-5'></div>
            <div className="mt-4">
              {paymentMethod === 'Cartao' && (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between">
                      <label className="block text-gray-700">Número do Cartão</label>
                      <div className="cardlogos flex mb-2 mr-3 gap-5">
                        <img src={visa} alt="visa logo" />
                        <img src={mastercard} alt="mastercard logo" />
                      </div>
                    </div>
                    <input
                      type="text"
                      placeholder='XXXX-XXXX-XXXX-XXXX'
                      value={cardDetails.cardNumber}
                      onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Nome do Titular</label>
                    <input
                      type="text"
                      placeholder='Seu nome'
                      value={cardDetails.cardHolder}
                      onChange={(e) => setCardDetails({ ...cardDetails, cardHolder: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">CPF do Titular</label>
                    <input
                      type="text"
                      placeholder='XXX.XXX.XXX-XX'
                      value={cardDetails.cardCPF}
                      onChange={(e) => setCardDetails({ ...cardDetails, cardCPF: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Data de Validade</label>
                    <input
                      type="text"
                      placeholder="MM/AA"
                      value={cardDetails.expirationDate}
                      onChange={(e) => setCardDetails({ ...cardDetails, expirationDate: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">CVV</label>
                    <input
                      type="text"
                      placeholder='XXX'
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Número de Parcelas</label>
                    <select
                      value={cardDetails.installments}
                      onChange={(e) => setCardDetails({ ...cardDetails, installments: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 text-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((installment) => (
                        <option key={installment} value={installment}>
                          {installment}x
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Inputs de Endereço */}
                  <div className='mt-4 border border-gray-300'></div>
                  <div className='flex justify-around'>
                    <div className='flex flex-col w-[500px]'>
                      <label className="block text-gray-700">Endereço de Entrega</label>
                      <input
                        type="text"
                        placeholder='Seu endereço'
                        value={addressDetails.address}
                        onChange={(e) => setAddressDetails({ ...addressDetails, address: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                      />
                    </div>
                    <div className='flex flex-col w-[500px]'>
                      <label className="block text-gray-700">CEP</label>
                      <input
                        type="text"
                        placeholder='XXXXX-XXX'
                        value={addressDetails.cep}
                        onChange={(e) => setAddressDetails({ ...addressDetails, cep: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                      />
                    </div>
                  </div>

                  {/* Valor do Frete */}
                  <div className="flex justify-between">
                    <p>Valor do Frete:</p>
                    <p className='font-inter font-bold text-green-700'>R${shippingCost.toFixed(2)}</p>
                  </div>

                  {/* Total com Frete */}
                  <div className='mt-4 border border-gray-300'></div>
                  <div className="flex justify-between">
                    <p>Total com Frete:</p>
                    <p className='font-inter font-bold text-green-700'>R${totalAmountWithShipping.toFixed(2)}</p>
                  </div>
                </div>
              )}

              {paymentMethod === 'Pix' && (
                <div>
                  <p className="text-red-500">Pix não foi implementado.</p>
                </div>
              )}
            </div>
          </div>

          {/* Botão para Finalizar Pagamento */}
          <div className="flex justify-center my-6">
            <Button.Root style='greenText' onclick={handleConfirmPayment}>
              <Button.Text content='Pagar Agora' font='ralewaywhitebold'></Button.Text>
            </Button.Root>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
