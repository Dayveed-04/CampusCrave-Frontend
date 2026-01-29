import { Column, Row } from "@/components/flex";
import { images } from "@/constants/image";
import Image from "next/image";






export default function StudentProfile(){
    return(
    <div className="min-h-screen  font-sans">
        <div className="w-full flex flex-row pr-2 mb-1 mt-2">
            <div className="text-black self-start cursor-pointer ">
               <Image
                    src={images.icons.backArrow}
                    alt="Logo"
                    width={25}
                    height={25}
                />
            </div>
            <h2 className="text-2xl font-semibold text-center w-full mr-6 text-base">Profile</h2>
        </div>
        <div className="w-full h-px bg-gray-400 opacity-30 mb-4"></div>
        <div className="bg-[#FFFCE2] py-4 mb-4 font-sans flex gap-2 items-center">
            <div className="px-2">
                <Image
                    src={images.profilePic}
                    alt="Logo"
                    width={60}
                    height={10}
                />
            </div>
            <Column>
                <h2 className="text-lg font-semibold">Olusanya Albert</h2>
                <p className="text-xs text-gray-600">otalbert@gmail.com</p>
            </Column>
        </div>
        <div className="py-2">
            <Row className="px-3 space-x-3">
                <Image
                    src={images.icons.DarkModeIcon}
                    alt="Logo"
                    width={20}
                    height={10}
                />
                <div>
                    <span>Dark Mode</span>
                </div>
                <div className="ml-auto">
                    <Image
                    src={images.icons.DarkButtonIcon}
                    alt="Logo"
                    width={40}
                    height={10}
                />
                </div>
            </Row>
        </div>
        <div className="w-full h-px bg-gray-400 opacity-30 mb-3"></div>
        <div className="py-2">
            <Row className="px-3 space-x-3">
                <Image
                    src={images.icons.CardIcon}
                    alt="Logo"
                    width={20}
                    height={10}
                />
                <div>
                    <span>Payment Method</span>
                </div>
            </Row>
        </div>
        <div className="w-full h-px bg-gray-400 opacity-30 mb-3"></div>
        <div className="py-2">
            <Row className="px-3 space-x-3">
                <Image
                    src={images.icons.LocationIconTwo}
                    alt="Logo"
                    width={20}
                    height={10}
                />
                <div>
                    <span>My Address</span>
                </div>
            </Row>
        </div>
        <div className="w-full h-px bg-gray-400 opacity-30 mb-3"></div>
        <div className="py-2">
            <Row className="px-3 space-x-3">
                <Image
                    src={images.icons.FavoritesIcon}
                    alt="Logo"
                    width={20}
                    height={10}
                />
                <div>
                    <span>My Favorites</span>
                </div>
            </Row>
        </div>
        <div className="w-full h-px bg-gray-400 opacity-30 mb-3"></div>
        <div className="py-2">
            <Row className="px-3 space-x-3">
                <Image
                    src={images.icons.DocumentIcon}
                    alt="Logo"
                    width={20}
                    height={10}
                />
                <div>
                    <span>FAQ</span>
                </div>
            </Row>
        </div>
        <div className="w-full h-px bg-gray-400 opacity-30 mb-3"></div>
        <div className="py-2">
            <Row className="px-3 space-x-3">
                <Image
                    src={images.icons.RateIcon}
                    alt="Logo"
                    width={20}
                    height={10}
                />
                <div>
                    <span>Rate Us</span>
                </div>
            </Row>
        </div>
        <div className="w-full h-px bg-gray-400 opacity-30 mb-3"></div>
        <div className="py-2">
            <Row className="px-3 space-x-3">
                <Image
                    src={images.icons.SignOutIcon}
                    alt="Logo"
                    width={20}
                    height={10}
                />
                <div>
                    <span>Sign Out</span>
                </div>
            </Row>
        </div>
        <div className="w-full h-px bg-gray-400 opacity-30 mb-3"></div>
    </div>
    )
}