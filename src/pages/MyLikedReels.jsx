import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const MyLikedReels = () => {
  const [likedReels, setLikedReels] = useState([]);
  const [hoveredReelId, setHoveredReelId] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);

  const buyerId = user?.id;

  const fetchLikedReels = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/product/reels/liked`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch liked reels");
      }
      setLoading(false);
      setLikedReels(data.data);
    } catch (error) {
      setLoading(false);
      toast.error(error.message || "Error fetching liked reels");
    }
  };

  const removeLikedReel = async (reelId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/product/reels/like/${reelId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to remove reel");
      }

      setLikedReels((prev) => prev.filter((reel) => reel._id !== reelId));
      toast.success("Reel Unliked");
    } catch (error) {
      toast.error(error.message || "Error removing reel");
    }
  };

  useEffect(() => {
    fetchLikedReels();
  }, [buyerId]);

  if (loading) {
    return (
      <div className="p-4 mb-44 text-center flex flex-col">
        <h2 className="text-xl text-center  md:text-2xl font-semibold mb-10">
          ❤️ My Liked Reels
        </h2>
        <main className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </main>
      </div>
    );
  } else {
    return (
      <div className="p-4 mb-44 text-center">
        <h2 className="text-xl text-center  md:text-2xl font-semibold mb-10">
          ❤️ My Liked Reels
        </h2>

        {likedReels.length === 0 ? (
          <p className="text-gray-500 text-center ">
            You haven’t liked any reels yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {likedReels.map((reel) => (
              <div
                key={reel._id}
                className="relative bg-black rounded overflow-hidden shadow"
                onMouseEnter={() => setHoveredReelId(reel._id)}
                onMouseLeave={() => setHoveredReelId(null)}
              >
                <video
                  className="w-full h-96 object-contain bg-black"
                  src={reel.videoUrl}
                  muted
                  controls={true}
                  preload="metadata"
                  poster={reel.thumbnailUrl || ""}
                ></video>

                {hoveredReelId === reel._id && (
                  <button
                    onClick={() => removeLikedReel(reel._id)}
                    className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 text-sm rounded shadow-md hover:bg-red-700"
                  >
                    Unlike
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
};

export default MyLikedReels;
