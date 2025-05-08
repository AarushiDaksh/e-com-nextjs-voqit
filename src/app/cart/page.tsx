'use client';

import { useCart } from "@/contexts/CartContext";
import React, { useState } from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const Cart = () => {
  const { cart, setCart } = useCart();
  const [price, setPrice] = useState<number | null>(null);

  const updateQuantity = (id: number, newQuantity: number) => {
    setCart((prevCart) => {
      return prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      );
    });
  };

  return (
    <MaxWidthWrapper>
      <div className="px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">My Cart</h1>
        <button
          className="text-red-500 hover:text-red-700 transition-colors mb-6"
          onClick={() => setCart([])}
        >
          Remove All
        </button>

        <div className="space-y-4">
          {cart.map((item, ind) => (
            <div
              key={ind}
              className="flex flex-col md:flex-row md:items-center md:justify-between p-4 border border-gray-200 rounded-lg shadow-sm gap-4"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4">
                <Image
                  src={item.image}
                  width={70}
                  height={70}
                  alt="cart-img"
                  className="rounded-md"
                />
                <div className="w-48">
                  <p className="text-lg font-semibold truncate">
                    {item.title}
                  </p>
                  <p className="text-gray-500">By Nxt Trendz</p>
                </div>
              </div>

              {/* Quantity Controller */}
              <div className="flex items-center gap-2 self-start md:self-center">
                <button
                  className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                  onClick={() => updateQuantity(item.id, item.quantity! - 1)}
                >
                  −
                </button>
                <span className="text-lg text-gray-700">
                  {item.quantity}
                </span>
                <button
                  className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                  onClick={() => updateQuantity(item.id, item.quantity! + 1)}
                >
                  +
                </button>
              </div>

              {/* Price & Remove Button */}
              <div className="flex items-center justify-between gap-4">
                <p className="text-lg font-semibold">
                  ₹{Math.floor(item.price * item.quantity!)}
                </p>
                <button
                  className="text-red-500 hover:text-red-700 transition"
                  onClick={() => {
                    setCart((prevItems) =>
                      prevItems.filter((_, idx) => idx !== ind)
                    );
                  }}
                >
                  <Trash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Cart;
