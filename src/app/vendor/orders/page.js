

"use client";

import Button from "@/components/button";
import { Column, Row } from "@/components/flex";
import { images } from "@/constants/image";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getVendorOrders } from "@/utils/endpoints/Orders/getVendorOrders";
import { updateOrderStatus } from "@/utils/endpoints/Orders/updateOrderStatus";
import { motion, AnimatePresence } from "framer-motion";

const PENDING_STATUSES = ["PAID"];
const LIVE_STATUSES = ["CONFIRMED", "PREPARING", "DELIVERING"];
const COMPLETED_STATUSES = ["DELIVERED", "CANCELLED"];
const DELIVERY_DURATION = 120;

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

const formatTime = (d) =>
  new Date(d).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
const formatFullDate = (d) =>
  new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
const formatDateTime = (d) =>
  new Date(d).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
const getNextStatus = (s) =>
  ({
    PAID: "CONFIRMED",
    CONFIRMED: "PREPARING",
    PREPARING: "DELIVERING",
    DELIVERING: "DELIVERED",
  })[s];
const getActionLabel = (s) =>
  ({ CONFIRMED: "Start Preparing", PREPARING: "Out for Delivery" })[s];
const getSecondsLeft = (statusHistory) => {
  const rec = statusHistory?.find((h) => h.status === "DELIVERING");
  if (!rec) return DELIVERY_DURATION;
  return Math.max(
    0,
    DELIVERY_DURATION -
      Math.floor((Date.now() - new Date(rec.createdAt).getTime()) / 1000),
  );
};

function DeliveryCountdown({ orderId, statusHistory, onDelivered }) {
  const [seconds, setSeconds] = useState(() => getSecondsLeft(statusHistory));
  const timerRef = useRef(null);
  useEffect(() => {
    if (seconds === 0) {
      onDelivered(orderId);
      return;
    }
    timerRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          onDelivered(orderId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);
  return (
    <motion.p
      className="text-xs text-purple-600 mt-1"
      animate={{ opacity: [1, 0.5, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      Delivering in {Math.floor(seconds / 60)}:
      {String(seconds % 60).padStart(2, "0")}
    </motion.p>
  );
}

function OrderDetailView({ order }) {
  const getStepStatus = (stepKey) => {
    if (order.status === "CANCELLED")
      return stepKey === "PAID" ? "done" : "cancelled";
    return STATUS_ORDER.indexOf(stepKey) <= STATUS_ORDER.indexOf(order.status)
      ? "done"
      : "pending";
  };
  const getStepTimestamp = (stepKey) => {
    const record = order.statusHistory?.find((h) => h.status === stepKey);
    return record ? record.createdAt : null;
  };
  return (
    <motion.div
      className="px-3 py-4 font-sans"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="bg-[#FFFCE2] rounded-2xl p-4 mb-4"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Row justifyContent="between">
          <h3 className="font-bold text-sm">{order.orderCode}</h3>
          <p className="text-xs">{formatFullDate(order.createdAt)}</p>
        </Row>
        <p className="text-xs opacity-70 mt-1">
          Customer: {order.student?.name || order.student?.email}
        </p>
        <p className="text-xs font-medium mt-1">
          {order.orderItems
            .map((item) => `${item.quantity}x ${item.menuItem.name}`)
            .join(", ")}
        </p>
        <p className="font-bold text-sm mt-2">
          ₦{order.totalAmount.toLocaleString()}
        </p>
        <div
          className={`text-xs px-2 py-1 rounded-full inline-block mt-2 ${order.status === "DELIVERED" ? "bg-green-100 text-green-700" : order.status === "CANCELLED" ? "bg-red-100 text-red-700" : "bg-black text-[#EDE7B5]"}`}
        >
          {order.status}
        </div>
      </motion.div>
      <motion.h2
        className="text-sm font-bold mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Order Timeline
      </motion.h2>
      <Column>
        {STATUS_STEPS.map((step, index) => {
          const isDone = getStepStatus(step.key) === "done";
          const timestamp = getStepTimestamp(step.key);
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
            >
              <Row className="flex space-x-3 items-center px-1 py-3 border-b border-gray-100">
                <motion.div
                  className={`w-3 h-3 rounded-full flex-shrink-0 ${isDone ? "bg-black" : "bg-gray-300"}`}
                  initial={isDone ? { scale: 0 } : {}}
                  animate={isDone ? { scale: 1 } : {}}
                  transition={{
                    duration: 0.3,
                    delay: 0.3 + index * 0.1,
                    type: "spring",
                  }}
                />
                <div className="flex-1">
                  <span
                    className={`text-xs font-semibold ${isDone ? "text-black" : "text-gray-400"}`}
                  >
                    {step.label}
                  </span>
                  {isDone && timestamp && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      {formatDateTime(timestamp)}
                    </p>
                  )}
                </div>
                {isDone && (
                  <motion.span
                    className="text-xs text-gray-500"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  >
                    ✓
                  </motion.span>
                )}
              </Row>
            </motion.div>
          );
        })}
      </Column>
    </motion.div>
  );
}

export default function VendorOrdersPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Pending Orders");
  const [pendingOrders, setPendingOrders] = useState([]);
  const [liveOrders, setLiveOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    loadOrders();
  }, [activeTab]);

  const loadOrders = async () => {
    try {
      setOrdersLoading(true);
      const response = await getVendorOrders();
      if (response.status === "success") {
        setPendingOrders(
          response.data.filter((o) => PENDING_STATUSES.includes(o.status)),
        );
        setLiveOrders(
          response.data.filter((o) => LIVE_STATUSES.includes(o.status)),
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

  const handleUpdateStatus = async (orderId, nextStatus) => {
    try {
      setUpdatingOrderId(orderId);
      const response = await updateOrderStatus(orderId, nextStatus);
      if (response.status === "success") await loadOrders();
    } catch (error) {
      console.error("Failed to update order status:", error);
      alert("Failed to update order status. Please try again.");
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const handleAutoDeliver = async (orderId) =>
    await handleUpdateStatus(orderId, "DELIVERED");

  return (
    <motion.div
      className="w-full overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <motion.div
        className="w-full flex flex-row mb-1 mt-1"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div
          className="text-black self-start cursor-pointer"
          onClick={
            selectedOrder ? () => setSelectedOrder(null) : () => router.back()
          }
        >
          <Image
            src={images.icons.backArrow}
            alt="Back"
            width={25}
            height={25}
          />
        </div>
        <h2 className="text-2xl font-semibold text-center w-full text-base font-sans">
          {selectedOrder ? "Order Details" : "Order Management"}
        </h2>
      </motion.div>
      <div className="w-full h-px bg-gray-400 opacity-30 mb-4"></div>

      {/* Tabs */}
      {!selectedOrder && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Row gap="gap-2" className="px-3" justifyContent="between">
            {["Pending Orders", "Live Orders", "Completed"].map((tab) => (
              <motion.div
                key={tab}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
              >
                <Button
                  backgroundColor={
                    activeTab === tab ? "bg-black" : "bg-[#FFFCE2]"
                  }
                  color={activeTab === tab ? "text-[#EDE7B5]" : "text-black"}
                  width="auto"
                  className="whitespace-nowrap !px-2 !py-1 !text-sm !rounded-3xl"
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </Button>
              </motion.div>
            ))}
          </Row>
        </motion.div>
      )}

      {selectedOrder && <OrderDetailView order={selectedOrder} />}

      {!selectedOrder && (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {/* PENDING ORDERS */}
            {activeTab === "Pending Orders" && (
              <div className="px-3 py-4 mb-6 font-sans">
                <Column gap="gap-3">
                  <Row justifyContent="between">
                    <h2 className="text-sm font-bold">New Orders</h2>
                    <motion.div
                      className="bg-black text-[#EDE7B5] text-xs rounded-2xl px-2 mb-1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                    >
                      {pendingOrders.length}
                    </motion.div>
                  </Row>
                  {ordersLoading ? (
                    <div className="grid gap-4">
                      {[1, 2].map((i) => (
                        <div
                          key={i}
                          className="h-36 bg-gray-100 rounded-2xl animate-pulse"
                        />
                      ))}
                    </div>
                  ) : pendingOrders.length === 0 ? (
                    <motion.div
                      className="text-center py-12"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <p className="text-gray-600 text-sm">No pending orders</p>
                    </motion.div>
                  ) : (
                    <Column gap="gap-4">
                      {pendingOrders.map((order, index) => (
                        <motion.div
                          key={order.id}
                          className="bg-[#FFFCE2] rounded-2xl p-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, delay: index * 0.08 }}
                          whileHover={{ scale: 1.01 }}
                        >
                          <Row justifyContent="between">
                            <h3 className="font-bold text-sm">
                              {order.orderCode}
                            </h3>
                            <p className="text-xs">
                              {formatTime(order.createdAt)}
                            </p>
                          </Row>
                          <p className="text-xs opacity-70 mb-2 mt-1">
                            Customer:{" "}
                            {order.student?.name || order.student?.email}
                          </p>
                          <p className="text-sm font-semibold mb-4">
                            {order.orderItems
                              .map(
                                (item) =>
                                  `${item.quantity}x ${item.menuItem.name}`,
                              )
                              .join(", ")}
                          </p>
                          <Row justifyContent="between">
                            <h3 className="font-bold text-sm">
                              ₦{order.totalAmount.toLocaleString()}
                            </h3>
                            <Row gap="gap-2">
                              <motion.div whileTap={{ scale: 0.95 }}>
                                <Button className="!w-15 !h-5 !rounded-2xl !flex !items-center !justify-center !text-xs !bg-[#EDE7B5] !text-[#000000]">
                                  Decline
                                </Button>
                              </motion.div>
                              <motion.div
                                whileTap={{ scale: 0.95 }}
                                whileHover={{ scale: 1.05 }}
                              >
                                <Button
                                  className="!w-15 !h-5 !rounded-2xl !flex !items-center !justify-center !text-xs !bg-[#000000] !text-[#EDE7B5]"
                                  onClick={() =>
                                    handleUpdateStatus(order.id, "CONFIRMED")
                                  }
                                  disabled={updatingOrderId === order.id}
                                >
                                  {updatingOrderId === order.id
                                    ? "..."
                                    : "Accept"}
                                </Button>
                              </motion.div>
                            </Row>
                          </Row>
                        </motion.div>
                      ))}
                    </Column>
                  )}
                </Column>
              </div>
            )}

            {/* LIVE ORDERS */}
            {activeTab === "Live Orders" && (
              <div className="px-3 py-4 mb-6 font-sans">
                <Column gap="gap-3">
                  <Row justifyContent="between">
                    <h2 className="text-sm font-bold">Active Orders</h2>
                    <motion.div
                      className="bg-black text-[#EDE7B5] text-xs rounded-2xl px-2 mb-1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                    >
                      {liveOrders.length}
                    </motion.div>
                  </Row>
                  {ordersLoading ? (
                    <div className="grid gap-4">
                      {[1, 2].map((i) => (
                        <div
                          key={i}
                          className="h-36 bg-gray-100 rounded-2xl animate-pulse"
                        />
                      ))}
                    </div>
                  ) : liveOrders.length === 0 ? (
                    <motion.div
                      className="text-center py-12"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <p className="text-gray-600 text-sm">No active orders</p>
                    </motion.div>
                  ) : (
                    <Column gap="gap-4">
                      {liveOrders.map((order, index) => (
                        <motion.div
                          key={order.id}
                          className="bg-[#FFFCE2] rounded-2xl p-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, delay: index * 0.08 }}
                          whileHover={{ scale: 1.01 }}
                        >
                          <Row justifyContent="between">
                            <h3 className="font-bold text-sm">
                              {order.orderCode}
                            </h3>
                            <p className="text-xs">
                              {formatTime(order.createdAt)}
                            </p>
                          </Row>
                          <p className="text-xs opacity-70 mb-2 mt-1">
                            Customer:{" "}
                            {order.student?.name || order.student?.email}
                          </p>
                          <p className="text-sm font-semibold mb-3">
                            {order.orderItems
                              .map(
                                (item) =>
                                  `${item.quantity}x ${item.menuItem.name}`,
                              )
                              .join(", ")}
                          </p>
                          {order.status === "DELIVERING" && (
                            <DeliveryCountdown
                              orderId={order.id}
                              statusHistory={order.statusHistory}
                              onDelivered={handleAutoDeliver}
                            />
                          )}
                          <Row justifyContent="between" className="mt-3">
                            <h3 className="font-bold text-sm">
                              ₦{order.totalAmount.toLocaleString()}
                            </h3>
                            <div className="flex items-center gap-2">
                              <motion.div
                                className={`text-xs px-2 py-1 rounded-full ${order.status === "CONFIRMED" ? "bg-yellow-100 text-yellow-700" : order.status === "PREPARING" ? "bg-orange-100 text-orange-700" : "bg-purple-100 text-purple-700"}`}
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring" }}
                              >
                                {order.status}
                              </motion.div>
                              {order.status !== "DELIVERING" && (
                                <motion.div
                                  whileTap={{ scale: 0.95 }}
                                  whileHover={{ scale: 1.05 }}
                                >
                                  <Button
                                    className="!h-8 !px-2 !py-2 !rounded-2xl !text-xs !bg-black !text-[#EDE7B5]"
                                    onClick={() =>
                                      handleUpdateStatus(
                                        order.id,
                                        getNextStatus(order.status),
                                      )
                                    }
                                    disabled={updatingOrderId === order.id}
                                  >
                                    {updatingOrderId === order.id
                                      ? "..."
                                      : getActionLabel(order.status)}
                                  </Button>
                                </motion.div>
                              )}
                            </div>
                          </Row>
                        </motion.div>
                      ))}
                    </Column>
                  )}
                </Column>
              </div>
            )}

            {/* COMPLETED */}
            {activeTab === "Completed" && (
              <div className="px-3 py-4 mb-6 font-sans">
                <Column gap="gap-3">
                  <Row justifyContent="between">
                    <h2 className="text-sm font-bold">Completed Orders</h2>
                    <motion.div
                      className="bg-black text-[#EDE7B5] text-xs rounded-2xl px-2 mb-1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                    >
                      {completedOrders.length}
                    </motion.div>
                  </Row>
                  {ordersLoading ? (
                    <div className="grid gap-4">
                      {[1, 2].map((i) => (
                        <div
                          key={i}
                          className="h-36 bg-gray-100 rounded-2xl animate-pulse"
                        />
                      ))}
                    </div>
                  ) : completedOrders.length === 0 ? (
                    <motion.div
                      className="text-center py-12"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <p className="text-gray-600 text-sm">
                        No completed orders yet
                      </p>
                    </motion.div>
                  ) : (
                    <Column gap="gap-4">
                      {completedOrders.map((order, index) => (
                        <motion.div
                          key={order.id}
                          className="bg-[#FFFCE2] rounded-2xl p-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, delay: index * 0.08 }}
                          whileHover={{ scale: 1.01 }}
                        >
                          <Row justifyContent="between">
                            <h3 className="font-bold text-sm">
                              {order.orderCode}
                            </h3>
                            <p className="text-xs">
                              {formatTime(order.createdAt)}
                            </p>
                          </Row>
                          <p className="text-xs opacity-70 mb-2 mt-1">
                            Customer:{" "}
                            {order.student?.name || order.student?.email}
                          </p>
                          <p className="text-sm font-semibold mb-3">
                            {order.orderItems
                              .map(
                                (item) =>
                                  `${item.quantity}x ${item.menuItem.name}`,
                              )
                              .join(", ")}
                          </p>
                          <Row justifyContent="between">
                            <h3 className="font-bold text-sm">
                              ₦{order.totalAmount.toLocaleString()}
                            </h3>
                            <motion.div
                              className={`text-xs px-2 py-1 rounded-full ${order.status === "DELIVERED" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                              initial={{ scale: 0.8 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring" }}
                            >
                              {order.status}
                            </motion.div>
                          </Row>
                          <motion.div
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            <Button
                              className="w-full mt-3 !py-2 !bg-[#FFFCE2] border border-gray-300 !text-black !rounded-2xl text-xs"
                              onClick={() => setSelectedOrder(order)}
                            >
                              View Details
                            </Button>
                          </motion.div>
                        </motion.div>
                      ))}
                    </Column>
                  )}
                </Column>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
}
