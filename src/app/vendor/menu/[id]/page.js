"use client";

import Button from "@/components/button";
import { Column, Row } from "@/components/flex";
import ToggleButton from "@/components/toggleButton";
import Toast from "@/components/toast";
import { useToast } from "@/hooks/useToast";
import { images } from "@/constants/image";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getAMenu } from "@/utils/endpoints/Students/getAMenu";
import { getVendorMenu } from "@/utils/endpoints/Vendors/getVendorMenu";

export default function VendorMenuDetail() {
  const params = useParams();
  const router = useRouter();
  const menuId = params.id;
  const { toast, showToast, hideToast } = useToast();

  // State
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch menu data
  useEffect(() => {
    const fetchMenu = async () => {
      if (!menuId) {
        setError("No menu ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await getVendorMenu(menuId);

        if (response.status === "success" && response.data?.menu) {
          setMenu(response.data.menu);
        } else {
          setError("Failed to load menu");
        }
      } catch (err) {
        console.error("Error fetching menu:", err);
        setError(err.message || "Failed to load menu");
        showToast(err.message || "Failed to load menu", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [menuId]);

  // Handle edit menu
  const handleEditMenu = () => {
    router.push(`/vendor/menu/${menuId}/edit`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading menu...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !menu) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || "Menu not found"}</p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans">
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
          duration={toast.duration}
        />
      )}

      {/* Header */}
      <div className="w-full flex flex-row mt-4">
        <div
          className="text-black self-start cursor-pointer justify-between"
          onClick={() => router.back()}
        >
          <Image
            src={images.icons.backArrow}
            alt="Back"
            width={25}
            height={25}
          />
        </div>
        <h2 className="text-2xl font-semibold text-center w-full text-base">
          Menu Management
        </h2>
        <div
          className="text-black cursor-pointer pr-3"
          onClick={() => router.push("/vendor/menus/add")}
        >
          <Image
            src={images.icons.AddCircleIcon}
            alt="Add Menu"
            width={25}
            height={25}
          />
        </div>
      </div>
      <div className="w-full h-px bg-gray-400 opacity-30 mb-4"></div>

      <Column gap="gap-3">
        {/* Category & Availability Toggle */}
        <Row justifyContent="between" className="px-3">
          <h2 className="text-sm font-bold">{menu.category?.name || "Menu"}</h2>
          <div className="pointer-events-none opacity-50">
            <ToggleButton
              checked={menu.available}
              disabled={true}
              onChange={() => {}}
            />
          </div>
        </Row>

        {/* Menu Details */}
        <div className="px-3 mb-1">
          <div className="flex gap-3">
            <Image
              src={menu.imageUrl || images.jollofRice}
              alt={menu.name}
              width={112}
              height={104}
              className="w-28 h-26 rounded-3xl object-cover"
            />
            <div className="flex-1 flex flex-col justify-between min-w-0">
              <div>
                <h3 className="font-semibold text-sm">{menu.name}</h3>
                <p className="text-xs text-gray-600">{menu.description}</p>
                <div className="flex justify-between items-center">
                  <h3 className="py-3 font-semibold text-sm">
                    ₦{menu.basePrice?.toFixed(2)}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Column>

      {/* Option Groups */}
      {menu.optionGroups && menu.optionGroups.length > 0 ? (
        menu.optionGroups.map((group) => (
          <div key={group.id} className="mb-4">
            <div className="px-3 py-1">
              <h3 className="font-bold text-xs flex items-center gap-2">
                <span>{group.name}</span>
                {group.required && (
                  <span className="text-red-500 text-xs font-normal">
                    (Required)
                  </span>
                )}
              </h3>
            </div>
            <div className="bg-[#FFFCE2]">
              {group.options && group.options.length > 0 ? (
                group.options.map((option) => (
                  <Row
                    key={option.id}
                    className="items-center px-3 py-2"
                    justifyContent="between"
                  >
                    <span className="text-xs">{option.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium">
                        ₦{option.price?.toFixed(2)}
                      </span>
                    </div>
                  </Row>
                ))
              ) : (
                <Row className="items-center px-3 py-2">
                  <span className="text-xs text-gray-500">No options</span>
                </Row>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="px-3 py-4 text-center">
          <p className="text-xs text-gray-500">No option groups</p>
        </div>
      )}

      {/* Edit Button */}
      <div className="px-2 py-2 flex-shrink-0">
        <Button
          className="w-full py-2 bg-black !text-[#EDE7B5] !rounded-3xl font-bold text-sm"
          onClick={handleEditMenu}
        >
          Edit Menu
        </Button>
      </div>
    </div>
  );
}
