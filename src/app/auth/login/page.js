"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BaseFieldSet } from "@/components/baseField";
import { BaseInput } from "@/components/baseInput";
import Button from "@/components/button";
import { images } from "@/constants/image";
import Image from "next/image";
import { Login as LoginAPI } from "@/utils/endpoints/Auth/login";
import { useAuth } from "@/contexts/authContext";

function RedirectBanner() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");

  if (!redirectUrl) return null;

  return (
    <div className="mb-4 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded text-sm">
      Please login to continue
    </div>
  );
}

function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const credentials = { email, password };
      const response = await LoginAPI(credentials);
      if (response.status === 401) {
        localStorage.clear();
        window.location.href = "/auth/login";
        throw new Error("Session expired. Please login again.");
      }

      if (response.status === "success" && response.data) {
        login(response.data.user, response.token);
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-6 pt-12 pb-6 font-sans items-center">
      <div className="w-full max-w-sm">
        {/* Back Button */}
        <div className="mb-4 text-black self-start cursor-pointer">
          <Image
            src={images.icons.backArrow}
            alt="Back"
            width={15}
            height={15}
            onClick={() => router.push("/auth")}
          />
        </div>

        <div className="w-full h-px bg-gray-400 opacity-30 mb-2"></div>

        {/* Title */}
        <div className="mb-5">
          <h2 className="text-4xl font-bold text-black mb-1">Welcome Back!</h2>
          <p className="text-sm text-black opacity-70">Log into your account</p>
        </div>

        {/* Redirect Banner wrapped in Suspense */}
        <Suspense fallback={null}>
          <RedirectBanner />
        </Suspense>

        {/* Error Message */}
        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <BaseFieldSet className="mb-5">
            <label className="block text-sm font-medium mb-2 text-black">
              Email
            </label>
            <BaseInput
              placeholder="Your email"
              type="email"
              className="placeholder:text-xs opacity-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </BaseFieldSet>

          <BaseFieldSet className="mb-1">
            <label className="block text-sm font-bold mb-2 text-black">
              Password
            </label>
            <BaseInput
              placeholder="Your password"
              type="password"
              className="placeholder:text-xs opacity-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </BaseFieldSet>

          <div className="flex justify-end mb-8">
            <p
              className="text-xs text-black font-medium hover:underline cursor-pointer"
              onClick={() => router.push("/auth/forgot-password")}
            >
              Forgot Password?
            </p>
          </div>

          <div className="mb-8">
            <Button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>

        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-gray-400 opacity-50" />
          <span className="text-xs text-black opacity-60">Or continue as</span>
          <div className="flex-1 h-px bg-gray-400 opacity-50" />
        </div>

        <div className="mb-6">
          <Button onClick={() => router.push("/guest")}>Guest</Button>
        </div>

        <div className="text-center mt-2">
          <p className="text-xs text-black">
            Do not have an account?{" "}
            <button
              className="font-semibold underline cursor-pointer"
              onClick={() => router.push("/auth/register")}
            >
              Register Now
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
