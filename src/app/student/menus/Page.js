import { images } from "@/constants/image";
import Image from "next/image";







export default function StudentAllVendorsMenu(){
    return(
        <div className="min-h-screen  font-sans">
                    <div className="w-full  flex flex-row pr-2 mb-1 mt-2">
                        <div className="text-black self-start cursor-pointer ">
                            <Image
                                  src={images.icons.backArrow}
                                  alt="Logo"
                                  width={25}
                                  height={25}
                            />
                         </div>
                        <h2 className="text-2xl font-semibold text-center w-full mr-6 text-base"> Menu</h2>
                    </div>
                    <div className="w-full h-px bg-gray-400 opacity-30 mb-4"></div>
                </div>
    )
}