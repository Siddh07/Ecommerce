import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import products from "../assets/products";

const CategoryPage = () => {
  const { category, subcategory } = useParams();
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = () => {
      try {
        setLoading(true);
        
        // Validate category exists
        if (!category) {
          throw new Error("Category not specified");
        }

        // Normalize category name
        const normalizedCategory = category.toLowerCase();
        const validCategories = ["men", "women", "kids"];
        
        // Check if category is valid
        if (!validCategories.includes(normalizedCategory)) {
          navigate("/collection"); // Redirect to collection if invalid category
          return;
        }

        // Filter products by category
        let result = products.filter(
          (product) => product?.category?.toLowerCase() === normalizedCategory
        );

        // If subcategory is specified, filter further
        if (subcategory) {
          const normalizedSubcategory = subcategory.toLowerCase().replace(/-/g, ' ');
          result = result.filter(
            (product) => 
              product?.subCategory?.toLowerCase().replace(/\s+/g, ' ') === normalizedSubcategory
          );
        }

        setFilteredProducts(result);
        setError(null);
      } catch (err) {
        setError(err.message);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, subcategory, navigate]);

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
          {category}
          {subcategory && (
            <span className="text-gray-500">
              {" "} &gt; {subcategory.replace(/-/g, ' ')}
            </span>
          )}
        </h1>
        
        {filteredProducts.length === 0 ? (
          <div className="mt-8 text-center">
            <p>No products found in this category</p>
            <button 
              onClick={() => navigate("/collection")}
              className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Browse Collection
            </button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;