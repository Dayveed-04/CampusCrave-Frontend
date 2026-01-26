"use client";

import { BaseInput } from "@/components/baseInput";
import Button from "@/components/button";
import { Row } from "@/components/flex";
import { images } from "@/constants/image";
import Image from "next/image";
import { useState } from "react";

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("My cart");

  return (
    <div className="min-h-screen f ">
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

  
      <div>
        {activeTab === "My cart" && (
          <div className="px-4 py-4 mb-6">
           <h2 className="text-sm font-bold  mb-4 font-sans">Order Summary</h2>

           <div className="bg-[#FFFCE2] rounded-3xl p-4 mb-4">
             <div className="flex gap-3">
               <Image
                   src={images.jollofRice}
                  alt="Jollof Rice"
                  width={18}
                  height={17}
                  className="w-18 h-17 rounded-xl object-cover"
                /> 

               <div className="flex-1 flex flex-col justify-between">
                 <div>
                   <h3 className="font-bold text-sm">Jollof rice</h3>
                   <p className="text-xs text-gray-600">Babcock Guest House</p>
                 </div>

                 <div className="flex items-center gap-3">
                   <Button className="w-3 h-3 rounded-full border border-gray-400 flex items-center justify-center text-sm font-medium">−</Button>
                   <span className="text-xs">1</span>
                   <Button className="w-3 h-3 rounded-full border border-gray-400 flex items-center justify-center text-sm font-medium">+</Button>
                 </div>
                </div>

                <div className="flex flex-col items-end justify-between">
                 <span className="font-bold text-sm">$8.00</span>
                 <Image
                   src={images.icons.TrashIcon}
                   alt="Logo"
                   width={20}
                   height={20}
                 />
                </div>
              </div>
            </div>

            <div className="mb-5">
              <Button className="w-full py-2 bg-[#FFFCE2] text-black rounded-full font-medium text-sm">
                Add More Items
              </Button>
            </div>

            <div className="mb-5">
              <h2 className="text-sm font-bold mb-3">Discount Coupon</h2>
              <div className="flex gap-2">
                <BaseInput
                  type="text"
                  placeholder="Promo Code"
                  className="flex-1 px-4 py-2 bg-[#FFFCE2] rounded-full text-sm placeholder-gray-400 focus:outline-none"
                />
                <Button className="px-5 py-2 bg-black text-[#EDE7B5] rounded-full font-medium text-sm">
                  Apply
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs">Sub total</span>
                <span className="text-xs font-medium">$8.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs">Delivery fees</span>
                <span className="text-xs font-medium">$1.00</span>
              </div>
              <div className="border-t border-yellow-300 pt-2 flex justify-between items-center">
                <span className="font-bold text-sm">Total</span>
                <span className="font-bold text-sm">$9.00</span>
              </div>
            </div>

            <div className="px-4 py-3 flex-shrink-0">
              <Button className="w-full py-3 bg-black text-white rounded-full font-bold text-">
                Checkout
              </Button>
            </div>
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
