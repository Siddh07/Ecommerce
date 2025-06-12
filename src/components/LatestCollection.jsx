import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./productitem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    const filtered = products
      .filter((product) => product.latest)
      .sort((a, b) => b.id - a.id)  // Descending order
      .slice(0, 4);
    setLatestProducts(filtered);
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl font-bold">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className="w-3/4 m-auto sm:text-sm md:text-base text-gray-500">
          Discover our latest collection of products, handpicked to bring you the best in style and quality.
        </p>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {latestProducts.map((item) => (
          <ProductItem
            key={item.id}
            id={item.id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
