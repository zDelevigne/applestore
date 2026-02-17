'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface StoreContextType {
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isLoginOpen: boolean;
  setIsLoginOpen: (open: boolean) => void;
  cartItems: any[];
  addToCart: (item: any) => void;
  removeFromCart: (id: number) => void;
  currentCategory: string;
  setCategory: (category: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [currentCategory, setCurrentCategory] = useState('Todos');

  const addToCart = (item: any) => {
    setCartItems((prev) => [...prev, item]);
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const setCategory = (category: string) => {
    setCurrentCategory(category);
  };

  return (
    <StoreContext.Provider
      value={{
        isCartOpen,
        setIsCartOpen,
        isLoginOpen,
        setIsLoginOpen,
        cartItems,
        addToCart,
        removeFromCart,
        currentCategory,
        setCategory,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
