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
    const [activeTab, setActiveTab] = useState("All");
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
            </div>
            <div className="w-full h-px bg-gray-400 opacity-30 mb-4"></div>
            <Row gap="gap-2" className="font-sans" justifyContent="between">
                {["All", "Main Course", "Protein", "Drinks"].map((tab) => (
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
                {activeTab === "All" && (
                    <div className="px-3 py-4 mb-6 font-sans">
                        <Column gap="gap-2">
                            <Row>
                                <h2 className="text-sm font-bold">Main Course</h2>
                            </Row>

                            <Column gap="gap-2">
                                <Row gap="gap-3">
                                    <div className="bg-[#FFFCE2] rounded-2xl p-4">
                                        <Image
                                            src={images.icons.GalleryIcon}
                                            alt="Logo"
                                            width={30}
                                            height={25}
                                        />
                                    </div>
                                    <Column className="space-y-3">
                                        <Row justifyContent="end">
                                            <h2 className="text-sm font-bold">Jollof Rice</h2>
                                            <div className="ml-2">
                                                <ToggleButton/>
                                            </div>
                                        </Row>
                                        <p className="text-xs opacity-70 font-semibold">$4.00</p>
                                    </Column>
                                </Row>
                                <Row gap="gap-2">
                                    <Button className="!w-15 !h-5 !rounded-2xl !flex !items-center !justify-center !text-xs !bg-[#FFFCE2] !text-[#000000] space-x-1">
                                        <Image
                                            src={images.icons.EditIcon}
                                            alt="Logo"
                                            width={15}
                                            height={15}
                                        /> 
                                        <p>Edit</p>
                                    </Button>
                                    <Button className="!w-15 !h-5 !rounded-2xl !flex !items-center !justify-center !text-xs !bg-[#BA0101] !text-[#000000] space-x-1">
                                        <Image
                                            src={images.icons.TrashIcon}
                                            alt="Logo"
                                            width={15}
                                            height={15}
                                            // className="icon-[#FFFCE2]"
                                        /> 
                                        <p className="text-[#EDE7B5]">Delete</p>
                                    </Button>
                                </Row> 
                            </Column>

                            <div className="w-full h-px bg-gray-400 opacity-30 mb-4"></div>

                            <Column gap="gap-2">
                                <Row gap="gap-3">
                                    <div className="bg-[#FFFCE2] rounded-2xl p-4">
                                        <Image
                                            src={images.icons.GalleryIcon}
                                            alt="Logo"
                                            width={30}
                                            height={25}
                                        />
                                    </div>
                                    <Column className="space-y-3">
                                        <Row justifyContent="end">
                                            <h2 className="text-sm font-bold">Rice and Beans</h2>
                                            <ToggleButton/>
                                        </Row>
                                        <p className="text-xs opacity-70 font-semibold">$4.00</p> 
                                    </Column>
                                </Row>
                                <Row gap="gap-2">
                                    <Button className="!w-15 !h-5 !rounded-2xl !flex !items-center !justify-center !text-xs !bg-[#FFFCE2] !text-[#000000] space-x-1">
                                        <Image
                                            src={images.icons.EditIcon}
                                            alt="Logo"
                                            width={15}
                                            height={15}
                                        /> 
                                        <p>Edit</p>
                                    </Button>
                                    <Button className="!w-15 !h-5 !rounded-2xl !flex !items-center !justify-center !text-xs !bg-[#BA0101] !text-[#000000] space-x-1">
                                        <Image
                                            src={images.icons.TrashIcon}
                                            alt="Logo"
                                            width={15}
                                            height={15}
                                            // className="icon-[#FFFCE2]"
                                        /> 
                                        <p className="text-[#EDE7B5]">Delete</p>
                                    </Button>
                                </Row> 
                            </Column>

                            <div className="w-full h-px bg-gray-400 opacity-30 mb-4"></div>

                            <Row justifyContent="between">
                                <h2 className="text-sm font-bold">Protein</h2>
                            </Row>

                            <Column gap="gap-2">
                                <Row gap="gap-3">
                                    <div className="bg-[#FFFCE2] rounded-2xl p-4">
                                        <Image
                                            src={images.icons.GalleryIcon}
                                            alt="Logo"
                                            width={30}
                                            height={25}
                                        />
                                    </div>
                                    <Column className="space-y-3">
                                        <Row justifyContent="end">
                                            <h2 className="text-sm font-bold">Meat</h2>
                                            <ToggleButton/>
                                        </Row>
                                        <p className="text-xs opacity-70 font-semibold">$2.00</p>
                                    </Column>
                                </Row>
                                <Row gap="gap-2">
                                    <Button className="!w-15 !h-5 !rounded-2xl !flex !items-center !justify-center !text-xs !bg-[#FFFCE2] !text-[#000000] space-x-1">
                                        <Image
                                            src={images.icons.EditIcon}
                                            alt="Logo"
                                            width={15}
                                            height={15}
                                        /> 
                                        <p>Edit</p>
                                    </Button>
                                    <Button className="!w-15 !h-5 !rounded-2xl !flex !items-center !justify-center !text-xs !bg-[#BA0101] !text-[#000000] space-x-1">
                                        <Image
                                            src={images.icons.TrashIcon}
                                            alt="Logo"
                                            width={15}
                                            height={15}
                                            // className="icon-[#FFFCE2]"
                                        /> 
                                        <p className="text-[#EDE7B5]">Delete</p>
                                    </Button>
                                </Row> 
                            </Column>

                            <div className="w-full h-px bg-gray-400 opacity-30 mb-4"></div>

                            <Column gap="gap-2">
                                <Row gap="gap-3">
                                    <div className="bg-[#FFFCE2] rounded-2xl p-4">
                                        <Image
                                            src={images.icons.GalleryIcon}
                                            alt="Logo"
                                            width={30}
                                            height={25}
                                        />
                                    </div>
                                    <Column className="space-y-3">
                                        <Row justifyContent="end">
                                            <h2 className="text-sm font-bold">Tofu</h2>
                                            <ToggleButton/>
                                        </Row>
                                        <p className="text-xs opacity-70 font-semibold">$2.00</p>
                                    </Column>
                                </Row>
                                <Row gap="gap-2">
                                    <Button className="!w-15 !h-5 !rounded-2xl !flex !items-center !justify-center !text-xs !bg-[#FFFCE2] !text-[#000000] space-x-1">
                                        <Image
                                            src={images.icons.EditIcon}
                                            alt="Logo"
                                            width={15}
                                            height={15}
                                        /> 
                                        <p>Edit</p>
                                    </Button>
                                    <Button className="!w-15 !h-5 !rounded-2xl !flex !items-center !justify-center !text-xs !bg-[#BA0101] !text-[#000000] space-x-1">
                                        <Image
                                            src={images.icons.TrashIcon}
                                            alt="Logo"
                                            width={15}
                                            height={15}
                                            // className="icon-[#FFFCE2]"
                                        /> 
                                        <p className="text-[#EDE7B5]">Delete</p>
                                    </Button>
                                </Row> 
                            </Column>

                            <div className="w-full h-px bg-gray-400 opacity-30 mb-4"></div>
                            
                            <Row justifyContent="between">
                                <h2 className="text-sm font-bold">Drinks</h2>
                            </Row>

                            <Column gap="gap-2">
                                <Row gap="gap-3">
                                    <div className="bg-[#FFFCE2] rounded-2xl p-4">
                                        <Image
                                            src={images.icons.GalleryIcon}
                                            alt="Logo"
                                            width={30}
                                            height={25}
                                        />
                                    </div>
                                    <Column className="space-y-3">
                                        <Row justifyContent="end">
                                            <h2 className="text-sm font-bold">Sprite</h2>
                                            <ToggleButton/>
                                        </Row>
                                        <p className="text-xs opacity-70 font-semibold">$2.00</p>
                                    </Column>
                                </Row>
                                <Row gap="gap-2">
                                    <Button className="!w-15 !h-5 !rounded-2xl !flex !items-center !justify-center !text-xs !bg-[#FFFCE2] !text-[#000000] space-x-1">
                                        <Image
                                            src={images.icons.EditIcon}
                                            alt="Logo"
                                            width={15}
                                            height={15}
                                        /> 
                                        <p>Edit</p>
                                    </Button>
                                    <Button className="!w-15 !h-5 !rounded-2xl !flex !items-center !justify-center !text-xs !bg-[#BA0101] !text-[#000000] space-x-1">
                                        <Image
                                            src={images.icons.TrashIcon}
                                            alt="Logo"
                                            width={15}
                                            height={15}
                                            // className="icon-[#FFFCE2]"
                                        /> 
                                        <p className="text-[#EDE7B5]">Delete</p>
                                    </Button>
                                </Row> 
                            </Column>

                            <div className="w-full h-px bg-gray-400 opacity-30 mb-4"></div>

                            <Column gap="gap-2">
                                <Row gap="gap-3">
                                    <div className="bg-[#FFFCE2] rounded-2xl p-4">
                                        <Image
                                            src={images.icons.GalleryIcon}
                                            alt="Logo"
                                            width={30}
                                            height={25}
                                        />
                                    </div>
                                    <Column className="space-y-3">
                                        <Row justifyContent="end">
                                            <h2 className="text-sm font-bold">Fanta</h2>
                                            <ToggleButton/>
                                        </Row>
                                        <p className="text-xs opacity-70 font-semibold">$2.00</p> 
                                    </Column>
                                </Row>
                                <Row gap="gap-2">
                                    <Button className="!w-15 !h-5 !rounded-2xl !flex !items-center !justify-center !text-xs !bg-[#FFFCE2] !text-[#000000] space-x-1">
                                        <Image
                                            src={images.icons.EditIcon}
                                            alt="Logo"
                                            width={15}
                                            height={15}
                                        /> 
                                        <p>Edit</p>
                                    </Button>
                                    <Button className="!w-15 !h-5 !rounded-2xl !flex !items-center !justify-center !text-xs !bg-[#BA0101] !text-[#000000] space-x-1">
                                        <Image
                                            src={images.icons.TrashIcon}
                                            alt="Logo"
                                            width={15}
                                            height={15}
                                            // className="icon-[#FFFCE2]"
                                        /> 
                                        <p className="text-[#EDE7B5]">Delete</p>
                                    </Button>
                                </Row> 
                            </Column>
                        </Column>  
                    </div> 
                 )}
            </div>
        </div>
    );
}



        
