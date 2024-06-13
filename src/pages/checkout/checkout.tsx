import '../../assets/styles/output.css';

import React from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { useNavigate } from 'react-router-dom';

const Checkout: React.FC = () => {
  const navigate = useNavigate(); // Hook para navegação

  const handleReturn = () => {
    navigate('/');
  }

  const handleConfirmPayment = () => {
    // Lógica para confirmar o pagamento (pode ser adicionada aqui)
    alert('Pagamento confirmado!'); // Exemplo simples de alerta

    // Redirecionamento para a página inicial após o pagamento
    navigate('/');
  };

  return (
    <div className="checkout">
        <Header isButtonVisible='no' onclick={handleReturn}/>
        <div className="container mx-auto mt-10">
          <h1 className="text-3xl font-semibold mb-5">Checkout</h1>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Detalhes do Pedido</h2>
            {/* Aqui você pode adicionar detalhes do pedido, como itens, total, informações do cliente, etc. */}
            {/* Botão para confirmar pagamento */}
            <button
              onClick={handleConfirmPayment}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
            >
              Confirmar Pagamento
            </button>
          </div>
        </div>
    </div>
  );
};

export default Checkout;
