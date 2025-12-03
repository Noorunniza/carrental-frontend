import Hero from "./components/Hero";
import BrandStrip from "./components/BrandStrip";
import TopPlaces from "./components/TopPlaces";
import AppPromo from "./components/AppPromo";
import RecommendedGuides from "./components/RecommendedGuides";
import Footer from "./components/Footer";



export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandStrip />
       <TopPlaces />
       <AppPromo />
        <RecommendedGuides />
        <Footer />  
    </>
  );
}
