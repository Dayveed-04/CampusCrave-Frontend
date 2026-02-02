// Vendor Menu 
"use client";
import Button from "@/components/button";
import { Column, Row } from "@/components/flex";
import { CheckButton } from "@/components/checkButton";
import { images } from "@/constants/image";
import Image from "next/image";
import { useState } from "react";





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
                <h2 className="text-2xl font-semibold text-center w-full mr-6 text-base">Babcock Guest House</h2>
                <div className=" text-black cursor-pointer pr-3">
                    <Image
                        src={images.icons.OrderIcon}
                        alt="Location"
                        width={25}
                        height={25}
                    />
                </div>
            </div>
            <div className="w-full h-px bg-gray-400 opacity-30 mb-4"></div>
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
                          <h3 className="font-bold text-medium">Jollof Rice</h3>
                          <p className="text-xs text-gray-600">Home-style, smoky, and full of flavor, cooked in a rich tomato-pepper mix that hits the spot every time. </p>
                            <div className="flex justify-between items-center">
                                <h3 className="py-3 font-bold text-medium">$4.00</h3>
                                <div className="flex items-center gap-3">
                                    <button className="!w-5 !h-5 !rounded-full !border !border-gray-400 !flex !items-center !justify-center !text-xs bg-transparent !text-gray-400">−</button>
                                    <span className="text-xs">1</span>
                                    <button className="!w-5 !h-5 !rounded-full !border !border-gray-400 !flex !items-center !justify-center !text-xs bg-transparent !text-gray-400">+</button>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="w-full h-px bg-gray-500 opacity-30 mb-1"></div>
            <div>
                <h3 className="px-3 py-1 font-bold text-xs">Choose Protein</h3>
            </div>
            <div className="bg-[#FFFCE2] mb-4">
                <Row className="items-center  px-3 py-2" justifyContent="between">
                    <span className="text-xs">Tofu</span>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium">+$1.50</span>
                        <div className="cursor-pointer" onClick={() => handleToggle('tofu')}>
                            <CheckButton selected={selectedOptions.includes('tofu')} />
                        </div>
                    </div>
                </Row>

                <Row className="items-center  px-3 py-2" justifyContent="between">
                    <span className="text-xs">Fish</span>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium">+$2.00</span>
                        <div className="cursor-pointer" onClick={() => handleToggle('fish')}>
                            <CheckButton selected={selectedOptions.includes('fish')} />
                        </div>
                    </div>
                </Row>

                <Row className="items-center  px-3 py-2" justifyContent="between">
                    <span className="text-xs">Meat</span>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium">+$2.50</span>
                        <div className="cursor-pointer" onClick={() => handleToggle('meat')}>
                            <CheckButton selected={selectedOptions.includes('meat')} />
                        </div>
                    </div>
                </Row>

                <Row className="items-center  px-3 py-2" justifyContent="between">
                    <span className="text-xs">Egg</span>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium">+$1.50</span>
                        <div className="cursor-pointer" onClick={() => handleToggle('egg')}>
                            <CheckButton selected={selectedOptions.includes('egg')} />
                        </div>
                    </div>
                </Row>
            </div>
            <div>
                <h3 className="px-3 py-1 font-bold text-xs">Choose Toppings</h3>
            </div>
            <div className="bg-[#FFFCE2] mb-4">
                <Row className="items-center  px-3 py-2" justifyContent="between">
                    <span className="text-xs">Plantain</span>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium">+$0.86</span>
                        <div className="cursor-pointer" onClick={() => handleToggle('plantain')}>
                            <CheckButton selected={selectedOptions.includes('plantain')} />
                        </div>
                    </div>
                </Row>

                <Row className="items-center  px-3 py-2" justifyContent="between">
                    <span className="text-xs">Salad</span>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium">+$0.80</span>
                        <div className="cursor-pointer" onClick={() => handleToggle('salad')}>
                            <CheckButton selected={selectedOptions.includes('salad')} />
                        </div>
                    </div>
                </Row>
            </div>
            <div>
                <h3 className="px-3 py-1 font-bold text-xs">Choose Drinks</h3>
            </div>
            <div className="bg-[#FFFCE2] mb-4">
                <Row className="items-center  px-3 py-2" justifyContent="between">
                    <span className="text-xs">Sprite</span>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium">+$2.00</span>
                        <div className="cursor-pointer" onClick={() => handleToggle('sprite')}>
                            <CheckButton selected={selectedOptions.includes('sprite')} />
                        </div>
                    </div>
                </Row>
                <Row className="items-center  px-3 py-2" justifyContent="between">
                    <span className="text-xs">Coke</span>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium">+$2.00</span>
                        <div className="cursor-pointer" onClick={() => handleToggle('coke')}>
                            <CheckButton selected={selectedOptions.includes('coke')} />
                        </div>
                    </div>
                </Row>
                <Row className="items-center  px-3 py-2" justifyContent="between">
                    <span className="text-xs">Fanta</span>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium">+$2.00</span>
                        <div className="cursor-pointer" onClick={() => handleToggle('fanta')}>
                            <CheckButton selected={selectedOptions.includes('fanta')} />
                        </div>
                    </div>
                </Row>
            </div>
            <div className="w-full h-px  opacity-30 bg-gray-400"></div>
            <div className="flex justify-between items-center px-2 py-2">
                <h2 className="px-3 py-1 font-bold text-medium">Total: $8.00</h2>
                <div>
                    <Button className="justify-end !w-35 !py-1 bg-black !text-[#EDE7B5] !rounded-3xl font-bold">
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>

    )
}