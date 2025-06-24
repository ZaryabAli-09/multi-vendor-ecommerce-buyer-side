import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import StarRating from "./StarRating.jsx";

function BrowsingHistoryItemCard({
  images,
  name,
  price,
  discountedPrice,
  productId,
  numReviews,
  rating,
  setBrowsingHistoryItems,
}) {
  const [isHovering, setIsHovering] = useState(false);

  async function handleRemoveFromBrowsingHistory() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/buyer/browsing-history`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId,
          }),
        }
      );

      if (!response.ok) {
        const result = await response.json();
        toast.error(result.message);
      }

      const result = await response.json();
      setBrowsingHistoryItems(result.data.reverse());
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="border-2 w-[45%] xs:w-[30%] sm:w-[32%] md:w-[31%] lg:w-[23%] xl:w-[19%] rounded-md hover:shadow-md hover:shadow-gray-200 transition-all duration-200 ">
      {/* product img part */}
      <div
        className="h-52  md:h-64 lg:h-80 w-full relative overflow-hidden rounded-t-md"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <img
          src={images[0]?.url}
          alt={name}
          className="w-full h-full object-cover"
        />

        {isHovering && (
          <button
            onClick={handleRemoveFromBrowsingHistory}
            className="bg-red-500 text-white text-sm sm:text-base font-semibold px-4 sm:px-6 py-1 sm:py-2 rounded-sm absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            REMOVE
          </button>
        )}
      </div>

      {/* product details part - more compact on mobile */}
      <div className="flex flex-col justify-between p-2 sm:p-3 h-28 sm:h-32 shadow-slate-100 shadow-inner">
        <Link to={`/products/single/${productId}`}>
          <h2 className="font-medium line-clamp-2 text-ellipsis overflow-hidden hover:underline text-sm sm:text-base">
            {name}
          </h2>
        </Link>

        <div>
          <span className="text-base sm:text-xl font-medium text-orange-600">
            Rs {discountedPrice === null ? price : discountedPrice}
          </span>
          {discountedPrice !== null && (
            <span className="ml-2 text-xs sm:text-sm">
              -{Math.round(((price - discountedPrice) / price) * 100)}%
            </span>
          )}
        </div>

        <div className="flex gap-2 items-center">
          <StarRating rating={rating} startFontSize={"text-xs sm:text-sm"} />
          <span className="text-xs sm:text-sm text-gray-400">
            ({numReviews})
          </span>
        </div>
      </div>
    </div>
  );
}

export default BrowsingHistoryItemCard;
