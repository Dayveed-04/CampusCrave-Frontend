
"use client";

import { BaseInput } from "@/components/baseInput";
import Button from "@/components/button";
import { Column, Row } from "@/components/flex";
import { images } from "@/constants/image";
import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
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
import { getStudentOrders } from "@/utils/endpoints/Orders/studentgetAllOrders";
import { trackStudentOrder } from "@/utils/endpoints/Orders/studentTrackOrder";
import { createOrder } from "@/utils/endpoints/Orders/studentCreateOrder";
import { payOrder } from "@/utils/endpoints/Payment/payOrder";

const STATUS_STEPS = [
  { key: "PAID", label: "Order Paid" },
  { key: "CONFIRMED", label: "Order Confirmed" },
  { key: "PREPARING", label: "Preparing" },
  { key: "DELIVERING", label: "Out for Delivery" },
  { key: "DELIVERED", label: "Delivered" },
];

const STATUS_ORDER = [
  "PAID",
  "CONFIRMED",
  "PREPARING",
  "DELIVERING",
  "DELIVERED",
];
const ONGOING_STATUSES = ["PAID", "CONFIRMED", "PREPARING", "DELIVERING"];
const COMPLETED_STATUSES = ["DELIVERED", "CANCELLED"];

const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatFullDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatDateTime = (dateString) => {
  return new Date(dateString).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

function TabInitializer({ setActiveTab }) {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  useEffect(() => {
    if (tabParam) setActiveTab(tabParam);
  }, [tabParam]);

  return null;
}

// Reusable tracking timeline component
function TrackingTimeline({ trackingData, currentStatus }) {
  const getStepStatus = (stepKey, status) => {
    if (status === "CANCELLED") return "cancelled";
    const currentIndex = STATUS_ORDER.indexOf(status);
    const stepIndex = STATUS_ORDER.indexOf(stepKey);
    if (stepIndex <= currentIndex) return "done";
    return "pending";
  };

  const getStepTimestamp = (stepKey, statusHistory) => {
    if (!statusHistory) return null;
    const record = statusHistory.find((h) => h.status === stepKey);
    return record ? record.createdAt : null;
  };

  const status = trackingData?.status || currentStatus;
  const history = trackingData?.statusHistory || [];

  return (
    <Column>
      {STATUS_STEPS.map((step, index) => {
        const stepStatus = getStepStatus(step.key, status);
        const isDone = stepStatus === "done";
        const timestamp = getStepTimestamp(step.key, history);

        return (
          <Row
            key={index}
            className="flex space-x-3 items-center px-1 py-3 border-b border-gray-100"
          >
            <div
              className={`w-3 h-3 rounded-full flex-shrink-0 ${
                isDone ? "bg-black" : "bg-gray-300"
              }`}
            />
            <div className="flex-1">
              <span
                className={`text-xs font-semibold ${
                  isDone ? "text-black" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
              {isDone && timestamp && (
                <p className="text-xs text-gray-400 mt-0.5">
                  {formatDateTime(timestamp)}
                </p>
              )}
            </div>
            {isDone && <span className="text-xs text-gray-500">✓</span>}
          </Row>
        );
      })}
    </Column>
  );
}

export default function OrdersPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("My cart");
  const [cart, setCart] = useState(null);
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const [ongoingOrders, setOngoingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [trackingData, setTrackingData] = useState(null);
  const [trackingLoading, setTrackingLoading] = useState(false);

  useEffect(() => {
    if (activeTab === "My cart") {
      loadCart();
    } else if (activeTab === "Ongoing" || activeTab === "Completed") {
      loadOrders();
    }
  }, [activeTab]);

  const loadCart = () => {
    const currentCart = getCart();
    setCart(currentCart);
  };

  const loadOrders = async () => {
    try {
      setOrdersLoading(true);
      const response = await getStudentOrders();
      if (response.status === "success") {
        setOngoingOrders(
          response.data.filter((o) => ONGOING_STATUSES.includes(o.status)),
        );
        setCompletedOrders(
          response.data.filter((o) => COMPLETED_STATUSES.includes(o.status)),
        );
      }
    } catch (error) {
      console.error("Failed to load orders:", error);
    } finally {
      setOrdersLoading(false);
    }
  };

  const handleTrackOrder = async (order) => {
    setSelectedOrder(order);
    setTrackingLoading(true);
    try {
      const response = await trackStudentOrder(order.id);
      if (response.status === "success") {
        setTrackingData(response.data.order);
      }
    } catch (error) {
      console.error("Failed to track order:", error);
    } finally {
      setTrackingLoading(false);
    }
  };

  const handleBackToOrders = () => {
    setSelectedOrder(null);
    setTrackingData(null);
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

  const handleCheckout = async () => {
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
      const orderData = formatCartForOrder(deliveryLocation, deliveryNotes);
      const orderResponse = await createOrder(orderData);

      if (!orderResponse.status === "success" || !orderResponse.data) {
        throw new Error("Failed to create order");
      }

      const orderId = orderResponse.data.id;

      const paymentResponse = await payOrder(orderId, {
        callback_url: `${window.location.origin}/student/orders?tab=Ongoing`,
      });

      if (
        !paymentResponse.status === "success" ||
        !paymentResponse.data?.authorizationUrl
      ) {
        throw new Error("Failed to initiate payment");
      }

      clearCart();
      window.location.href = paymentResponse.data.authorizationUrl;
    } catch (error) {
      console.error("Checkout error:", error);
      alert(error.message || "Failed to checkout. Please try again.");
      setIsCheckingOut(false);
    }
  };

  const summary = getCartSummary();

  return (
    <div className="min-h-screen">
      <Suspense fallback={null}>
        <TabInitializer setActiveTab={setActiveTab} />
      </Suspense>

      <div className="w-full flex flex-row mb-1 mt-1">
        <div
          className="text-black self-start cursor-pointer"
          onClick={selectedOrder ? handleBackToOrders : () => router.back()}
        >
          <Image
            src={images.icons.backArrow}
            alt="Back"
            width={25}
            height={25}
          />
        </div>
        <h2 className="text-2xl font-semibold text-center w-full text-base">
          {selectedOrder ? "Track Order" : "Orders"}
        </h2>
      </div>
      <div className="w-full h-px bg-gray-400 opacity-30 mb-4"></div>

      {!selectedOrder && (
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
      )}

      <div>
        {/* MY CART TAB */}
        {activeTab === "My cart" && !selectedOrder && (
          <div className="px-3 py-4 mb-6">
            <h2 className="text-sm font-bold mb-4 font-sans">Order Summary</h2>
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

                <div className="mb-5 mr-2">
                  <Button
                    className="w-full py-2 !bg-[#FFFCE2] !text-black !rounded-4xl font-medium text-sm"
                    onClick={() => router.push("/student/menus")}
                  >
                    Add More Items
                  </Button>
                </div>

                <div className="w-full h-px bg-gray-400 opacity-30 mb-3"></div>

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

        {/* ONGOING TAB - ORDER LIST */}
        {activeTab === "Ongoing" && !selectedOrder && (
          <div className="px-3 py-4 mb-6 font-sans">
            {ordersLoading ? (
              <div className="text-center py-12">
                <p className="text-xs text-gray-500">Loading orders...</p>
              </div>
            ) : ongoingOrders.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-sm">No ongoing orders</p>
              </div>
            ) : (
              <Column gap="gap-4">
                {ongoingOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-[#FFFCE2] rounded-2xl p-4 mr-1"
                  >
                    <Row justifyContent="between">
                      <h3 className="font-bold text-sm">{order.orderCode}</h3>
                      <p className="text-xs">{formatTime(order.createdAt)}</p>
                    </Row>
                    <p className="text-xs opacity-70 mt-1 mb-2">
                      {order.vendor.name}
                    </p>
                    <p className="text-xs font-medium mb-2">
                      {order.orderItems
                        .map(
                          (item) => `${item.quantity}x ${item.menuItem.name}`,
                        )
                        .join(", ")}
                    </p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="font-bold text-sm">
                        ₦{order.totalAmount.toLocaleString()}
                      </span>
                      <div
                        className={`text-xs px-2 py-1 rounded-full ${
                          order.status === "PAID"
                            ? "bg-blue-100 text-blue-700"
                            : order.status === "CONFIRMED"
                              ? "bg-yellow-100 text-yellow-700"
                              : order.status === "PREPARING"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {order.status}
                      </div>
                    </div>
                    <Button
                      className="w-full mt-3 !py-2 !bg-black !text-[#EDE7B5] !rounded-2xl text-xs"
                      onClick={() => handleTrackOrder(order)}
                    >
                      Track Order
                    </Button>
                  </div>
                ))}
              </Column>
            )}
          </div>
        )}

        {/* TRACKING VIEW */}
        {activeTab === "Ongoing" && selectedOrder && (
          <div className="px-3 py-4 font-sans">
            <div className="bg-[#FFFCE2] rounded-2xl p-4 mb-4">
              <Row justifyContent="between">
                <h3 className="font-bold text-sm">{selectedOrder.orderCode}</h3>
                <p className="text-xs">
                  {formatFullDate(selectedOrder.createdAt)}
                </p>
              </Row>
              <p className="text-xs opacity-70 mt-1">
                {selectedOrder.vendor.name}
              </p>
              <p className="text-xs font-medium mt-1">
                {selectedOrder.orderItems
                  .map((item) => `${item.quantity}x ${item.menuItem.name}`)
                  .join(", ")}
              </p>
              <p className="font-bold text-sm mt-2">
                ₦{selectedOrder.totalAmount.toLocaleString()}
              </p>
            </div>

            <h2 className="text-sm font-bold mb-3">Order Tracking</h2>

            {trackingLoading ? (
              <p className="text-xs text-gray-500">Loading tracking info...</p>
            ) : (
              <TrackingTimeline
                trackingData={trackingData}
                currentStatus={selectedOrder.status}
              />
            )}
          </div>
        )}

        {/* COMPLETED TAB - ORDER LIST */}
        {activeTab === "Completed" && !selectedOrder && (
          <div className="font-sans px-3 py-3">
            {ordersLoading ? (
              <div className="text-center py-12">
                <p className="text-xs text-gray-500">Loading orders...</p>
              </div>
            ) : completedOrders.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-sm">No completed orders yet</p>
              </div>
            ) : (
              <Column gap="gap-4">
                {completedOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-[#FFFCE2] rounded-2xl p-4 mr-1"
                  >
                    <Row justifyContent="between">
                      <h3 className="font-bold text-sm">{order.orderCode}</h3>
                      <p className="text-xs">{formatTime(order.createdAt)}</p>
                    </Row>
                    <p className="text-xs opacity-70 mt-1 mb-2">
                      {order.vendor.name}
                    </p>
                    <p className="text-sm font-semibold mb-3">
                      {order.orderItems
                        .map(
                          (item) => `${item.quantity}x ${item.menuItem.name}`,
                        )
                        .join(", ")}
                    </p>
                    <Row justifyContent="between">
                      <h3 className="font-bold text-sm">
                        ₦{order.totalAmount.toLocaleString()}
                      </h3>
                      <div
                        className={`text-xs px-2 py-1 rounded-full ${
                          order.status === "DELIVERED"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {order.status}
                      </div>
                    </Row>
                    <Button
                      className="w-full mt-3 !py-2 !bg-[#FFFCE2] border border-gray-300 !text-black !rounded-2xl text-xs"
                      onClick={() => handleTrackOrder(order)}
                    >
                      View Details
                    </Button>
                  </div>
                ))}
              </Column>
            )}
          </div>
        )}

        {/* COMPLETED ORDER DETAILS VIEW */}
        {activeTab === "Completed" && selectedOrder && (
          <div className="px-3 py-4 font-sans">
            <div className="bg-[#FFFCE2] rounded-2xl p-4 mb-4">
              <Row justifyContent="between">
                <h3 className="font-bold text-sm">{selectedOrder.orderCode}</h3>
                <p className="text-xs">
                  {formatFullDate(selectedOrder.createdAt)}
                </p>
              </Row>
              <p className="text-xs opacity-70 mt-1">
                {selectedOrder.vendor.name}
              </p>
              <p className="text-xs font-medium mt-1">
                {selectedOrder.orderItems
                  .map((item) => `${item.quantity}x ${item.menuItem.name}`)
                  .join(", ")}
              </p>
              <p className="font-bold text-sm mt-2">
                ₦{selectedOrder.totalAmount.toLocaleString()}
              </p>
              <div
                className={`text-xs px-2 py-1 rounded-full inline-block mt-2 ${
                  selectedOrder.status === "DELIVERED"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {selectedOrder.status}
              </div>
            </div>

            <h2 className="text-sm font-bold mb-3">Order Timeline</h2>

            {trackingLoading ? (
              <p className="text-xs text-gray-500">Loading details...</p>
            ) : (
              <TrackingTimeline
                trackingData={trackingData}
                currentStatus={selectedOrder.status}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
