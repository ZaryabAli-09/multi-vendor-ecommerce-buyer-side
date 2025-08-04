import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard.jsx";
import { setProducts, addProducts } from "../features/productsFeedSlice.js";

function ProductsFeed({ setIsSimilarProductsVisible, setTargetProductId }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsFeed.products);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user?.id);

  console.log(user);
  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/product/all?page=${page}`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-buyer-id": user, // Send buyer ID here
            },
          }
        );

        if (!response.ok) {
          const result = await response.json();
          alert(result.message);
          return;
        }

        const result = await response.json();
        if (page === 1) {
          dispatch(setProducts(result.data.products));
        } else {
          dispatch(addProducts(result.data.products));
        }
        setHasMore(result.data.hasMore);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [page, dispatch]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <main className="px-6 mb-6">
      <h1 className="text-center my-16 text-3xl font-semibold">Recommended</h1>

      <div className="flex flex-wrap gap-3">
        {products.map((product) => (
          <ProductCard
            images={product.variants[0].images}
            name={product.name}
            price={product.variants[0].price}
            discountedPrice={product.variants[0].discountedPrice}
            id={product._id}
            brand={product.seller?.brandName}
            numReviews={product.numReviews}
            rating={product.rating}
            key={product._id}
            sold={product.sold}
            setIsSimilarProductsVisible={setIsSimilarProductsVisible}
            setTargetProductId={setTargetProductId}
          />
        ))}
      </div>

      {isLoading && (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}

      {hasMore && !isLoading && (
        <div className="flex justify-center my-8">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-black text-white rounded-md hover:bg-primary-dark transition"
          >
            Load More
          </button>
        </div>
      )}
    </main>
  );
}

export default ProductsFeed;
