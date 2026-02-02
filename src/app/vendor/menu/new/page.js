// Add Menu
"use client";
import { BaseFieldSet } from "@/components/baseField";
import { BaseInput } from "@/components/baseInput";
import Button from "@/components/button";
import { Column, Row } from "@/components/flex";
import { images } from "@/constants/image";
import Image from "next/image";
import { useState } from "react";
import { CheckButton } from "@/components/checkButton";


export default function VendorAddMenu()
{
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleToggle = (option) => {
  setSelectedOptions(prev => 
    prev.includes(option) 
      ? prev.filter(item => item !== option) // Remove if already selected
      : [...prev, option] // Add if not selected
  );
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
                            <div className="cursor-pointer" onClick={() => handleToggle('tofu')}>
                                <CheckButton selected={selectedOptions.includes('tofu')} />
                            </div>
                        </div>
                    </Row>

                    <Row className="items-center px-3 py-2" justifyContent="between">
                        <span className="text-xs font-semibold">Appetizer</span>
                        <div className="flex items-center gap-2">
                            <div className="cursor-pointer" onClick={() => handleToggle('fish')}>
                                <CheckButton selected={selectedOptions.includes('fish')} />
                            </div>
                        </div>
                    </Row>

                    <Row className="items-center px-3 py-2" justifyContent="between">
                        <span className="text-xs font-semibold">Protein</span>
                        <div className="flex items-center gap-2">
                            <div className="cursor-pointer" onClick={() => handleToggle('meat')}>
                                <CheckButton selected={selectedOptions.includes('meat')} />
                            </div>
                        </div>
                    </Row>

                    <Row className="items-center px-3 py-2" justifyContent="between">
                        <span className="text-xs font-semibold">Drinks</span>
                        <div className="flex items-center gap-2">
                            <div className="cursor-pointer" onClick={() => handleToggle('egg')}>
                                <CheckButton selected={selectedOptions.includes('egg')} />
                            </div>
                        </div>
                    </Row>
                </div>
            </Column>
        </div>
    )
}