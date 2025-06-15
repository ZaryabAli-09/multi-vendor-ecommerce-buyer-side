import ProductsFeed from "../components/ProductsFeed.jsx";
import HomeSlider from "../components/HomeSlider.jsx";
import TopCategories from "../components/TopCategories.jsx";

function Home() {
  return (
    <main>
      <HomeSlider />
      <TopCategories />
      <ProductsFeed />
    </main>
  );
}

export default Home;
