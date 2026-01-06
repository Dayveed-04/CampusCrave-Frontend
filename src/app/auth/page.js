"use client";

import Button from "@/components/button";
import { images } from "@/constants/image";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function PreAuth() {

  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center px-8 py-6 font-sans">
      <div className="mt-2">
        <h2 className="font-bold text-black text-3xl">
          Campus Crave
        </h2>
      </div>

      <div className="mt-5 relative w-[150px] h-[150px]">
        <Image
          src={images.onboardingFood}
          alt="Search"
          width={150}
          height={150}
       />

        {/* Top Right */}
        <div className="absolute top-0 right-0 w-10 h-10">
          <Image src={images.edgeImage2} alt="Edge 2" width={30} height={20} />
        </div>

        {/* Bottom Left */}
        <div className="absolute bottom-0 left-0 w-10 h-10">
          <Image src={images.edgeImage1} alt="Edge 3" width={30} height={30} />
        </div>

        {/* Bottom Right */}
        <div className="absolute bottom-0 right-0 w-10 h-10">
          <Image src={images.edgeImage3} alt="Edge 4" width={30} height={20} />
        </div>
      </div>
      <div className="mt-6 text-center">
        <h2 className="text-2xl font-extrabold font-sans text-black leading-tight">
          All your <br /> favorite foods
        </h2>
        <p className="mt-2 text-xs text-black opacity-60 leading-relaxed">
          Order your favorite menu with easy <br />on-demand delivery
        </p>
      </div>

    
      <div className="mt-12 mb-6 w-full max-w-sm space-y-3">
        <Button onClick={()=>router.push('/auth/login')}>
          Sign In
        </Button>
        <Button onClick={()=>router.push('/auth/register')}>
          Register
        </Button>
      </div>
      
    </div>
  );
} 