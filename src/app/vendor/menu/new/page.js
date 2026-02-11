// Add Menu
"use client";
import { BaseFieldSet } from "@/components/baseField";
import { BaseInput } from "@/components/baseInput";
import Button from "@/components/button";
import { Column, Row } from "@/components/flex";
import OptionGroupsInline from "@/components/optionGroupsModal";
import OptionGroupsModal from "@/components/optionGroupsModal";
import { RadioButton } from "@/components/radioButton";
import ToggleButton from "@/components/toggleButton";
import { images } from "@/constants/image";
import Image from "next/image";
import { useState } from "react";



export default function VendorAddMenu()
{
    const [selectedOption, setSelectedOption] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [optionGroups, setOptionGroups] = useState([]);

    const handleSaveOptionGroups = (groups) => {
    setOptionGroups(groups);
    console.log('Saved option groups:', groups);
  };

  
    return (
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
                <h2 className="text-2xl font-semibold text-center w-full  text-base font-sans">Add a Meal</h2>
            </div>
            <div className="w-full h-px bg-gray-400 opacity-30 mb-4"></div>

           
            <div className="bg-[#FFFCE2] rounded-2xl p-6 m-3">
                <Column gap="gap-3">
                    <Row justifyContent="center">
                    <Image
                        src={images.icons.GalleryIcon}
                        alt="image add icon"
                        width={45}
                        height={25}
                    />                    
                    </Row>
                    <div className="text-center">
                        <h3 className="font-bold text-sm pb-1">Upload Meal Photo</h3>
                        <p className="text-xs opacity-70 pb-4">Tap to select or drag a high quality image of the dish</p>
                    </div>
                </Column>
            </div>
            <Column gap="gap-2">
                <h2 className="font-bold px-4">Meal Details</h2>

                <BaseFieldSet className="px-4">
                        <label className="text-xs font-semibold text-black">Meal Name</label>
                        <BaseInput
                          placeholder="e.g Jollof Rice"
                        />
                </BaseFieldSet>

                <BaseFieldSet className="px-4">
                        <label className="text-xs font-semibold text-black">Price</label>
                        <BaseInput
                          placeholder="$0.00"
                        />
                </BaseFieldSet>    

                <BaseFieldSet className="px-4">
                        <label className="text-xs font-semibold text-black">Description</label>
                        <BaseInput
                          placeholder="Give a brief description"
                        />
                        <p className="text-xs opacity-50">Max 250 characters</p>
                </BaseFieldSet>

                <h2 className="font-bold px-4">Meal Category</h2>
                <div className="bg-[#FFFFFF] rounded-2xl p-2 m-3">
                    <Row className="items-center px-3 py-2" justifyContent="between">
                        <span className="text-xs font-semibold">Main Course</span>
                        <div className="flex items-center gap-2">
                            <div className="cursor-pointer" >
                                <RadioButton 
                                    selected={selectedOption === "b"}
                                    onClick={() => setSelectedOption("b")}
                                 />
                            </div>
                        </div>
                    </Row>

                    <Row className="items-center px-3 py-2" justifyContent="between">
                        <span className="text-xs font-semibold">Appetizer</span>
                        <div className="flex items-center gap-2">
                            <div className="cursor-pointer" >
                                <RadioButton  selected={selectedOption === "c"}
                                    onClick={() => setSelectedOption("c")} />
                            </div>
                        </div>
                    </Row>

                    <Row className="items-center px-3 py-2" justifyContent="between">
                        <span className="text-xs font-semibold">Protein</span>
                        <div className="flex items-center gap-2">
                            <div className="cursor-pointer" >
                                <RadioButton  selected={selectedOption === "d"}
                                    onClick={() => setSelectedOption("d")} />
                            </div>
                        </div>
                    </Row>

                    <Row className="items-center px-3 py-2" justifyContent="between">
                        <span className="text-xs font-semibold">Drinks</span>
                        <div className="flex items-center gap-2">
                            <div className="cursor-pointer" >
                                <RadioButton selected={selectedOption === "e"}
                                    onClick={() => setSelectedOption("e")} />
                            </div>
                        </div>
                    </Row>
                </div>
                <OptionGroupsInline
                    optionGroups={optionGroups}
                    setOptionGroups={setOptionGroups}
                />
                <div className="bg-[#FFFCE2] rounded-2xl p-4 w-72 mx-auto mt-7">
                    <Row gap="gap-4"  justifyContent="between" >
                        <h2 className="text-sm font-semibold">Store Status :<span className="ml-2 font-semibold">Open</span></h2>
                        <ToggleButton/>
                    </Row>
                    <p className="text-xs text-gray-600">You are currently receiving new orders</p>
                </div>
                <div className="px-2 py-3 flex justify-center">
                    <Button className="!w-70  bg-black !text-[#EDE7B5] !rounded-2xl font-bold !text-white">
                        Add Meal to Menu
                    </Button>
                </div>
            </Column>
            

        </div>
    )
}