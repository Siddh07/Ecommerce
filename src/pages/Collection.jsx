import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Title from "../components/Title";

const Collection = () => {
  // Accessing the products from the ShopContext
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]); // should be array
  const [subCategory, setSubCategory] = useState([]); // should be array

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  useEffect(() => {
    // Initialize filterProducts with all products
    setFilterProducts(products);
  }, [products]);

  useEffect(() => {
    let filtered = products;

    if (category.length > 0) {
      filtered = filtered.filter((product) => category.includes(product.category));
    }
    if (subCategory.length > 0) {
      filtered = filtered.filter((product) => subCategory.includes(product.subCategory));
    }

    setFilterProducts(filtered);
  }, [products, category, subCategory]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-1- border-t">
        {/* Filter Options */}
        <div className="min-w-60">
          <p
            className="my-2 text-xl flex items-center cursor-pointer gap-2"
            onClick={() => setShowFilter((prev) => !prev)}
          >
            FILTERS
            <span
              className={`h-5 w-5 transition-transform duration-200 sm:hidden ${
                showFilter ? "rotate-90" : ""
              }`}
            >
              <FaLongArrowAltLeft />
            </span>
          </p>

          {/* Category Filter */}
          <div
            className={`border-b border-gray-300 pl-5 py-3 mt-6 ${
              showFilter ? "" : "hidden"
            } sm:block`}
          >
            <p className="mb-3 text-sm font-medium">CATEGORIES</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <p className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  value={"Men"}
                  onChange={toggleCategory}
                  checked={category.includes("Men")}
                />
                Men
              </p>
              <p className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  value={"Women"}
                  onChange={toggleCategory}
                  checked={category.includes("Women")}
                />
                Women
              </p>
              <p className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  value={"Children"}
                  onChange={toggleCategory}
                  checked={category.includes("Children")}
                />
                Children
              </p>
            </div>
          </div>

          {/* Sub Cat Filter */}
          <div
            className={`border-b border-gray-300 pl-5 py-3 my-5 ${
              showFilter ? "" : "hidden"
            } sm:block`}
          >
            <p className="mb-3 text-sm font-medium">TYPE</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <p className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  value={"TopWear"}
                  onChange={toggleSubCategory}
                  checked={subCategory.includes("TopWear")}
                />
                TopWear
              </p>
              <p className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  value={"BottomWear"}
                  onChange={toggleSubCategory}
                  checked={subCategory.includes("BottomWear")}
                />
                BottomWear
              </p>
              <p className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  value={"WinterWear"}
                  onChange={toggleSubCategory}
                  checked={subCategory.includes("WinterWear")}
                />
                WinterWear
              </p>
            </div>
          </div>
        </div>

        {/* Products List */}
        <div className="flex-1">
          <div className="flex justify-between items-baseline sm:text-2xl mb-4">
            <Title text1={"ALL"} text2={"PRODUCTS"} />
            {/* Product Sort */}
            <select className="border-2 border-gray-300 rounded-md p-2 text-sm">
              <option value="default">Sort by: Relevant</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>
          {/*  map products here */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-y-6">
            {filterProducts.map((product) => (
              <div key={product.id} className="border p-4 rounded-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover mb-4"
                />
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="text-xl font-bold">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
