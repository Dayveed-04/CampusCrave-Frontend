import { BaseInput } from "@/components/baseInput";
import { BaseTextArea } from "@/components/baseTextArea";


export default function Login() {
  return (
    <div className="min-h-screen flex flex-col px-6 pt-12 pb-6 font-sans">
      <div className="w-full max-w-sm">
        {/*Back Button*/}
        <button className="mb-4 text-black self-start">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="w-full h-px bg-gray-400 opacity-30 mb-2"></div>

        {/*Header*/}
        <div className="mb-5">
          <h2 className="text-4xl font-bold text-black mb-1">Welcome Back!</h2>
          <p className="text-sm text-black opacity-70">Log into your account</p>
        </div>

        {/*Input Fields*/}
        <div className="mb-5">
          <label className="block text-sm font-semibold mb-2 text-black">Email</label>
          <BaseInput placeholder="Your email" type="email" className="placeholder:text-xs opacity-50"/>
        </div>

        <div className="mb-1">
          <label className="block text-sm font-semibold mb-2 text-black">Password</label>
          <BaseInput placeholder="Your password" type="password" className="placeholder:text-xs opacity-50"/>
        </div>

        {/*Buttons*/}
        <div className="flex justify-end mb-8">
          <button className="text-xs text-black font-medium hover-underline">Forgot Password?</button>
        </div>

        <div className="mb-8">
          <button className="w-full bg-black text-white py-4 px-4 rounded-2xl font-medium hover:bg-gray-900 transition duration-300">Login</button>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-gray-400 opacity-50" />
          <span className="text-xs text-black opacity-60">
            Or continue as
          </span>
          <div className="flex-1 h-px bg-gray-400 opacity-50" />
        </div>

        <div className="mb-6">
          <button className="w-full bg-black text-white py-4 rounded-2xl font-medium hover:bg-gray-900 transition duration-300">Guest</button>
        </div>

        <div className="text-center mt-2">
          <p className="text-xs text-black">
            Do not have an account?{" "}
            <button className="font-semibold underline">Register Now</button>
          </p>
        </div>
      </div>
    </div>
  );
}