function BrandsSection() {
  const brands = [
    '/assets/home/brands/microsoft.svg',
    '/assets/home/brands/dropbox.svg',
    '/assets/home/brands/hnm.svg',
    '/assets/home/brands/airbnb.svg',
    '/assets/home/brands/canon.svg',
    '/assets/home/brands/dell.svg',
  ];

  return (
    <section className="py-16 bg-gray-200 overflow-hidden relative">
      {/* fade effect kiri kanan */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-gray-200 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-gray-200 to-transparent z-10" />

      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-16 items-center">
        {/* first loop */}
        <div className="flex gap-16 items-center">
          {brands.map((src, i) => (
            <img key={i} src={src} alt="brand logo" className="h-10 md:h-12 opacity-70 hover:opacity-100 transition" />
          ))}
        </div>

        {/* duplicate loop for seamless animation */}
        <div className="flex gap-16 items-center">
          {brands.map((src, i) => (
            <img key={`dup-${i}`} src={src} alt="brand logo" className="h-10 md:h-12 opacity-70 hover:opacity-100 transition" />
          ))}
        </div>
      </div>

      {/* custom animation */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 18s linear infinite;
        }
      `}</style>
    </section>
  );
}

export default BrandsSection;
