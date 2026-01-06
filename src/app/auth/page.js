

export default function PreAuth() {
  return (
    <div className="min-h-screen flex flex-col items-center px-8 py-6 font-sans">

      {/* Header */}
      <div className="mt-2">
        <h4 className="font-bold text-black text-base">
          Campus Crave
        </h4>
      </div>

      {/* Image */}
      <div className="mt-8 w-52 h-52 rounded-full overflow-hidden">
        <img 
          src="/images/food.jpg" 
          alt="Food" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text Content */}
      <div className="mt-6 text-center">
        <h2 className="text-2xl font-bold text-black leading-tight">
          All your <br /> favorite foods
        </h2>
        <p className="mt-2 text-xs text-black opacity-60 leading-relaxed">
          Order your favorite menu with easy <br />on-demand delivery
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-12 mb-6 w-full max-w-sm space-y-3">
        <button className="w-full py-3.5 bg-black text-white rounded-2xl font-medium hover:bg-gray-900 transition duration-300">
          Sign In
        </button>
        <button className="w-full py-3.5 bg-black text-white rounded-2xl font-medium hover:bg-gray-900 transition duration-300">
          Register
        </button>
      </div>
      
    </div>
  );
} 