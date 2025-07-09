import React from "react";

export default function Admin() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-red-700 mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-red-100 rounded-lg p-6 flex flex-col items-center shadow">
            <span className="text-4xl font-bold text-red-700 mb-2">120</span>
            <span className="text-lg font-medium text-red-800">Products</span>
          </div>
          <div className="bg-indigo-100 rounded-lg p-6 flex flex-col items-center shadow">
            <span className="text-4xl font-bold text-indigo-700 mb-2">45</span>
            <span className="text-lg font-medium text-indigo-800">Orders</span>
          </div>
          <div className="bg-green-100 rounded-lg p-6 flex flex-col items-center shadow">
            <span className="text-4xl font-bold text-green-700 mb-2">8</span>
            <span className="text-lg font-medium text-green-800">Users</span>
          </div>
        </div>
        <div className="bg-gray-100 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <button className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 transition">Add Product</button>
            <button className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 transition">View Orders</button>
            <button className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition">Manage Users</button>
          </div>
        </div>
      </div>
    </div>
  );
}