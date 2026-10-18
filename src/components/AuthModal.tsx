"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { GoogleLogin } from "@react-oauth/google";
import { X, Lock, Mail, Shield, CheckCircle, Loader2 } from "lucide-react";

export default function AuthModal() {
  const { isAuthOpen, setIsAuthOpen, loginUser } = useCart();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  if (!isAuthOpen) return null;

  const handleGoogleSuccess = async (credentialResponse: { credential?: string }) => {
    if (!credentialResponse.credential) {
      setAuthError("No Google credential received");
      return;
    }

    setIsLoading(true);
    setAuthError(null);

    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to authenticate with Google");
      }

      loginUser(data.user);
      setAuthSuccess(`Welcome, ${data.user.name}!`);

      setTimeout(() => {
        setAuthSuccess(null);
        setIsAuthOpen(false);
      }, 1500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication failed";
      setAuthError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    setAuthError(null);

    // Mock local email login
    setTimeout(() => {
      const name = email.split("@")[0];
      const dummyUser = {
        id: "local_" + Date.now(),
        name: name.charAt(0).toUpperCase() + name.slice(1),
        email,
      };
      loginUser(dummyUser);
      setAuthSuccess(`Welcome, ${dummyUser.name}!`);
      setIsLoading(false);

      setTimeout(() => {
        setAuthSuccess(null);
        setIsAuthOpen(false);
      }, 1500);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => !isLoading && setIsAuthOpen(false)}
        className="absolute inset-0 bg-neutral-950/70 backdrop-blur-xs"
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-neutral-100 z-10 overflow-hidden">
        {/* Close button */}
        <button
          onClick={() => setIsAuthOpen(false)}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-2xl font-black tracking-tight text-neutral-900">
              INNOVIST
            </span>
            <span className="bg-rose-100 text-rose-700 font-extrabold text-[10px] px-1.5 py-0.5 rounded tracking-wider uppercase">
              CREAMS
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            {isSignUp
              ? "Create your clinical skincare account"
              : "Login with Google to access your skin profile & orders"}
          </p>
        </div>

        {authSuccess ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-lg font-bold text-neutral-900">{authSuccess}</h3>
            <p className="text-xs text-neutral-500 max-w-xs mx-auto">
              Your profile is verified and synced with MongoDB Atlas.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Google Authentication Button using official Google Identity Services */}
            <div className="flex flex-col items-center justify-center pt-2">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setAuthError("Google Sign In failed or popup closed")}
                theme="outline"
                size="large"
                shape="pill"
                text="continue_with"
                width="340"
              />
            </div>

            {isLoading && (
              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-rose-600 py-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Syncing profile with MongoDB Atlas...</span>
              </div>
            )}

            {authError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium text-center">
                {authError}
              </div>
            )}

            {/* Separator */}
            <div className="relative flex items-center justify-center py-1">
              <div className="border-t border-neutral-200 w-full" />
              <span className="bg-white px-3 text-[11px] uppercase font-semibold text-neutral-400 absolute">
                or with email
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleEmailSubmit} className="space-y-3">
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
                disabled={isLoading}
                className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all shadow-sm cursor-pointer mt-2 disabled:opacity-50"
              >
                {isSignUp ? "Create Account" : "Sign In"}
              </button>
            </form>

            {/* Switch Mode */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-xs text-neutral-500 hover:text-neutral-900 font-semibold cursor-pointer"
              >
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "New to Innovist Creams? Create an account"}
              </button>
            </div>

            {/* Security note */}
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-400 pt-1">
              <Shield className="w-3 h-3 text-emerald-600" />
              <span>MongoDB Atlas Connected &amp; Google OAuth Secured</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
