import React, { useState, useEffect, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { IoTrashBin } from "react-icons/io5";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, cartItems, removeFromCart, updateQuantity,navigate } = useContext(ShopContext);
  const [cartProducts, setCartProducts] = useState([]);


  useEffect(() => {
    const tempData = [];

    for (const item in cartItems) {
      for (const size in cartItems[item]) {
        if (cartItems[item][size] > 0) {
          const product = products.find(
            (product) => product.id === parseInt(item)
          );
          if (product) {
            tempData.push({
              ...product,
              size,
              quantity: cartItems[item][size],
            });
          }
        }
      }
    }

    setCartProducts(tempData);
  }, [cartItems, products]);

  const handleRemove = (productId, size) => {
    removeFromCart(productId, size);
  };

  const handleUpdateQuantity = (productId, size, quantity) => {
    updateQuantity(productId, size, quantity);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
      <h2 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Your Cart</h2>

      {cartProducts.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "4rem", color: "#666" }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🛒</div>
          <h3>Your cart is currently empty</h3>
          <p>Looks like you haven't added anything yet.</p>
          <Link to="/collection" style={{ textDecoration: "none" }}>
            <button
              style={{
                marginTop: "1.5rem",
                padding: "0.75rem 1.5rem",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Shop Now
            </button>
          </Link>
        </div>
      ) : (
        <>
          {/* Product List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {cartProducts.map((product) => (
              <div
                key={`${product.id}-${product.size}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "1rem",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <div>
                    <h4 style={{ margin: 0 }}>{product.name}</h4>
                    <p style={{ margin: "4px 0", color: "#555" }}>
                      Size: {product.size}
                    </p>
                    <p style={{ margin: 0, fontWeight: "bold" }}>
                      Qty: {product.quantity}
                    </p>
                    <input
                      type="number"
                      min="1"
                      value={product.quantity}
                      onChange={(e) =>
                        handleUpdateQuantity(
                          product.id,
                          product.size,
                          parseInt(e.target.value)
                        )
                      }
                      style={{ width: "60px", height: "30px", padding: "5px", marginTop: "4px" }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    ${Number(product.price * product.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleRemove(product.id, product.size)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "1.4rem",
                      color: "#dc3545",
                    }}
                    title="Remove item"
                  >
                    <IoTrashBin />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Total */}
          <div className="flex justify-end my-20">
            <div className="w-full sm:w-[450px]">
              <CartTotal />
              <div className="w-full text-end">
                <button onClick={() => navigate("/place-order")}  className="bg-black text-white text-sm my-8 px-8 py-3">
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
