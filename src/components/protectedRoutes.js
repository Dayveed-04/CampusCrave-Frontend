"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check for token in sessionStorage
    const token = sessionStorage.getItem("token");
    const userStr = sessionStorage.getItem("user");

    // No token = redirect to login
    if (!token) {
      router.push(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    // If roles specified, check user role
    if (allowedRoles.length > 0 && userStr) {
      try {
        const user = JSON.parse(userStr);

        // Check if user has allowed role
        if (!allowedRoles.includes(user.role)) {
          // Redirect to their dashboard
          if (user.role === "STUDENT") {
            router.push("/student/dashboard");
          } else if (user.role === "VENDOR") {
            router.push("/vendor/dashboard");
          } else if (user.role === "ADMIN") {
            router.push("/admin/dashboard");
          }
          return;
        }
      } catch (error) {
        // Invalid user data, redirect to login
        router.push(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
        return;
      }
    }
  }, [router, pathname, allowedRoles]);

  // Check token exists before rendering
  const token =
    typeof window !== "undefined" ? sessionStorage.getItem("token") : null;

  if (!token) {
    return null; // Don't show content while redirecting
  }

  return <>{children}</>;
}
