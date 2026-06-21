import { useEffect, useRef } from 'react';

function TestimonialSection() {
  const trackRef = useRef(null);
  const indexRef = useRef(0);

  const data = [
    {
      img: '/assets/home/testimonials/sherina.svg',
      name: 'Sherina Claw',
      role: 'Freelance Designer',
      rate: 5,
      msg: 'Dompa makes my daily transactions so much easier. Everything feels fast and clean.',
    },
    {
      img: '/assets/home/testimonials/user2.svg',
      name: 'Andi Pratama',
      role: 'Startup Founder',
      rate: 5,
      msg: 'Very secure and reliable. Perfect for business cash flow management.',
    },
    {
      img: '/assets/home/testimonials/user3.svg',
      name: 'Maya Salsabila',
      role: 'Content Creator',
      rate: 4,
      msg: 'Super intuitive UI. I can track everything without confusion.',
    },
    {
      img: '/assets/home/testimonials/user4.svg',
      name: 'Rizky Hidayat',
      role: 'Software Engineer',
      rate: 5,
      msg: 'Performance is insane. Everything loads instantly.',
    },
    {
      img: '/assets/home/testimonials/user5.svg',
      name: 'Dewi Lestari',
      role: 'Online Seller',
      rate: 5,
      msg: 'Helps me manage income from multiple platforms easily.',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const track = trackRef.current;
      if (!track) return;

      indexRef.current += 1;

      // reset kalau sudah lewat akhir (infinite loop)
      if (indexRef.current >= data.length) {
        indexRef.current = 0;
      }

      const cardWidth = track.children[0].offsetWidth + 24;

      track.style.transform = `translateX(-${indexRef.current * cardWidth}px)`;
      track.style.transition = 'transform 0.6s ease-in-out';
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const renderStars = (rate) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < rate ? 'text-yellow-400' : 'text-gray-300'}>
        ★
      </span>
    ));
  };

  return (
    <section className="flex flex-col items-center justify-center px-5 py-20 gap-10 overflow-hidden">
      {/* HEADER */}
      <div className="max-w-2xl text-center">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">What Our Customers Say</h1>
        <p className="text-gray-500 mt-2">Real users feedback about Dompa experience.</p>
      </div>

      {/* VIEWPORT */}
      <div className="w-full md:w-5/6 overflow-hidden">
        {/* TRACK */}
        <div ref={trackRef} className="flex gap-6">
          {data.concat(data).map((d, idx) => (
            <div
              key={idx}
              className="min-w-full md:min-w-[320px] bg-white border border-gray-100 rounded-xl p-6 flex flex-col items-center text-center gap-4 shadow-sm"
            >
              <img src={d.img} alt={d.name} className="w-16 h-16 rounded-full object-cover" />

              <div>
                <h2 className="font-semibold text-lg text-gray-900">{d.name}</h2>
                <p className="text-sm text-gray-400">{d.role}</p>
              </div>

              <div className="flex gap-1 text-lg">{renderStars(d.rate)}</div>

              <p className="text-gray-500 text-sm leading-relaxed">{d.msg}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialSection;
