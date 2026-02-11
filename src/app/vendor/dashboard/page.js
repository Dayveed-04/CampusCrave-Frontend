import { Column, Row } from "@/components/flex";
import ToggleButton from "@/components/toggleButton";
import { images } from "@/constants/image";
import Image from "next/image";


export default function VendorDashboard(){
    return(
        <div className="min-h-screen  font-sans">
            <div className="w-full  flex flex-row pr-4">
                <div className="text-black self-start cursor-pointer">
                    <Image
                        src={images.icons.Logo}
                        alt="Logo"
                        width={70}
                        height={70}
                        className="w-12 h-12 sm:w-[70px] sm:h-[70px]"
                    />
                </div>
                <div className="mt-6 text-black cursor-pointer">
                    <Image
                        src={images.icons.LocationIcon}
                        alt="Location"
                        width={120}
                        height={120}
                        className="w-20 h-auto sm:w-[120px]"
                    />
                </div>
                <div className="ml-auto mb-3  text-black self-end cursor-pointer">
                    <Image
                        src={images.icons.NotificationIcon}
                        alt="Notification"
                        width={20}
                        height={20}
                        className="w-4 h-4 sm:w-5 sm:h-5"
                    />
                </div>
            </div>
            <div className="w-full h-px bg-gray-400 opacity-30 mb-4"></div> 
            <div className="px-3">
            <div className=" py-2 font-sans flex gap-2 ">
                <Image
                    src={images.profilePic}
                    alt="Profile Picture"
                    width={50}
                    height={10}
                />
                <Column>
                    <h2 className="text-md font-bold">Babcock Guest House</h2>
                    <p className="text-xs text-gray-600">bgh@gmail.com</p>
                </Column>
            </div>
            <div className="bg-[#FFFCE2] rounded-3xl p-4 w-60">
                <Row gap="gap-4"  justifyContent="between" >
                    <h2 className="text-sm font-semibold">Store Status :<span className="ml-2 font-semibold">Open</span></h2>
                    <ToggleButton/>
                </Row>
                <p className="text-xs text-gray-600">You are currently receiving new orders</p>
            </div>
            <Row gap="gap-4" justifyContent="between" className="mt-4">
                <div className="bg-[#FFFCE2] h-20 rounded-3xl px-3 py-2 w-60 space-y-3">
                    <Row gap="gap-2" >
                        <h2 className="text-xs font-semibold">Total Amount</h2>
                            <Image
                            src={images.icons.MoneyIcon}
                            alt="Money Icon"
                            width={70}
                            height={70}
                            className="w-5 h-5 sm:w-[70px] sm:h-[70px]"
                        />
                    </Row>
                    <Row gap="gap-2" >
                        <h2 className="text-xs font-bold">₦ 120,000</h2>
                    </Row>
                </div>
                <div className="bg-[#FFFCE2] h-20 rounded-3xl px-3 py-2 w-60 space-y-3">
                    <Row gap="gap-2" >
                        <h2 className="text-xs font-semibold">Total Orders</h2>
                            <Image
                            src={images.icons.MoneyIcon}
                            alt="Money Icon"
                            width={70}
                            height={70}
                            className="w-5 h-5 sm:w-[70px] sm:h-[70px]"
                        />
                    </Row>
                    <Row gap="gap-2" >
                        <h2 className="text-xs font-bold">20</h2>
                    </Row>
                </div>
            </Row>
            <div>
                <h2 className="text-lg font-bold mt-2 mb-2">Quick Actions</h2>
                <Row gap="gap-3">
                    <button className="flex items-center gap-3 bg-black text-white px-3 py-2 rounded-full shadow-md hover:scale-105 transition">
                        <div className="w-4 h-4 rounded-full  flex items-center justify-center">
                            <Image
                                src={images.icons.AddCircleIcon}
                                alt="Add Circle Icon"
                                width={50}
                                height={10}
                            />
                        </div>
                        <span className="text-xs font-medium text-[#EDE7B5]">
                            Add a new meal
                        </span>
                    </button>
                    <button className="flex items-center gap-3 bg-white text-black px-3 py-2 rounded-full shadow-md hover:scale-105 transition">
                        <div className="w-4 h-4 rounded-full  flex items-center justify-center">
                            <Image
                                src={images.icons.OrderIcon}
                                alt="Add Circle Icon"
                                width={50}
                                height={10}
                            />
                        </div>
                        <span className="text-xs font-medium">
                            View All Orders
                        </span>
                    </button>
                </Row>
            </div>   
            </div>
        </div>
    )
}