"use client";
import { Column, Row } from "@/components/flex";
import { images } from "@/constants/image";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getRecommendations } from "@/utils/endpoints/Students/getRecommendations";
import { getStudentOrders } from "@/utils/endpoints/Orders/studentgetAllOrders";
import { useAuth } from "@/contexts/authContext";
import { motion } from "framer-motion";

const CATEGORY_COLORS = {
  Rice: "bg-yellow-100 text-yellow-700",
  Swallow: "bg-green-100 text-green-700",
  Noodles: "bg-red-100 text-red-700",
  "Light Meals": "bg-blue-100 text-blue-700",
  "Desert/Snacks": "bg-purple-100 text-purple-700",
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

export default function StudentDashboard() {
  const router = useRouter();
  const { user } = useAuth();

  const [recommendations, setRecommendations] = useState([]);
  const [recommendationsLoading, setRecommendationsLoading] = useState(true);
  const [lastOrder, setLastOrder] = useState(null);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        setRecommendationsLoading(true);
        const response = await getRecommendations();
        if (response.status === "success") {
          setRecommendations(response.data.recommendations || []);
        }
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
      } finally {
        setRecommendationsLoading(false);
      }
    };

    const loadOrderStats = async () => {
      try {
        const response = await getStudentOrders();
        if (response.status === "success") {
          const orders = response.data;
          setTotalOrders(orders.length);
          // Get last delivered order
          const delivered = orders.filter((o) => o.status === "DELIVERED");
          if (delivered.length > 0) {
            const latest = delivered[0];
            setLastOrder({
              name: latest.orderItems[0]?.menuItem?.name,
              menuId: latest.orderItems[0]?.menuItem?.id,
              imageUrl: latest.orderItems[0]?.menuItem?.imageUrl,
              vendorName: latest.vendor?.name,
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch order stats:", error);
      }
    };

    loadRecommendations();
    loadOrderStats();
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
          className="ml-auto mb-3 text-black self-end cursor-pointer"
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
        </motion.div>
      </motion.div>

      <div className="w-full h-px bg-gray-400 opacity-30 mb-4"></div>

      <div>
        <Column gap="gap-5" className="max-w-4xl mx-auto px-2 sm:px-4">
          {/* Greeting Card */}
          <motion.div
            className="w-full bg-black rounded-2xl px-4 py-4 flex items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div>
              <p className="text-[#EDE7B5] text-xs opacity-80">
                {getGreeting()}
              </p>
              <h2 className="text-[#EDE7B5] text-lg font-bold mt-0.5">
                {getFirstName(user?.name) || "there"}!
              </h2>
              <p className="text-[#EDE7B5] text-xs opacity-60 mt-0.5">
                What are you craving today?
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

          {/* Quick Stats */}
          <motion.div
            className="grid grid-cols-2 gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-[#FFFCE2] rounded-2xl px-4 py-3">
              <p className="text-xs text-gray-500">Total Orders</p>
              <motion.p
                className="text-2xl font-bold text-black mt-1"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5, type: "spring" }}
              >
                {totalOrders}
              </motion.p>
              <p className="text-xs text-gray-400">orders placed</p>
            </div>
            <div className="bg-[#FFFCE2] rounded-2xl px-4 py-3">
              <p className="text-xs text-gray-500">Last Ordered</p>
              <p className="text-sm font-bold text-black mt-1 truncate">
                {lastOrder?.name || "No orders yet"}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {lastOrder?.vendorName || "Start ordering!"}
              </p>
            </div>
          </motion.div>

          {/* Order Again */}
          {lastOrder && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-base font-semibold text-black mb-2">
                Order Again
              </h2>
              <motion.div
                className="bg-[#FFFCE2] rounded-2xl p-3 flex items-center gap-3 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  router.push(`/student/menus/${lastOrder.menuId}`)
                }
              >
                <Image
                  src={lastOrder.imageUrl || images.jollofRice}
                  alt={lastOrder.name}
                  width={56}
                  height={56}
                  className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-black truncate">
                    {lastOrder.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {lastOrder.vendorName}
                  </p>
                </div>
                <motion.div
                  className="bg-black text-[#EDE7B5] text-xs px-3 py-1.5 rounded-xl flex-shrink-0"
                  whileTap={{ scale: 0.95 }}
                >
                  Order
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {/* Banner image */}
          <motion.div
            className="w-full rounded-2xl sm:rounded-3xl overflow-hidden h-35 sm:h-40 md:h-[170px]"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
          >
            <Image
              src={images.jollofRice}
              alt="Featured"
              width={400}
              height={180}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Recommendations */}
          <Column gap="gap-3 sm:gap-4">
            <motion.h2
              className="text-xl sm:text-2xl font-semibold text-black"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              Recommended for you
            </motion.h2>

            {recommendationsLoading ? (
              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-52 bg-gray-100 rounded-2xl animate-pulse"
                  />
                ))}
              </div>
            ) : recommendations.length === 0 ? (
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-gray-500 text-sm">
                  No recommendations yet. Start ordering to get personalized
                  suggestions!
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                {recommendations.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="overflow-hidden p-0 cursor-pointer"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.5 + index * 0.1,
                      ease: "easeOut",
                    }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => router.push(`/student/menu/${item.id}`)}
                  >
                    <Column gap="gap-2 sm:gap-3">
                      <div className="w-full rounded-xl sm:rounded-2xl overflow-hidden h-28 sm:h-36 md:h-40">
                        <motion.div
                          className="w-full h-full"
                          whileHover={{ scale: 1.07 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Image
                            src={item.imageUrl || images.jollofRice}
                            alt={item.name}
                            width={300}
                            height={160}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      </div>

                      <Column
                        gap="gap-0.5 sm:gap-1"
                        className="px-1 sm:px-3 pb-2 sm:pb-3"
                      >
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full w-fit ${
                            CATEGORY_COLORS[item.category?.name] ||
                            "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {item.category?.name}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-black truncate">
                          {item.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">
                          {item.vendor?.name}
                        </p>
                        <p className="text-xs sm:text-sm font-semibold text-black">
                          ₦{item.basePrice.toLocaleString()}
                        </p>
                      </Column>
                    </Column>
                  </motion.div>
                ))}
              </div>
            )}
          </Column>
        </Column>
      </div>
    </motion.div>
  );
}
