import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeFromWishlist } from "../features/wishlistSlice.js";
import { updateWishlistItemsCount } from "../features/userSlice.js";
import { useState } from "react";
import StarRating from "./StarRating.jsx";
import toast from "react-hot-toast";

function ProductCard({
  images,
  name,
  discountedPrice,
  price,
  productId,
  variantId,
  wishlistItemId,
  numReviews,
  rating,
}) {
  const [isHovering, setIsHovering] = useState(false);
  const dispatch = useDispatch();

  async function handleRemoveFromWishlist() {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/buyer/wishlist/remove/${productId}/${variantId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const result = await response.json();
        alert(result.message);
        return;
      }

      const result = await response.json();
      toast.success(result.message);
      dispatch(removeFromWishlist({ wishlistItemId }));
      dispatch(
        updateWishlistItemsCount({ wishlistItemsCount: result.data.length })
      );
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
          src={
            isHovering && images.length > 1 ? images[1]?.url : images[0]?.url
          }
          alt={name}
          className="w-full h-full object-cover"
        />

        {isHovering && (
          <button
            onClick={handleRemoveFromWishlist}
            className="bg-red-500 hover:bg-red-600 text-white text-sm sm:text-base font-semibold px-4 sm:px-6 py-1 sm:py-2 rounded-sm absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200"
          >
            REMOVE
          </button>
        )}
      </div>

      {/* product details part */}
      <div className="flex flex-col justify-between p-3 h-32 shadow-slate-100 shadow-inner">
        <Link to={`/products/single/${productId}/${variantId}`}>
          <h2 className="font-medium line-clamp-2 text-ellipsis overflow-hidden hover:underline text-sm sm:text-base">
            {name}
          </h2>
        </Link>

        <div>
          <span className="text-lg sm:text-xl font-medium text-orange-600">
            Rs {discountedPrice === null ? price : discountedPrice}
          </span>
          {discountedPrice !== null && (
            <span className="ml-2 text-xs sm:text-sm text-gray-500">
              {Math.round(((price - discountedPrice) / price) * 100)}% off
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <StarRating rating={rating} startFontSize={"text-xs sm:text-sm"} />
          <span className="text-xs sm:text-sm text-gray-500">
            ({numReviews})
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
