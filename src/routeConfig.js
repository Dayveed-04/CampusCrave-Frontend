// lib/routeConfig.js

// Define ALL your protected routes here
export const protectedRoutes = {
  // Student routes
  "/student/dashboard": ["STUDENT"],
  "/student/menus": ["STUDENT"],
  "/student/profile": ["STUDENT"],
  "/student/orders": ["STUDENT"],
  "/student/menus/[id]": ["STUDENT"],

  // Vendor routes
  "/vendor/dashboard": ["VENDOR"],
  "/vendor/menu": ["VENDOR"],
  "/vendor/orders": ["VENDOR"],
  "/vendor/profile": ["VENDOR"],
  "/vendor/menu/new": ["VENDOR"],

  // Admin routes
  "/admin/dashboard": ["ADMIN"],
  "/admin/users": ["ADMIN"],
  "/admin/settings": ["ADMIN"],
  "/admin/reports": ["ADMIN"],
};

// Helper: Check if route is protected
export const isProtectedRoute = (pathname) => {
  return Object.keys(protectedRoutes).some((route) =>
    pathname.startsWith(route),
  );
};

// Helper: Get allowed roles for a route
export const getAllowedRoles = (pathname) => {
  for (const [route, roles] of Object.entries(protectedRoutes)) {
    if (pathname.startsWith(route)) {
      return roles;
    }
  }
  return [];
};
