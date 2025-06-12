import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (Array.isArray(products)) {
      const filtered = products
        .filter((product) => product.bestseller)
        .sort((a, b) => b.id - a.id)
        .slice(0, 2);
      setBestSeller(filtered);
    }
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center text-md md:text-4xl py-8">
        <Title text1={"BEST"} text2={"SELLER"} />
        <p className="w-3/4 m-auto sm:text-sm md:text-base text-gray-600">
          Discover our top-performing products, loved by thousands.
        </p>
      </div>

      <div className="grid grid-cols-2 w-full max-w-screen-xl mx-auto">
        {bestSeller.map((product) => (
          <div key={product.id} className="p-0 m-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-auto h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
