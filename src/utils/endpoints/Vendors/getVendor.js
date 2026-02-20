import { BASE_ENDPOINT } from "@/utils/baseEndpoint";

export const getVendor = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await fetch(`${BASE_ENDPOINT}/api/vendors/vendorme`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const res = await response.json();

    if (!response.ok) {
      console.error("Error:", res);
      throw new Error(res.message || "Failed to get Vendor");
    }

    return res;
  } catch (error) {
    console.error("API fetch error:", error.message);
    throw error;
  }
};
