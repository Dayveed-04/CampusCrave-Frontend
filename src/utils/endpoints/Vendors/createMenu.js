

import { BASE_ENDPOINT } from "@/utils/baseEndpoint";

export const createMenu = async (menuData) => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(
      `${BASE_ENDPOINT}/api/vendors/menusforvendor`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(menuData),
      },
    );

    const res = await response.json();

    if (!response.ok) {
      console.error("Error:", res);
      throw new Error(res.message || "Failed to create menu");
    }

    return res;
  } catch (error) {
    console.error("API fetch error:", error.message);
    throw error;
  }
};
