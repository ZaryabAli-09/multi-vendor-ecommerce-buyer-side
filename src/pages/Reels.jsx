import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
const UserReels = () => {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const observer = useRef();
  const [userLikedReels, setUserLikedReels] = useState([]);

  // Get the user ID from the Redux store
  const userId = useSelector((state) => state.user?.id);

  async function fetchBuyer() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/buyer/single/${userId}`,
        {
          method: "GET",

          credentials: "include", // Include cookies for authentication
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch buyer data");
      }
      const data = await response.json();

      setUserLikedReels(data.data.likedReels || []);
    } catch (error) {
      toast.error("Error fetching buyer data: " + error.message);
    }
  }
  useEffect(() => {
    if (userId) {
      fetchBuyer();
    }
  }, [userId]);

  async function handleReelsLike(reelId) {
    if (!userId) {
      toast.error("Please log in to like reels.");
      return;
    }
    const isAlreadyLiked = userLikedReels.some(
      (liked) => liked.reel === reelId
    );
    console.log("isAlreadyLiked:", isAlreadyLiked);

    try {
      const method = isAlreadyLiked ? "DELETE" : "POST";
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/product/reels/like/${reelId}`,
        {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to toggle like");
      }

      const data = await response.json();
      toast.success(
        data.message || (isAlreadyLiked ? "💔 Unliked" : "❤️ Liked")
      );

      // Update liked reels list
      setUserLikedReels((prev) =>
        isAlreadyLiked
          ? prev.filter((item) => item.reel !== reelId)
          : [...prev, { reel: reelId }]
      );

      // Update likes count for the specific reel
      setReels((prevReels) =>
        prevReels.map((reel) =>
          reel._id === reelId
            ? {
                ...reel,
                likes: (reel.likes || 0) + (isAlreadyLiked ? -1 : 1),
              }
            : reel
        )
      );
    } catch (error) {
      console.error("Error toggling like:", error);
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    const url = userId
      ? `${import.meta.env.VITE_API_URL}/product/reels/get?buyerId=${userId}`
      : `${import.meta.env.VITE_API_URL}/product/reels/get`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setReels(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [userId]);

  useEffect(() => {
    const options = { threshold: 0.75 };
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    }, options);

    const videos = containerRef.current?.querySelectorAll("video");
    videos?.forEach((video) => observer.current.observe(video));

    return () => {
      videos?.forEach((video) => observer.current.unobserve(video));
    };
  }, [reels]);

  return (
    <div
      ref={containerRef}
      className="h-screen  w-screen overflow-x-hidden  overflow-y-scroll snap-y snap-mandatory bg-black scrollbar-hide"
    >
      {loading ? (
        <div className="h-screen flex  justify-center items-center text-white text-xl">
          Loading reels...
        </div>
      ) : reels.length === 0 ? (
        <div className="h-screen flex  justify-center items-center text-white text-xl">
          No reels found.
        </div>
      ) : (
        reels.map((reel, index) => (
          <>
            <Link
              to={"/"}
              className="text-black bg-yellow-600 border border-black p-2 fixed top-0 left-2 z-10 hover:bg-white hover:text-black rounded"
            >
              {" "}
              Back
            </Link>
            <div
              key={index}
              className="snap-start overflow-y-hidden py-0 px-0 md:py-8  h-screen w-screen flex items-center justify-center relative bg-black/30 backdrop-blur-lg
"
            >
              {/* Centered vertical video */}
              <div className="aspect-[9/16] w-full  sm:w-[360px] md:w-[400px] lg:w-[380px] xl:w-[400px] h-full flex items-center justify-center relative">
                <video
                  src={reel.videoUrl}
                  className="h-full w-full  object-cover  rounded-lg shadow-lg"
                  loop
                  playsInline
                  controls={true}
                />

                {/* Overlay buttons */}
                <div
                  className="absolute right-3 bottom-30 z-10 flex flex-col items-center gap-1
 text-white"
                >
                  <button
                    onClick={() => handleReelsLike(reel._id)}
                    className="hover:scale-150 transition text-2xl"
                  >
                    {userLikedReels.some((liked) => liked.reel === reel._id)
                      ? "❤️"
                      : "🤍"}
                  </button>
                  {reel.likes || 0}
                  {/* <button className="hover:scale-110 transition">💬</button> */}
                  {/* <button className="hover:scale-110 transition">🔁</button> */}
                </div>

                {/* Video info */}
                <div className="absolute bottom-4 left-4 text-white font-bold">
                  <p className="font-semibold text-base">
                    @{reel?.uploadedBy?.brandName || "seller"}
                  </p>
                  <button className="text-black-500  bg-yellow-600 px-2 py-1 m-1 rounded">
                    <Link to={`/products/single/${reel?.caption}`}>
                      Buy Now
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </>
        ))
      )}
    </div>
  );
};

export default UserReels;
