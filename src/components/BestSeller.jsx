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
         <div
            key={product.id}
            className="aspect-square overflow-hidden relative group"
          >
            {/* Product Image */}
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            />

            {/* Overlay Action Buttons */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center gap-3 transition-opacity duration-500 ease-in-out">
              <button className="px-4 py-2 text-sm font-medium rounded-sm bg-white text-gray-800 hover:bg-gray-900 hover:text-neutral-50 transition duration-500 ease-in-out">
                Add to Cart
              </button>
              <button className="px-4 py-2 text-sm font-medium border-black hover:border-neutral-700 bg-neutral-900 text-white rounded hover:bg-neutral-50 hover:text-neutral-800 transition duration-500 ease-in-out">
                Buy Now
              </button>
            </div>
          </div>

        ))}
      </div>
    </div>
  );
};

export default BestSeller;
