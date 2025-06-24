import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import { ShopContext } from "../context/ShopContext";
import { FaLongArrowAltLeft, FaShoppingCart } from "react-icons/fa";
import Title from "../components/Title";

const Collection = () => {
  const { products, addToCart } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("default");
  const [availableSubCategories, setAvailableSubCategories] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  // Extract unique subcategories from products
  useEffect(() => {
    const subCategories = [...new Set(products.map(product => product.subCategory))];
    setAvailableSubCategories(subCategories);
  }, [products]);

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value) 
        : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value) 
        : [...prev, value]
    );
  };

  // Sort products based on sortType
  useEffect(() => {
    let sortedProducts = [...filterProducts];
    switch (sortType) {
      case "low-high":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }
    setFilterProducts(sortedProducts);
  }, [sortType]);

  // Filter products based on category and subCategory
  useEffect(() => {
    let filtered = products;
    if (category.length > 0) {
      filtered = filtered.filter(product => category.includes(product.category));
    }
    if (subCategory.length > 0) {
      filtered = filtered.filter(product => subCategory.includes(product.subCategory));
    }
    setFilterProducts(filtered);
  }, [products, category, subCategory]);

  // Format price with currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Filter Options */}
        <div className="w-full sm:w-64 bg-white p-4 rounded-lg shadow-sm border-b border-neutral-300">
          <div 
            className="flex justify-between items-center cursor-pointer py-2"
            onClick={() => setShowFilter(prev => !prev)}
          >
            <h2 className="text-lg font-semibold">FILTERS</h2>
            <span className={`transition-transform sm:hidden ${showFilter ? "rotate-90" : "-rotate-90"}`}>
              <FaLongArrowAltLeft />
            </span>
          </div>

          {/* Category Filter */}
          <div className={`border-b border-neutral-300 py-4 ${showFilter ? "" : "hidden"} sm:block`}>
            <h3 className="text-md font-medium mb-3">CATEGORIES</h3>
            <div className="space-y-2">
              {['Men', 'Women', 'Children'].map(cat => (
                <label key={cat} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                    value={cat}
                    onChange={toggleCategory}
                    checked={category.includes(cat)}
                  />
                  <span className="text-gray-700">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Subcategory Filter - Dynamic */}
          <div className={`py-4 ${showFilter ? "" : "hidden"} sm:block`}>
            <h3 className="text-md font-medium mb-3">TYPE</h3>
            <div className="space-y-2">
              {availableSubCategories.map(subCat => (
                <label key={subCat} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                    value={subCat}
                    onChange={toggleSubCategory}
                    checked={subCategory.includes(subCat)}
                  />
                  <span className="text-gray-700">{subCat}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Products List */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <Title text1={"ALL"} text2={"PRODUCTS"} />
            <div className="mt-4 sm:mt-0">
              <select
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
              >
                <option value="default">Sort by: Newest</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>
          </div>

          {filterProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products match your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filterProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)} // Add redirect on click
                >
                  <div className="relative pb-[120%] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-md font-semibold mb-1 line-clamp-2">{product.name}</h3>
                      <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <p className="lg:text-lg md:text-sm sm:text-xl font-bold text-gray-900">{formatPrice(product.price)}</p>
                      <button
                        className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-medium"
                        onClick={e => {
                          e.stopPropagation(); // Prevent card click
                          addToCart(product);
                        }}
                      >
                        <FaShoppingCart className="text-base" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;