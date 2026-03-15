"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyPayment } from "@/utils/endpoints/Payment/verifyPayment";

function VerifyPaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference") || searchParams.get("trxref");

  const [status, setStatus] = useState("verifying"); // verifying | success | error

  useEffect(() => {
    const verify = async () => {
      if (!reference) {
        setStatus("error");
        return;
      }

      try {
        const response = await verifyPayment(reference);
        if (response.status === "success") {
          setStatus("success");
          setTimeout(() => {
            router.push("/student/orders?tab=Ongoing");
          }, 2000);
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.error("Verification failed:", error);
        setStatus("error");
      }
    };

    verify();
  }, [reference]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-sans px-6">
      {status === "verifying" && (
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto" />
          <h2 className="text-lg font-bold">Verifying Payment...</h2>
          <p className="text-xs text-gray-500">
            Please wait, do not close this page
          </p>
        </div>
      )}

      {status === "success" && (
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto">
            <span className="text-[#EDE7B5] text-2xl">✓</span>
          </div>
          <h2 className="text-lg font-bold">Payment Successful!</h2>
          <p className="text-xs text-gray-500">Redirecting to your orders...</p>
        </div>
      )}

      {status === "error" && (
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-red-600 text-2xl">✕</span>
          </div>
          <h2 className="text-lg font-bold">Payment Failed</h2>
          <p className="text-xs text-gray-500">
            Something went wrong verifying your payment
          </p>
          <button
            className="mt-4 px-6 py-2 bg-black text-[#EDE7B5] rounded-2xl text-sm font-semibold"
            onClick={() => router.push("/student/orders")}
          >
            Go to Orders
          </button>
        </div>
      )}
    </div>
  );
}

export default function PaymentVerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <VerifyPaymentContent />
    </Suspense>
  );
}
