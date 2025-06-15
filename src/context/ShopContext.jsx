import { createContext } from "react";
import products from "../assets/products";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery = 10; // fixed typo

  const value = {
    products,
    currency,
    delivery,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
