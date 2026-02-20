import { BASE_ENDPOINT } from "@/utils/baseEndpoint";

export const approveVendors = async (vendorId, isApproved) => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      throw new Error("No authentication token found");
    }

    if (!vendorId) {
      throw new Error("vendor ID is required");
    }

    const response = await fetch(
      `${BASE_ENDPOINT}/api/admin/vendors/${vendorId}/approve`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isApproved }),
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
