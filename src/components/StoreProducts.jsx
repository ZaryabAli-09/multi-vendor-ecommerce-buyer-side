// This code is copied from ProductsFeed.jsx, during re-factoring it might be a good idea to extract out one component from both of them

import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import ProductCard from "./ProductCard.jsx";

import { setProducts } from "../features/productsFeedSlice.js";

function StoreProducts({ storeId }) {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.productsFeed.products);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/product/store-products/${storeId}`
        );

        if (!response.ok) {
          const result = await response.json();
          alert(result.message);
        }

        const result = await response.json();
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
    <main className="px-6">
      <div className="flex flex-wrap gap-3">
        {products.map((product) => {
          // console.log(product);
          return (
            <ProductCard
              sold={product.variants[0].sold}
              images={product.variants[0].images}
              name={product.name}
              price={product.variants[0].price}
              discountedPrice={product.variants[0].discountedPrice}
              id={product._id}
              numReviews={product.numReviews}
              rating={product.rating}
              key={product._id}
            />
          );
        })}
      </div>
    </main>
  );
}

export default StoreProducts;
