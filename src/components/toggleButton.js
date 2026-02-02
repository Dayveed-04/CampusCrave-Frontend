"use client";
import { useState } from "react";

export default function ToggleButton() {
  const [on, setOn] = useState(false);

  return (
    <button
      onClick={() => setOn(!on)}
      className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors duration-300 border border-gray-300
        ${on ? "bg-[#FFFBD6]" : "bg-[#504D3E]"}`}
    >
      <div
        className={`w-4 h-4 rounded-full shadow-md transform transition-transform duration-300
          ${on ? "translate-x-5 bg-[#504D3E] " : "bg-[#FFFBD6] translate-x-0"}`}
      />
    </button>
  );
}
