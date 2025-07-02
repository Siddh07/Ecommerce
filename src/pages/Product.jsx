import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const Product = () => {
  const { productId } = useParams();
  const { products, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0); // Only this state needed

  useEffect(() => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      const foundProduct = products.find(
        (item) => String(item.id) === String(productId)
      );
      if (foundProduct) {
        setProductData(foundProduct);
        setSelectedImage(0); // Reset to first image on product change
        setLoading(false);
      } else {
        setProductData(null);
        setLoading(false);
        setError("Product not found.");
      }
    }, 500);
  }, [productId, products]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  // Find related products
  const relatedProducts =
    productData
      ? products.filter(
          (item) =>
            item.id !== productData.id &&
            item.category === productData.category &&
            item.subCategory === productData.subCategory
        )
      : [];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        {/* Spinner SVG */}
        <svg
          className="animate-spin h-8 w-8 text-indigo-600 mr-3"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>
        <p className="text-gray-500 text-lg">Loading product...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-red-500 text-lg">404 Product Not Found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 min-h-[60vh]">
      {/* Main Product Box */}
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-10 border-t-2 max-w-4xl mx-auto transition-opacity ease-in duration-500 opacity-100">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Product Image */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-full max-w-xs aspect-[4/5] bg-gray-100 rounded-lg shadow-lg border overflow-hidden flex items-center justify-center">
              <Zoom>
                <img
                  src={
                    Array.isArray(productData.image)
                      ? productData.image[selectedImage]
                      : productData.image
                  }
                  alt={productData.name}
                  className="w-full h-full object-cover"
                />
              </Zoom>
            </div>
            {/* Thumbnail Images */}
            <div className="flex gap-2 mt-4">
              {Array.isArray(productData.image) &&
                productData.image.map((img, idx) => (
                  <div
                    key={idx}
                    className={`w-16 h-16 aspect-square rounded border-2 overflow-hidden cursor-pointer transition ${
                      selectedImage === idx
                        ? "border-indigo-600"
                        : "border-gray-300"
                    }`}
                    onClick={() => setSelectedImage(idx)}
                  >
                    <img
                      src={img}
                      alt={`${productData.name} thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
            </div>
          </div>
          {/* Product Details */}
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              {productData.name}
            </h2>
            <Link
              to={`/collection?category=${encodeURIComponent(
                productData.category
              )}`}
              className="inline-block bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full mb-3 uppercase tracking-wide hover:bg-indigo-200 transition"
            >
              {productData.category}
            </Link>
            <p className="mb-6 text-gray-700 text-base leading-relaxed">
              {productData.description}
            </p>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-bold text-indigo-700">
                {formatPrice(productData.price)}
              </span>
              {productData.oldPrice && (
                <span className="text-lg line-through text-gray-400">
                  {formatPrice(productData.oldPrice)}
                </span>
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
                    to={`/collection?category=${encodeURIComponent(
                      productData.category
                    )}`}
                    className="text-indigo-700 hover:underline"
                  >
                    {productData.category}
                  </Link>
                </li>
                {productData.subCategory && (
                  <li>Type: {productData.subCategory}</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-12 max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold mb-4">Related Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedProducts.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-lg transition"
              >
                <Link to={`/product/${item.id}`}>
                  <div className="w-full aspect-[4/5] bg-gray-100 rounded mb-3 overflow-hidden flex items-center justify-center">
                    <img
                      src={Array.isArray(item.image) ? item.image[0] : item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-bold text-md mb-1">{item.name}</h4>
                  <p className="text-indigo-700 font-semibold">
                    {formatPrice(item.price)}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
