import { BASE_ENDPOINT } from "@/utils/baseEndpoint";

export const createOrder = async (orderData) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await fetch(`${BASE_ENDPOINT}/api/orders/student`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    const res = await response.json();

    if (!response.ok) {
      console.error("Error:", res);
      throw new Error(res.message || "Failed to create Order");
    }

    return res;
  } catch (error) {
    console.error("API fetch error:", error.message);
    throw error;
  }
};
