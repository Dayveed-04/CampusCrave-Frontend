"use client";

import { useState } from "react";

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("cart");

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

      
      <div className="flex space-x-4 border-b border-gray-300 mb-6">
        {["cart", "ongoing", "completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 font-semibold ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "cart" && (
          <div>
            {/* TODO: Cart content */}
            <p>Your cart items will appear here.</p>
          </div>
        )}

        {activeTab === "ongoing" && (
          <div>
            {/* TODO: Ongoing orders content */}
            <p>Your ongoing orders will appear here.</p>
          </div>
        )}

        {activeTab === "completed" && (
          <div>
            {/* TODO: Completed orders content */}
            <p>Your completed orders will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
