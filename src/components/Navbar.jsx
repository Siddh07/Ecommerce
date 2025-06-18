import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { FiSearch, FiUser, FiShoppingCart, FiX } from "react-icons/fi";
import { MdMenu, MdClose } from "react-icons/md";
import { GoSidebarCollapse } from "react-icons/go";

// Import your data files
import categories from "../assets/data/Categories.json";
import products from "../assets/products.js";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Refs for search inputs
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  // Handle clicks outside search inputs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (desktopSearchRef.current && !desktopSearchRef.current.contains(event.target)) {
        // Check if click is not on search icon
        if (!event.target.closest('.desktop-search-icon')) {
          setSearchOpen(false);
        }
      }
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target)) {
        // Check if click is not on search icon in mobile nav
        if (!event.target.closest('.mobile-search-icon')) {
          setSearchQuery("");
          setSearchResults([]);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle search input changes
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    
    // Search in categories with unique IDs
    const categoryResults = categories.flatMap(category => {
      const categoryMatches = category.name.toLowerCase().includes(query);
      const subcategoryMatches = category.subcategories.filter(sub => 
        sub.toLowerCase().includes(query)
      );
      
      return categoryMatches || subcategoryMatches.length > 0
        ? [{
            type: 'category',
            id: `cat-${category.name.toLowerCase()}`,
            name: category.name,
            subcategories: subcategoryMatches,
            path: `/category/${category.name.toLowerCase()}`
          }]
        : [];
    });

    // Search in products with unique IDs
    const productResults = products
      .filter(product => 
        product.name.toLowerCase().includes(query) || 
        (product.description && product.description.toLowerCase().includes(query))
      )
      .map(product => ({
        type: 'product',
        id: `prod-${product.id}`,
        ...product,
        path: `/product/${product.id}`
      }));

    setSearchResults([...categoryResults, ...productResults]);
  }, [searchQuery]);

  const handleCategoryHover = (category) => {
    setActiveCategory(category);
  };

  const handleMouseLeave = () => {
    setActiveCategory(null);
  };

  const getSubcategories = () => {
    if (!activeCategory) return [];
    const foundCategory = categories.find(
      (cat) => cat.name.toLowerCase() === activeCategory.toLowerCase()
    );
    return foundCategory ? foundCategory.subcategories : [];
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setSearchOpen(false);
  };

  // Generate unique key for search results
  const getResultKey = (result) => {
    return result.id || `${result.type}-${result.path}`;
  };

  return (
    <div className="relative">
      <nav 
        className="flex items-center justify-between py-5 font-medium relative px-4 sm:px-8"
        onMouseLeave={handleMouseLeave}
      >
        <NavLink to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="aspect-square w-12 object-contain mix-blend-color-burn" />
        </NavLink>

        {/* Desktop Nav Links */}
        <ul className="hidden sm:flex gap-5 text-sm text-neutral-500">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-black font-semibold" : "hover:text-neutral-800"
              }
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/collection"
              className={({ isActive }) =>
                isActive ? "text-black font-semibold" : "hover:text-neutral-800"
              }
            >
              COLLECTION
            </NavLink>
          </li>
          <li 
            onMouseEnter={() => handleCategoryHover("men")}
            className="relative"
          >
            <NavLink
              to="/category/men"
              className={({ isActive }) =>
                isActive ? "text-black font-semibold" : "hover:text-neutral-800"
              }
            >
              MEN
            </NavLink>
          </li>
          <li 
            onMouseEnter={() => handleCategoryHover("women")}
            className="relative"
          >
            <NavLink
              to="/category/women"
              className={({ isActive }) =>
                isActive ? "text-black font-semibold" : "hover:text-neutral-800"
              }
            >
              WOMEN
            </NavLink>
          </li>
          <li 
            onMouseEnter={() => handleCategoryHover("kids")}
            className="relative"
          >
            <NavLink
              to="/category/kids"
              className={({ isActive }) =>
                isActive ? "text-black font-semibold" : "hover:text-neutral-800"
              }
            >
              KIDS
            </NavLink>
          </li>
        </ul>

        {/* Icons and Hamburger */}
        <div className="flex items-center gap-6 relative">
          {/* Search Input - Desktop */}
          <div className="hidden sm:block relative" ref={desktopSearchRef}>
            {searchOpen && (
              <div className="absolute right-0 top-12 border border-neutral-300 bg-white shadow-lg rounded-md p-4 w-64 z-50">
                <div className="flex items-center border-b border-gray-200 pb-2">
                  <FiSearch className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="outline-none w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <button onClick={clearSearch} className="ml-2">
                    <FiX className="text-gray-500" />
                  </button>
                </div>
                {searchResults.length > 0 && (
                  <div className="mt-2 max-h-60 overflow-y-auto">
                    {searchResults.map((result) => (
                      <NavLink
                        key={getResultKey(result)}
                        to={result.path}
                        className="block p-2 hover:bg-gray-100 rounded"
                        onClick={clearSearch}
                      >
                        <div className="font-medium">{result.name}</div>
                        {result.type === 'category' && result.subcategories.length > 0 && (
                          <div className="text-xs text-gray-500">
                            Includes: {result.subcategories.join(', ')}
                          </div>
                        )}
                        {result.type === 'product' && (
                          <div className="text-xs text-gray-500">
                            ${result.price}
                          </div>
                        )}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )}
            <button 
              className="desktop-search-icon p-2 rounded-full hover:bg-gray-100 transition"
              onClick={() => {
                setSearchOpen(!searchOpen);
                setSearchQuery("");
                setSearchResults([]);
              }}
              aria-label="Search"
            >
              <FiSearch className="h-6 w-6 text-gray-700" />
            </button>
          </div>

          {/* User Icon with Dropdown */}
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition"
            onClick={() => setDropdownOpen((prev) => !prev)}
            aria-label="User menu"
          >
            <FiUser className="h-6 w-6 text-gray-700" />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 top-12 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg z-50">
              <NavLink to="/profile" className="block cursor-pointer hover:text-black">My Profile</NavLink>
              <NavLink to="/orders" className="block cursor-pointer hover:text-black">Orders</NavLink>
              <button className="block cursor-pointer hover:text-black w-full text-left">Logout</button>
            </div>
          )}

          {/* Cart Icon */}
          <NavLink
            to="/cart"
            className="p-2 rounded-full hover:bg-gray-100 transition relative"
            aria-label="Cart"
          >
            <FiShoppingCart className="h-6 w-6 text-gray-700" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              3
            </span>
          </NavLink>

          {/* Hamburger Icon for Mobile */}
          <button
            className="sm:hidden p-2 rounded-full hover:bg-gray-100 transition z-50"
            onClick={() => setVisible((prev) => !prev)}
            aria-label={visible ? "Close menu" : "Open menu"}
          >
            {visible ? (
              <MdClose className="h-6 w-6 text-gray-700" />
            ) : (
              <MdMenu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Overlay behind sidebar */}
        {visible && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            onClick={() => setVisible(false)}
            aria-hidden="true"
          />
        )}

        {/* Sidebar menu for small screen */}
        <div
          className={`fixed top-0 right-0 h-full bg-white overflow-y-auto transition-all duration-300 ease-in-out z-50 ${
            visible ? "w-64 shadow-lg" : "w-0"
          }`}
        >
          <div className="flex flex-col text-gray-600 h-full">
            {/* Back button */}
            <div
              onClick={() => setVisible(false)}
              className="flex items-center gap-4 p-3 cursor-pointer hover:bg-gray-200"
            >
              <GoSidebarCollapse className="text-2xl" />
              <p>Back</p>
            </div>

            {/* Mobile Search */}
            <div className="p-4 border-b" ref={mobileSearchRef}>
              <div className="flex items-center border-b border-neutral-300 pb-2">
                <FiSearch className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="outline-none w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                {searchQuery && (
                  <button onClick={clearSearch} className="ml-2">
                    <FiX className="text-gray-500" />
                  </button>
                )}
              </div>
              {searchResults.length > 0 && (
                <div className="mt-2 max-h-60 overflow-y-auto">
                  {searchResults.map((result) => (
                    <NavLink
                      key={getResultKey(result)}
                      to={result.path}
                      className="block p-2 hover:bg-gray-100 rounded"
                      onClick={() => {
                        clearSearch();
                        setVisible(false);
                      }}
                    >
                      <div className="font-medium">{result.name}</div>
                      {result.type === 'category' && result.subcategories.length > 0 && (
                        <div className="text-xs text-gray-500">
                          Includes: {result.subcategories.join(', ')}
                        </div>
                      )}
                      {result.type === 'product' && (
                        <div className="text-xs text-gray-500">
                          ${result.price}
                        </div>
                      )}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar Nav Links */}
            <nav className="flex flex-col gap-4 p-4">
              <NavLink
                to="/"
                onClick={() => setVisible(false)}
                className={({ isActive }) =>
                  `py-2 pl-6 rounded hover:bg-gray-100 ${isActive ? "bg-gray-200 font-semibold text-black" : ""}`
                }
              >
                HOME
              </NavLink>

              <NavLink
                to="/collection"
                onClick={() => setVisible(false)}
                className={({ isActive }) =>
                  `py-2 pl-6 rounded hover:bg-gray-100 ${isActive ? "bg-gray-200 font-semibold text-black" : ""}`
                }
              >
                COLLECTION
              </NavLink>
              <NavLink
                to="/category/men"
                onClick={() => setVisible(false)}
                className={({ isActive }) =>
                  `py-2 pl-6 rounded hover:bg-gray-100 ${isActive ? "bg-gray-200 font-semibold text-black" : ""}`
                }
              >
                MEN
              </NavLink>
              <NavLink
                to="/category/women"
                onClick={() => setVisible(false)}
                className={({ isActive }) =>
                  `py-2 pl-6 rounded hover:bg-gray-100 ${isActive ? "bg-gray-200 font-semibold text-black" : ""}`
                }
              >
                WOMEN
              </NavLink>
              <NavLink
                to="/category/kids"
                onClick={() => setVisible(false)}
                className={({ isActive }) =>
                  `py-2 pl-6 rounded hover:bg-gray-100 ${isActive ? "bg-gray-200 font-semibold text-black" : ""}`
                }
              >
                KIDS
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setVisible(false)}
                className={({ isActive }) =>
                  `py-2 pl-6 rounded hover:bg-gray-100 ${isActive ? "bg-gray-200 font-semibold text-black" : ""}`
                }
              >
                CONTACT
              </NavLink>
              <NavLink
                to="/about"
                onClick={() => setVisible(false)}
                className={({ isActive }) =>
                  `py-2 pl-6 rounded hover:bg-gray-100 ${isActive ? "bg-gray-200 font-semibold text-black" : ""}`
                }
              >
                ABOUT
              </NavLink>
            </nav>
          </div>
        </div>
      </nav>

      {/* Subheader that appears on hover */}
      {activeCategory && (
        <div 
          className="hidden sm:block absolute left-0 w-full bg-white shadow-lg z-30"
          onMouseEnter={() => setActiveCategory(activeCategory)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="w-[80%] mx-auto py-8">
            <h3 className="text-xl font-bold mb-4">{activeCategory.toUpperCase()}</h3>
            <div className="grid grid-cols-4 lg:grid-cols-5 gap-4">
              {getSubcategories().map((subcategory) => (
                <NavLink
                  key={`${activeCategory}-${subcategory.toLowerCase().replace(/\s+/g, '-')}`}
                  to={`/category/${activeCategory.toLowerCase()}/${subcategory.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block p-3 hover:bg-gray-50 rounded transition hover:text-neutral-600"
                >
                  <div className="font-medium">{subcategory}</div>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;