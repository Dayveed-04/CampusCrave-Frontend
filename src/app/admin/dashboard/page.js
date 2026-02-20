

"use client";

import { Column, Row } from "@/components/flex";
import { images } from "@/constants/image";
import Image from "next/image";
import Button from "@/components/button";
import Toast from "@/components/toast";
import { useToast } from "@/hooks/useToast";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { getAllVendors } from "@/utils/endpoints/Admin/getAllVendors";
import { approveVendors } from "@/utils/endpoints/Admin/approveVendor";
import { getAdmin } from "@/utils/endpoints/Admin/getAdmin";

const formatRevenue = (amount) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
};

export default function AdminDashboard() {
  const router = useRouter();
  const { toast, showToast, hideToast } = useToast();
  const [pendingVendors, setPendingVendors] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [vendorsResponse, statsResponse] = await Promise.all([
          getAllVendors(),
          getAdmin(),
        ]);

        if (vendorsResponse?.status === "success") {
          const pending = vendorsResponse.data.filter(
            (vendor) => !vendor.isApproved,
          );
          setPendingVendors(pending);
        }

        if (statsResponse?.status === "success") {
          setStats(statsResponse.data);
        }
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
        showToast("Failed to load dashboard data", "error");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleVendorAction = async (vendorId, isApproved) => {
    setActionLoading(vendorId);
    try {
      const response = await approveVendors(vendorId, isApproved);
      if (response.status === "success") {
        showToast(
          isApproved ? "✓ Vendor approved!" : "Vendor declined",
          isApproved ? "success" : "info",
        );
        setPendingVendors((prev) => prev.filter((v) => v.id !== vendorId));
      }
    } catch (error) {
      console.error("Failed to update vendor:", error);
      showToast(error.message || "Failed to update vendor", "error");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="min-h-screen font-sans">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
          duration={toast.duration}
        />
      )}

      <div className="w-full flex flex-row pr-4">
        <div className="text-black self-start cursor-pointer">
          <Image
            src={images.icons.Logo}
            alt="Logo"
            width={70}
            height={70}
            className="w-12 h-12 sm:w-[70px] sm:h-[70px]"
          />
        </div>
        <div className="mt-6 text-black cursor-pointer">
          <Image
            src={images.icons.LocationIcon}
            alt="Location"
            width={120}
            height={120}
            className="w-20 h-auto sm:w-[120px]"
          />
        </div>
        <div className="ml-auto mb-3 text-black self-end cursor-pointer">
          <Image
            src={images.icons.NotificationIcon}
            alt="Notification"
            width={20}
            height={20}
            className="w-4 h-4 sm:w-5 sm:h-5"
          />
        </div>
      </div>
      <div className="w-full h-px bg-gray-400 opacity-30 mb-4"></div>

      <div className="px-3 flex gap-1">
        <Column>
          <h2 className="text-md font-bold">Admin Console</h2>
          <p className="text-xs text-gray-600">
            {stats?.admin?.name || "System Controller"}
          </p>
        </Column>
      </div>

      <div className="p-3">
        <Column gap="gap-2">
          {/* Stats */}
          <Row justifyContent="between" className="space-x-1">
            <div className="bg-[#FFFCE2] rounded-2xl p-3 mr-1 space-y-3">
              <h3 className="text-gray-600 text-xs">TOTAL ORDERS</h3>
              <h2 className="text-lg font-bold">
                {loading ? "..." : (stats?.totalOrders ?? 0)}
              </h2>
            </div>
            <div className="bg-[#FFFCE2] rounded-2xl p-3 mr-1 space-y-3">
              <h3 className="text-gray-600 text-xs">ACTIVE VENDORS</h3>
              <h2 className="text-lg font-bold">
                {loading ? "..." : (stats?.totalVendors ?? 0)}
              </h2>
            </div>
          </Row>
          <Row>
            <div className="bg-[#FFFCE2] rounded-2xl p-3 mr-1 space-y-2 text-center w-full">
              <h3 className="text-gray-600 text-xs">TOTAL PLATFORM REVENUE</h3>
              <h2 className="text-lg font-bold">
                {loading ? "..." : formatRevenue(stats?.totalRevenue ?? 0)}
              </h2>
            </div>
          </Row>

          {/* Vendor Vetting */}
          <Row justifyContent="between">
            <h2 className="text-sm font-bold">Vendor Vetting</h2>
            <div className="bg-[#000000] text-[#EDE7B5] text-xs rounded-2xl px-2 mb-1">
              {pendingVendors.length} pending
            </div>
          </Row>

          {loading ? (
            <div className="bg-[#FFFCE2] rounded-2xl p-6 text-center">
              <p className="text-xs text-gray-500">Loading...</p>
            </div>
          ) : pendingVendors.length === 0 ? (
            <div className="bg-[#FFFCE2] rounded-2xl p-6 text-center">
              <p className="text-xs text-gray-500">No pending vendors</p>
            </div>
          ) : (
            pendingVendors.slice(0, 2).map((vendor) => (
              <div
                key={vendor.id}
                className="bg-[#FFFCE2] rounded-2xl p-3 mr-1"
              >
                <Row justifyContent="between">
                  <h3 className="font-bold text-sm mb-3">{vendor.name}</h3>
                </Row>
                <Row>
                  <p className="text-xs opacity-70 mb-3">{vendor.email}</p>
                </Row>
                <Row>
                  <p className="text-xs opacity-70 mb-3">{vendor.phone}</p>
                </Row>
                <Row gap="gap-2" justifyContent="between">
                  <Button
                    className="!w-15 !h-5 !rounded-2xl !flex !items-center !justify-center !text-xs !bg-[#EDE7B5] !text-[#000000] disabled:opacity-50"
                    onClick={() => handleVendorAction(vendor.id, true)}
                    disabled={actionLoading === vendor.id}
                  >
                    {actionLoading === vendor.id ? "..." : "Approve"}
                  </Button>
                  <Button
                    className="!w-15 !h-5 !rounded-2xl !flex !items-center !justify-center !text-xs !bg-[#000000] !text-[#EDE7B5] flex self-end disabled:opacity-50"
                    onClick={() => handleVendorAction(vendor.id, false)}
                    disabled={actionLoading === vendor.id}
                  >
                    {actionLoading === vendor.id ? "..." : "Decline"}
                  </Button>
                </Row>
              </div>
            ))
          )}

          <div className="mb-5 mr-2">
            <Button
              className="w-3 !py-2 !bg-black !text-[#EDE7B5] !rounded-3xl font-medium text-xs"
              onClick={() => router.push("/admin/vetting")}
            >
              View All Vetting Requests
            </Button>
          </div>
        </Column>
      </div>
    </div>
  );
}
