import { Link } from "react-router-dom";
import womenImg from "../assets/images/women.png";
import menImg from "../assets/images/men.png";
import kidsImg from "../assets/images/kids.png";
import tshirtsImg from "../assets/images/tshirts.png";
import shoesImg from "../assets/images/shoes.png";
import jacketsImg from "../assets/images/jackets.png";
import bagsImg from "../assets/images/bags.png";
import slippersImg from "../assets/images/slippers.png";
import topsImg from "../assets/images/tops.png";
import watchesImg from "../assets/images/watches.png";
import pantsImg from "../assets/images/pants.png";
import dressesImg from "../assets/images/dresses.png";
import mensGif from "../assets/images/mens.gif";
import womensGif from "../assets/images/womens.gif";
import kidsGif from "../assets/images/kids.gif";
import MensTshirt from "../assets/images/MenTshirt.gif";
import MensFootwear from "../assets/images/menfootwear.gif";
import MensJacket from "../assets/images/mensjacket.gif";
import MensTrouser from "../assets/images/mentrousers.gif";
import womenFootwear from "../assets/images/womenfootwear.gif";
import WomenDresses from "../assets/images/Womendresses.gif";
import WomenBottom from "../assets/images/WomensBottom.gif";
import WomenKurta from "../assets/images/Kurta.gif";
import WomenDupatta from "../assets/images/dupatta.jpg";
function TopCategories() {
  const categories = [
    { name: "Women", image: womensGif, path: "/products/Women" },
    { name: "Men", image: mensGif, path: "/products/Men" },
    { name: "Kids", image: kidsGif, path: "/products/Kids" },
    {
      name: "Men T-Shirts",
      image: MensTshirt,
      path: "/products/Men/Topwear/T Shirts",
    },
    {
      name: "Men Footwear",
      image: MensFootwear,
      path: "/products/Men/Footwear",
    },
    {
      name: "Men Jackets",
      image: MensJacket,
      path: "/products/Men/Topwear/Jackets",
    },
    {
      name: "Mens Trousers",
      image: MensTrouser,
      path: "/products/Men/BottomWear/Trousers",
    },

    {
      name: "Women Dupatta's",
      image: WomenDupatta,
      path: "/products/Women/Topwear/Duppata",
    },
    {
      name: "Women Footwear",
      image: womenFootwear,
      path: "/products/Women/Footwear",
    },
    {
      name: "Women Dresses",
      image: WomenDresses,
      path: "/products/Women/Topwear/Dresses",
    },
    {
      name: "Women Bottom",
      image: WomenBottom,
      path: "/products/Women/BottomWear",
    },
    {
      name: "Women Kurta",
      image: WomenKurta,
      path: "/products/Women/Topwear/Kurta",
    },
  ];

  return (
    <div className="my-16 px-4 sm:px-8 md:px-12 lg:px-20">
      <h2 className="text-center my-8 sm:my-12 md:my-16 text-2xl sm:text-3xl font-semibold">
        Top Categories
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8">
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col items-center">
            <Link to={category.path}>
              <div
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full bg-contain bg-center bg-no-repeat bg-[#eef0eb] mx-auto"
                style={{ backgroundImage: `url(${category.image})` }}
              ></div>
              <span className="text-center block font-semibold text-sm sm:text-base mt-2">
                {category.name}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopCategories;
