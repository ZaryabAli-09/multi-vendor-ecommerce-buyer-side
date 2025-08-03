import ProductsFeed from "../components/ProductsFeed.jsx";
import HomeSlider from "../components/HomeSlider.jsx";
import TopCategories from "../components/TopCategories.jsx";
import WhatsNewPopup from "../components/WhatsNew.jsx";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="relative">
      {/* Eye-catching vertical reel button */}
      <Link
        to="/reels/all"
        className="fixed  -right-24 md:-right-36 hover:-right-3 md:text-lg text-xs top-1/2 -translate-y-1/2 z-50 animate-bounce rounded-l-3xl  transform bg-gradient-to-l from-pink-600 to-red-600 text-white font-bold px-4 md:px-6 py-3  shadow-2xl hover:scale-105 hover:brightness-110 transition-all duration-300"
      >
        🎬 Explore Reels
      </Link>

      {/* Main content */}
      <HomeSlider />
      <TopCategories />
      <ProductsFeed />
      <WhatsNewPopup />
    </main>
  );
}

export default Home;
