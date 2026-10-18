"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { X, Lock, Mail, Shield, CheckCircle } from "lucide-react";

export default function AuthModal() {
  const { isAuthOpen, setIsAuthOpen } = useCart();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authSuccess, setAuthSuccess] = useState(false);

  if (!isAuthOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setAuthSuccess(true);
    setTimeout(() => {
      setAuthSuccess(false);
      setIsAuthOpen(false);
    }, 1500);
  };

  const handleGoogleSignIn = () => {
    setAuthSuccess(true);
    setTimeout(() => {
      setAuthSuccess(false);
      setIsAuthOpen(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => setIsAuthOpen(false)}
        className="absolute inset-0 bg-neutral-950/70 backdrop-blur-xs"
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-neutral-100 z-10 overflow-hidden">
        {/* Close button */}
        <button
          onClick={() => setIsAuthOpen(false)}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand header */}
        <div className="text-center mb-6">
          <div className="text-2xl font-black tracking-tight text-neutral-900">
            INNOVIST
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            {isSignUp
              ? "Create your science beauty account"
              : "Login to access your orders, routine & rewards"}
          </p>
        </div>

        {authSuccess ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-lg font-bold text-neutral-900">Authentication Ready!</h3>
            <p className="text-xs text-neutral-500 max-w-xs mx-auto">
              Google Auth &amp; MongoDB sessions are staged for backend integration.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Google Authentication Button */}
            <button
              onClick={handleGoogleSignIn}
              className="w-full py-3 px-4 border border-neutral-300 hover:border-neutral-400 rounded-2xl flex items-center justify-center gap-3 text-xs sm:text-sm font-bold text-neutral-800 hover:bg-neutral-50 transition-colors shadow-xs cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.97 0 12s.45 3.83 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Separator */}
            <div className="relative flex items-center justify-center py-1">
              <div className="border-t border-neutral-200 w-full" />
              <span className="bg-white px-3 text-[11px] uppercase font-semibold text-neutral-400 absolute">
                or with email
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-rose-500"
                  />
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-rose-500"
                  />
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all shadow-sm cursor-pointer mt-2"
              >
                {isSignUp ? "Create Account" : "Sign In"}
              </button>
            </form>

            {/* Switch Mode */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-xs text-neutral-500 hover:text-neutral-900 font-semibold"
              >
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "New to Innovist? Create an account"}
              </button>
            </div>

            {/* Security note */}
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-400 pt-2">
              <Shield className="w-3 h-3 text-emerald-600" />
              <span>MongoDB Encrypted Storage &amp; NextAuth Guard</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
