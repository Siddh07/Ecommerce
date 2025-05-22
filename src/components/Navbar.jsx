import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { FiSearch, FiUser, FiShoppingCart,FiMenu, FiX  } from "react-icons/fi";

const Navbar = () => {
  // 1. Create state variable for dropdown visibility
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <img src={logo} alt="logo" className="w-20 h-12" />
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {/* ...NavLinks here, each inside <li> ... */}
      </ul>
      <div className="flex items-center gap-6 relative">
        <button className="p-2 rounded-full hover:bg-gray-100 transition">
          <FiSearch className="h-6 w-6 text-gray-700" />
        </button>
        {/* 2. Toggle state on click */}
        <button
          className="p-2 rounded-full hover:bg-gray-100 transition"
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          <FiUser className="h-6 w-6 text-gray-700" />
        </button>
        {/* 3. Conditionally render dropdown based on state */}
        {dropdownOpen && (
          <div className="absolute right-0 top-12 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg z-50">
            <p className="cursor-pointer hover:text-black">My Profile</p>
            <p className="cursor-pointer hover:text-black">Orders</p>
            <p className="cursor-pointer hover:text-black">Logout</p>
          </div>
        )}
        <NavLink
          to="/cart"
          className="p-2 rounded-full hover:bg-gray-100 transition">
          <FiShoppingCart className="h-6 w-6 text-gray-700" />
          <p className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full"></p>
        </NavLink>


      </div>
    </div>
  );
};

export default Navbar;
