import { Link } from 'react-router';
import { ShieldCheck, Zap, Smartphone } from 'lucide-react';

function HeroSection() {
  return (
    <section className="relative flex flex-col pt-20 md:pt-28 gap-10 px-6 md:flex-row md:items-center md:justify-between md:gap-12 md:px-10 md:py-12 lg:px-16 max-w-7xl mx-auto">
      {/* Glow background biar hidup */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#1447E6]/10 blur-3xl rounded-full -z-10" />

      {/* LEFT */}
      <div className="flex flex-col gap-6 md:w-1/2">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
          Smart Way to Manage Your <span className="text-[#1447E6]">Finances</span>
        </h1>

        {/* Desc */}
        <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
          Dompa helps you control your money with a simple, secure, and lightning-fast mobile banking experience — anytime, anywhere.
        </p>

        {/* Feature mini */}
        <div className="flex flex-col gap-3 text-gray-700">
          <div className="flex items-center gap-2">
            <Zap size={18} className="text-[#1447E6]" />
            <span>Instant transfer & real-time balance update</span>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-[#1447E6]" />
            <span>Bank-level security system</span>
          </div>

          <div className="flex items-center gap-2">
            <Smartphone size={18} className="text-[#1447E6]" />
            <span>Fully optimized for mobile usage</span>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Link
            to="/auth/register"
            className="bg-[#1447E6] hover:bg-blue-800 px-8 py-4 text-white rounded-xl font-semibold text-center transition-all shadow-md hover:shadow-lg"
          >
            Get Started
          </Link>

          <Link
            to="/auth/login"
            className="px-8 py-4 text-[#1447E6] border border-[#1447E6] rounded-xl font-semibold text-center hover:bg-blue-50 transition"
          >
            Login
          </Link>
        </div>

        {/* Trust line */}
        <p className="text-gray-400 text-sm mt-4">Trusted by users for modern digital finance experience</p>

        {/* Store */}
        <div className="mt-2">
          <p className="text-gray-500 text-sm mb-2">Available on</p>
          <div className="flex gap-4 items-center">
            <img src="/assets/home/playstore.svg" alt="Play Store" className="h-12 hover:scale-105 transition" />
            <img src="/assets/home/appstore.svg" alt="App Store" className="h-12 hover:scale-105 transition" />
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="md:w-1/2 flex justify-center md:justify-end">
        <img src="/assets/home/hero.svg" alt="dompa hero illustration" className="w-full max-w-md md:max-w-lg drop-shadow-xl" />
      </div>
    </section>
  );
}

export default HeroSection;
