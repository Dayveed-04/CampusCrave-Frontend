// Vendor Menu 

import Button from "@/components/button";
import { Column, Row } from "@/components/flex";
import { images } from "@/constants/image";
import Image from "next/image";





export default function StudentVendorsMenu(){
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
                <div className=" text-black cursor-pointer">
                    <Image
                        src={images.icons.OrderIcon}
                        alt="Location"
                        width={25}
                        height={25}
                    />
                </div>
            </div>
            <div className="w-full h-px bg-gray-400 mb-4"></div>
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
                                    <Button className="!w-1 !h-1 !rounded-full !border !border-gray-400 !flex !items-center !justify-center !text-xs bg-transparent !text-gray-400">−</Button>
                                    <span className="text-xs">1</span>
                                    <Button className="!w-1 !h-1 !rounded-full !border !border-gray-400 !flex !items-center !justify-center !text-xs bg-transparent !text-gray-400">+</Button>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="w-full h-px bg-gray-500 mb-1"></div>
            <div>
                <h3 className="px-3 py-1 font-bold text-xs">Choose Protein</h3>
            </div>
            <div className="bg-[#FFFCE2] mb-4">
                <div>
                    <div className="flex justify-between items-center pr-7 px-3 py-2">
                        <span className="text-xs">Tofu</span>
                        <span className="text-xs font-medium">+$1.50</span>
                    </div>

                    <div className="flex justify-between items-center pr-7 px-3 py-2">
                        <span className="text-xs">Fish</span>
                        <span className="text-xs font-medium">+$2.00</span>
                    </div>

                    <div className="flex justify-between items-center pr-7 px-3 py-2">
                        <span className="text-xs">Meat</span>
                        <span className="text-xs font-medium">+$2.00</span>
                    </div>

                    <div className="flex justify-between items-center pr-7 px-3 py-2">
                        <span className="text-xs">Turkey</span>
                        <span className="text-xs font-medium">+$2.00</span>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="px-3 py-1 font-bold text-xs">Choose Toppings</h3>
            </div>
            <div className="bg-[#FFFCE2] mb-4">
                <div>
                    <div className="flex justify-between items-center pr-7 px-3 py-2">
                        <span className="text-xs">Plantain</span>
                        <span className="text-xs font-medium">+$0.36</span>
                    </div>

                    <div className="flex justify-between items-center pr-7 px-3 py-2">
                        <span className="text-xs">Salad</span>
                        <span className="text-xs font-medium">+$0.80</span>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="px-3 py-1 font-bold text-xs">Choose Drinks</h3>
            </div>
            <div className="bg-[#FFFCE2] mb-4">
                <div>
                    <div className="flex justify-between items-center pr-7 px-3 py-2">
                        <span className="text-xs">Coke</span>
                        <span className="text-xs font-medium">+$2.00</span>
                    </div>

                    <div className="flex justify-between items-center pr-7 px-3 py-2">
                        <span className="text-xs">Fanta</span>
                        <span className="text-xs font-medium">+$2.00</span>
                    </div>
                    <div className="flex justify-between items-center pr-7 px-3 py-2">
                        <span className="text-xs">Sprite</span>
                        <span className="text-xs font-medium">+$2.00</span>
                    </div>
                </div>
            </div>
            <div className="w-full h-px bg-gray-500"></div>
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