"use client";

import Button from "@/components/button";
import { Column, Row } from "@/components/flex";
import { images } from "@/constants/image";
import Toast from "@/components/toast";
import { useToast } from "@/hooks/useToast";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getAllVendors } from "@/utils/endpoints/Admin/getAllVendors";
import { approveVendors } from "@/utils/endpoints/Admin/approveVendor";

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function AdminVendorVettingPage() {
  const router = useRouter();
  const { toast, showToast, hideToast } = useToast();
  const [activeTab, setActiveTab] = useState("Pending");
  const [pendingVendors, setPendingVendors] = useState([]);
  const [approvedVendors, setApprovedVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    const loadVendors = async () => {
      try {
        setLoading(true);
        const response = await getAllVendors();
        if (response.status === "success") {
          setPendingVendors(response.data.filter((v) => !v.isApproved));
          setApprovedVendors(response.data.filter((v) => v.isApproved));
        }
      } catch (error) {
        console.error("Failed to load vendors:", error);
        showToast("Failed to load vendors", "error");
      } finally {
        setLoading(false);
      }
    };

    loadVendors();
  }, []);

  const handleVendorAction = async (vendorId, isApproved) => {
    setActionLoading(vendorId);
    try {
      const response = await approveVendors(vendorId, isApproved);
      if (response.status === "success") {
        const vendor = pendingVendors.find((v) => v.id === vendorId);

        // Move vendor between lists
        setPendingVendors((prev) => prev.filter((v) => v.id !== vendorId));
        if (isApproved && vendor) {
          setApprovedVendors((prev) => [
            ...prev,
            { ...vendor, isApproved: true },
          ]);
        }

        showToast(
          isApproved ? "✓ Vendor approved!" : "Vendor declined",
          isApproved ? "success" : "info",
        );
      }
    } catch (error) {
      console.error("Failed to update vendor:", error);
      showToast(error.message || "Failed to update vendor", "error");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="min-h-screen">
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
          Vendor Vetting
        </h2>
      </div>
      <div className="w-full h-px bg-gray-400 opacity-30 mb-4"></div>

      {/* Tabs */}
      <Row gap="gap-2" className="px-3 font-sans" justifyContent="between">
        {["Pending", "Approved"].map((tab) => (
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

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <p className="text-xs text-gray-500">Loading vendors...</p>
        </div>
      ) : (
        <div>
          {/* Pending Tab */}
          {activeTab === "Pending" && (
            <div className="px-3 py-4 mb-6 font-sans">
              <Column gap="gap-3">
                <Row justifyContent="between">
                  <h2 className="text-sm font-bold">Pending Verifications</h2>
                  <div className="bg-[#000000] text-[#EDE7B5] text-xs rounded-2xl px-2 mb-1">
                    {pendingVendors.length}
                  </div>
                </Row>

                {pendingVendors.length === 0 ? (
                  <div className="bg-[#FFFCE2] rounded-2xl p-8 text-center">
                    <p className="text-xs text-gray-500">No pending vendors</p>
                  </div>
                ) : (
                  <Column gap="gap-4" className="px-2">
                    {pendingVendors.map((vendor) => (
                      <div
                        key={vendor.id}
                        className="bg-[#FFFCE2] rounded-2xl p-3 mr-1"
                      >
                        <Row justifyContent="between">
                          <h3 className="font-bold text-sm mb-3">
                            {vendor.name}
                          </h3>
                        </Row>
                        <Row>
                          <p className="text-xs opacity-70 mb-3">
                            Submitted: {formatDate(vendor.createdAt)}
                          </p>
                        </Row>
                        <div className="w-full h-px bg-gray-400 opacity-30 mb-3"></div>
                        <Row>
                          <p className="text-xs opacity-70 mb-3">
                            Email: {vendor.email}
                          </p>
                        </Row>
                        <Row>
                          <p className="text-xs opacity-70 mb-3">
                            Phone Number: {vendor.phone}
                          </p>
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
                    ))}
                  </Column>
                )}
              </Column>
            </div>
          )}

          {/* Approved Tab */}
          {activeTab === "Approved" && (
            <div className="px-3 py-4 mb-6 font-sans">
              <Column gap="gap-3">
                <Row justifyContent="between">
                  <h2 className="text-sm font-bold">Verified</h2>
                  <div className="bg-[#000000] text-[#EDE7B5] text-xs rounded-2xl px-2 mb-1">
                    {approvedVendors.length}
                  </div>
                </Row>

                {approvedVendors.length === 0 ? (
                  <div className="bg-[#FFFCE2] rounded-2xl p-8 text-center">
                    <p className="text-xs text-gray-500">
                      No approved vendors yet
                    </p>
                  </div>
                ) : (
                  <Column gap="gap-4" className="px-2">
                    {approvedVendors.map((vendor) => (
                      <div
                        key={vendor.id}
                        className="bg-[#FFFCE2] rounded-2xl p-3 mr-1"
                      >
                        <Row justifyContent="between">
                          <h3 className="font-bold text-sm mb-3">
                            {vendor.name}
                          </h3>
                        </Row>
                        <Row>
                          <p className="text-xs opacity-70 mb-3">
                            Submitted: {formatDate(vendor.createdAt)}
                          </p>
                        </Row>
                        <div className="w-full h-px bg-gray-400 opacity-30 mb-3"></div>
                        <Row>
                          <p className="text-xs opacity-70 mb-3">
                            Email: {vendor.email}
                          </p>
                        </Row>
                        <Row>
                          <p className="text-xs opacity-70 mb-3">
                            Phone Number: {vendor.phone}
                          </p>
                        </Row>
                      </div>
                    ))}
                  </Column>
                )}
              </Column>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
