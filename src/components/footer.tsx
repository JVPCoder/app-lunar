import '../assets/styles/output.css';

import React from 'react';
import logo from '../assets/imgs/ui-images/LogoSneakerPeak.png';
import mastercard from '../assets/imgs/ui-images/mastercard.svg'; // Certifique-se de que você tem a imagem da MasterCard
import visa from '../assets/imgs/ui-images/visa.svg'; // Certifique-se de que você tem a imagem da Visa
import pix from '../assets/imgs/ui-images/pix.svg'; // Certifique-se de que você tem a imagem de outro método de pagamento

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <img src={logo} alt="Logo" className="h-16 md:h-32 mr-3" />
        </div>
        <div className="flex flex-col md:flex-row md:space-x-20 space-y-4 md:space-y-0">
          <div className="flex flex-col items-center md:items-start">
            <span className="font-semibold">Sobre a Sneaker Peak</span>
            <a href="#" className="mt-2 text-gray-600 hover:text-gray-800">Trabalhe conosco</a>
            <a href="#" className="mt-1 text-gray-600 hover:text-gray-800">Propósito</a>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <span className="font-semibold">Ajuda</span>
            <a href="#" className="mt-2 text-gray-600 hover:text-gray-800">Trocas e Devoluções</a>
            <a href="#" className="mt-1 text-gray-600 hover:text-gray-800">Entregas</a>
            <a href="#" className="mt-1 text-gray-600 hover:text-gray-800">Encontre seu tamanho</a>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <span className="font-semibold">Formas de pagamento</span>
            <div className="flex justify-center md:justify-start mt-2 space-x-3">
              <img src={mastercard} alt="MasterCard" className="h-8 md:h-fit" />
              <img src={visa} alt="Visa" className="h-8 md:h-fit" />
              <img src={pix} alt="Pix" className="h-8 md:h-fit" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
