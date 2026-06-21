function AboutSection() {
  const features = [
    {
      icon: '/assets/home/about/support.svg',
      title: '24/7 Support',
      desc: 'We have 24/7 contact support so you can contact us whenever you want and we will respond it.',
    },
    {
      icon: '/assets/home/about/data.svg',
      title: 'Data Privacy',
      desc: 'We make sure your data is safe in our database and we encrypt every information you submit.',
    },
    {
      icon: '/assets/home/about/download.svg',
      title: 'Easy Download',
      desc: 'Available on Google Play Store and App Store. Simple, fast, and free to use.',
    },
  ];

  return (
    <section className="py-28 px-5 md:px-10 lg:px-14 flex flex-col items-center gap-24">
      {/* HEADER */}
      <div className="max-w-3xl text-center flex flex-col gap-4">
        <h1 className="text-3xl md:text-5xl font-semibold text-gray-900">About The Application</h1>
        <p className="text-gray-500 text-lg">
          We provide powerful features that help you manage your finances easily and securely — free for everyone.
        </p>
      </div>

      {/* FEATURES */}
      <div className="w-full max-w-6xl flex flex-col gap-28">
        {features.map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center gap-10 md:gap-24 ${!isEven ? 'md:flex-row-reverse' : ''}`}
              data-aos={isEven ? 'fade-right' : 'fade-left'}
            >
              {/* ICON */}
              <div className="flex justify-center md:w-1/2">
                <img src={item.icon} alt={item.title} className="w-44 h-44 md:w-56 md:h-56 object-contain" />
              </div>

              {/* TEXT */}
              <div className="flex flex-col gap-3 md:w-1/2 text-center md:text-left">
                <h3 className="text-2xl md:text-4xl font-semibold text-gray-900">{item.title}</h3>
                <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-xl">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default AboutSection;
