// Vendor Menu 

import { images } from "@/constants/image";
import Image from "next/image";





export default function StudentVendorsMenu(){
    return(
         <div className="min-h-screen  font-sans">
                    <div className="w-full  flex flex-row pr-2 mt-4">
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
                    <div className="w-full h-px bg-gray-400 opacity-30 mb-4"></div>
                </div>

    )
}