import { useState } from "react";
import { Link } from "react-router-dom";
import StarRating from "./StarRating.jsx";
import FindSimilarBtn from "./FindSimilarBtn.jsx";

function ProductCard({
  images,
  name,
  discountedPrice,
  price,
  id,
  numReviews,
  brand,
  rating,
  sold,
  setIsSimilarProductsVisible,
  setTargetProductId,
}) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Link
      className="border-2 w-[45%] xs:w-[30%] sm:w-[32%] md:w-[31%] lg:w-[23%] xl:w-[19%] rounded-md hover:shadow-md hover:shadow-gray-200 transition-all duration-200 "
      to={`/products/single/${id}`}
    >
      {/* product img part */}
      <div className="h-52  md:h-64 lg:h-80 w-full relative overflow-hidden rounded-t-md">
        <img
          src={isHovering && images.length > 1 ? images[1].url : images[0].url}
          alt={name}
          className="w-full h-full object-cover"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        />
        <FindSimilarBtn
          setIsSimilarProductsVisible={setIsSimilarProductsVisible}
          setTargetProductId={setTargetProductId}
          id={id}
        />
      </div>

      {/* product details part */}
      <div className="flex flex-col justify-between p-2 h-36 sm:h-32 shadow-slate-100 shadow-inner">
        {/* Brand highlight */}
        <div className="flex justify-between items-start">
          <h3 className="font-medium line-clamp-2 text-ellipsis overflow-hidden pr-2">
            {name}
          </h3>
          {brand && (
            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded whitespace-nowrap">
              {brand}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-lg sm:text-xl font-medium text-orange-600">
            Rs {discountedPrice === null ? price : discountedPrice}
          </span>
          {discountedPrice !== null && (
            <span className="text-xs sm:text-sm">
              -{Math.round(((price - discountedPrice) / price) * 100)}%
            </span>
          )}
        </div>

        <div className="flex gap-2 items-center">
          <StarRating rating={rating} startFontSize={"text-xs sm:text-sm"} />

          <span className="text-xs sm:text-sm text-gray-400">
            ({numReviews})
          </span>

          <span className="flex-grow text-end text-xs sm:text-sm text-gray-400">
            {sold ? sold : 0} sold
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
