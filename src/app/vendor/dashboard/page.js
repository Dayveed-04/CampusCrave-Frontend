

"use client";
import { Column, Row } from "@/components/flex";
import ToggleButton from "@/components/toggleButton";
import { images } from "@/constants/image";
import { getVendor } from "@/utils/endpoints/Vendors/getVendor";
import { totalVendorOrder } from "@/utils/endpoints/Vendors/totalOrderAndEarning";
import { getVendorOrders } from "@/utils/endpoints/Orders/getVendorOrders";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const formatRevenue = (amount) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
};

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function getFirstName(fullName) {
  if (!fullName) return "";
  return fullName.split(" ")[0];
}

const STATUS_COLORS = {
  PAID: "bg-blue-100 text-blue-700",
  CONFIRMED: "bg-yellow-100 text-yellow-700",
  PREPARING: "bg-orange-100 text-orange-700",
  DELIVERING: "bg-purple-100 text-purple-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function VendorDashboard() {
  const router = useRouter();
  const [vendors, setVendors] = useState(null);
  const [stats, setStats] = useState(null);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [liveOrders, setLiveOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [vendorsResponse, statsResponse, ordersResponse] =
          await Promise.all([
            getVendor(),
            totalVendorOrder(),
            getVendorOrders(),
          ]);
        if (vendorsResponse?.status === "success")
          setVendors(vendorsResponse.data.vendor);
        if (statsResponse?.status === "success") setStats(statsResponse.data);
        if (ordersResponse?.status === "success") {
          const all = ordersResponse.data;
          setPendingOrders(all.filter((o) => o.status === "PAID"));
          setLiveOrders(
            all.filter((o) =>
              ["CONFIRMED", "PREPARING", "DELIVERING"].includes(o.status),
            ),
          );
        }
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <motion.div
      className="min-h-screen font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <motion.div
        className="w-full flex flex-row pr-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          className="text-black self-start cursor-pointer"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src={images.icons.Logo}
            alt="Logo"
            width={70}
            height={70}
            className="w-12 h-12 sm:w-[70px] sm:h-[70px]"
          />
        </motion.div>
        <div className="mt-6 text-black cursor-pointer">
          <Image
            src={images.icons.LocationIcon}
            alt="Location"
            width={120}
            height={120}
            className="w-20 h-auto sm:w-[120px]"
          />
        </div>
        <motion.div
          className="ml-auto mb-3 text-black self-end cursor-pointer relative"
          whileTap={{ scale: 0.85 }}
          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src={images.icons.NotificationIcon}
            alt="Notification"
            width={20}
            height={20}
            className="w-4 h-4 sm:w-5 sm:h-5"
          />
          {pendingOrders.length > 0 && (
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.8 }}
            >
              <span
                className="text-white font-bold"
                style={{ fontSize: "9px" }}
              >
                {pendingOrders.length}
              </span>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      <div className="w-full h-px bg-gray-400 opacity-30 mb-4"></div>

      <div className="px-3 space-y-4">
        {/* Greeting Card */}
        <motion.div
          className="w-full bg-black rounded-2xl px-4 py-4 flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div>
            <p className="text-[#EDE7B5] text-xs opacity-80">{getGreeting()}</p>
            <h2 className="text-[#EDE7B5] text-lg font-bold mt-0.5">
              {getFirstName(vendors?.name) || "Vendor"}!
            </h2>
            <p className="text-[#EDE7B5] text-xs opacity-60 mt-0.5">
              Ready to serve today?
            </p>
          </div>
          <motion.div
            animate={{ rotate: [0, -5, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Image
              src={images.jollofRice}
              alt="food"
              width={64}
              height={64}
              className="w-16 h-16 rounded-xl object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Pending Orders Alert */}
        {pendingOrders.length > 0 && (
          <motion.div
            className="w-full bg-orange-50 border border-orange-200 rounded-2xl px-4 py-3 flex items-center justify-between cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/vendor/orders")}
          >
            <div className="flex items-center gap-3">
              <motion.div
                className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="text-white font-bold text-sm">
                  {pendingOrders.length}
                </span>
              </motion.div>
              <div>
                <p className="text-sm font-bold text-orange-700">
                  {pendingOrders.length} new{" "}
                  {pendingOrders.length === 1 ? "order" : "orders"} waiting!
                </p>
                <p className="text-xs text-orange-500">
                  Tap to accept or decline
                </p>
              </div>
            </div>
            <span className="text-orange-500 text-lg">→</span>
          </motion.div>
        )}

        {/* Profile */}
        <motion.div
          className="py-2 font-sans flex gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <Image
            src={images.profilePic}
            alt="Profile Picture"
            width={50}
            height={10}
          />
          <Column>
            <h2 className="text-md font-bold">{vendors?.name}</h2>
            <p className="text-xs text-gray-600">{vendors?.email}</p>
          </Column>
        </motion.div>

        {/* Store Status */}
        <motion.div
          className="bg-[#FFFCE2] rounded-3xl p-4 w-60"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
        >
          <Row gap="gap-4" justifyContent="between">
            <h2 className="text-sm font-semibold">
              Store Status :<span className="ml-2 font-semibold">Open</span>
            </h2>
            <ToggleButton />
          </Row>
          <p className="text-xs text-gray-600">
            You are currently receiving new orders
          </p>
        </motion.div>

        {/* Stats Cards */}
        <Row gap="gap-4" justifyContent="between">
          <motion.div
            className="bg-[#FFFCE2] h-20 rounded-3xl px-3 py-2 w-60 space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            whileHover={{ scale: 1.03 }}
          >
            <Row gap="gap-2">
              <h2 className="text-xs font-semibold">Total Amount</h2>
              <Image
                src={images.icons.MoneyIcon}
                alt="Money Icon"
                width={70}
                height={70}
                className="w-5 h-5"
              />
            </Row>
            <motion.h2
              className="text-xs font-bold"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.7, type: "spring" }}
            >
              {loading ? "..." : formatRevenue(stats?.totalEarnings ?? 0)}
            </motion.h2>
          </motion.div>

          <motion.div
            className="bg-[#FFFCE2] h-20 rounded-3xl px-3 py-2 w-60 space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            whileHover={{ scale: 1.03 }}
          >
            <Row gap="gap-2">
              <h2 className="text-xs font-semibold">Total Orders</h2>
              <Image
                src={images.icons.MoneyIcon}
                alt="Money Icon"
                width={70}
                height={70}
                className="w-5 h-5"
              />
            </Row>
            <motion.h2
              className="text-xs font-bold"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.8, type: "spring" }}
            >
              {stats?.completedOrders?.length ?? 0}
            </motion.h2>
          </motion.div>
        </Row>

        {/* Live Orders Snapshot */}
        {liveOrders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.55 }}
          >
            <h2 className="text-base font-bold mb-2">Live Orders</h2>
            <Column gap="gap-2">
              {liveOrders.slice(0, 3).map((order, index) => (
                <motion.div
                  key={order.id}
                  className="bg-[#FFFCE2] rounded-2xl px-3 py-2 flex items-center justify-between cursor-pointer"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.08 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push("/vendor/orders")}
                >
                  <div>
                    <p className="text-xs font-bold">{order.orderCode}</p>
                    <p className="text-xs text-gray-500 truncate max-w-[160px]">
                      {order.orderItems
                        ?.map((i) => `${i.quantity}x ${i.menuItem?.name}`)
                        .join(", ")}
                    </p>
                  </div>
                  <motion.div
                    className={`text-xs px-2 py-1 rounded-full ${STATUS_COLORS[order.status] || "bg-gray-100 text-gray-600"}`}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                  >
                    {order.status}
                  </motion.div>
                </motion.div>
              ))}
            </Column>
          </motion.div>
        )}

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <h2 className="text-lg font-bold mt-2 mb-2">Quick Actions</h2>
          <Row gap="gap-3">
            <motion.button
              className="flex items-center gap-3 bg-black text-white px-3 py-2 rounded-full shadow-md"
              onClick={() => router.push(`/vendor/menu`)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-4 h-4 rounded-full flex items-center justify-center">
                <Image
                  src={images.icons.AddCircleIcon}
                  alt="Add Circle Icon"
                  width={50}
                  height={10}
                />
              </div>
              <span className="text-xs font-medium text-[#EDE7B5]">
                Add a new meal
              </span>
            </motion.button>
            <motion.button
              className="flex items-center gap-3 bg-white text-black px-3 py-2 rounded-full shadow-md"
              onClick={() => router.push(`/vendor/orders`)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-4 h-4 rounded-full flex items-center justify-center">
                <Image
                  src={images.icons.OrderIcon}
                  alt="Order Icon"
                  width={50}
                  height={10}
                />
              </div>
              <span className="text-xs font-medium">View All Orders</span>
            </motion.button>
          </Row>
        </motion.div>
      </div>
    </motion.div>
  );
}
