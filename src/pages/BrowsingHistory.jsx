import { useEffect, useState } from "react";

import BrowsingHistoryItemCard from "../components/BrowsingHistoryItemCard.jsx";

function BrowsingHistory() {
  const [browsingHistoryItems, setBrowsingHistoryItems] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBrowsingHistoryItems() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/buyer/browsing-history`,
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
        setBrowsingHistoryItems(result.data.reverse());
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBrowsingHistoryItems();
  }, []);

  if (isLoading) {
    return (
      <main className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </main>
    );
  }

  return (
    <main className="px-6 mb-10">
      <h1 className="text-center py-7 text-2xl font-bold">
        My Browsing History{" "}
        {browsingHistoryItems.length > 0 ? (
          <span>
            ({browsingHistoryItems.length}{" "}
            {browsingHistoryItems.length === 1 ? "Product" : "Products"})
          </span>
        ) : (
          ""
        )}
      </h1>

      {browsingHistoryItems.length === 0 && (
        <div>
          <p className="text-center text-2xl mt-32">
            You currently have nothing in your browsing history.
          </p>
        </div>
      )}

      {browsingHistoryItems.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {browsingHistoryItems.map((browsingHistoryItem) => {
            return (
              <BrowsingHistoryItemCard
                images={browsingHistoryItem.variants[0].images}
                name={browsingHistoryItem.name}
                price={browsingHistoryItem.variants[0].price}
                discountedPrice={
                  browsingHistoryItem.variants[0].discountedPrice
                }
                productId={browsingHistoryItem._id}
                numReviews={browsingHistoryItem.numReviews}
                rating={browsingHistoryItem.rating}
                key={browsingHistoryItem._id}
                setBrowsingHistoryItems={setBrowsingHistoryItems}
              />
            );
          })}
        </div>
      )}
    </main>
  );
}

export default BrowsingHistory;
