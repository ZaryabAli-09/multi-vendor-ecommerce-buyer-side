import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiHeart, FiX } from "react-icons/fi";
import { FaHeart, FaPlus, FaMinus, FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// custom components
import CategoriesNavigation from "../components/CategoriesNavigation";
import ProductImages from "../components/ProductImages";
import ProductVariants from "../components/ProductVariants";
import ProductReviews from "../components/ProductReviews";
import StarRating from "../components/StarRating";

import {
  updateWishlistItemsCount,
  updateCartItemsCount,
} from "../features/userSlice.js";
import { removeFromWishlist } from "../features/wishlistSlice.js";

function Product() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productId = useParams().productId;
  const variantId = useParams().variantId;

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [isProductInWishlist, setIsProductInWishlist] = useState(null);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(true);
  const [isStoreInfoVisible, setIsStoreInfoVisible] = useState(true);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [hasPurchasedProduct, setHasPurchasedProduct] = useState(false);

  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

  async function handleAddToCart() {
    if (!isUserLoggedIn) {
      navigate("/auth/login");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/buyer/cart/add/${productId}/${
          selectedVariant._id
        }`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const result = await response.json();
        toast.error(result.message);
        return;
      }

      const result = await response.json();
      toast.success(result.message);
      dispatch(
        updateCartItemsCount({ cartItemsCount: result.data.cartItemsCount })
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAddToWishlist() {
    if (!isUserLoggedIn) {
      navigate("/auth/login");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/buyer/wishlist/add/${productId}/${
          selectedVariant._id
        }`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const result = await response.json();
        return;
      }

      const result = await response.json();
      selectedVariant.isInWishlist = true;
      setIsProductInWishlist(true);
      dispatch(
        updateWishlistItemsCount({ wishlistItemsCount: result.data.length })
      );
      toast.success(result.message);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemoveFromWishlist() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/buyer/wishlist/remove/${productId}/${
          selectedVariant._id
        }`,
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
      selectedVariant.isInWishlist = false;
      setIsProductInWishlist(false);
      toast.success(result.message);

      dispatch(removeFromWishlist({ productId }));
      dispatch(
        updateWishlistItemsCount({ wishlistItemsCount: result.data.length })
      );
    } catch (error) {
      console.log(error);
    }
  }

  // Check if user has purchased this product
  const checkPurchaseStatus = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/order/check-purchase/${productId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        const result = await response.json();
        setHasPurchasedProduct(result.hasPurchased);
      }
    } catch (error) {
      console.error("Error checking purchase status:", error);
    }
  };

  // fetching product from API
  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/product/single/${productId}`,
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
        setProduct(result.data);

        setSelectedVariant(() => {
          if (!variantId) {
            return result.data.variants[0];
          }
          return result.data.variants.find(
            (variant) => variant._id === variantId
          );
        });
      } catch (error) {
        console.log(error);
      }
    }

    fetchProduct();
    if (isUserLoggedIn) {
      checkPurchaseStatus();
    }
  }, [productId, isUserLoggedIn]);

  // sending request to backend to add the product to history
  useEffect(() => {
    async function addProductToBrowsingHistory() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/buyer/browsing-history`,
          {
            method: "PUT",
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
      } catch (error) {}
    }

    if (product !== null && isUserLoggedIn) {
      addProductToBrowsingHistory();
    }
  }, [product]);

  useEffect(() => {
    setIsProductInWishlist(() => {
      if (selectedVariant === null) return false;
      else return selectedVariant.isInWishlist;
    });
  }, [selectedVariant]);

  const handleAddReview = async () => {
    if (!isUserLoggedIn) {
      navigate("/auth/login");
      return;
    }

    if (reviewRating === 0) {
      toast.error("Please select a rating");
      return;
    }

    setIsSubmittingReview(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/product/review/add/${productId}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rating: reviewRating,
            comment: reviewComment,
          }),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }

      toast.success("Review added successfully!");
      setIsReviewModalOpen(false);
      setReviewRating(0);
      setReviewComment("");

      // Refresh product data to show the new review
      const productResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/product/single/${productId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const productResult = await productResponse.json();
      setProduct(productResult.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <>
      {product && (
        <main className="mx-4 md:mx-10 lg:mx-16 mb-10">
          {/* product navigation like men / Topwear / t-shirts  */}
          <CategoriesNavigation categories={product.categories} />

          <div className="flex flex-col lg:flex-row">
            {/* images section (left side) */}
            <ProductImages images={selectedVariant.images} />

            {/* info section (right side) */}
            <div className="w-full lg:w-[50%] px-4 md:px-6 lg:px-8 mt-8 lg:mt-0">
              <h1 className="text-2xl">{product.name}</h1>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-x-6 items-center">
                <span className="text-3xl text-orange-500 font-semibold">
                  Rs{" "}
                  {selectedVariant.discountedPrice === null
                    ? selectedVariant.price
                    : selectedVariant.discountedPrice}
                </span>

                {selectedVariant.discountedPrice !== null && (
                  <span className="text-gray-500 line-through ">
                    Rs{" "}
                    {selectedVariant.discountedPrice !== null &&
                      selectedVariant.price}
                  </span>
                )}
              </div>

              {/* dashed line */}
              <div className="w-[100%] border-[1px] border-dashed border-gray-200 my-8"></div>

              {/* product variants info like color */}
              <ProductVariants
                variants={product.variants}
                selectedVariant={selectedVariant}
                setSelectedVariant={setSelectedVariant}
              />

              {/* add-to-cart and add-to-wishlist btns */}
              <div className="mt-8 flex gap-x-6 items-center">
                <button
                  onClick={handleAddToCart}
                  className="bg-[rgba(0,0,0,0.88)] hover:bg-black text-white text-lg font-bold w-[70%] py-3"
                >
                  ADD TO CART
                </button>

                <button
                  onClick={
                    isProductInWishlist
                      ? handleRemoveFromWishlist
                      : handleAddToWishlist
                  }
                  className="flex justify-center items-center text-[25px] hover:text-[27px] border-[1.5px] border-gray-300 w-[45px] h-[45px] rounded-[50%]"
                >
                  {isProductInWishlist ? <FaHeart /> : <FiHeart />}
                </button>
              </div>

              {/* product description */}
              <div className="mt-8 flex items-center justify-between">
                <h3 className="font-semibold text-xl">Description</h3>
                {isDescriptionVisible ? (
                  <FaMinus
                    className="text-[17px] cursor-pointer"
                    onClick={() => setIsDescriptionVisible(false)}
                  />
                ) : (
                  <FaPlus
                    className="text-[17px] cursor-pointer"
                    onClick={() => setIsDescriptionVisible(true)}
                  />
                )}
              </div>

              <p
                className={`${
                  isDescriptionVisible ? "" : "hidden"
                }  mt-2 text-justify`}
              >
                {product.description}
              </p>

              {/* brand logo */}
              <div className="mt-5 flex items-center justify-between">
                <h3 className="font-semibold text-xl">About Store</h3>
                {isStoreInfoVisible ? (
                  <FaMinus
                    className="text-[17px] cursor-pointer"
                    onClick={() => setIsStoreInfoVisible(false)}
                  />
                ) : (
                  <FaPlus
                    className="text-[17px] cursor-pointer"
                    onClick={() => setIsStoreInfoVisible(true)}
                  />
                )}
              </div>

              <div className={`${isStoreInfoVisible ? "" : "hidden"}`}>
                <div className="flex items-center gap-4 mt-5">
                  <img
                    src={product.seller.logo.url}
                    alt="store logo"
                    className="w-12"
                  />
                  <span className="text-lg font-semibold">
                    {product.seller.brandName}
                  </span>
                </div>

                <div className="flex items-center mt-4 justify-between">
                  <Link
                    to={`/store/${product.seller._id}?tab=products`}
                    className="border-[1.5px] border-gray-400 text-gray-800 font-semibold cursor-pointer w-[47%] text-center py-1"
                  >
                    Go to Store
                  </Link>
                  <Link
                    to={`/my-messages/${product.seller._id}`}
                    className="border-[1.5px] border-gray-400 text-gray-800 font-semibold cursor-pointer w-[47%] text-center py-1"
                  >
                    Chat Now
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* reviews */}
          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-[32px] font-semibold mt-14">
                Customer Reviews
              </h2>
              {isUserLoggedIn && (
                <button
                  onClick={() => setIsReviewModalOpen(true)}
                  className="animate-pulse mt-14 bg-orange-400 text-black px-4 py-2 rounded hover:bg-gray-800 transition"
                >
                  Add Review
                </button>
              )}
            </div>

            {/* total rating */}
            <div className="mt-8">
              <div className="my-4">
                <span className="text-4xl">
                  {String(product.rating).slice(0, 3)}
                </span>{" "}
                <span className="text-2xl text-gray-400">/5</span>
              </div>

              <StarRating rating={product.rating} startFontSize={"text-3xl"} />

              <span className="text-sm mt-2 block text-gray-500">
                {product.numReviews}{" "}
                {product.numReviews === 1 ? "Rating" : "Ratings"}
              </span>
            </div>

            {/* All the reviews */}
            <ProductReviews reviews={product.reviews} />
          </div>
        </main>
      )}

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Add Your Review</h3>
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Rating</label>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setReviewRating(star)}
                    className="text-2xl mr-2 focus:outline-none"
                  >
                    <FaStar
                      className={
                        star <= reviewRating
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Comment</label>
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 h-24"
                placeholder="Share your experience with this product..."
              />
            </div>

            <button
              onClick={handleAddReview}
              disabled={isSubmittingReview}
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 disabled:bg-gray-500 transition"
            >
              {isSubmittingReview ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Product;
