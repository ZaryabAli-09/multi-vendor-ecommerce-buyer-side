import { useState } from "react";
import StarRating from "./StarRating.jsx";

function ProductCard2({
  images,
  name,
  discountedPrice,
  price,
  id,
  numReviews,
  rating,
  sold,
}) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <a
      className="border-2 w-[70%] rounded-md hover:shadow-md hover:shadow-gray-200"
      href={`/products/single/${id}`}
      target="_blank"
    >
      {/* product img part */}
      <div className="h-72 relative">
        <img
          src={isHovering && images.length > 1 ? images[1].url : images[0].url}
          alt=""
          className="w-full h-full object-cover"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        />
      </div>

      {/* product details part */}

      <div className="flex flex-col justify-between p-2 h-32 shadow-slate-100 shadow-inner">
        <h3 className="font-medium line-clamp-2 text-ellipsis overflow-hidden">
          {name}
        </h3>

        <div className="flex items-center gap-3">
          <span className="text-xl font-medium text-orange-600">
            Rs {discountedPrice === null ? price : discountedPrice}
          </span>
          {discountedPrice !== null && (
            <span className="text-sm">
              -{Math.round(((price - discountedPrice) / price) * 100)}%
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <StarRating rating={rating} startFontSize={"text-sm"} />

          <span className="text-sm text-gray-400 relative top-[1px]">
            ({numReviews})
          </span>

          <span className="flex-grow-[1] text-end text-sm text-gray-400 relative top-[1px]">
            {sold} sold
          </span>
        </div>
      </div>
    </a>
  );
}

export default ProductCard2;
