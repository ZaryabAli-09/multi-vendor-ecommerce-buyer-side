import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
// import CategoryNavigation from "./CategoryNavigation";
import { toast } from "react-hot-toast";
const ProductList = () => {
  const { category, subcategory, subsubcategory } = useParams();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("recent");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    totalProducts: 0,
    totalPages: 0,
  });

  const path = location.pathname
    .split("/")
    .filter((word) => word !== "products" && word !== "")
    .join("/");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams({
          category: category || "",
          subcategory: subcategory || "",
          subsubcategory: subsubcategory || "",
          sort: sortBy, // this will now always be current
          page: pagination.page.toString(),
          limit: pagination.limit.toString(),
        });

        console.log(params.toString());
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/product/category?${params.toString()}`
        );

        const res = await response.json();

        if (res.status === "success") {
          setProducts(res.data.products);
          setPagination((prev) => ({
            ...prev,
            totalProducts: res.data.totalProducts,
            totalPages: res.data.totalPages,
          }));
        } else {
          toast.error(res.message);
          return;
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, subcategory, subsubcategory, sortBy, pagination.page]); // this part is key

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <>
      {/* <CategoryNavigation /> */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <h2 className="text-2xl flex-grow-[1] text-center translate-x-[9%] font-sans capitalize">
                {path
                  .replaceAll("%20", " ")
                  .replaceAll("/", " / ")
                  .replaceAll("&", "and")}
              </h2>

              {/* Sort Dropdown */}
              <div className="flex items-center mt-4 sm:mt-0">
                <label
                  htmlFor="sort"
                  className="mr-2 font-medium text-gray-700"
                >
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={handleSortChange}
                  className="border border-gray-300 rounded px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="recent">Most Recent</option>
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Low to High</option>
                  <option value="price-high">High to Low</option>
                </select>
              </div>
            </div>

            {/* Loading Spinner */}
            {loading ? (
              <div className="text-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading products...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mt-16">No products found</h3>
                <p className="text-sm text-gray-500">
                  Try adjusting your filters or category.
                </p>
              </div>
            ) : (
              <>
                {/* Product Grid */}
                <div className="flex flex-wrap gap-3">
                  {products.map((product) => {
                    return (
                      <ProductCard
                        images={product.variants[0].images}
                        name={product.name}
                        price={product.variants[0].price}
                        discountedPrice={product.variants[0].discountedPrice}
                        id={product._id}
                        brand={product.seller.brandName}
                        numReviews={product.numReviews}
                        rating={product.rating}
                        key={product._id}
                        sold={product.sold}
                      />
                    );
                  })}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="flex justify-center mt-10">
                    <nav className="flex items-center space-x-1">
                      {Array.from(
                        { length: pagination.totalPages },
                        (_, i) => i + 1
                      ).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-1 rounded ${
                            pagination.page === page
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </nav>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
