"use client";

import Button from "@/components/button";
import { Row } from "@/components/flex";
import { images } from "@/constants/image";
import Image from "next/image";
import { useState } from "react";

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("cart");

  return (
    <div className="min-h-screen ">
      <div className="w-full  flex flex-row  mb-1 mt-1">
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
      <Row gap="gap-7" className=" px-5 flex  justify-between">
        {["My cart", "Ongoing", "Completed"].map((tab) => (
                 <Button
                        key={tab}
                        backgroundColor={activeTab === tab ? 'bg-black' : 'bg-white'}
                        color={activeTab === tab ? 'text-white' : 'text-black'}
                        width="auto"
                        className="whitespace-nowrap px-5 !py-1 text-md !rounded-3xl"
                        onClick={() => setActiveTab(tab)}
                      >
                        {tab}
                      </Button>
        ))}
      </Row>

      {/* Tab Content */}
      <div>
        {activeTab === "My cart" && (
          <div>
            {/* TODO: Cart content */}
            <p>Your cart items will appear here.</p>
          </div>
        )}

        {activeTab === "Ongoing" && (
          <div>
            {/* TODO: Ongoing orders content */}
            <p>Your ongoing orders will appear here.</p>
          </div>
        )}

        {activeTab === "Completed" && (
          <div>
            {/* TODO: Completed orders content */}
            <p>Your completed orders will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
