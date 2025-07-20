// src/pages/Home.jsx
import HeroSection from "../components/HeroSection";
import KeunggulanSection from "../components/KeunggulanSection";
import CoursePreview from "../components/CoursePreview";
import QuizPreview from "../components/QuizPreview";
import KitPreview from "../components/KitPreview";
import CTASection from "../components/CTASection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <KeunggulanSection />
      <CoursePreview />
      <QuizPreview />
      <KitPreview />
      <CTASection />
    </div>
  );
};

export default Home;
