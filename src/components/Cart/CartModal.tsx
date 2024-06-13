import React from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

type CartModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate(); // Utiliza o hook useNavigate para navegação

  if (!isOpen) return null;

  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  const handleCheckout = () => {
    // Redireciona para a página de checkout
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-[600px]">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-3xl">
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Seu Carrinho</h2>
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

        <div className='mt-2 border border-gray-300'></div>

        <div className='mt-2 flex justify-between'>
          <p>Total:</p>
          <p className='font-inter font-bold text-green-700'>R${totalAmount.toFixed(2)}</p>
        </div>

        <div className="mt-4">
          <button
            onClick={handleCheckout} // Chama a função handleCheckout ao clicar no botão
            className="w-full bg-green-700 font-inter font-semibold text-white py-2 rounded hover:bg-green-900 hover:scale-90"
          >
            Pagar Agora
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
