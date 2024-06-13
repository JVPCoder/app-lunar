import './assets/styles/output.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/home/home';
import Details from './pages/details/details';
import { CartProvider } from './context/CartContext';
import Checkout from './pages/checkout/checkout';

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/details/:productId" element={<Details />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </div>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
