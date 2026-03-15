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

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { uploadImageToCloudinary } from "@/utils/services/cloudinary";
import { createMenu } from "@/utils/endpoints/Vendors/createMenu";

export default function VendorAddMenu() {
  const router = useRouter();
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

  // Load categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const response = await fetchCategories();
        if (response.status && response.data.categories) {
          setCategories(response.data.categories);
        } else if (Array.isArray(response)) {
          setCategories(response);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        showToast("Failed to load categories", "error");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  // Handle image file selection
  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      showToast("Only JPEG, PNG, and WebP images are allowed", "error");
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      showToast("Image size must be less than 10MB", "error");
      return;
    }

    setImageFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Handle image upload area click
  const handleImageAreaClick = () => {
    fileInputRef.current?.click();
  };

  // Handle form field changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    setFormData((prev) => ({
      ...prev,
      categoryId,
    }));
  };
  const validateForm = () => {
    // ... (keep name, price, description, category, image checks)

    // Validate option groups (ONLY if there are any)
    if (optionGroups && optionGroups.length > 0) {
      for (const group of optionGroups) {
        // Check group has a name
        if (!group.groupName || !group.groupName.trim()) {
          // ← Changed to groupName
          showToast("All option groups must have a name", "warning");
          return false;
        }

        // Check group has items
        if (!group.items || group.items.length === 0) {
          // ← Changed to items
          showToast(
            `Option group "${group.groupName}" must have at least one option`,
            "warning",
          );
          return false;
        }

        // Check each item
        for (const item of group.items) {
          // ← Changed to items
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

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setSubmitting(true);

    try {
      let imageUrl = formData.imageUrl;

      // Upload image if file is selected
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

      // Prepare menu data
      const menuData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        basePrice: parseFloat(formData.basePrice),
        imageUrl,
        available: formData.available,
        categoryId: formData.categoryId,
        optionGroups: optionGroups.map((group) => ({
          name: group.groupName.trim(), // ← Changed to groupName
          required: group.isRequired, // ← Changed to isRequired
          options: group.items.map((item) => ({
            // ← Changed to items
            name: item.name.trim(),
            price: parseFloat(item.price),
          })),
        })),
      };

      // Create menu
      const response = await createMenu(menuData);

      if (response.status === "success") {
        showToast("✓ Menu created successfully!", "success");

        // Redirect to menus list after delay
        setTimeout(() => {
          router.push("/vendor/menu");
        }, 1500);
      } else {
        throw new Error("Failed to create menu");
      }
    } catch (error) {
      console.error("Error creating menu:", error);
      showToast(error.message || "Failed to create menu", "error");
    } finally {
      setSubmitting(false);
      setUploading(false);
    }
  };

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
          Add a Meal
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
                Click here to upload image 
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
            {loading ? (
              <p className="text-xs">Loading categories...</p>
            ) : categories.length > 0 ? (
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
                ? "Creating Menu..."
                : "Add Meal to Menu"}
          </Button>
        </div>
      </Column>
    </div>
  );
}
