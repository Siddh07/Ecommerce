import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title"; // Make sure you have this component or adjust as needed

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    // Only filter if products is an array
    if (Array.isArray(products)) {
      // Get the first 5 bestsellers (if that's your intent)
      setBestSeller(
        products.filter((product) => product.bestseller).slice(0, 5)
      );
    }
  }, [products]); // Depend on products, not products.slice(0,5)

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLER"} />

        <p className="w-3/4 m-auto sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque odit
          commodi modi. Harum voluptate temporibus repellendus, impedit
          voluptatum sint expedita repellat officiis illum ad ducimus veniam
          labore, aspernatur quis amet?
        </p>
      </div>
      {/* Render best sellers here if needed */}
      <div className="flex flex-wrap justify-center gap-6">
        {bestSeller.map((product) => (
          <div key={product.id} className="p-4 border rounded shadow">
            {/* Add more product details as needed */}

            <div className="grid grid-cols-2 gap-4">
              <img src={product.image} alt={product.alt} />

              <div></div>
              <div>
                <h3 className="font-semibold">{product.name}</h3>

                <p>{product.alt}</p>

                <p>${product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
