import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link
import { ShopContext } from '../context/ShopContext';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';


const Product = () => {
  const { productId } = useParams();
  const { products, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const foundProduct = products.find((item) => String(item.id) === String(productId));
    setProductData(foundProduct || null);
  }, [productId, products]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="container mx-auto px-4 py-10 min-h-[60vh]">
      {productData ? (
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-10 border-t-2 max-w-4xl mx-auto transition-opacity ease-in duration-500 opacity-100">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Product Image */}
            <div className="flex-1 flex flex-col items-center justify-center">
           
           <Zoom>
              <img
                src={productData.image}
                alt={productData.name}
                className="w-full max-w-xs object-cover rounded-lg shadow-lg border cursor-zoom-in"
              />
            </Zoom>
            </div>
            {/* Product Details */}
            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">{productData.name}</h2>
              <Link
                to={`/collection?category=${encodeURIComponent(productData.category)}`}
                className="inline-block bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full mb-3 uppercase tracking-wide hover:bg-indigo-200 transition"
              >
                {productData.category}
              </Link>
              <p className="mb-6 text-gray-700 text-base leading-relaxed">{productData.description}</p>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-2xl font-bold text-indigo-700">{formatPrice(productData.price)}</span>
                {productData.oldPrice && (
                  <span className="text-lg line-through text-gray-400">{formatPrice(productData.oldPrice)}</span>
                )}
              </div>
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg shadow transition duration-200 text-lg"
                onClick={() => addToCart && addToCart(productData)}
              >
                Add to Cart
              </button>
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-2">Product Details</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>
                    Category:{" "}
                    <Link
                      to={`/collection?category=${encodeURIComponent(productData.category)}`}
                      className="text-indigo-700 hover:underline"
                    >
                      {productData.category}
                    </Link>
                  </li>
                  {productData.subCategory && <li>Type: {productData.subCategory}</li>}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[40vh]">
          <p className="text-gray-500 text-lg">Loading product...</p>
        </div>
      )}
    </div>
  );
};

export default Product;