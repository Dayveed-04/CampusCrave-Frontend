"use client";

import { images } from "@/constants/image";
import Image from "next/image";
import { useState } from "react";

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("cart");

  return (
    <div className="min-h-screen ">
      <div className="w-full  flex flex-row pr-2 mb-1 mt-1">
        <div className="text-black self-start cursor-pointer ">
         <Image
            src={images.icons.backArrow}
            alt="Logo"
            width={25}
            height={25}
          />
         </div>
         <h2 className="text-2xl font-semibold text-center w-full mr-6 text-base">Orders</h2>
      </div>
      <div className="w-full h-px bg-gray-400 opacity-30 mb-4"></div>
      <div className="flex justify-around gap-x-3">
        {["cart", "ongoing", "completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4  border rounded-xl transition-all ${
              activeTab === tab
                ? "bg-black text-[#FFFCE2] border-black"
                : "bg-[#FFFCE2] text-black border-[#FFFCE2] "
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
