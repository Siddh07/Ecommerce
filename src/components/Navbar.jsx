import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { FiSearch, FiUser, FiShoppingCart } from "react-icons/fi";
import { MdMenu, MdClose } from "react-icons/md";
import { GoSidebarCollapse } from "react-icons/go";

// Import or define your categories data
import categories from "../assets/data/Categories.json"; // Adjust the path as needed

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  // Handle category hover
  const handleCategoryHover = (category) => {
    setActiveCategory(category);
  };

  // Close subheader when mouse leaves
  const handleMouseLeave = () => {
    setActiveCategory(null);
  };

  // Get subcategories for active category
  const getSubcategories = () => {
    if (!activeCategory) return [];
    const foundCategory = categories.find(
      (cat) => cat.name.toLowerCase() === activeCategory.toLowerCase()
    );
    return foundCategory ? foundCategory.subcategories : [];
  };

  return (
    <div className="relative">
      <nav 
        className="flex items-center justify-between py-5 font-medium relative px-4 sm:px-8"
        onMouseLeave={handleMouseLeave}
      >
        <a href="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="aspect-square w-12 object-contain mix-blend-color-burn" />
        </a>

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
              to="/men"
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
              to="/women"
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
              to="/kids"
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
          {/* Search Icon */}
          <button className="p-2 rounded-full hover:bg-gray-100 transition">
            <FiSearch className="h-6 w-6 text-gray-700" />
          </button>

          {/* User Icon with Dropdown */}
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <FiUser className="h-6 w-6 text-gray-700" />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 top-12 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg z-50">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          )}

          {/* Cart Icon */}
          <NavLink
            to="/cart"
            className="p-2 rounded-full hover:bg-gray-100 transition relative"
          >
            <FiShoppingCart className="h-6 w-6 text-gray-700" />
            {/* Example cart count badge */}
            <p className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              3
            </p>
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
                to="/men"
                onClick={() => setVisible(false)}
                className={({ isActive }) =>
                  `py-2 pl-6 rounded hover:bg-gray-100 ${isActive ? "bg-gray-200 font-semibold text-black" : ""}`
                }
              >
                MEN
              </NavLink>
              <NavLink
                to="/women"
                onClick={() => setVisible(false)}
                className={({ isActive }) =>
                  `py-2 pl-6 rounded hover:bg-gray-100 ${isActive ? "bg-gray-200 font-semibold text-black" : ""}`
                }
              >
                WOMEN
              </NavLink>
              <NavLink
                to="/kids"
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
                  key={subcategory}
                  to={`/${activeCategory.toLowerCase()}/${subcategory.toLowerCase().replace(/\s+/g, '-')}`}
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