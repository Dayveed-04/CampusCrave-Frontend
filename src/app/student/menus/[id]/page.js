"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Button from "@/components/button";
import { Row } from "@/components/flex";
import { CheckButton } from "@/components/checkButton";
import { images } from "@/constants/image";
import Image from "next/image";

import { addToCart, clearCart } from "@/utils/services/cartManagement";
import ConfirmModal from "@/components/confirmModal";
import { useToast } from "@/hooks/useToast";
import { getAMenu } from "@/utils/endpoints/Students/getAMenu";
import Toast from "@/components/toast";

export default function StudentVendorsMenu() {
  const params = useParams();
  const router = useRouter();
  const menuId = params.id;
  const { toast, showToast, hideToast } = useToast();

  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [addingToCart, setAddingToCart] = useState(false);
  const [vendorConflict, setVendorConflict] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      if (!menuId) {
        setError("No menu ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await getAMenu(menuId);

        if (response.success) {
          setMenu(response.data);
        } else {
          setError("Failed to load menu");
        }
      } catch (err) {
        console.error("Error fetching menu:", err);
        setError(err.message || "Failed to load menu");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [menuId]);

  // Handle option selection
  const handleOptionToggle = (optionGroupId, optionId, isRequired) => {
    setSelectedOptions((prev) => {
      const newSelections = { ...prev };

      // Get current selections for this group (create NEW array to avoid mutation)
      const currentSelections = newSelections[optionGroupId]
        ? [...newSelections[optionGroupId]] // ← Copy the array!
        : [];

      // Check if option is already selected
      const index = currentSelections.indexOf(optionId);

      if (index > -1) {
        // Remove if already selected
        currentSelections.splice(index, 1);

        // Remove key if array is empty
        if (currentSelections.length === 0) {
          delete newSelections[optionGroupId];
        } else {
          newSelections[optionGroupId] = currentSelections; // ← Assign new array
        }
      } else {
        // Add if not selected
        currentSelections.push(optionId);
        newSelections[optionGroupId] = currentSelections; // ← Assign new array
      }

      return newSelections;
    });
  };

  const calculateTotal = () => {
    if (!menu) return 0;

    let total = menu.basePrice * quantity;

    Object.entries(selectedOptions).forEach(([groupId, optionIds]) => {
      const group = menu.optionGroups.find((g) => g.id === parseInt(groupId));
      if (group) {
        optionIds.forEach((optionId) => {
          const option = group.options.find((o) => o.id === optionId);
          if (option) {
            total += option.price * quantity;
          }
        });
      }
    });

    return total;
  };
  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };
  const canAddToCart = () => {
    if (!menu) return false;

    const requiredGroups = menu.optionGroups.filter((g) => g.required);
    return requiredGroups.every(
      (group) =>
        selectedOptions[group.id] && selectedOptions[group.id].length > 0,
    );
  };

  // Handle vendor conflict confirmation
  const handleVendorConflictConfirm = () => {
    if (!vendorConflict) return;

    clearCart();
    const retryResult = addToCart(vendorConflict.cartItem);

    if (retryResult.success) {
      showToast("✓ Added to cart!", "success");
      setTimeout(() => {
        router.push("/student/orders");
      }, 1500);
    } else {
      showToast(retryResult.message || "Failed to add to cart", "error");
    }

    setVendorConflict(null);
    setAddingToCart(false);
  };

  const handleVendorConflictCancel = () => {
    setVendorConflict(null);
    setAddingToCart(false);
  };

  // Handle add to cart
  const handleAddToCart = () => {
    if (!menu) {
      showToast("Menu data not loaded", "error");
      return;
    }

    if (!canAddToCart()) {
      showToast("Please select all required options", "warning");
      return;
    }

    setAddingToCart(true);

    try {
      // Build cart item
      const selectedOptionsArray = [];
      Object.entries(selectedOptions).forEach(([groupId, optionIds]) => {
        const group = menu.optionGroups.find((g) => g.id === parseInt(groupId));
        optionIds.forEach((optionId) => {
          const option = group?.options.find((o) => o.id === optionId);
          selectedOptionsArray.push({
            groupId: parseInt(groupId),
            groupName: group?.name,
            optionId,
            optionName: option?.name,
            price: option?.price || 0,
          });
        });
      });

      const cartItem = {
        menuId: menu.id,
        menuName: menu.name,
        menuImage: menu.imageUrl,
        vendorId: menu.vendor.id,
        vendorName: menu.vendor.name,
        quantity,
        basePrice: menu.basePrice,
        selectedOptions: selectedOptionsArray,
        totalPrice: calculateTotal(),
      };

      // Add to cart
      const result = addToCart(cartItem);

      if (result.success) {
        showToast("✓ Added to cart!", "success");

        // Navigate to cart after a short delay
        setTimeout(() => {
          router.push("/student/orders");
        }, 1500);
      } else if (result.isVendorConflict) {
        // Show vendor conflict modal
        setVendorConflict({
          currentVendor: result.currentVendor,
          newVendor: result.newVendor,
          cartItem,
        });
      } else {
        showToast(result.message || "Failed to add to cart", "error");
        setAddingToCart(false);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      showToast("Failed to add to cart", "error");
      setAddingToCart(false);
    }
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

      {/* Vendor Conflict Modal */}
      <ConfirmModal
        isOpen={!!vendorConflict}
        onClose={handleVendorConflictCancel}
        onConfirm={handleVendorConflictConfirm}
        title="Different Vendor"
        message={`Your cart has items from ${vendorConflict?.currentVendor}. You can only order from one vendor at a time. Clear cart to order from ${vendorConflict?.newVendor}?`}
        confirmText="Clear Cart & Continue"
        cancelText="Cancel"
        confirmColor="bg-red-600"
        confirmTextColor="text-white"
      />

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
        <h2 className="text-2xl font-semibold text-center w-full mr-6 text-base">
          {menu?.vendor?.name || "Vendor"}
        </h2>
        <div
          className="text-black cursor-pointer pr-3"
          onClick={() => router.push("/student/orders")}
        >
          <Image
            src={images.icons.OrderIcon}
            alt="Orders"
            width={25}
            height={25}
          />
        </div>
      </div>

      <div className="w-full h-px bg-gray-400 opacity-30 mb-4"></div>

      {/* Menu Item Details */}
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
              <h3 className="font-bold text-medium">{menu.name}</h3>
              <p className="text-xs text-gray-600">{menu.description}</p>
              <div className="flex justify-between items-center">
                <h3 className="py-3 font-bold text-medium">
                  ₦{menu.basePrice.toFixed(2)}
                </h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="!w-5 !h-5 !rounded-full !border !border-gray-400 !flex !items-center !justify-center !text-xs bg-transparent !text-gray-400"
                  >
                    −
                  </button>
                  <span className="text-xs">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="!w-5 !h-5 !rounded-full !border !border-gray-400 !flex !items-center !justify-center !text-xs bg-transparent !text-gray-400"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-gray-500 opacity-30 mb-1"></div>

      {/* Option Groups */}
      {menu.optionGroups &&
        menu.optionGroups.length > 0 &&
        menu.optionGroups.map((group) => (
          <div key={group.id} className="mb-4">
            <h3 className="px-3 py-1 font-bold text-xs flex items-center gap-2">
              <span>{group.name}</span>
              {group.required && (
                <span className="text-red-500 text-xs font-normal">
                  (Required)
                </span>
              )}
            </h3>
            <div className="bg-[#FFFCE2]">
              {group.options.map((option) => (
                <Row
                  key={option.id}
                  className="items-center px-3 py-2"
                  justifyContent="between"
                >
                  <span className="text-xs">{option.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium">
                      +₦{option.price.toFixed(2)}
                    </span>
                    <div
                      className="cursor-pointer"
                      onClick={() =>
                        handleOptionToggle(group.id, option.id, group.required)
                      }
                    >
                      <CheckButton
                        selected={selectedOptions[group.id]?.includes(
                          option.id,
                        )}
                      />
                    </div>
                  </div>
                </Row>
              ))}
            </div>
          </div>
        ))}

      {/* Footer */}
      <div className="w-full h-px opacity-30 bg-gray-400"></div>
      <div className="flex justify-between items-center px-2 py-2">
        <h2 className="px-3 py-1 font-bold text-medium">
          Total: ₦{calculateTotal().toFixed(2)}
        </h2>
        <div>
          <Button
            onClick={handleAddToCart}
            disabled={!canAddToCart() || addingToCart}
            className="justify-end !w-35 !py-1 bg-black !text-[#EDE7B5] !rounded-3xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {addingToCart ? "Adding..." : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
}
