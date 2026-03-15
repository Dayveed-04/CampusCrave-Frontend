"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/fonts.css";

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/auth");
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <motion.div
      className="h-screen w-screen flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background pulse rings */}
      <motion.div
        className="absolute w-64 h-64 rounded-full border-2 border-black opacity-10"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.5, 2], opacity: [0.2, 0.1, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.div
        className="absolute w-64 h-64 rounded-full border-2 border-black opacity-10"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.5, 2], opacity: [0.2, 0.1, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
          delay: 0.5,
        }}
      />

      <div className="relative text-black font-script">
        {/* Campus - slides in from left */}
        <motion.h1
          className="text-5xl font-bold drop-shadow-[5px_5px_5px_rgba(0,0,0,0.5)] pacifico"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Campus
        </motion.h1>

        {/* Crave - slides in from right with delay */}
        <motion.h1
          className="text-5xl font-bold drop-shadow-[5px_5px_5px_rgba(0,0,0,0.5)] ml-16 mt-2 pacifico"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          Crave
        </motion.h1>

        {/* Underline that draws itself */}
        <motion.div
          className="h-1 bg-black rounded-full mt-2"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
        />

        {/* Loading dots */}
        <motion.div
          className="flex gap-1 justify-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-black rounded-full"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
