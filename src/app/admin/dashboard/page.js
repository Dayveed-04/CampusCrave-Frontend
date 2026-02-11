import { Column, Row } from "@/components/flex";
import ToggleButton from "@/components/toggleButton";
import { images } from "@/constants/image";
import Image from "next/image";
import Button from "@/components/button";


export default function AdminDashboard()
{
    return(
        <div className="min-h-screen font-sans">
            <div className="w-full flex flex-row pr-4">
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
                <div className="ml-auto mb-3 text-black self-end cursor-pointer">
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
            <div className="px-3 flex gap-1">
                <Column>
                    <h2 className="text-md font-bold">Admin Console</h2>
                    <p className="text-xs text-gray-600">System Controller</p>
                </Column>
            </div>
            <div className="p-3">
                <Column gap="gap-2">
                    <Row justifyContent="between" className="space-x-1">
                        <div className="bg-[#FFFCE2] rounded-2xl p-3 mr-1 space-y-3">
                            <h3 className="text-gray-600 text-xs">TOTAL ORDERS</h3>
                            <h2 className="text-lg font-bold">3,500</h2>
                        </div>

                        <div className="bg-[#FFFCE2] rounded-2xl p-3 mr-1 space-y-3">
                            <h3 className="text-gray-600 text-xs">ACTIVE VENDORS</h3>
                            <h2 className="text-lg font-bold">700</h2>
                        </div>
                    </Row>
                    <Row>
                        <div className="bg-[#FFFCE2] rounded-2xl p-3 mr-1 space-y-2 text-center w-full">
                            <h3 className="text-gray-600 text-xs">TOTAL PLATFORM REVENUE</h3>
                            <h2 className="text-lg font-bold">$200,000</h2>
                        </div>
                    </Row>

                    <Row justifyContent="between">
                        <h2 className="text-sm font-bold">Vendor Vetting</h2>
                        <div className="bg-[#000000] text-[#EDE7B5] text-xs rounded-2xl px-2 mb-1">6 pending</div>
                    </Row>

                    <div className="bg-[#FFFCE2] rounded-2xl p-3 mr-1">
                        <Row justifyContent="between">
                            <h3 className="font-bold text-sm mb-3">Babcock Guest House</h3>
                        </Row>

                        <Row>
                            <p className="text-xs opacity-70 mb-3">bgh@gmail.com</p>
                        </Row>

                        <Row>
                            <p className="text-xs opacity-70 mb-3">+2348034567890</p>
                        </Row>

                        <Row gap="gap-2" justifyContent="between">
                            <Button className="!w-15 !h-5 !rounded-2xl !flex !items-center !justify-center !text-xs !bg-[#EDE7B5] !text-[#000000]">Approve</Button>
                            <Button className="!w-15 !h-5 !rounded-2xl !flex !items-center !justify-center !text-xs !bg-[#000000] !text-[#EDE7B5] flex self-end">Decline</Button>
                        </Row>
                    </div>

                    <div className="bg-[#FFFCE2] rounded-2xl p-3 mr-1">
                        <Row justifyContent="between">
                            <h3 className="font-bold text-sm mb-3">Big Meals</h3>
                        </Row>

                        <Row>
                            <p className="text-xs opacity-70 mb-3">bigmeals@gmail.com</p>
                        </Row>

                        <Row>
                            <p className="text-xs opacity-70 mb-3">+23470985433</p>
                        </Row>

                        <Row gap="gap-2" justifyContent="between">
                            <Button className="!w-15 !h-5 !rounded-2xl !flex !items-center !justify-center !text-xs !bg-[#EDE7B5] !text-[#000000]">Approve</Button>
                            <Button className="!w-15 !h-5 !rounded-2xl !flex !items-center !justify-center !text-xs !bg-[#000000] !text-[#EDE7B5] flex self-end">Decline</Button>
                        </Row>
                    </div>

                    <div className="mb-5 mr-2">
                        <Button className="w-3 !py-2 !bg-black !text-[#EDE7B5] !rounded-3xl font-medium text-xs">
                        View All Vetting Requests
                        </Button>
                    </div>
                </Column>
            </div>
            
        </div>
    )
}