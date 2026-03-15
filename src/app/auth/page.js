// "use client";

// import Button from "@/components/button";
// import { Row } from "@/components/flex";
// import { images } from "@/constants/image";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// export default function PreAuth() {
//   const router = useRouter();
//   return (
//     <div className="min-h-screen flex flex-col items-center px-8 py-6 font-sans">
//       <div className="mt-2">
//         <h2 className="font-bold text-black text-3xl">Campus Crave</h2>
//       </div>

//       <div className="mt-5 relative w-[150px] h-[150px]">
//         <Image
//           src={images.onboardingFood}
//           alt="Search"
//           width={150}
//           height={150}
//         />

//         <div className="absolute top-0 right-0 w-10 h-10">
//           <Image src={images.edgeImage2} alt="Edge 2" width={30} height={20} />
//         </div>

//         <div className="absolute bottom-0 left-0 w-10 h-10">
//           <Image src={images.edgeImage1} alt="Edge 3" width={30} height={30} />
//         </div>

//         <div className="absolute bottom-0 right-0 w-10 h-10">
//           <Image src={images.edgeImage3} alt="Edge 4" width={30} height={20} />
//         </div>
//       </div>
//       <div className="mt-6 text-center">
//         <h2 className="text-2xl font-extrabold font-sans text-black leading-tight">
//           All your <br /> favorite foods
//         </h2>
//         <p className="mt-2 text-xs text-black opacity-60 leading-relaxed">
//           Order your favorite menu with easy <br />
//           on-demand delivery
//         </p>
//       </div>

//       <div className="mt-12 mb-6 w-full max-w-sm space-y-3">
//         <Button onClick={() => router.push("/auth/login")}>Sign In</Button>
//         <Button onClick={() => router.push("/auth/register/student")}>
//           Register
//         </Button>
//       </div>
//       <div className="flex items-center w-full max-w-sm mt-5 gap-2">
//         <div className="flex-1 h-px bg-gray-400 opacity-50"></div>
//         <span className="text-xs text-black opacity-60 whitespace-nowrap">
//           Or continue as
//         </span>
//         <div className="flex-1 h-px bg-gray-400 opacity-50"></div>
//       </div>
//       <div className="mt-6 w-full max-w-sm">
//         <Button onClick={() => router.push("/auth/register/vendor")}>
//           Vendor
//         </Button>
//       </div>
//     </div>
//   );
// }

"use client";

import Button from "@/components/button";
import { Row } from "@/components/flex";
import { images } from "@/constants/image";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function PreAuth() {
  const router = useRouter();

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center px-8 py-6 font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Title */}
      <motion.div
        className="mt-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="font-bold text-black text-3xl">Campus Crave</h2>
      </motion.div>

      {/* Food image with edge decorations */}
      <motion.div
        className="mt-5 relative w-[150px] h-[150px]"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        <Image
          src={images.onboardingFood}
          alt="Search"
          width={150}
          height={150}
        />

        <motion.div
          className="absolute top-0 right-0 w-10 h-10"
          initial={{ opacity: 0, x: 10, y: -10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <Image src={images.edgeImage2} alt="Edge 2" width={30} height={20} />
        </motion.div>

        <motion.div
          className="absolute bottom-0 left-0 w-10 h-10"
          initial={{ opacity: 0, x: -10, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
        >
          <Image src={images.edgeImage1} alt="Edge 3" width={30} height={30} />
        </motion.div>

        <motion.div
          className="absolute bottom-0 right-0 w-10 h-10"
          initial={{ opacity: 0, x: 10, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          <Image src={images.edgeImage3} alt="Edge 4" width={30} height={20} />
        </motion.div>
      </motion.div>

      {/* Text content */}
      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h2 className="text-2xl font-extrabold font-sans text-black leading-tight">
          All your <br /> favorite foods
        </h2>
        <p className="mt-2 text-xs text-black opacity-60 leading-relaxed">
          Order your favorite menu with easy <br />
          on-demand delivery
        </p>
      </motion.div>

      {/* Sign In & Register buttons */}
      <motion.div
        className="mt-12 mb-6 w-full max-w-sm space-y-3"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <motion.div whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.02 }}>
          <Button onClick={() => router.push("/auth/login")}>Sign In</Button>
        </motion.div>
        <motion.div whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.02 }}>
          <Button onClick={() => router.push("/auth/register/student")}>
            Register
          </Button>
        </motion.div>
      </motion.div>

      {/* Divider */}
      <motion.div
        className="flex items-center w-full max-w-sm mt-5 gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.9 }}
      >
        <div className="flex-1 h-px bg-gray-400 opacity-50"></div>
        <span className="text-xs text-black opacity-60 whitespace-nowrap">
          Or continue as
        </span>
        <div className="flex-1 h-px bg-gray-400 opacity-50"></div>
      </motion.div>

      {/* Vendor button */}
      <motion.div
        className="mt-6 w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 1.0 }}
      >
        <motion.div whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.02 }}>
          <Button onClick={() => router.push("/auth/register/vendor")}>
            Vendor
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
