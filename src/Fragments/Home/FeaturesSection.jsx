import { Button } from '../../components/Button';

function FeaturesSection() {
  return (
    <section className="relative px-5 pt-10 pb-36 lg:pb-48 mb-40 flex flex-col lg:flex-row justify-center items-center max-w-7xl mx-auto w-full gap-10">
      <div className="absolute left-0 right-0 top-40 lg:top-0 bottom-0 -z-50 flex flex-col w-full overflow-hidden">
        <img
          src="/assets/home/features/Vector-1.svg"
          alt=""
          className="w-full h-[55%] object-cover object-top"
        />
        <img
          src="/assets/home/features/Vector.svg"
          alt=""
          className="w-full h-[55%] object-cover object-bottom -mt-2"
        />
      </div>

      <div className="w-full lg:w-1/2 flex justify-center lg:justify-end lg:pr-10 z-10">
        <img
          src="/assets/home/features/mobile.svg"
          alt="Mobile App Features"
          className="w-[280px] md:w-[350px] lg:w-full lg:max-w-md object-contain"
        />
      </div>

      <div className="flex flex-col w-full lg:w-1/2 gap-6 z-10 items-center lg:items-start text-center lg:text-left lg:pl-10">
        <div className="text-3xl md:text-4xl lg:text-4xl text-white font-bold leading-snug">All The Great Zwallet Features.</div>
        <p className="text-gray-200 font-light text-base md:text-lg w-full max-w-lg">We have some great features from the application and it’s totally free to use by all users around the world.</p>

        <div className="flex flex-col gap-6 w-full max-w-lg">
          <div className="flex w-full gap-4 items-center text-left">
            <div className="bg-white flex w-14 h-14 lg:w-16 lg:h-16 shrink-0 justify-center items-center rounded-full">
              <img
                src="/assets/home/features/fee.svg"
                alt="small fee icon"
                className="w-6 lg:w-8"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="font-bold text-lg lg:text-xl text-white">Small Fee</h1>
              <p className="text-white text-sm md:text-base">We only charge 5% of every success transaction done in Zwallet app.</p>
            </div>
          </div>

          <div className="flex w-full gap-4 items-center text-left">
            <div className="bg-white flex w-14 h-14 lg:w-16 lg:h-16 shrink-0 justify-center items-center rounded-full">
              <img
                src="/assets/home/features/data.svg"
                alt="data secured icon"
                className="w-6 lg:w-8"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="font-bold text-lg lg:text-xl text-white">Data Secured</h1>
              <p className="text-white text-sm md:text-base">All your data is secured properly in our system and it’s encrypted.</p>
            </div>
          </div>

          <div className="flex w-full gap-4 items-center text-left">
            <div className="bg-white flex w-14 h-14 lg:w-16 lg:h-16 shrink-0 justify-center items-center rounded-full">
              <img
                src="/assets/home/features/user.svg"
                alt="user friendly icon"
                className="w-6 lg:w-8"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="font-bold text-lg lg:text-xl text-white">User Friendly</h1>
              <p className="text-white text-sm md:text-base">Zwallet come up with modern and sleek design and not complicated.</p>
            </div>
          </div>
        </div>

        <Button className="text-blue-500 bg-white rounded-md font-semibold mt-4 px-10 py-3 w-full md:w-1/2 hover:bg-gray-100 transition-colors">Get Started</Button>
      </div>
    </section>
  );
}

export default FeaturesSection;
