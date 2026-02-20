import { BASE_ENDPOINT } from "@/utils/baseEndpoint";

export const getAllVendors = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await fetch(`${BASE_ENDPOINT}/api/admin/vendors`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const res = await response.json();

    if (!response.ok) {
      console.error("Error:", res);
      throw new Error(res.message || "Failed to fetch all orders");
    }

    return res;
  } catch (error) {
    console.error("API fetch error:", error.message);
    throw error;
  }
};
