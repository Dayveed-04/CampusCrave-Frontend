"use client";

import { BaseFieldSet } from "@/components/baseField";
import { BaseInput } from "@/components/baseInput";
import Button from "@/components/button";
import { Column, Row } from "@/components/flex";
import OptionGroupsInline from "@/components/optionGroupsModal";
import { RadioButton } from "@/components/radioButton";
import ToggleButton from "@/components/toggleButton";
import Toast from "@/components/toast";
import { images } from "@/constants/image";
import { useToast } from "@/hooks/useToast";
import { fetchCategories } from "@/utils/endpoints/Category/getCategories";
import { updateMenu } from "@/utils/endpoints/Vendors/updateMenu";
import { getVendorMenu } from "@/utils/endpoints/Vendors/getVendorMenu";
import { uploadImageToCloudinary } from "@/utils/services/cloudinary";

import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function VendorEditMenu() {
  const router = useRouter();
  const { id } = useParams();
  const { toast, showToast, hideToast } = useToast();
  const fileInputRef = useRef(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    basePrice: "",
    imageUrl: "",
    available: true,
    categoryId: null,
  });

  // UI state
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [optionGroups, setOptionGroups] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Load categories and existing menu data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Fetch categories and existing menu data in parallel
        const [categoriesResponse, menuResponse] = await Promise.all([
          fetchCategories(),
          getVendorMenu(id),
        ]);

        // Set categories
        if (categoriesResponse.status && categoriesResponse.data.categories) {
          setCategories(categoriesResponse.data.categories);
        } else if (Array.isArray(categoriesResponse)) {
          setCategories(categoriesResponse);
        }

        // Pre-fill form with existing menu data
        if (menuResponse.status === "success") {
          const menu = menuResponse.data.menu;

          setFormData({
            name: menu.name || "",
            description: menu.description || "",
            basePrice: menu.basePrice || "",
            imageUrl: menu.imageUrl || "",
            available: menu.available ?? true,
            categoryId: menu.categoryId || null,
          });

          // Set image preview from existing URL
          if (menu.imageUrl) {
            setImagePreview(menu.imageUrl);
          }

          // Map existing option groups to component format
          if (menu.optionGroups && menu.optionGroups.length > 0) {
            const mappedGroups = menu.optionGroups.map((group) => ({
              id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              groupName: group.name,
              isRequired: group.required,
              allowMultiple: false,
              items: group.options.map((opt) => ({
                id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                name: opt.name,
                price: opt.price,
              })),
            }));
            setOptionGroups(mappedGroups);
          }
        }
      } catch (error) {
        console.error("Failed to load menu data:", error);
        showToast("Failed to load menu data", "error");
      } finally {
        setLoading(false);
      }
    };

    if (id) loadData();
  }, [id]);

  // Handle image file selection
  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      showToast("Only JPEG, PNG, and WebP images are allowed", "error");
      return;
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      showToast("Image size must be less than 10MB", "error");
      return;
    }

    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleImageAreaClick = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCategorySelect = (categoryId) => {
    setFormData((prev) => ({ ...prev, categoryId }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      showToast("Meal name is required", "warning");
      return false;
    }
    if (!formData.basePrice || parseFloat(formData.basePrice) <= 0) {
      showToast("A valid price is required", "warning");
      return false;
    }
    if (!formData.description.trim()) {
      showToast("Description is required", "warning");
      return false;
    }
    if (!formData.categoryId) {
      showToast("Please select a category", "warning");
      return false;
    }
    if (!formData.imageUrl && !imageFile) {
      showToast("Please upload a meal image", "warning");
      return false;
    }

    if (optionGroups && optionGroups.length > 0) {
      for (const group of optionGroups) {
        if (!group.groupName || !group.groupName.trim()) {
          showToast("All option groups must have a name", "warning");
          return false;
        }
        if (!group.items || group.items.length === 0) {
          showToast(
            `Option group "${group.groupName}" must have at least one option`,
            "warning",
          );
          return false;
        }
        for (const item of group.items) {
          if (!item.name || !item.name.trim()) {
            showToast(
              `All options in "${group.groupName}" must have a name`,
              "warning",
            );
            return false;
          }
          if (
            item.price === undefined ||
            item.price === null ||
            parseFloat(item.price) < 0
          ) {
            showToast(
              `All options in "${group.groupName}" must have a valid price`,
              "warning",
            );
            return false;
          }
        }
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setSubmitting(true);

    try {
      let imageUrl = formData.imageUrl;

      // Upload new image only if a new file was selected
      if (imageFile) {
        setUploading(true);
        showToast("Uploading image...", "info");

        const uploadResult = await uploadImageToCloudinary(imageFile);

        if (!uploadResult.success) {
          throw new Error(uploadResult.error || "Failed to upload image");
        }

        imageUrl = uploadResult.imageUrl;
        setUploading(false);
      }

      const menuData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        basePrice: parseFloat(formData.basePrice),
        imageUrl,
        available: formData.available,
        categoryId: formData.categoryId,
        optionGroups: optionGroups.map((group) => ({
          name: group.groupName.trim(),
          required: group.isRequired,
          options: group.items.map((item) => ({
            name: item.name.trim(),
            price: parseFloat(item.price),
          })),
        })),
      };

      const response = await updateMenu(menuData, id);

      if (response.status === "success") {
        showToast("✓ Menu updated successfully!", "success");
        setTimeout(() => {
          router.push("/vendor/menu");
        }, 1500);
      } else {
        throw new Error("Failed to update menu");
      }
    } catch (error) {
      console.error("Error updating menu:", error);
      showToast(error.message || "Failed to update menu", "error");
    } finally {
      setSubmitting(false);
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans">
        <p className="text-sm text-gray-500">Loading menu...</p>
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
      <div className="w-full flex flex-row mb-1 mt-1">
        <div
          className="text-black self-start cursor-pointer"
          onClick={() => router.back()}
        >
          <Image
            src={images.icons.backArrow}
            alt="Back"
            width={25}
            height={25}
          />
        </div>
        <h2 className="text-2xl font-semibold text-center w-full text-base font-sans">
          Edit Meal
        </h2>
      </div>
      <div className="w-full h-px bg-gray-400 opacity-30 mb-4"></div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleImageSelect}
        className="hidden"
      />

      {/* Image Upload Area */}
      <div
        className={`bg-[#FFFCE2] rounded-2xl p-6 m-3 cursor-pointer hover:bg-[#FFF9CC] transition-colors ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={uploading ? undefined : handleImageAreaClick}
      >
        {imagePreview ? (
          <Column gap="gap-3">
            <Row justifyContent="center">
              <Image
                src={imagePreview}
                alt="Preview"
                width={200}
                height={200}
                className="rounded-xl object-cover"
              />
            </Row>
            <div className="text-center">
              <h3 className="font-bold text-sm pb-1">Image Selected</h3>
              <p className="text-xs opacity-70">Tap to change image</p>
            </div>
          </Column>
        ) : (
          <Column gap="gap-3">
            <Row justifyContent="center">
              <Image
                src={images.icons.GalleryIcon}
                alt="Upload"
                width={45}
                height={25}
              />
            </Row>
            <div className="text-center">
              <h3 className="font-bold text-sm pb-1">Upload Meal Photo</h3>
              <p className="text-xs opacity-70 pb-4">
                Tap to select or drag a high quality image of the dish
              </p>
            </div>
          </Column>
        )}
      </div>

      {/* Form Fields */}
      <Column gap="gap-2">
        <h2 className="font-bold px-4">Meal Details</h2>

        {/* Meal Name */}
        <BaseFieldSet className="px-4">
          <label className="text-xs font-semibold text-black">
            Meal Name *
          </label>
          <BaseInput
            placeholder="e.g Jollof Rice"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </BaseFieldSet>

        {/* Price */}
        <BaseFieldSet className="px-4">
          <label className="text-xs font-semibold text-black">Price *</label>
          <BaseInput
            type="number"
            placeholder="₦0.00"
            value={formData.basePrice}
            onChange={(e) => handleInputChange("basePrice", e.target.value)}
          />
        </BaseFieldSet>

        {/* Description */}
        <BaseFieldSet className="px-4">
          <label className="text-xs font-semibold text-black">
            Description *
          </label>
          <BaseInput
            placeholder="Give a brief description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            maxLength={250}
          />
          <p className="text-xs opacity-50">
            {formData.description.length}/250 characters
          </p>
        </BaseFieldSet>

        {/* Category Selection */}
        <h2 className="font-bold px-4">Meal Category *</h2>
        <div className="bg-[#FFFFFF] rounded-2xl p-2 m-3">
          <Column gap="gap-3" className="items-center px-3 py-2">
            {categories.length > 0 ? (
              categories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center justify-between w-full"
                >
                  <span className="text-xs font-semibold">{cat.name}</span>
                  <div className="cursor-pointer">
                    <RadioButton
                      selected={formData.categoryId === cat.id}
                      onClick={() => handleCategorySelect(cat.id)}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs">No categories available</p>
            )}
          </Column>
        </div>

        {/* Option Groups */}
        <OptionGroupsInline
          optionGroups={optionGroups}
          setOptionGroups={setOptionGroups}
        />

        {/* Availability Toggle */}
        <div className="bg-[#FFFCE2] rounded-2xl p-4 w-72 mx-auto mt-7">
          <Row gap="gap-4" justifyContent="between">
            <h2 className="text-sm font-semibold">
              Available:{" "}
              <span className="ml-2 font-semibold">
                {formData.available ? "Yes" : "No"}
              </span>
            </h2>
            <ToggleButton
              checked={formData.available}
              onChange={(checked) => handleInputChange("available", checked)}
            />
          </Row>
          <p className="text-xs text-gray-600">
            {formData.available
              ? "This meal will be visible to students"
              : "This meal will be hidden from students"}
          </p>
        </div>

        {/* Submit Button */}
        <div className="px-2 py-3 flex justify-center">
          <Button
            className="!w-70 bg-black !text-[#EDE7B5] !rounded-2xl font-bold !text-white disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSubmit}
            disabled={submitting || uploading}
          >
            {uploading
              ? "Uploading Image..."
              : submitting
                ? "Saving Changes..."
                : "Save Edited Menu"}
          </Button>
        </div>
      </Column>
    </div>
  );
}
