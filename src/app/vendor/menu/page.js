"use client";

import Button from "@/components/button";
import { Column, Row } from "@/components/flex";
import Toast from "@/components/toast";
import ConfirmModal from "@/components/confirmModal";
import { useToast } from "@/hooks/useToast";
import { images } from "@/constants/image";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchCategories } from "@/utils/endpoints/Category/getCategories";
import { vendorMenus } from "@/utils/endpoints/Vendors/getVendorMenus";
import { deleteMenu } from "@/utils/endpoints/Vendors/deleteMenu";

export default function VendorManageMenu() {
  const router = useRouter();
  const { toast, showToast, hideToast } = useToast();

  // State
  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Load categories and menus
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      // Fetch categories and menus in parallel
      const [categoriesRes, menusRes] = await Promise.all([
        fetchCategories(),
        vendorMenus(),
      ]);

      // Handle categories
      let categoriesData = [];
      if (categoriesRes.status && categoriesRes.data?.categories) {
        categoriesData = categoriesRes.data.categories;
      } else if (Array.isArray(categoriesRes)) {
        categoriesData = categoriesRes;
      }
      setCategories(categoriesData);

      // Set first category as active
      if (categoriesData.length > 0 && !activeTab) {
        setActiveTab(categoriesData[0].id);
      }

      // Handle menus
      // Handle menus
      let menusData = [];
      if (menusRes.status === "success" && menusRes.data?.menus) {
        // ← Changed!
        menusData = menusRes.data.menus; // ← Access data.menus!
      }
      setMenus(menusData);
    } catch (error) {
      console.error("Failed to load data:", error);
      showToast("Failed to load menus", "error");
    } finally {
      setLoading(false);
    }
  };

  // Get menus for active category
  const getFilteredMenus = () => {
    if (!activeTab) return [];
    return menus.filter((menu) => menu.categoryId === activeTab);
  };

  // Handle menu click
  const handleMenuClick = (menuId) => {
    router.push(`/vendor/menu/${menuId}`);
  };

  // Handle delete click
  const handleDeleteClick = (menu) => {
    setDeleteModal({
      menuId: menu.id,
      menuName: menu.name,
    });
  };

  // Confirm delete
  const handleDeleteConfirm = async () => {
    if (!deleteModal) return;

    setDeleting(true);

    try {
      await deleteMenu(deleteModal.menuId);

      // Remove from local state
      setMenus((prev) => prev.filter((m) => m.id !== deleteModal.menuId));

      showToast("Menu deleted successfully", "success");
      setDeleteModal(null);
    } catch (error) {
      console.error("Failed to delete menu:", error);
      showToast(error.message || "Failed to delete menu", "error");
    } finally {
      setDeleting(false);
    }
  };

  const filteredMenus = getFilteredMenus();

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

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteModal}
        onClose={() => setDeleteModal(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Menu"
        message={`Are you sure you want to delete "${deleteModal?.menuName}"? This action cannot be undone.`}
        confirmText={deleting ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        confirmColor="bg-red-600"
        confirmTextColor="text-white"
      />

      {/* Header */}
      <div className="w-full flex flex-row mb-1 mt-1">
        <div
          className="text-black self-start cursor-pointer"
          onClick={() => router.push(`/vendor/dashboard`)}
        >
          <Image
            src={images.icons.backArrow}
            alt="Back"
            width={25}
            height={25}
          />
        </div>
        <h2 className="text-2xl font-semibold text-center w-full text-base font-sans">
          Menu Management
        </h2>
        <div
          className="text-black cursor-pointer pr-3"
          onClick={() => router.push("/vendor/menu/new")}
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

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
            <p className="text-gray-600">Loading menus...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Category Tabs */}
          <Row
            gap="gap-2"
            className="overflow-x-auto pb-2"
            justifyContent="start"
          >
            {categories.map((category) => (
              <Button
                key={category.id}
                backgroundColor={
                  activeTab === category.id ? "bg-black" : "bg-[#FFFCE2]"
                }
                color={
                  activeTab === category.id ? "text-[#EDE7B5]" : "text-black"
                }
                width="auto"
                className="whitespace-nowrap !px-4 !py-1 text-md !rounded-3xl"
                onClick={() => setActiveTab(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </Row>

          {/* Menus List */}
          <div className="px-3 py-4 mb-6 font-sans">
            {filteredMenus.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No menus in this category</p>
                <Button
                  className="!bg-black !text-[#EDE7B5] !rounded-xl"
                  onClick={() => router.push("/vendor/menu/new")}
                >
                  Add First Menu
                </Button>
              </div>
            ) : (
              <Column gap="gap-4">
                {filteredMenus.map((menu) => (
                  <div key={menu.id}>
                    <div className="flex gap-3">
                      {/* Menu Image */}
                      <div
                        className="cursor-pointer"
                        onClick={() => handleMenuClick(menu.id)}
                      >
                        <Image
                          src={menu.imageUrl || images.jollofRice}
                          alt={menu.name}
                          width={100}
                          height={100}
                          className="w-25 h-26 rounded-3xl object-cover"
                        />
                      </div>

                      {/* Menu Details */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div
                          className="cursor-pointer"
                          onClick={() => handleMenuClick(menu.id)}
                        >
                          <h3 className="font-semibold text-sm">{menu.name}</h3>
                          <p className="text-xs text-gray-600 line-clamp-2">
                            {menu.description}
                          </p>
                        </div>

                        <Row justifyContent="between" className="pt-3">
                          <div>
                            <p className="font-semibold text-sm">
                              ₦{menu.basePrice?.toFixed(2)}
                            </p>
                            <p
                              className={`text-xs ${menu.available ? "text-green-600" : "text-red-600"}`}
                            >
                              {menu.available ? "Available" : "Unavailable"}
                            </p>
                          </div>
                          <div className="self-end">
                            <Button
                              className="!w-15 !h-3 !rounded-2xl !flex !items-center !justify-center !text-xs !bg-[#000000] !text-[#EDE7B5]"
                              onClick={() => handleDeleteClick(menu)}
                            >
                              Delete
                            </Button>
                          </div>
                        </Row>
                      </div>
                    </div>
                    <div className="w-full h-px bg-gray-400 opacity-30 mt-4"></div>
                  </div>
                ))}
              </Column>
            )}
          </div>
        </>
      )}
    </div>
  );
}
