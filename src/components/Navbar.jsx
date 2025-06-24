import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { FiSearch, FiUser, FiShoppingCart, FiX } from 'react-icons/fi';
import { MdMenu, MdClose } from 'react-icons/md';
import { GoSidebarCollapse } from 'react-icons/go';

// Import your data files
import categories from '../assets/data/Categories.json';
import products from '../assets/products.js';

const Navbar = () => {
  // State management
  const [visible, setVisible] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // Refs
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const searchInputRef = useRef(null);

  // Hooks
  const navigate = useNavigate();
  const location = useLocation();

  // Focus search input when search opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Handle clicks outside search inputs
  useEffect(() => {
    const handleClickOutside = (event) => {
      // For desktop search
      if (desktopSearchRef.current && 
          !desktopSearchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
      
      // For mobile search
      if (mobileSearchRef.current && 
          !mobileSearchRef.current.contains(event.target)) {
        if (!event.target.closest('.mobile-search-icon')) {
          setSearchQuery('');
          setSearchResults([]);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search functionality
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(() => {
      const query = searchQuery.toLowerCase();
      
      // Search categories
      const categoryResults = categories.flatMap(category => {
        const matches = category.name.toLowerCase().includes(query) || 
          category.subcategories.some(sub => sub.toLowerCase().includes(query));
        
        return matches ? [{
          type: 'category',
          id: `cat-${category.name}`,
          name: category.name,
          path: `/category/${category.name.toLowerCase()}`
        }] : [];
      });

      // Search products
      const productResults = products.filter(product => {
        // Exact match by ID
        if (product.id.toString() === searchQuery.trim()) return true;
        
        // Partial matches
        return product.name.toLowerCase().includes(query) || 
          (product.description && product.description.toLowerCase().includes(query));
      }).map(product => ({
        type: 'product',
        id: `prod-${product.id}`,
        ...product,
        path: `/product/${product.id}`
      }));

      setSearchResults([...categoryResults, ...productResults]);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Handle search result selection
  const handleSearchResultClick = (result) => {
    setSearchQuery('');
    setSearchResults([]);
    setSearchOpen(false);
    setVisible(false);
    
    if (location.pathname === result.path) {
      navigate(result.path, { replace: true });
      window.location.reload();
    } else {
      navigate(result.path);
    }
  };

  // Handle Enter key in search
  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && searchResults.length > 0) {
      handleSearchResultClick(searchResults[0]);
    }
  };

  // Category hover effects
  const handleCategoryHover = (category) => {
    setActiveCategory(category);
  };

  const handleMouseLeave = () => {
    setActiveCategory(null);
  };

  const getSubcategories = () => {
    if (!activeCategory) return [];
    const foundCategory = categories.find(
      cat => cat.name.toLowerCase() === activeCategory.toLowerCase()
    );
    return foundCategory ? foundCategory.subcategories : [];
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setSearchOpen(false);
  };

  return (
    <div className="relative">
      <nav 
        className="flex items-center justify-between py-5 font-medium relative px-4 sm:px-8"
        onMouseLeave={handleMouseLeave}
      >
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="aspect-square w-12 object-contain mix-blend-color-burn" />
        </NavLink>

        {/* Desktop Navigation */}
        <ul className="hidden sm:flex gap-5 text-sm text-neutral-500">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "text-black font-semibold" : "hover:text-neutral-800"}>
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink to="/collection" className={({ isActive }) => isActive ? "text-black font-semibold" : "hover:text-neutral-800"}>
              COLLECTION
            </NavLink>
          </li>
          <li onMouseEnter={() => handleCategoryHover("men")} className="relative">
            <NavLink to="/category/men" className={({ isActive }) => isActive ? "text-black font-semibold" : "hover:text-neutral-800"}>
              MEN
            </NavLink>
          </li>
          <li onMouseEnter={() => handleCategoryHover("women")} className="relative">
            <NavLink to="/category/women" className={({ isActive }) => isActive ? "text-black font-semibold" : "hover:text-neutral-800"}>
              WOMEN
            </NavLink>
          </li>
          <li onMouseEnter={() => handleCategoryHover("kids")} className="relative">
            <NavLink to="/category/kids" className={({ isActive }) => isActive ? "text-black font-semibold" : "hover:text-neutral-800"}>
              KIDS
            </NavLink>
          </li>
        </ul>

        {/* Icons */}
        <div className="flex items-center gap-6 relative">
          {/* Desktop Search */}
          <div className="hidden sm:block relative" ref={desktopSearchRef}>
            <button 
              onClick={() => {
                setSearchOpen(!searchOpen);
                setTimeout(() => {
                  if (searchInputRef.current) {
                    searchInputRef.current.focus();
                  }
                }, 0);
              }}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <FiSearch className="h-6 w-6 text-gray-700" />
            </button>
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
                    onKeyDown={handleSearchKeyDown}
                    autoFocus
                    ref={searchInputRef}
                  />
                  {searchQuery && (
                    <button onClick={clearSearch} className="ml-2">
                      <FiX className="text-gray-500" />
                    </button>
                  )}
                </div>
                {isSearching ? (
                  <div className="mt-2 p-2 text-center text-gray-500">Searching...</div>
                ) : searchResults.length > 0 ? (
                <div className="mt-2 max-h-60 overflow-y-auto">
                  {searchResults.map((result) => (
                    <div
                      key={result.id}
                      className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer"
                      onClick={() => handleSearchResultClick(result)}
                    >
                      {result.type === 'product' && (
                        <img 
                          src={result.image} 
                          alt={result.name}
                          className="w-10 h-10 object-cover mr-2"
                        />
                      )}
                      <div>
                        <div className="font-medium">{result.name}</div>
                        {result.type === 'product' ? (
                          <div className="text-xs text-gray-500">
                            ${result.price} • ID: {String(result.id).replace('prod-', '')}
                          </div>
                        ) : (
                          <div className="text-xs text-gray-500">Category</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
              </div>
            )}
          </div>

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <FiUser className="h-6 w-6 text-gray-700" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-12 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg z-50">
                <NavLink to="/profile" className="block cursor-pointer hover:text-black">My Profile</NavLink>
                <NavLink to="/orders" className="block cursor-pointer hover:text-black">Orders</NavLink>
                <button className="block cursor-pointer hover:text-black w-full text-left">Logout</button>
              </div>
            )}
          </div>

          {/* Cart */}
          <NavLink to="/cart" className="p-2 rounded-full hover:bg-gray-100 transition relative">
            <FiShoppingCart className="h-6 w-6 text-gray-700" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              3
            </span>
          </NavLink>

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden p-2 rounded-full hover:bg-gray-100 transition z-50"
            onClick={() => setVisible(!visible)}
          >
            {visible ? (
              <MdClose className="h-6 w-6 text-gray-700" />
            ) : (
              <MdMenu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {visible && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-30 z-40" onClick={() => setVisible(false)} />
          <div className="fixed top-0 right-0 h-full bg-white w-64 shadow-lg z-50 overflow-y-auto">
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-4 p-3 cursor-pointer hover:bg-gray-200" onClick={() => setVisible(false)}>
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
                    onKeyDown={handleSearchKeyDown}  // Changed from onKeyPress
                    autoFocus
                    ref={searchInputRef}
                  />
                  {searchQuery && (
                    <button onClick={clearSearch} className="ml-2">
                      <FiX className="text-gray-500" />
                    </button>
                  )}
                </div>
                {isSearching ? (
                  <div className="mt-2 p-2 text-center text-gray-500">Searching...</div>
                ) : searchResults.length > 0 ? (
                  <div className="mt-2 max-h-60 overflow-y-auto">
                    {searchResults.map((result) => (
                      <div
                        key={result.id}
                        className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer"
                        onClick={() => handleSearchResultClick(result)}
                      >
                        {result.type === 'product' && (
                          <img 
                            src={result.image} 
                            alt={result.name}
                            className="w-10 h-10 object-cover mr-2"
                          />
                        )}
                        <div>
                          <div className="font-medium">{result.name}</div>
                          {result.type === 'product' && (
                            <div className="text-xs text-gray-500">${result.price}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : searchQuery && !isSearching ? (
                  <div className="mt-2 p-2 text-center text-gray-500">No results found</div>
                ) : null}
              </div>

              {/* Mobile Nav Links */}
              <nav className="flex flex-col gap-4 p-4">
                <NavLink to="/" onClick={() => setVisible(false)} className={({ isActive }) => `py-2 pl-6 rounded hover:bg-gray-100 ${isActive ? "bg-gray-200 font-semibold text-black" : ""}`}>
                  HOME
                </NavLink>
                <NavLink to="/collection" onClick={() => setVisible(false)} className={({ isActive }) => `py-2 pl-6 rounded hover:bg-gray-100 ${isActive ? "bg-gray-200 font-semibold text-black" : ""}`}>
                  COLLECTION
                </NavLink>
                <NavLink to="/category/men" onClick={() => setVisible(false)} className={({ isActive }) => `py-2 pl-6 rounded hover:bg-gray-100 ${isActive ? "bg-gray-200 font-semibold text-black" : ""}`}>
                  MEN
                </NavLink>
                <NavLink to="/category/women" onClick={() => setVisible(false)} className={({ isActive }) => `py-2 pl-6 rounded hover:bg-gray-100 ${isActive ? "bg-gray-200 font-semibold text-black" : ""}`}>
                  WOMEN
                </NavLink>
                <NavLink to="/category/kids" onClick={() => setVisible(false)} className={({ isActive }) => `py-2 pl-6 rounded hover:bg-gray-100 ${isActive ? "bg-gray-200 font-semibold text-black" : ""}`}>
                  KIDS
                </NavLink>
              </nav>
            </div>
          </div>
        </>
      )}

      {/* Category Dropdown */}
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
                  key={`${activeCategory}-${subcategory}`}
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