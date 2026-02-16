// components/ConfirmModal.js
"use client";

import Button from "./button";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "bg-black",
  confirmTextColor = "text-[#EDE7B5]",
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-6 z-10">
        <h2 className="text-xl font-bold text-black mb-3">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>

        <div className="flex gap-3">
          <Button
            onClick={onClose}
            className="flex-1 !bg-gray-200 !text-gray-800 !rounded-xl"
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            className={`flex-1 ${confirmColor} ${confirmTextColor} !rounded-xl`}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
