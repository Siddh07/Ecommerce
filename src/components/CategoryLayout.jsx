import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import products from "../assets/products";

const CategoryLayout = () => {
  const { category } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryProducts = () => {
      try {
        setLoading(true);
        
        if (!category) {
          throw new Error("Category not specified");
        }

        const normalizedCategory = category.toLowerCase();
        const validCategories = ["men", "women", "kids"];
        
        if (!validCategories.includes(normalizedCategory)) {
          throw new Error("Invalid category");
        }

        const filteredProducts = products.filter(
          (product) => product?.category?.toLowerCase() === normalizedCategory
        );

        setCategoryProducts(filteredProducts);
        setError(null);
      } catch (err) {
        setError(err.message);
        setCategoryProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [category]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 capitalize">
          {category || "Category"}
        </h1>
        
        {categoryProducts.length === 0 ? (
          <div className="mt-8 text-center">
            <p>No products found in this category</p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryLayout;