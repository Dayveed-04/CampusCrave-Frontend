

export default function Register() {
  return (
    <div className="min-h-screen bg-[#E8DDB5] flex flex-col px-6 pt-12 pb-6 font-sans">
      {/* Back button */}
      <div>
        <button className="mb-1 text-black self-start">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Divider line */}
      <div className="w-full h-px bg-gray-400 opacity-30 mb-6"></div>

      {/* Header */}
      <div className="mb-5">
        <h2 className="text-4xl font-bold text-black mb-1">Register</h2>
        <p className="text-sm text-black opacity-70">Create a new account</p>
      </div>

      {/* Input Fields */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2 text-black">Full name</label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <input 
            type="text" 
            placeholder="Full name" 
            className="w-full pl-10 pr-4 py-3 bg-white rounded-lg text-sm placeholder:text-xs focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2 text-black">Phone number</label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <input 
            type="tel" 
            placeholder="Phone number" 
            className="w-full pl-10 pr-4 py-3 bg-white rounded-lg text-sm placeholder:text-xs focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>
      </div>
    
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2 text-black">Email</label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full pl-10 pr-4 py-3 bg-white rounded-lg text-sm placeholder:text-xs focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2 text-black">Password</label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full pl-10 pr-4 py-3 bg-white rounded-lg text-sm placeholder:text-xs focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2 text-black">Confirm password</label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <input 
            type="password" 
            placeholder="Confirm password" 
            className="w-full pl-10 pr-4 py-3 bg-white rounded-lg text-sm placeholder:text-xs focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>
      </div> 

      {/* Register Button */}
      <div className="mb-5">
        <button className="w-full bg-black text-white py-4 px-4 rounded-2xl font-medium hover:bg-gray-900 transition duration-300">
        Register
        </button>
      </div>

      {/* Login Link */}
      <div className="text-center">
       <p className="text-xs text-black">
          Already have an account?{" "}
          <button className="font-bold underline">Login</button>
        </p>
      </div>
    </div>
  );
}