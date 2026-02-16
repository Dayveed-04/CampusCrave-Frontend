"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getAllowedRoles, isProtectedRoute } from "@/routeConfig";

export default function RouteGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if current route needs protection
    if (!isProtectedRoute(pathname)) {
      // Public route - allow access
      return;
    }

    // This is a protected route - check authentication
    const token = sessionStorage.getItem("token");
    const userStr = sessionStorage.getItem("user");

    // No token = not authenticated
    if (!token) {
      console.log("No token found, redirecting to login");
      router.push(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    // Get allowed roles for this route
    const allowedRoles = getAllowedRoles(pathname);

    // Check user role
    if (userStr && allowedRoles.length > 0) {
      try {
        const user = JSON.parse(userStr);

        // User doesn't have required role
        if (!allowedRoles.includes(user.role)) {
          console.log(
            `Access denied. User role: ${user.role}, Required: ${allowedRoles.join(", ")}`,
          );

          // Redirect to their appropriate dashboard
          if (user.role === "STUDENT") {
            router.push("/student/dashboard");
          } else if (user.role === "VENDOR") {
            router.push("/vendor/dashboard");
          } else if (user.role === "ADMIN") {
            router.push("/admin/dashboard");
          }
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        router.push(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
      }
    }
  }, [pathname, router]);

  return <>{children}</>;
}
