"use client";

import { BaseInput } from "@/components/baseInput";
import Button from "@/components/button";
import { Column, Row } from "@/components/flex";
import { images } from "@/constants/image";
import Image from "next/image";
import { useState } from "react";

export default function AdminOrdersPage()
{
    const [activeTab, setActiveTab] = useState("Pending");

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
                <h2 className="text-2xl font-semibold text-center w-full  text-base font-sans">Vendor Vetting</h2>
            </div>
            <div className="w-full h-px bg-gray-400 opacity-30 mb-4"></div>
            <Row gap="gap-2" className="  px-3 font-sans" justifyContent="between">
                {["Pending", "Approved"].map((tab) => (
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
                {activeTab === "Pending" && (
                    <div className="px-3 py-4 mb-6 font-sans">
                        <Column gap="gap-3">
                            <Row justifyContent="between">
                                <h2 className="text-sm font-bold">Pending Verifications</h2>
                                <div className="bg-[#000000] text-[#EDE7B5] text-xs rounded-2xl px-2 mb-1">2</div>
                            </Row>

                            <Column gap="gap-4" className="px-2">
                                <div className="bg-[#FFFCE2] rounded-2xl p-3 mr-1">
                                    <Row justifyContent="between">
                                        <h3 className="font-bold text-sm mb-3">Babcock Guest House</h3>
                                    </Row>

                                    <Row>
                                        <p className="text-xs opacity-70 mb-3">Submitted: Feb 6, 2026</p>
                                    </Row>
                                    <div className="w-full h-px bg-gray-400 opacity-30 mb-4"></div>

                                    <Row>
                                        <p className="text-xs opacity-70 mb-3">Email: bgh@gmail.com</p>
                                    </Row>

                                    <Row>
                                        <p className="text-xs opacity-70 mb-3">Phone Number: +2348034567890</p>
                                    </Row>

                                    <Row gap="gap-2" justifyContent="between">
                                        <Button className="!w-15 !h-5 !rounded-2xl !flex !items-center !justify-center !text-xs !bg-[#EDE7B5] !text-[#000000]">Approve</Button>
                                        <Button className="!w-15 !h-5 !rounded-2xl !flex !items-center !justify-center !text-xs !bg-[#000000] !text-[#EDE7B5] flex self-end">Decline</Button>
                                    </Row>
                                </div>

                                <div className="bg-[#FFFCE2] rounded-2xl p-3 mr-1">
                                    <Row justifyContent="between">
                                        <h3 className="font-bold text-sm mb-3">Big Meals</h3>
                                    </Row>

                                    <Row>
                                        <p className="text-xs opacity-70 mb-3">Submitted: Feb 6, 2026</p>
                                    </Row>
                                    <div className="w-full h-px bg-gray-400 opacity-30 mb-4"></div>

                                    <Row>
                                        <p className="text-xs opacity-70 mb-3">Email: bigmeals@gmail.com</p>
                                    </Row>

                                    <Row>
                                        <p className="text-xs opacity-70 mb-3">Phone Number: +2347056884434</p>
                                    </Row>

                                    <Row gap="gap-2" justifyContent="between">
                                        <Button className="!w-15 !h-5 !rounded-2xl !flex !items-center !justify-center !text-xs !bg-[#EDE7B5] !text-[#000000]">Approve</Button>
                                        <Button className="!w-15 !h-5 !rounded-2xl !flex !items-center !justify-center !text-xs !bg-[#000000] !text-[#EDE7B5] flex self-end">Decline</Button>
                                    </Row>
                                </div>
                            </Column>
                        </Column>  
                    </div> 
                )}

                {activeTab === "Approved" && (
                    <div className="px-3 py-4 mb-6 font-sans">
                        <Column gap="gap-3">
                            <Row justifyContent="between">
                                <h2 className="text-sm font-bold">Verified</h2>
                            </Row>

                            <Column gap="gap-4" className="px-2">
                                <div className="bg-[#FFFCE2] rounded-2xl p-3 mr-1">
                                    <Row justifyContent="between">
                                        <h3 className="font-bold text-sm mb-3">Babcock Guest House</h3>
                                    </Row>

                                    <Row>
                                        <p className="text-xs opacity-70 mb-3">Submitted: Feb 6, 2026</p>
                                    </Row>
                                    <div className="w-full h-px bg-gray-400 opacity-30 mb-4"></div>

                                    <Row>
                                        <p className="text-xs opacity-70 mb-3">Email: bgh@gmail.com</p>
                                    </Row>

                                    <Row>
                                        <p className="text-xs opacity-70 mb-3">Phone Number: +2348034567890</p>
                                    </Row>
                                </div>

                                <div className="bg-[#FFFCE2] rounded-2xl p-3 mr-1">
                                    <Row justifyContent="between">
                                        <h3 className="font-bold text-sm mb-3">Big Meals</h3>
                                    </Row>

                                    <Row>
                                        <p className="text-xs opacity-70 mb-3">Submitted: Feb 6, 2026</p>
                                    </Row>
                                    <div className="w-full h-px bg-gray-400 opacity-30 mb-4"></div>

                                    <Row>
                                        <p className="text-xs opacity-70 mb-3">Email: bigmeals@gmail.com</p>
                                    </Row>

                                    <Row>
                                        <p className="text-xs opacity-70 mb-3">Phone Number: +2347056884434</p>
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