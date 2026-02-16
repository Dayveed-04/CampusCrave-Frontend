// Manage Menu
"use client";
import { BaseInput } from "@/components/baseInput";
import Button from "@/components/button";
import { Column, Row } from "@/components/flex";
import ToggleButton from "@/components/toggleButton";
import { images } from "@/constants/image";
import Image from "next/image";
import { useState } from "react";


export default function VendorManageMenu()
{
    const [activeTab, setActiveTab] = useState("Rice");
    return(
        <div className="min-h-screen font-sans">
            <div className="w-full  flex flex-row mb-1 mt-1">
                <div className="text-black self-start cursor-pointer ">
                    <Image
                        src={images.icons.backArrow}
                        alt="Logo"
                        width={25}
                        height={25}
                    />
                </div>
                <h2 className="text-2xl font-semibold text-center w-full  text-base font-sans">Menu Management</h2>
                <div className=" text-black cursor-pointer pr-3">
                    <Image
                        src={images.icons.AddCircleIcon}
                        alt="Location"
                        width={25}
                        height={25}
                    />
                </div>
            </div>
            <div className="w-full h-px bg-gray-400 opacity-30 mb-4"></div>
            <Row gap="gap-2" className="font-sans" justifyContent="between">
                {["Rice", "Meshai", "Swallow", "Noodles"].map((tab) => (
                    <Button
                            key={tab}
                            backgroundColor={activeTab === tab ? 'bg-black' : 'bg-[#FFFCE2]'}
                            color={activeTab === tab ? 'text-[#EDE7B5]' : 'text-black'}
                            width="auto"
                            className="whitespace-nowrap !py-1 text-md !rounded-3xl"
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                    </Button>
                ))}
            </Row>

            <div>
                {activeTab === "Rice" && (
                    <div className="px-3 py-4 mb-6 font-sans">
                        <Column gap="gap-2">
                            <div className="mb-1">
                                <div className="flex gap-3">
                                    <Image
                                        src={images.jollofRice}
                                        alt="Jollof Rice"
                                        width={18}
                                        height={16}
                                        className="w-25 h-26 rounded-3xl object-cover"
                                    /> 
                                    <div className="flex-1 flex flex-col justify-between min-w-0">
                                        <div>
                                            <h3 className="font-semibold text-sm">Jollof Rice</h3>
                                            <p className="text-xs text-gray-600">Home-style, smoky, and full of flavor, cooked in a rich tomato-pepper mix that hits the spot every time. </p>

                                            <Row justifyContent="between" className="pt-3">
                                                <h3 className=" font-semibold text-sm"></h3>
                                                <div className="self-end ">  
                                                    <Button className="!w-15 !h-3 !rounded-2xl !flex !items-center !justify-center !text-xs !bg-[#000000] !text-[#EDE7B5]">Delete</Button>
                                                </div>
                                            </Row>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full h-px bg-gray-400 opacity-30 mb-4"></div>
                        </Column>  
                    </div> 
                 )}
            </div>
        </div>
    );
}



        
