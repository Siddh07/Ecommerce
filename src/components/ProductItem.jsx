import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";  // import ShopContext

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="w-full aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-auto max-w-[300px] mx-auto object-cover transition-transform hover:scale-110 ease-in-out"
        />
      </div>
      <p className="pt-3 b-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem;
