"use client";
import { Column, Row } from "@/components/flex";
import ToggleButton from "@/components/toggleButton";
import { images } from "@/constants/image";
import { getAdmin } from "@/utils/endpoints/Admin/getAdmin";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AdminProfile() {
  const [admin, setAdmin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadadmin = async () => {
      try {
        setLoading(true);
        const response = await getAdmin();

        if (response.status === "success" && response.data.admin) {
          setAdmin(response.data.admin);
        }
      } catch (err) {
        console.error("Failed to fetch Admin:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadadmin();
  }, []);
  return (
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
        <h2 className="text-2xl font-semibold text-center w-full mr-6 text-base">
          Profile
        </h2>
      </div>
      <div className="w-full h-px bg-gray-400 opacity-30 mb-4"></div>
      <div className="bg-[#FFFCE2] py-4 mb-4 font-sans flex gap-2 items-center">
        <div className="px-2">
          <Image src={images.profilePic} alt="Logo" width={60} height={10} />
        </div>
        <Column>
          <h2 className="text-lg font-semibold"> {admin?.name}</h2>
          <p className="text-xs text-gray-600">{admin?.email}</p>
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
            <ToggleButton />
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
            <span>Wallet</span>
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
  );
}
