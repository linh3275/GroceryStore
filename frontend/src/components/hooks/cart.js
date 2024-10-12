import React, { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext(null);
const cart_key = 'cart';
const empty_cart = {
  items: [],
  totalCount: 0,
  totalPrice: 0,
};

export default function CartProvider({children}) {

    const initCart = getCartFromLocalStorage();
    const [cartItems, setCartItems] = useState(initCart.items);
    const [totalCount, setTotalCount] = useState(initCart.totalCount);
    const [totalPrice, setTotalPrice] = useState(initCart.totalPrice);

    useEffect(() => {
      const totalPrice = sum(cartItems.map(item => item.price));
      const totalCount = sum(cartItems.map(item => item.quantity));

      setTotalPrice(totalPrice);
      setTotalCount(totalCount);

      localStorage.setItem(cart_key, JSON.stringify({items: cartItems, totalCount, totalPrice}))
    }, [cartItems]);

    function getCartFromLocalStorage() {
      const storedCart = localStorage.getItem(cart_key);
      return storedCart? JSON.parse(storedCart) : empty_cart;
    }

    const sum = items => {
      return items.reduce((preValue, curValue) => preValue + curValue, 0);
    }

    const removeFromCart = productId => {
      const filteredCartItems = cartItems.filter(item => item.product.id !== productId);
      setCartItems(filteredCartItems);
    }

    const changeQuantity = (cartItem, Nquantity) => {
      const updatedCartItems = cartItems.map(item => 
        item.product.id === cartItem.product.id
          ? { ...item, quantity: Nquantity, price: item.product.price * Nquantity }
          : item
      );
      setCartItems(updatedCartItems);
    };
    

    const addToCart = product => {
      const cartItem = cartItems.find(item => item.product.id === product.id);
      if (cartItem) {
        changeQuantity(cartItem, cartItem.quantity + 1);
      } else {
        setCartItems([...cartItems, { product, quantity: 1, price: product.price }]);
      }
    };

    const clearCart = () => {
      localStorage.removeItem(cart_key);
      const {items, totalCount, totalPrice} = empty_cart;
      setCartItems(items);
      setTotalCount(totalCount);
      setTotalPrice(totalPrice);
    }


  return (
    <CartContext.Provider value={{
      cart: { items: cartItems, totalPrice, totalCount },
      removeFromCart,
      changeQuantity,
      addToCart,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext);