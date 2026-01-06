"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => {
      router.push("/auth");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="h-screen w-screen flex items-center justify-center ">
      <div className="relative text-black font-script animate-bounce">
        <h1 className="text-5xl font-bold drop-shadow-[5px_5px_5px_rgba(0,0,0,0.5)]">
          Campus
        </h1>
        <h1 className="text-5xl font-bold drop-shadow-[5px_5px_5px_rgba(0,0,0,0.5)] ml-16 mt-2">
          Crave
        </h1>
      </div>
    </div>
  );
}
