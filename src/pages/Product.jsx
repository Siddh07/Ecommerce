import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Heart, ShoppingCart, Star } from "lucide-react";
import products from "../assets/products";

export default function Product() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === Number(productId));
    setProduct(foundProduct);
    setLoading(false);
  }, [productId]);

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        Product with ID {productId} not found
      </div>
    );
  }

  // Format product data
  const formattedProduct = {
    id: product.id,
    title: product.name,
    description: `Premium ${product.name} from our ${product.category} collection.`,
    price: product.price,
    originalPrice: product.price * 1.2,
    rating: product.bestseller ? 4.5 : 3.8,
    reviewCount: product.bestseller ? 128 : 64,
    inStock: true,
    images: Array(4).fill(product.image),
    features: [
      `High-quality ${product.subCategory}`,
      `Perfect for ${product.category}`,
      product.bestseller ? "Bestseller item" : "Popular choice",
      product.latest ? "New arrival" : "Classic style",
      "Easy returns",
    ],
  };

  const handlePreviousImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? formattedProduct.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === formattedProduct.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} ${product.name}(s) to cart`);
  };

  const handleAddToWishlist = () => {
    console.log(`Added ${product.name} to wishlist`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={formattedProduct.images[selectedImageIndex]}
              alt={formattedProduct.title}
              className="w-full h-full object-cover"
            />

            {/* Navigation Arrows */}
            <button
              onClick={handlePreviousImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {selectedImageIndex + 1} / {formattedProduct.images.length}
            </div>
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-2">
            {formattedProduct.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`relative aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImageIndex === index 
                    ? "border-blue-500" 
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <img
                  src={image}
                  alt={`${formattedProduct.title} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          {/* Title and Rating */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {formattedProduct.title}
            </h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(formattedProduct.rating) 
                        ? "text-yellow-400 fill-current" 
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {formattedProduct.rating} ({formattedProduct.reviewCount} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-gray-900">
              ${formattedProduct.price.toFixed(2)}
            </span>
            {formattedProduct.originalPrice && (
              <>
                <span className="text-xl text-gray-500 line-through">
                  ${formattedProduct.originalPrice.toFixed(2)}
                </span>
                <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded">
                  Save ${(formattedProduct.originalPrice - formattedProduct.price).toFixed(2)}
                </span>
              </>
            )}
          </div>

          {/* Stock Status */}
          <div>
            {formattedProduct.inStock ? (
              <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
                In Stock
              </span>
            ) : (
              <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded">
                Out of Stock
              </span>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {formattedProduct.description}
            </p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Key Features</h3>
            <ul className="space-y-2">
              {formattedProduct.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Quantity and Actions */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label htmlFor="quantity" className="font-medium">
                Quantity:
              </label>
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-100 transition-colors"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-4 py-2 border-x">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!formattedProduct.inStock}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={handleAddToWishlist}
                className="flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                <Heart className="w-5 h-5" />
                Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}