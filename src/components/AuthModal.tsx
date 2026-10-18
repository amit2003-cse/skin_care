"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { GoogleLogin } from "@react-oauth/google";
import { X, Shield, CheckCircle, Loader2 } from "lucide-react";

export default function AuthModal() {
  const { isAuthOpen, setIsAuthOpen, loginUser } = useCart();
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => !isLoading && setIsAuthOpen(false)}
        className="absolute inset-0 bg-neutral-950/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl max-w-sm w-full p-6 sm:p-8 shadow-2xl border border-neutral-100 z-10 overflow-hidden text-center">
        {/* Close button */}
        <button
          onClick={() => setIsAuthOpen(false)}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand header */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-2xl font-black tracking-[0.18em] text-neutral-950">
              THE CREAM CO.
            </span>
          </div>
          <span className="block text-[9px] uppercase tracking-[0.25em] text-neutral-400 font-bold mt-0.5">
            Clinical Face Formulations
          </span>
          <p className="text-xs text-neutral-500 mt-3 leading-relaxed">
            Sign in with your Google account to access your personalized face cream
            routine &amp; track orders.
          </p>
        </div>

        {authSuccess ? (
          <div className="py-6 text-center space-y-2">
            <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-base font-bold text-neutral-900">{authSuccess}</h3>
            <p className="text-xs text-neutral-500">
              Logged in successfully &amp; synced with MongoDB Atlas.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Google Authentication Button */}
            <div className="flex justify-center pt-2">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setAuthError("Google Sign In failed or popup was closed")}
                theme="outline"
                size="large"
                shape="pill"
                text="continue_with"
                width="300"
              />
            </div>

            {isLoading && (
              <div className="flex items-center justify-center gap-2 text-xs font-medium text-neutral-600 py-2">
                <Loader2 className="w-4 h-4 animate-spin text-neutral-900" />
                <span>Syncing profile with database...</span>
              </div>
            )}

            {authError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
                {authError}
              </div>
            )}

            {/* Security note */}
            <div className="pt-4 border-t border-neutral-100 flex items-center justify-center gap-1.5 text-[11px] text-neutral-400">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>Official Google OAuth 2.0 • Secured</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
