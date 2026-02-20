

import { BASE_ENDPOINT } from "@/utils/baseEndpoint";

export const deleteMenu = async (menuId) => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      throw new Error("No authentication token found");
    }

    if (!menuId) {
      throw new Error("Menu ID is required");
    }

    const response = await fetch(
      `${BASE_ENDPOINT}/api/vendors/menusforvendor/${menuId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const res = await response.json();

    if (!response.ok) {
      console.error("Error:", res);
      throw new Error(res.message || "Failed to delete menu");
    }

    return res;
  } catch (error) {
    console.error("API fetch error:", error.message);
    throw error;
  }
};
