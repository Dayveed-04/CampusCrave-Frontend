// "use client";
// import { useState } from "react";

// export default function ToggleButton() {
//   const [on, setOn] = useState(false);

//   return (
//     <button
//       onClick={() => setOn(!on)}
//       className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors duration-300 border border-gray-300
//         ${on ? "bg-[#FFFBD6]" : "bg-[#504D3E]"}`}
//     >
//       <div
//         className={`w-4 h-4 rounded-full shadow-md transform transition-transform duration-300
//           ${on ? "translate-x-5 bg-[#504D3E] " : "bg-[#FFFBD6] translate-x-0"}`}
//       />
//     </button>
//   );
// }

"use client";
import { useState } from "react";

export default function ToggleButton({ checked, onChange, disabled = false }) {
  // If checked prop is provided, use it (controlled)
  // Otherwise use internal state (uncontrolled)
  const [internalOn, setInternalOn] = useState(false);
  const isOn = checked !== undefined ? checked : internalOn;

  const handleClick = () => {
    if (disabled) return;

    if (onChange) {
      onChange(!isOn); // Controlled mode
    } else {
      setInternalOn(!internalOn); // Uncontrolled mode
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors duration-300 border border-gray-300 ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
        ${isOn ? "bg-[#FFFBD6]" : "bg-[#504D3E]"}`}
    >
      <div
        className={`w-4 h-4 rounded-full shadow-md transform transition-transform duration-300
          ${isOn ? "translate-x-5 bg-[#504D3E]" : "bg-[#FFFBD6] translate-x-0"}`}
      />
    </button>
  );
}
