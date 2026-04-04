import Header from '../Fragments/Header';
import AboutSection from '../Fragments/Home/AboutSection';
import BrandsSection from '../Fragments/Home/BrandsSection';
import FeaturesSection from '../Fragments/Home/FeaturesSection';
import HeroSection from '../Fragments/Home/HeroSection';
import TestimonialSection from '../Fragments/Home/TestimonialSection';

function HomePage() {
  return (
    <>
      <Header />
      <HeroSection />
      <BrandsSection />
      <AboutSection />
      <FeaturesSection />
      <TestimonialSection />
    </>
  );
}

export default HomePage;
