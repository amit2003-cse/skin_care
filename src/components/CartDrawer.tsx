"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  Truck,
  CheckCircle2,
} from "lucide-react";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    shipping,
    finalTotal,
    couponCode,
    applyCoupon,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState("");
  const [couponMessage, setCouponMessage] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 499;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  );

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon) return;
    const res = applyCoupon(inputCoupon);
    setCouponMessage({ text: res.message, isError: !res.success });
  };

  const handleRazorpayCheckout = () => {
    setIsCheckingOut(true);
    // Simulating Razorpay SDK trigger
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-neutral-950/60 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-neutral-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-neutral-900" />
              <h2 className="text-base sm:text-lg font-black text-neutral-900">
                Your Shopping Bag ({cart.length})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-rose-50/70 p-3.5 border-b border-rose-100/60 text-xs">
            <div className="flex items-center justify-between font-semibold text-rose-950 mb-1.5">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-rose-600" />
                <span>
                  {amountNeededForFreeShipping === 0
                    ? "🎉 Yay! You qualified for FREE Express Delivery!"
                    : `Add ₹${amountNeededForFreeShipping} more to unlock FREE Shipping!`}
                </span>
              </div>
            </div>
            <div className="w-full bg-rose-200/60 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-rose-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 bg-neutral-100 text-neutral-400 rounded-full flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-neutral-900">
                  Your bag is empty!
                </h3>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Discover science-backed formulations and add them to your daily routine.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-6 py-2.5 bg-neutral-900 text-white rounded-full text-xs font-bold hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Explore Products
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="flex gap-3.5 p-3 rounded-2xl bg-neutral-50/70 border border-neutral-200/60"
                >
                  {/* Item Image */}
                  <div className="w-20 h-20 bg-white rounded-xl overflow-hidden shrink-0 border border-neutral-100">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                          {item.product.brand}
                        </span>
                        <button
                          onClick={() =>
                            removeFromCart(item.product.id, item.selectedSize)
                          }
                          className="text-neutral-400 hover:text-rose-600 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <h4 className="text-xs font-bold text-neutral-900 line-clamp-1">
                        {item.product.title}
                      </h4>
                      <span className="text-[11px] text-neutral-500">
                        Size: {item.selectedSize}
                      </span>
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-neutral-300 rounded-lg bg-white overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedSize,
                              item.quantity - 1
                            )
                          }
                          className="p-1 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-neutral-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedSize,
                              item.quantity + 1
                            )
                          }
                          className="p-1 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm font-black text-neutral-900">
                          ₹{item.product.price * item.quantity}
                        </span>
                        <span className="text-[11px] text-neutral-400 line-through">
                          ₹{item.product.compareAtPrice * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer / Checkout Area */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-neutral-200 bg-neutral-50/50 space-y-3.5">
              {/* Coupon input */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Enter Coupon (e.g. FIRST20)"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-neutral-200 rounded-xl uppercase font-mono tracking-wider focus:outline-hidden focus:ring-1 focus:ring-rose-500"
                  />
                  <Tag className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {couponMessage && (
                <div
                  className={`text-[11px] font-semibold ${
                    couponMessage.isError ? "text-rose-600" : "text-emerald-600"
                  }`}
                >
                  {couponMessage.text}
                </div>
              )}

              {/* Order breakdown summary */}
              <div className="space-y-1.5 text-xs text-neutral-600 pt-2 border-t border-neutral-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-neutral-900">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount ({couponCode})</span>
                    <span>- ₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Charges</span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-emerald-600">FREE</span>
                    ) : (
                      `₹${shipping}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-neutral-900 pt-2 border-t border-neutral-200">
                  <span>Final Total</span>
                  <span className="text-base text-rose-600">₹{finalTotal}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleRazorpayCheckout}
                disabled={isCheckingOut}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-neutral-900 to-neutral-800 hover:from-rose-600 hover:to-pink-600 text-white rounded-2xl font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isCheckingOut ? (
                  <span>Connecting to Razorpay...</span>
                ) : (
                  <>
                    <span>Pay ₹{finalTotal} via Razorpay</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Razorpay simulation alert */}
              {checkoutComplete && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold">Razorpay Gateway Ready:</span> Checkout
                    flow triggered! (Backend API will create Razorpay Order ID &amp; save to
                    MongoDB).
                  </div>
                </div>
              )}

              {/* Trust badges row */}
              <div className="flex items-center justify-center gap-3 pt-1 text-[10px] text-neutral-400">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>256-Bit SSL Secure</span>
                </div>
                <span>•</span>
                <span>UPI / Cards / NetBanking / COD</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
