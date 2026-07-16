import AboutUs from "./about-us-section";
import HealthySection from "./healthy-section";
import HeroBanner from "./hero-banner-section";
import WhyUsSection from "./why-us-section";
import WorkoutsSection from "./workouts-section";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroBanner />
      <AboutUs />
      <WorkoutsSection />
      <WhyUsSection />
      <HealthySection />
    </div>
  );
}
