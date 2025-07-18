import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const PlaceOrder = () => {
  const { cartItems, products, currency, delivery, getCartAmount } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const temp = [];
    for (const itemId in cartItems) {
      const product = products.find(p => p.id === parseInt(itemId));
      if (!product) continue;

      for (const size in cartItems[itemId]) {
        const quantity = cartItems[itemId][size];
        if (quantity > 0) {
          temp.push({
            ...product,
            size,
            quantity,
            totalPrice: product.price * quantity,
          });
        }
      }
    }
    setCartData(temp);
  }, [cartItems, products]);

  const subtotal = getCartAmount();
  const total = subtotal + delivery;

  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Form */}
        <div className="lg:col-span-2 bg-white p-8 rounded shadow-md">
          <Title text1="Shipping" text2="Information" />
          <form className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className="input" />
              <input type="text" placeholder="Last Name" className="input" />
            </div>
            <input type="email" placeholder="Email Address" className="input" />
            <input type="text" placeholder="Street Address" className="input" />
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="City" className="input" />
              <input type="text" placeholder="State" className="input" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Zip Code" className="input" />
              <input type="text" placeholder="Landmark (optional)" className="input" />
            </div>
            <input type="tel" placeholder="Phone Number" className="input" />

            <h2 className="text-xl font-semibold mt-10 mb-4">Payment Method</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="payment" />
                Credit / Debit Card
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="payment" />
                PayPal
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="payment" />
                Cash on Delivery
              </label>
            </div>

            <button
              type="submit"
              className="mt-6 w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="bg-white p-6 rounded shadow-md h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          {/* Cart Items */}
          <div className="space-y-4 max-h-72 overflow-y-auto border-b pb-4">
            {cartData.length === 0 ? (
              <p className="text-gray-500 text-sm">Your cart is empty.</p>
            ) : (
              cartData.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex justify-between text-sm">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-500">Size: {item.size} × {item.quantity}</p>
                  </div>
                  <p>{currency}{item.totalPrice.toFixed(2)}</p>
                </div>
              ))
            )}
          </div>

          {/* Totals */}
          <div className="mt-4 text-sm">
            <div className="flex justify-between py-1">
              <span>Subtotal</span>
              <span>{currency}{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Shipping</span>
              <span>{currency}{delivery.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 font-semibold border-t mt-2">
              <span>Total</span>
              <span>{currency}{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
