import { createContext, useState, useEffect } from "react";
import products from "../assets/products";
import { toast } from "react-toastify";
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery = 10;
  const [cartItems, setCartItems] = useState({});

  const addToCart = (productId, size) => {
    let cartData = structuredClone(cartItems);

    if (!size) {
      toast.error('Select a size before adding to cart', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return; // Prevent adding if no size
    }

    if (cartData[productId]) {
      if (cartData[productId][size]) {
        cartData[productId][size] += 1;
      } else {
        cartData[productId][size] = 1;
      }
    } else {
      cartData[productId] = {};
      cartData[productId][size] = 1;
    }

    setCartItems(cartData);

  };

  const getCatCount = () => {
    let count = 0;
    for (const item in cartItems) {
      for (const size in cartItems[item]) {
        if (cartItems[item][size] > 0) {
          count += cartItems[item][size];
        }
      }
    }
    return count;
  }


  const value = {
    products,
    currency,
    delivery,
    cartItems,
    addToCart,
    getCatCount,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
