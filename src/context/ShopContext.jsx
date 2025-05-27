import { createContext } from "react";
import products from "../assets/products";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const devlivery = 10;

  const value = {
    products,
    currency,
    devlivery,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
