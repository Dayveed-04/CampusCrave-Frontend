"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BaseFieldSet } from "@/components/baseField";
import { BaseInput } from "@/components/baseInput";
import Button from "@/components/button";
import { images } from "@/constants/image";
import Image from "next/image";
import { useAuth } from "@/contexts/authContext";
import { StudentRegister } from "@/utils/endpoints/Auth/studentRegister";

export default function StudentRegisterPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate form
  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Full name is required");
      return false;
    }
    if (!formData.phone.trim()) {
      setError("Phone number is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // Validate
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Prepare data for API
      const authDetails = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      };

      const response = await StudentRegister(authDetails);

      if (response.status === "success" && response.data) {
        router.push("/auth/login");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || "Registration failed. Please try again.");
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

        {/* Divider line */}
        <div className="w-full h-px bg-gray-400 opacity-30 mb-6"></div>

        {/* Header */}
        <div className="mb-5">
          <h2 className="text-4xl font-bold text-black mb-1">
            Student Register
          </h2>
          <p className="text-sm text-black opacity-70">
            Create your student account
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
            {error}
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleRegister}>
          {/* Full Name */}
          <BaseFieldSet className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-black">
              Full name
            </label>
            <BaseInput
              name="name"
              placeholder="Full name"
              value={formData.name}
              onChange={handleChange}
              required
              icon={
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              }
            />
          </BaseFieldSet>

          {/* Phone Number */}
          <BaseFieldSet className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-black">
              Phone number
            </label>
            <BaseInput
              type="tel"
              name="phone"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleChange}
              required
              icon={
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              }
            />
          </BaseFieldSet>

          {/* Email */}
          <BaseFieldSet className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-black">
              Email
            </label>
            <BaseInput
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              icon={
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              }
            />
          </BaseFieldSet>

          {/* Password */}
          <BaseFieldSet className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-black">
              Password
            </label>
            <BaseInput
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              icon={
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              }
            />
          </BaseFieldSet>

          {/* Confirm Password */}
          <BaseFieldSet className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-black">
              Confirm Password
            </label>
            <BaseInput
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              icon={
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              }
            />
          </BaseFieldSet>

          {/* Register Button */}
          <div className="mb-5">
            <Button type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>
          </div>
        </form>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-xs text-black">
            Already have an account?{" "}
            <span
              className="font-bold underline cursor-pointer"
              onClick={() => router.push("/auth/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
