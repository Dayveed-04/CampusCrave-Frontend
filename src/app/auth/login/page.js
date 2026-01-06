"use client";
import { BaseFieldSet } from "@/components/baseField";
import { BaseInput } from "@/components/baseInput";
import Button from "@/components/button";
import { images } from "@/constants/image";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function Login() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col px-6 pt-12 pb-6 font-sans flex items-center ">
      <div className="w-full max-w-sm ">
      
        <div className="mb-4 text-black self-start cursor-pointer">
           <Image
            src={images.icons.backArrow}
            alt="Search"
            width={15}
            height={15}
            onClick={()=>router.back('/auth')}
           />
        </div>

        <div className="w-full h-px bg-gray-400 opacity-30 mb-2"></div>

        <div className="mb-5">
          <h2 className="text-4xl font-bold text-black mb-1">Welcome Back!</h2>
          <p className="text-sm text-black opacity-70">Log into your account</p>
        </div>

        <BaseFieldSet className="mb-5">
          <label className="block text-sm font-semibold mb-2 text-black">Email</label>
          <BaseInput placeholder="Your email" type="email" className="placeholder:text-xs opacity-50"/>
        </BaseFieldSet>

        <BaseFieldSet className="mb-1">
          <label className="block text-sm font-semibold mb-2 text-black">Password</label>
          <BaseInput placeholder="Your password" type="password" className="placeholder:text-xs opacity-50"/>
        </BaseFieldSet>

      
        <div className="flex justify-end mb-8">
          <p className="text-xs text-black font-medium hover-underline cursor-pointer">Forgot Password?</p>
        </div>

        <div className="mb-8">
          <Button>Login</Button>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-gray-400 opacity-50" />
          <span className="text-xs text-black opacity-60">
            Or continue as
          </span>
          <div className="flex-1 h-px bg-gray-400 opacity-50" />
        </div>

        <div className="mb-6">
          <Button>Guest</Button>
        </div>

        <div className="text-center mt-2">
          <p className="text-xs text-black">
            Do not have an account?{" "}
            <button className="font-semibold underline cursor-pointer" onClick={()=>router.push('/auth/register')}>Register Now</button>
          </p>
        </div>
      </div>
    </div>
  );
}