
"use client";

import { BaseInput } from "@/components/baseInput";

import Button from "@/components/button";
import { Column, Row } from "@/components/flex";
import { images } from "@/constants/image";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getCart,
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
  getCartSummary,
  formatCartForOrder,
} from "@/utils/services/cartManagement";
import { BaseFieldSet } from "@/components/baseField";
import {
  createOrder,
  createOrders,
} from "@/utils/endpoints/Orders/studentCreateOrder";
import { payOrder } from "@/utils/endpoints/Payment/payOrder";

export default function OrdersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState(tabParam || "My cart");
  const [cart, setCart] = useState(null);
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Load cart on mount and when tab changes
  useEffect(() => {
    if (activeTab === "My cart") {
      loadCart();
    }
  }, [activeTab]);

  // Set active tab from URL param
  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const loadCart = () => {
    const currentCart = getCart();
    setCart(currentCart);
  };

  const handleQuantityChange = (itemIndex, change) => {
    const item = cart.items[itemIndex];
    const newQuantity = item.quantity + change;

    if (newQuantity < 1) return;

    updateCartItemQuantity(itemIndex, newQuantity);
    loadCart();
  };

  const handleRemoveItem = (itemIndex) => {
    const confirmed = confirm("Remove this item from cart?");
    if (confirmed) {
      removeFromCart(itemIndex);
      loadCart();
    }
  };

  const handleClearCart = () => {
    const confirmed = confirm("Clear entire cart?");
    if (confirmed) {
      clearCart();
      loadCart();
    }
  };

  const handleCheckout = async () => {
    // Validation
    if (!cart || cart.items.length === 0) {
      alert("Your cart is empty");
      return;
    }

    if (!deliveryLocation.trim()) {
      alert("Please enter delivery location");
      return;
    }

    setIsCheckingOut(true);

    try {
      // Step 1: Create order
      console.log("Creating order...");
      const orderData = formatCartForOrder(deliveryLocation, deliveryNotes);
      const orderResponse = await createOrder(orderData);

      if (!orderResponse.status === "success" || !orderResponse.data) {
        throw new Error("Failed to create order");
      }

      const orderId = orderResponse.data.id;
      console.log("Order created:", orderId);

      // Step 2: Initiate payment
      console.log("Initiating payment...");
      const paymentResponse = await payOrder(orderId);

      if (
        !paymentResponse.status === "success" ||
        !paymentResponse.data?.authorizationUrl
      ) {
        throw new Error("Failed to initiate payment");
      }

      // Step 3: Clear cart and redirect to Paystack
      clearCart();
      console.log("Redirecting to Paystack...");
      window.location.href = paymentResponse.data.authorizationUrl;
    } catch (error) {
      console.error("Checkout error:", error);
      alert(error.message || "Failed to checkout. Please try again.");
      setIsCheckingOut(false);
    }
  };

  const summary = getCartSummary();

  const steps = [
    { time: "10:25pm", label: "Order Placed", done: true },
    { time: "10:30pm", label: "Order Confirmed", done: true },
    { time: "10:40pm", label: "Order Pending", done: true },
    { time: "11:00pm", label: "Delivering", done: true },
    { time: "11:30pm", label: "Delivered", done: false },
  ];

  return (
    <div className="min-h-screen">
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
        <h2 className="text-2xl font-semibold text-center w-full text-base">
          Orders
        </h2>
      </div>
      <div className="w-full h-px bg-gray-400 opacity-30 mb-4"></div>

      <Row gap="gap-2" className="px-3" justifyContent="between">
        {["My cart", "Ongoing", "Completed"].map((tab) => (
          <Button
            key={tab}
            backgroundColor={activeTab === tab ? "bg-black" : "bg-[#FFFCE2]"}
            color={activeTab === tab ? "text-[#EDE7B5]" : "text-black"}
            width="auto"
            className="whitespace-nowrap !px-4 !py-1 text-md !rounded-3xl"
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Button>
        ))}
      </Row>

      <div>
        {activeTab === "My cart" && (
          <div className="px-3 py-4 mb-6">
            <h2 className="text-sm font-bold mb-4 font-sans">Order Summary</h2>

            {/* Cart Items */}
            {cart && cart.items.length > 0 ? (
              <>
                {cart.items.map((item, index) => (
                  <div
                    key={index}
                    className="bg-[#FFFCE2] rounded-3xl p-4 mb-4 mr-2"
                  >
                    <div className="flex gap-3">
                      <Image
                        src={item.menuImage || images.jollofRice}
                        alt={item.menuName}
                        width={72}
                        height={68}
                        className="w-18 h-17 rounded-xl object-cover"
                      />

                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <h3 className="font-bold text-sm">{item.menuName}</h3>
                          <p className="text-xs text-gray-600">
                            {cart.vendorName}
                          </p>
                          {/* Show selected options */}
                          {item.selectedOptions &&
                            item.selectedOptions.length > 0 && (
                              <p className="text-xs text-gray-500 mt-1">
                                {item.selectedOptions
                                  .map((opt) => opt.optionName)
                                  .join(", ")}
                              </p>
                            )}
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleQuantityChange(index, -1)}
                            className="!w-5 !h-5 !rounded-full !border !border-gray-400 !flex !items-center !justify-center !text-xs bg-transparent !text-gray-400"
                          >
                            −
                          </button>
                          <span className="text-xs">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(index, 1)}
                            className="!w-5 !h-5 !rounded-full !border !border-gray-400 !flex !items-center !justify-center !text-xs bg-transparent !text-gray-400"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-between">
                        <span className="font-bold text-sm">
                          ₦{item.totalPrice.toFixed(2)}
                        </span>
                        <Image
                          src={images.icons.TrashIcon}
                          alt="Remove"
                          width={20}
                          height={20}
                          className="cursor-pointer"
                          onClick={() => handleRemoveItem(index)}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {/* Delivery Information */}
                <Column gap="gap-4" className="mb-5">
                  <div>
                    <p className="text-sm font-medium mb-2">
                      Delivery Location *
                    </p>
                    <BaseFieldSet>
                      <BaseInput
                        type="text"
                        name="location"
                        placeholder="E.g. Room 12, Campus Hostel"
                        value={deliveryLocation}
                        onChange={(e) => setDeliveryLocation(e.target.value)}
                        required
                        icon={
                          <svg
                            className="w-5 h-5 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 21s-6-5.686-6-10a6 6 0 1112 0c0 4.314-6 10-6 10z"
                            />
                            <circle cx="12" cy="11" r="2.5" strokeWidth={2} />
                          </svg>
                        }
                      />
                    </BaseFieldSet>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">
                      Delivery Notes (Optional)
                    </p>
                    <BaseFieldSet>
                      <BaseInput
                        type="text"
                        name="notes"
                        placeholder="E.g. Leave at the reception"
                        value={deliveryNotes}
                        onChange={(e) => setDeliveryNotes(e.target.value)}
                      />
                    </BaseFieldSet>
                  </div>
                </Column>

                {/* Add More Items */}
                <div className="mb-5 mr-2">
                  <Button
                    className="w-full py-2 !bg-[#FFFCE2] !text-black !rounded-4xl font-medium text-sm"
                    onClick={() => router.push("/student/menus")}
                  >
                    Add More Items
                  </Button>
                </div>

                <div className="w-full h-px bg-gray-400 opacity-30 mb-3"></div>

                {/* Promo Code - Skip for now */}
                <div className="mb-5">
                  <h2 className="text-sm font-bold mb-3">Discount Coupon</h2>
                  <Row className="space-x-3 mr-2">
                    <BaseInput
                      type="text"
                      placeholder="Promo Code"
                      className="!bg-[#FFFCE2] !rounded-4xl text-sm placeholder-gray-400 focus:outline-none"
                      disabled
                    />
                    <Button
                      className="!bg-black !text-[#EDE7B5] !rounded-4xl text-xs flex-shrink-3"
                      disabled
                    >
                      Apply
                    </Button>
                  </Row>
                  <p className="text-xs text-gray-500 mt-1">Coming soon</p>
                </div>

                <div className="w-full h-px bg-gray-400 opacity-30 mb-4"></div>

                {/* Price Summary */}
                <div className="space-y-2 mr-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs">Sub total</span>
                    <span className="text-xs font-medium">
                      ₦{summary.subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs">Delivery fees</span>
                    <span className="text-xs font-medium">
                      ₦{summary.deliveryFee.toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full h-px bg-gray-400 opacity-30 mt-3"></div>
                  <div className="pt-2 flex justify-between items-center">
                    <span className="font-bold text-sm">Total</span>
                    <span className="font-bold text-sm">
                      ₦{summary.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <div className="px-4 py-3 flex-shrink-0">
                  <Button
                    className="w-full py-3 bg-black !text-[#EDE7B5] !rounded-4xl font-bold"
                    onClick={handleCheckout}
                    disabled={isCheckingOut || !deliveryLocation.trim()}
                  >
                    {isCheckingOut ? "Processing..." : "Checkout"}
                  </Button>
                </div>
              </>
            ) : (
              // Empty Cart
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">Your cart is empty</p>
                <Button
                  className="!bg-black !text-[#EDE7B5] !rounded-4xl"
                  onClick={() => router.push("/student/menus")}
                >
                  Browse Menus
                </Button>
              </div>
            )}
          </div>
        )}

        {activeTab === "Ongoing" && (
          <div>
            <div className="px-4 py-3">
              <h2 className="text-sm font-bold mb-2 font-sans">
                Order details
              </h2>
            </div>
            <Column>
              {steps.map((step, index) => (
                <Row
                  key={index}
                  className="flex space-x-3 items-center px-3 py-2"
                >
                  <span className="text-xs">{step.time}</span>
                  <Image
                    src={
                      step.done
                        ? images.icons.TrackingDarkIcon
                        : images.icons.TickCircleIcon
                    }
                    alt="Status"
                    width={13}
                    height={13}
                  />
                  <span className="text-xs font-semibold font-medium">
                    {step.label}
                  </span>
                </Row>
              ))}
            </Column>
          </div>
        )}

        {activeTab === "Completed" && (
          <div className="font-sans px-3 py-3">
            <Column gap="gap-4">
              <div className="bg-[#FFFCE2] rounded-2xl p-4 mr-1">
                <Row justifyContent="between">
                  <h3 className="font-bold text-sm">#ORD-001</h3>
                  <div>
                    <p className="text-xs mb-3">10:00pm</p>
                  </div>
                </Row>

                <Row>
                  <p className="text-xs opacity-70 mb-3">Babcock Guest House</p>
                </Row>

                <Row>
                  <p className="text-sm font-semibold mb-6">
                    1x Jollof rice, 1x Tofu and 1x Coke
                  </p>
                </Row>

                <Row justifyContent="between">
                  <h3 className="font-bold text-sm">₦8.00</h3>
                </Row>
              </div>
            </Column>
          </div>
        )}
      </div>
    </div>
  );
}
