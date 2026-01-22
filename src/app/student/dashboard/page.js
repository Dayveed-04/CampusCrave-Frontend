import { images } from "@/constants/image";
import Image from "next/image";



export default function StudentDashboard(){
    return(
        <div className="min-h-screen  font-sans">
            <div className="w-full  flex flex-row pr-2">
                <div className="text-black self-start cursor-pointer">
                    <Image
                          src={images.icons.Logo}
                          alt="Logo"
                          width={70}
                          height={70}
                    />
                 </div>
                 <div className="mt-6 text-black cursor-pointer">
                    <Image
                          src={images.icons.LocationIcon}
                          alt="Location"
                          width={120}
                          height={120}
                    />
                 </div>
                 <div className="ml-auto mb-3  text-black self-end cursor-pointer">
                    <Image
                          src={images.icons.NotificationIcon}
                          alt="Notification"
                          width={20}
                          height={20}
                    />
                 </div>
            </div>
            <div className="w-full h-px bg-gray-400 opacity-30 mb-4"></div>
        </div>
    )
}