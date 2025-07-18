import React from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { cartItems, currency, delivery, getCartAmount } = React.useContext(ShopContext);

  const symbol = currency || "$";
  const subtotal = getCartAmount ? getCartAmount() : 0;
  const shipping = delivery ?? 0;
  const total = subtotal + shipping;

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1="Cart Total" text2="Summary" />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{symbol} {subtotal.toFixed(2)}</p>
        </div>

        <hr />

        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>{symbol} {shipping.toFixed(2)}</p>
        </div>

        <hr />

        <div className="flex justify-between font-bold">
          <b>Total</b>
          <b>{symbol} {total.toFixed(2)}</b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
