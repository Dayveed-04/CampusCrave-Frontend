// utils/endpoints/Vendor/vendorMenus.js

import { BASE_ENDPOINT } from "@/utils/baseEndpoint";

export const vendorMenus = async () => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      throw new Error("No authentication token found");
    }

    // Get vendorId from user object
    const userStr = sessionStorage.getItem("user");
    if (!userStr) {
      throw new Error("No user data found");
    }

    const user = JSON.parse(userStr);
    const vendorId = user.id;

    if (!vendorId) {
      throw new Error("Vendor ID not found in user data");
    }

    const response = await fetch(
      `${BASE_ENDPOINT}/api/vendors/vendors/${vendorId}/menus`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const res = await response.json();

    if (!response.ok) {
      console.error("Error:", res);
      throw new Error(res.message || "Failed to fetch menus");
    }

    return res;
  } catch (error) {
    console.error("API fetch error:", error.message);
    throw error;
  }
};
