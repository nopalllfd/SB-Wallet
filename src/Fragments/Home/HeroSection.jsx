import { Button } from '../../components/Button';

function HeroSection() {
  return (
    <section className="flex flex-col gap-4 items-start px-7">
      <img
        src="../../src/assets/home/hero.svg"
        alt="hero icon"
        className="w-full ms-5"
      />
      <h1 className="text-4xl my-2 mb-4">Smart Way to Your Financial Business</h1>
      <p className="text-gray-600 text-xl">We bring you a mobile app for banking problems that oftenly wasting much of your times.</p>
      <button className="bg-blue-500 px-10 py-4 text-white rounded-xl mt-4">Get Started</button>
      <p className="text-gray-600 text-xl mt-4">Available on</p>
      <div className="socials flex gap-10 items-center mt-4">
        <img
          src="../../src/assets/home/playstore.svg"
          alt=""
        />
        <img
          src="../../src/assets/home/appstore.svg"
          alt=""
        />
      </div>
    </section>
  );
}

export default HeroSection;
