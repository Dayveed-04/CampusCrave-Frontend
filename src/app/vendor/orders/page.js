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
                <h2 className="text-2xl font-semibold text-center w-full  text-base font-sans">Order Management</h2>
            </div>
            <div className="w-full h-px bg-gray-400 opacity-30 mb-4"></div>
            <Row gap="gap-2" className="  px-3 font-sans" justifyContent="between">
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
                {activeTab === "Pending Orders" && (
                    <div className="px-3 py-4 mb-6 font-sans">
                        <Column gap="gap-3">
                            <Row justifyContent="between">
                                <h2 className="text-sm font-bold">Outgoing Orders</h2>
                                <div className="bg-[#000000] text-[#EDE7B5] text-xs rounded-2xl px-2 mb-1">2</div>
                            </Row>

                            <Column gap="gap-4">
                                <div className="bg-[#FFFCE2] rounded-2xl p-4 mr-1">
                                    <Row justifyContent="between">
                                        <h3 className="font-bold text-sm">#ORD-OO1</h3>
                                        <div>
                                            <p className="text-xs mb-3">10:00pm</p>
                                        </div>
                                    </Row>

                                    <Row>
                                        <p className="text-xs opacity-70 mb-3">Customer: Uwaje David</p>
                                    </Row>

                                    <Row>
                                        <p className="text-sm font-semibold mb-6">1x Jollof rice, 1x Tofu and 1x Coke</p>
                                    </Row>

                                    <Row justifyContent="between">
                                        <h3 className="font-bold text-sm">$8.00</h3>
                                        <Row gap="gap-2">
                                            <Button className="!w-15 !h-5 !rounded-2xl !flex !items-center !justify-center !text-xs !bg-[#EDE7B5] !text-[#000000]">Decline</Button>
                                            <Button className="!w-15 !h-5 !rounded-2xl !flex !items-center !justify-center !text-xs !bg-[#000000] !text-[#EDE7B5]">Accept</Button>
                                        </Row>
                                    </Row>
                                </div>

                                <div className="bg-[#FFFCE2] rounded-2xl p-4 mr-1">
                                    <Row justifyContent="between">
                                        <h3 className="font-bold text-sm">#ORD-OO2</h3>
                                        <div>
                                            <p className="text-xs mb-3">10:00pm</p>
                                        </div>
                                    </Row>

                                    <Row>
                                        <p className="text-xs opacity-70 mb-3">Customer: Olusanya Albert</p>
                                    </Row>

                                    <Row>
                                        <p className="text-sm font-semibold mb-6">2x Rice and Beans, 1x Tofu and Turkey, 1x Plantain and 1x Sprite  </p>
                                    </Row>

                                    <Row justifyContent="between">
                                        <h3 className="font-bold text-sm">$8.00</h3>
                                        <Row gap="gap-2">
                                            <Button className="!w-15 !h-5 !rounded-2xl !flex !items-center !justify-center !text-xs !bg-[#EDE7B5] !text-[#000000]">Decline</Button>
                                            <Button className="!w-15 !h-5 !rounded-2xl !flex !items-center !justify-center !text-xs !bg-[#000000] !text-[#EDE7B5]">Accept</Button>
                                        </Row>
                                    </Row>
                                </div>
                            </Column>
                        </Column>  
                    </div> 
                )}

                {activeTab === "Live Orders" && (
                    <div className="px-3 py-4 mb-6 font-sans">
                        <Column gap="gap-3">
                            <Row justifyContent="between">
                                <h2 className="text-sm font-bold">Outgoing Orders</h2>
                                <div className="bg-[#000000] text-[#EDE7B5] text-xs rounded-2xl px-2 mb-1">2</div>
                            </Row>

                            <Column gap="gap-4">
                                <div className="bg-[#FFFCE2] rounded-2xl p-4 mr-1">
                                    <Row justifyContent="between">
                                        <h3 className="font-bold text-sm">#ORD-OO1</h3>
                                        <div>
                                            <p className="text-xs mb-3">10:00pm</p>
                                        </div>
                                    </Row>

                                    <Row>
                                        <p className="text-xs opacity-70 mb-3">Customer: Uwaje David</p>
                                    </Row>

                                    <Row>
                                        <p className="text-sm font-semibold mb-6">1x Jollof rice, 1x Tofu and 1x Coke</p>
                                    </Row>

                                    <Row justifyContent="between">
                                        <h3 className="font-bold text-sm">$8.00</h3>
                                        <div className="bg-[#000000] text-[#EDE7B5] text-xs rounded-2xl px-2">Preparing</div>
                                    </Row>
                                </div>

                                <div className="bg-[#FFFCE2] rounded-2xl p-4 mr-1">
                                    <Row justifyContent="between">
                                        <h3 className="font-bold text-sm">#ORD-OO2</h3>
                                        <div>
                                            <p className="text-xs mb-3">10:00pm</p>
                                        </div>
                                    </Row>

                                    <Row>
                                        <p className="text-xs opacity-70 mb-3">Customer: Olusanya Albert</p>
                                    </Row>

                                    <Row>
                                        <p className="text-sm font-semibold mb-6">2x Rice and Beans, 1x Tofu and Turkey, 1x Plantain and 1x Sprite  </p>
                                    </Row>

                                    <Row justifyContent="between">
                                        <h3 className="font-bold text-sm">$8.00</h3>
                                        <div className="bg-[#000000] text-[#EDE7B5] text-xs rounded-2xl px-2">Preparing</div>
                                    </Row>
                                </div>
                            </Column>
                        </Column>  
                    </div> 
                )}
            </div>
        </div>
    );

}