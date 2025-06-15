import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import StoreProducts from "../components/StoreProducts.jsx";
import StoreAbout from "../components/StoreAbout.jsx";

function Store() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const currentTab = tabParam || "products";
  const { storeId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [storeInfo, setStoreInfo] = useState({ name: "", logoUrl: "" });

  useEffect(() => {
    async function getStoreBasicInfo() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/seller/single/basic-info/${storeId}`
        );
        if (!response.ok) {
          throw new Error(
            `Error fetching store basic info: ${response.statusText}`
          );
        }
        const result = await response.json();
        setStoreInfo({
          name: result.data.brandName,
          logoUrl: result.data.logo.url,
        });
      } catch (error) {
        console.error("Failed to fetch store info:", error);
      } finally {
        setIsLoading(false);
      }
    }
    getStoreBasicInfo();
  }, [storeId]);

  const handleTabClick = (tabKey) => {
    setSearchParams({ tab: tabKey });
  };

  if (isLoading) {
    return (
      <main className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Store Header */}
      <header className="bg-gray-800 sticky top-0 z-10 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between py-4">
            {/* Logo and Store Name */}
            <div className="flex items-center mb-4 md:mb-0">
              {storeInfo.logoUrl && (
                <img
                  src={storeInfo.logoUrl}
                  alt="Store Logo"
                  className="h-12 w-12 sm:h-14 sm:w-14 object-contain rounded-full border-2 border-white"
                />
              )}
              <h1 className="ml-3 text-xl sm:text-2xl font-bold text-white">
                {storeInfo.name}
              </h1>
            </div>

            {/* Navigation Tabs */}
            <nav className="w-full md:w-auto">
              <ul className="flex space-x-4 sm:space-x-8 justify-center md:justify-end">
                <li>
                  <button
                    onClick={() => handleTabClick("products")}
                    className={`px-3 py-2 text-sm sm:text-base font-medium rounded-md transition-colors ${
                      currentTab === "products"
                        ? "bg-white text-gray-800"
                        : "text-white hover:bg-gray-700"
                    }`}
                  >
                    Products
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleTabClick("about")}
                    className={`px-3 py-2 text-sm sm:text-base font-medium rounded-md transition-colors ${
                      currentTab === "about"
                        ? "bg-white text-gray-800"
                        : "text-white hover:bg-gray-700"
                    }`}
                  >
                    About Us
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-8 sm:py-12">
        {currentTab === "products" && <StoreProducts storeId={storeId} />}
        {currentTab === "about" && <StoreAbout storeId={storeId} />}
      </section>
    </main>
  );
}

export default Store;
