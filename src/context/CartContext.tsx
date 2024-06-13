import React, { createContext, useContext, useState } from 'react';

interface Product {
  id: number;
  name: string;
  size: number;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  removeCartAll: () => void; // Nova função para remover todos os itens do carrinho
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  removeCartAll: () => {}, // Inicialização da função
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    const itemIndex = cartItems.findIndex((item) => item.id === product.id);

    if (itemIndex !== -1) {
      // Item já existe no carrinho, incrementar quantidade
      const updatedCartItems = [...cartItems];
      updatedCartItems[itemIndex].quantity++;
      setCartItems(updatedCartItems);
    } else {
      // Item não existe no carrinho, adicioná-lo com quantidade 1
      const newCartItem: CartItem = { ...product, quantity: 1 };
      setCartItems([...cartItems, newCartItem]);
    }
  };

  const removeFromCart = (productId: number) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);
  };

  const removeCartAll = () => {
    setCartItems([]); // Limpa todos os itens do carrinho
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, removeCartAll }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
