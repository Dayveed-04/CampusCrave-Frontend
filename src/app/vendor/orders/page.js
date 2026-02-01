"use client";

import { BaseInput } from "@/components/baseInput";
import Button from "@/components/button";
import { Column, Row } from "@/components/flex";
import { images } from "@/constants/image";
import Image from "next/image";
import { useState } from "react";

export default function VendorOrdersPage()
{
    const [activeTab, setActiveTab] = useState("Pending Orders");


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
                <h2 className="text-2xl font-semibold text-center w-full  text-base">Order Management</h2>
            </div>
            <div className="w-full h-px bg-gray-400 opacity-30 mb-4"></div>
            <Row gap="gap-2" className="  px-3" justifyContent="between">
                {["Pending Orders", "Live Orders"].map((tab) => (
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
                {activeTab === "Live Orders" && (
                <div className="px-3 py-4 mb-6 font-sans">
                    <h2 className="text-sm font-bold mb-4">Outgoing Orders</h2>
    
                    <div className="bg-[#FFFCE2] rounded-3xl p-4 mb-4 mr-2">

                    </div>
                    
                </div> 
                )}
            </div>
        </div>
    );

}