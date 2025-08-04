import { useEffect, useState } from "react";
import closeImg from "../assets/images/close.png";
import ProductCard2 from "./ProductCard2.jsx";

function SimilarProducts({
  isSimilarProductsVisible,
  setIsSimilarProductsVisible,
  targetProductId,
  setTargetProductId,
}) {
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!targetProductId) return;

    const fetchSimilarProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `http://localhost:5000/api/product/similar/${targetProductId}
`
        );
        const data = await res.json();

        if (res.ok && data.status === "success") {
          setSimilarProducts(data.data || []);
        } else {
          setError(data.message || "Failed to fetch similar products.");
        }
      } catch (err) {
        setError("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarProducts();
  }, [targetProductId]);

  return (
    <div
      className={`${
        isSimilarProductsVisible ? "block" : "hidden"
      } fixed top-0 right-0 w-full bg-[#413e3e44] h-full flex justify-end`}
    >
      <div className="w-[30%] bg-white overflow-y-auto max-h-full">
        <div className="relative">
          <span className="block my-5 text-center text-xl font-semibold">
            SIMILAR PRODUCTS
          </span>
          <button
            className="absolute right-6 top-[50%] translate-y-[-50%]"
            onClick={() => {
              setIsSimilarProductsVisible(false);
              setTargetProductId(null);
              setSimilarProducts([]);
            }}
          >
            <img src={closeImg} className="w-4" alt="Close" />
          </button>
        </div>

        <div className="p-2">
          {loading ? (
            <div className="text-center text-gray-500">
              Loading similar products...
            </div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : similarProducts.length === 0 ? (
            <div className="text-center text-gray-500">
              No similar products found.
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-y-3">
              {similarProducts.map((product) => (
                <ProductCard2
                  key={product._id}
                  images={product.variants[0]?.images}
                  name={product.name}
                  price={product.variants[0]?.price}
                  discountedPrice={product.variants[0]?.discountedPrice}
                  id={product._id}
                  brand={product.seller?.brandName}
                  numReviews={product.numReviews}
                  rating={product.rating}
                  sold={product.sold}
                  setIsSimilarProductsVisible={setIsSimilarProductsVisible}
                  setTargetProductId={setTargetProductId}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SimilarProducts;
