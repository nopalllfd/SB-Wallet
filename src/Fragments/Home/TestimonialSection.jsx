function TestimonialSection() {
  const data = [
    {
      img: '/assets/home/testimonials/sherina.svg',
      name: 'Sherina Claw',
      rate: 5,
      msg: '“I use this app since 2 years ago and this is the best app that I’ve ever use in my entire life”',
    },
  ];
  return (
    <section className="flex flex-col items-center justify-center px-5 gap-4 mb-6">
      <h1 className="text-3xl text-center">Here From Our Customer</h1>
      <p className="text-center text-gray-500">We always do our best for our customers to stay comfortable using the applications we provide</p>
      {data.map((d, idx) => (
        <div
          key={idx}
          className="card bg-gray-100 px-6 w-full flex flex-col gap-3 items-center justify-center py-10 rounded-md"
        >
          <img
            src={d.img}
            alt={`${d.name} photo`}
          />
          <h2 className="font-bold text-xl">{d.name}</h2>
          <div className="star flex gap-3">
            {Array(d.rate).fill(<img src="/assets/home/testimonials/star.svg" />)} {d.rate}
          </div>
          <div className="separator text-4xl font-bold">"</div>
          <p className="text-gray-500 text-center">{d.msg}</p>
        </div>
      ))}
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
