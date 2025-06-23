import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { setWishlist } from "../features/wishlistSlice.js";

import WishlistItemCard from "../components/WishlistItemCard.jsx";

function UserWishlist() {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const wishlistItems = useSelector((state) => state.wishlist.items);
  // console.log(wishlistItems);

  useEffect(() => {
    async function fetchWishlistItems() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/buyer/wishlist`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          const result = await response.json();
          alert(result.message);
        }

        const result = await response.json();
        dispatch(setWishlist({ wishlistItems: result.data }));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWishlistItems();
  }, []);

  if (isLoading) {
    return (
      <main className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </main>
    );
  }

  return (
    <main className=" px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
        My Wishlist
      </h1>

      {wishlistItems.length === 0 && (
        <div>
          <p className="text-center text-2xl mt-32">
            You currently have nothing saved to your Wishlist.
          </p>
        </div>
      )}

      {wishlistItems.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {wishlistItems.map((wishlistItem) => {
            return (
              <WishlistItemCard
                images={wishlistItem.variant.images}
                name={wishlistItem.product.name}
                price={wishlistItem.variant.price}
                discountedPrice={wishlistItem.variant.discountedPrice}
                productId={wishlistItem.product._id}
                variantId={wishlistItem.variant._id}
                wishlistItemId={wishlistItem._id}
                numReviews={wishlistItem.product.numReviews}
                rating={wishlistItem.product.rating}
                key={wishlistItem._id}
              />
            );
          })}
        </div>
      )}
    </main>
  );
}

export default UserWishlist;
