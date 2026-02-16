// Edit Menu  
"use client";
import Button from "@/components/button";
import { Column, Row } from "@/components/flex";
import { CheckButton } from "@/components/checkButton";
import { images } from "@/constants/image";
import Image from "next/image";
import { useState } from "react";
import ToggleButton from "@/components/toggleButton";





export default function StudentVendorsMenu(){
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleToggle = (option) => {
  setSelectedOptions(prev => 
    prev.includes(option) 
      ? prev.filter(item => item !== option) // Remove if already selected
      : [...prev, option] // Add if not selected
  );
};
    return(
        <div className="min-h-screen  font-sans">
            <div className="w-full  flex flex-row  mt-4">
                <div className="text-black self-start cursor-pointer justify-between">
                    <Image
                        src={images.icons.backArrow}
                        alt="Logo"
                        width={25}
                        height={25}
                    />
                    </div>
                <h2 className="text-2xl font-semibold text-center w-full text-base">Menu Management</h2>
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
            <Column gap="gap-3">
                <Row justifyContent="between">
                    <h2 className="text-sm font-bold px-3">Main Course</h2>
                    <ToggleButton/>
                </Row>
            
                <div className="px-3 mb-1">
                    <div className="flex gap-3">
                        <Image
                            src={images.jollofRice}
                            alt="Jollof Rice"
                            width={28}
                            height={26}
                            className="w-28 h-26 rounded-3xl object-cover"
                        /> 
                        <div className="flex-1 flex flex-col justify-between min-w-0">
                            <div>
                            <h3 className="font-semibold text-sm">Jollof Rice</h3>
                            <p className="text-xs text-gray-600">Home-style, smoky, and full of flavor, cooked in a rich tomato-pepper mix that hits the spot every time. </p>
                                <div className="flex justify-between items-center">
                                    <h3 className="py-3 font-semibold text-sm">$4.00</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Column>
            
            <div>
                <h3 className="px-3 py-1 font-bold text-xs">Protein</h3>
            </div>
            <div className="bg-[#FFFCE2] mb-4">
                <Row className="items-center  px-3 py-2" justifyContent="between">
                    <span className="text-xs">Tofu</span>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium">$1.50</span>
                    </div>
                </Row>

                <Row className="items-center  px-3 py-2" justifyContent="between">
                    <span className="text-xs">Fish</span>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium">$2.00</span>
                    </div>
                </Row>

                <Row className="items-center  px-3 py-2" justifyContent="between">
                    <span className="text-xs">Meat</span>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium">$2.50</span>
                    </div>
                </Row>

                <Row className="items-center  px-3 py-2" justifyContent="between">
                    <span className="text-xs">Egg</span>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium">$1.50</span>
                    </div>
                </Row>
            </div>
            <div>
                <h3 className="px-3 py-1 font-bold text-xs">Toppings</h3>
            </div>
            <div className="bg-[#FFFCE2] mb-4">
                <Row className="items-center  px-3 py-2" justifyContent="between">
                    <span className="text-xs">Plantain</span>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium">$0.86</span>
                    </div>
                </Row>

                <Row className="items-center  px-3 py-2" justifyContent="between">
                    <span className="text-xs">Salad</span>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium">$0.80</span>
                    </div>
                </Row>
            </div>
            <div>
                <h3 className="px-3 py-1 font-bold text-xs">Drink</h3>
            </div>
            <div className="bg-[#FFFCE2] mb-4">
                <Row className="items-center  px-3 py-2" justifyContent="between">
                    <span className="text-xs">Sprite</span>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium">$2.00</span>
                    </div>
                </Row>
                <Row className="items-center  px-3 py-2" justifyContent="between">
                    <span className="text-xs">Coke</span>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium">$2.00</span>
                    </div>
                </Row>
                <Row className="items-center  px-3 py-2" justifyContent="between">
                    <span className="text-xs">Fanta</span>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium">$2.00</span>
                    </div>
                </Row>
            </div>
            <div className="px-2 py-2 flex-shrink-0">
                <Button className="w-full py-2 bg-black !text-[#EDE7B5] !rounded-3xl font-bold text-sm">
                Edit Menu
                </Button>
            </div>
        </div>

    )
}