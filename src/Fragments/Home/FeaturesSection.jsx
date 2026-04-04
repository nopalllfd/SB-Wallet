import { Button } from '../../components/Button';
function FeaturesSection() {
  return (
    <section className="relative px-5 pt-5 gap-4 flex justify-center flex-col items-center">
      <div className="bg top-40 absolute -z-50">
        <img
          src="../../src/assets/home/features/Vector-1.svg"
          alt=""
        />
        <img
          src="../../src/assets/home/features/Vector.svg"
          alt=""
        />
      </div>
      <div className="mobile-icon">
        <img
          src="../../src/assets/home/features/mobile.svg"
          alt=""
        />
      </div>
      <div className="title text-3xl text-white">All The Great Zwallet Features.</div>
      <p className="text-gray-200 font-light text-lg">We have some great features from the application and it’s totally free to use by all users around the world.</p>
      <div className="flex w-full gap-4 items-center">
        <div className="bg-white flex w-32 h-15 justify-center items-center rounded-full">
          <img
            src="../../src/assets/home/features/fee.svg"
            alt="small fee icon"
            className="w-8"
          />
        </div>
        <span>
          <div>
            <h1 className="font-bold text-xl text-white">Small Fee</h1>
          </div>
          <div>
            <p className="text-white">We only charge 5% of every success transaction done in Zwallet app.</p>
          </div>
        </span>
      </div>
      <div className="flex w-full gap-4 items-center">
        <div className="bg-white flex w-32 h-15 justify-center items-center rounded-full">
          <img
            src="../../src/assets/home/features/data.svg"
            alt="data secured icon"
            className="w-8"
          />
        </div>
        <span>
          <div>
            <h1 className="font-bold text-xl text-white">Data Secured</h1>
          </div>
          <div>
            <p className="text-white">All your data is secured properly in our system and it’s encrypted.</p>
          </div>
        </span>
      </div>
      <div className="flex w-full gap-4 items-center">
        <div className="bg-white flex w-32 h-15 justify-center items-center rounded-full">
          <img
            src="../../src/assets/home/features/user.svg"
            alt="small fee icon"
            className="w-8"
          />
        </div>
        <span>
          <div>
            <h1 className="font-bold text-xl text-white">User Friendly</h1>
          </div>
          <div>
            <p className="text-white">Zwallet come up with modern and sleek design and not complicated.</p>
          </div>
        </span>
      </div>
      <Button className={'text-blue-500 rounded-md font-semibold'}>Get Started</Button>
    </section>
  );
}

export default FeaturesSection;
