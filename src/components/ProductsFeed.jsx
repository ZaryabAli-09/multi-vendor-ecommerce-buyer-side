import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import ProductCard from "./ProductCard.jsx";

import { setProducts } from "../features/productsFeedSlice.js";

function ProductsFeed() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.productsFeed.products);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/product/all`
        );

        if (!response.ok) {
          const result = await response.json();
          alert(result.message);
        }

        const result = await response.json();
        console.log(result);
        dispatch(setProducts(result.data));
        // console.log(result.data);
      } catch (error) {
        console.log(error);
        // alert(error.message);
      }
    }

    fetchProducts();
  }, []);

  return (
    <main className="px-6 mb-6">
      <h1 className="text-center my-16 text-3xl font-semibold">Recommended</h1>

      <div className="flex flex-wrap gap-3">
        {products.map((product) => {
          // console.log(product);
          return (
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
            />
          );
        })}
      </div>
    </main>
  );
}

export default ProductsFeed;
