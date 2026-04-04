import { useRef } from 'react';

function TestimonialSection() {
  const listRef = useRef(null);
  const baseItem = {
    img: '/assets/home/testimonials/sherina.svg',
    name: 'Sherina Claw',
    rate: 5,
    msg: '“I use this app since 2 years ago and this is the best app that I’ve ever use in my entire life”',
  };
  const data = Array.from({ length: 6 }, () => baseItem);

  const scrollByPage = (direction) => {
    const el = listRef.current;
    if (!el) return;
    const amount = el.clientWidth * (direction === 'left' ? -1 : 1);
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section className="flex flex-col items-center justify-center px-5 gap-4 mb-6">
      <div className="w-full flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl text-center md:text-left">Here From Our Customer</h1>
          <p className="text-center text-gray-500 md:text-left">We always do our best for our customers to stay comfortable using the applications we provide</p>
        </div>
        <div className="hidden md:flex gap-2">
          <button
            type="button"
            onClick={() => scrollByPage('left')}
            className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600"
          >
            <span className="sr-only">Left</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollByPage('right')}
            className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600"
          >
            <span className="sr-only">Right</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M9 6L15 12L9 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={listRef}
        className="w-full flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden md:gap-6"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {data.map((d, idx) => (
          <div
            key={`${d.name}-${idx}`}
            className="card bg-gray-100 px-6 w-full shrink-0 flex flex-col gap-3 items-center justify-center py-10 rounded-md snap-start md:w-[calc((100%-48px)/3)]"
          >
            <img
              src={d.img}
              alt={`${d.name} photo`}
            />
            <h2 className="font-bold text-xl">{d.name}</h2>
            <div className="star flex gap-3 items-center">
              {Array.from({ length: d.rate }).map((_, starIdx) => (
                <img
                  key={starIdx}
                  src="/assets/home/testimonials/star.svg"
                  alt="star"
                />
              ))}
              {d.rate}
            </div>
            <div className="separator text-4xl font-bold">"</div>
            <p className="text-gray-500 text-center">{d.msg}</p>
          </div>
        ))}
      </div>
      <div className="py-4">
        <img
          src="/assets/home/testimonials/scroll.svg"
          alt="scroll icon"
        />
      </div>
    </section>
  );
}

export default TestimonialSection;
