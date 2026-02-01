"use client";

import { BaseInput } from "@/components/baseInput";
import Button from "@/components/button";
import { Column, Row } from "@/components/flex";
import { images } from "@/constants/image";
import Image from "next/image";
import { useState } from "react";

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("My cart");

  const steps = [
    { time: "10:25pm", label: "Order Placed", done: true },
    { time: "10:30pm", label: "Order Confirmed", done: true },
    { time: "10:40pm", label: "Order Pending", done: true },
    { time: "11:00pm", label: "Delivering", done: true },
    { time: "11:30pm", label: "Delivered", done: false },
  ];

  return (
    <div className="min-h-screen ">
      <div className="w-full  flex flex-row mb-1 mt-1">
        <div className="text-black self-start cursor-pointer ">
         <Image
            src={images.icons.backArrow}
            alt="Logo"
            width={25}
            height={25}
          />
         </div>
         <h2 className="text-2xl font-semibold text-center w-full  text-base">Orders</h2>
      </div>
      <div className="w-full h-px bg-gray-400 opacity-30 mb-4"></div>
      <Row gap="gap-2" className="  px-3   " justifyContent="between">
        {["My cart", "Ongoing", "Completed"].map((tab) => (
                 <Button
                        key={tab}
                        backgroundColor={activeTab === tab ? 'bg-black' : 'bg-[#FFFCE2]'}
                        color={activeTab === tab ? 'text-[#EDE7B5]' : 'text-black'}
                        width="auto"
                        className="whitespace-nowrap !px-4 !py-1 text-md !rounded-3xl"
                        onClick={() => setActiveTab(tab)}
                      >
                        {tab}
                  </Button>
        ))}
      </Row>

  
      <div>
        {activeTab === "My cart" && (
          <div className="px-3 py-4 mb-6">
           <h2 className="text-sm font-bold  mb-4 font-sans">Order Summary</h2>

           <div className="bg-[#FFFCE2] rounded-3xl p-4 mb-4 mr-2">
             <div className="flex gap-3">
               <Image
                  src={images.jollofRice}
                  alt="Jollof Rice"
                  width={18}
                  height={17}
                  className="w-18 h-17 rounded-xl object-cover"
                /> 

               <div className="flex-1 flex flex-col justify-between min-w-0">
                 <div>
                   <h3 className="font-bold text-sm">Jollof rice</h3>
                   <p className="text-xs text-gray-600">Babcock Guest House</p>
                 </div>

                 <div className="flex items-center gap-3">
                   <button className="!w-5 !h-5 !rounded-full !border !border-gray-400 !flex !items-center !justify-center !text-xs bg-transparent !text-gray-400">−</button>
                   <span className="text-xs">1</span>
                   <button className="!w-5 !h-5 !rounded-full !border !border-gray-400 !flex !items-center !justify-center !text-xs bg-transparent !text-gray-400">+</button>
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

            <div className="mb-5 mr-2">
              <Button className="w-5 py-2 !bg-[#FFFCE2] !text-black !rounded-4xl font-medium text-sm ">
                Add More Items
              </Button>
            </div>

            <div className="w-full h-px bg-gray-400 opacity-30 mb-3"></div>
            <div className="mb-5">
              <h2 className="text-sm font-bold mb-3">Discount Coupon</h2>
              <Row className="space-x-3 mr-2">
                <BaseInput
                  type="text"
                  placeholder="Promo Code"
                  className="!bg-[#FFFCE2] !rounded-4xl text-sm placeholder-gray-400 focus:outline-none"
                />
                <Button className="!bg-black !text-[#EDE7B5] !rounded-4xl  text-xs flex-shrink-3">
                  Apply
                </Button>
              </Row>
            </div>
            <div className="w-full h-px bg-gray-400 opacity-30 mb-4"></div>

            <div className="space-y-2 mr-3">
              <div className="flex justify-between items-center">
                <span className="text-xs">Sub total</span>
                <span className="text-xs font-medium">$8.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs">Delivery fees</span>
                <span className="text-xs font-medium">$1.00</span>
              </div>
               <div className="w-full h-px bg-gray-400 opacity-30 mt-3 space-y-5"></div>
                <div className=" pt-2 flex justify-between items-center">
                  <span className="font-bold text-sm">Total</span>
                  <span className="font-bold text-sm">$9.00</span>
                </div>
            </div>

            <div className="px-4 py-3 flex-shrink-0">
              <Button className="w-full py-3 bg-black !text-[#EDE7B5] !rounded-4xl font-bold text-">
                Checkout
              </Button>
            </div>
          </div> 
        )}



        {activeTab === "Ongoing" && (
          <div>
            <div className="px-4 py-3">
              <h2 className="text-sm font-bold mb-2 font-sans">Order details</h2>
            </div>
            <Column>
              <Row className="flex space-x-3 items-center px-3 py-2">
                <span className="text-xs">10:25pm</span>
                <Image
                   src={images.icons.TrackingDarkIcon}
                   alt="Logo"
                   width={13}
                   height={1}
                 />
                <span className="text-xs font-semibold font-medium">Order Placed</span>
              </Row>
              <Row className="flex space-x-3 items-center px-3">
                <span className="text-xs">10:30pm</span>
                <Image
                   src={images.icons.TrackingIcon}
                   alt="Logo"
                   width={13}
                   height={1}
                 />
                <span className="text-xs font-semibold font-medium">Order Confirmed</span>
              </Row>
              <Row className="flex space-x-3 items-center px-3">
                <span className="text-xs">10:40pm</span>
                <Image
                   src={images.icons.TrackingIcon}
                   alt="Logo"
                   width={13}
                   height={1}
                 />
                <span className="text-xs font-semibold font-medium">Order Pending</span>
              </Row>
              <Row className="flex space-x-3 items-center px-3">
                <span className="text-xs">11:00pm</span>
                <Image
                   src={images.icons.TrackingIcon}
                   alt="Logo"
                   width={13}
                   height={1}
                 />
                <span className="text-xs font-semibold font-medium">Delivering</span>
              </Row>
              <Row className="flex space-x-3 items-center px-3">
                <span className="text-xs">11:30pm</span>
                <Image
                   src={images.icons.TickCircleIcon}
                   alt="Logo"
                   width={13}
                   height={1}
                 />
                <span className="text-xs font-semibold font-medium">Delivered</span>
              </Row>
            </Column>
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


