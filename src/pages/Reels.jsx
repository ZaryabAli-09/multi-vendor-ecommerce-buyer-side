import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const UserReels = () => {
  const [reels, setReels] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [userLikedReels, setUserLikedReels] = useState([]);

  const containerRef = useRef(null);
  const observer = useRef(null);
  const lastReelRef = useRef(null);
  const userId = useSelector((state) => state.user?.id);

  // 🔍 Fetch Buyer Likes
  const fetchBuyer = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/buyer/single/${userId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      setUserLikedReels(data.data.likedReels || []);
    } catch (error) {
      toast.error("Error fetching buyer data: " + error.message);
    }
  };

  useEffect(() => {
    if (userId) fetchBuyer();
  }, [userId]);

  // 📥 Fetch Reels Page-wise
  const fetchReels = useCallback(async () => {
    try {
      const url = userId
        ? `${
            import.meta.env.VITE_API_URL
          }/product/reels/get?buyerId=${userId}&page=${page}&limit=5`
        : `${
            import.meta.env.VITE_API_URL
          }/product/reels/get?page=${page}&limit=5`;

      const res = await fetch(url);
      const data = await res.json();
      const newReels = data.data || [];

      if (newReels.length === 0) setHasMore(false);

      setReels((prev) => [...prev, ...newReels]);
      setLoading(false);
      setLoadingMore(false);
    } catch (err) {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [page, userId]);

  useEffect(() => {
    fetchReels();
  }, [fetchReels]);

  // ❤️ Like Toggle Handler
  const handleReelsLike = async (reelId) => {
    if (!userId) return toast.error("Please log in to like reels.");
    const isLiked = userLikedReels.some((liked) => liked.reel === reelId);

    try {
      const method = isLiked ? "DELETE" : "POST";
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/product/reels/like/${reelId}`,
        {
          method,
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const data = await res.json();

      toast.success(data.message || (isLiked ? "💔 Unliked" : "❤️ Liked"));
      setUserLikedReels((prev) =>
        isLiked
          ? prev.filter((r) => r.reel !== reelId)
          : [...prev, { reel: reelId }]
      );

      setReels((prevReels) =>
        prevReels.map((reel) =>
          reel._id === reelId
            ? { ...reel, likes: (reel.likes || 0) + (isLiked ? -1 : 1) }
            : reel
        )
      );
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // 👀 Play/Pause Visible Videos
  useEffect(() => {
    const options = { threshold: 0.75 };
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      });
    }, options);

    const videos = containerRef.current?.querySelectorAll("video");
    videos?.forEach((video) => observer.current.observe(video));

    return () => {
      videos?.forEach((video) => observer.current.unobserve(video));
    };
  }, [reels]);

  // 🧠 Observe Last Reel for Pagination
  const lastReelElementRef = useCallback(
    (node) => {
      if (loadingMore || !hasMore) return;

      if (lastReelRef.current) observer.current.unobserve(lastReelRef.current);
      lastReelRef.current = node;

      if (node) {
        observer.current.observe(node);
        observer.current.callback = (entries) => {
          if (entries[0].isIntersecting) {
            setLoadingMore(true);
            setPage((prev) => prev + 1);
          }
        };
      }
    },
    [loadingMore, hasMore]
  );

  return (
    <div
      ref={containerRef}
      className="h-screen w-screen overflow-x-hidden overflow-y-scroll snap-y snap-mandatory bg-black scrollbar-hide"
    >
      <Link
        to={"/"}
        className="text-black bg-yellow-600 border border-black p-2 fixed top-0 left-2 z-10 hover:bg-white hover:text-black rounded"
      >
        Back
      </Link>
      {loading ? (
        <div className="h-screen flex justify-center items-center text-white text-xl">
          Loading reels...
        </div>
      ) : reels.length === 0 ? (
        <div className="h-screen flex justify-center items-center text-white text-xl">
          No reels found.
        </div>
      ) : (
        reels.map((reel, index) => (
          <div
            key={reel._id}
            ref={index === reels.length - 1 ? lastReelElementRef : null}
            className="snap-start overflow-y-hidden py-0 px-0 md:py-8 h-screen w-screen flex items-center justify-center relative bg-black/30 backdrop-blur-lg"
          >
            <div className="aspect-[9/16] w-full sm:w-[360px] md:w-[400px] lg:w-[380px] xl:w-[400px] h-full flex items-center justify-center relative">
              <video
                src={reel.videoUrl}
                className="h-full w-full object-cover rounded-lg shadow-lg"
                loop
                playsInline
                autoPlay
                controls={false}
              />

              <div className="absolute right-3 bottom-30 z-10 flex flex-col items-center gap-1 text-white">
                <button
                  onClick={() => handleReelsLike(reel._id)}
                  className="hover:scale-150 transition text-2xl"
                >
                  {userLikedReels.some((liked) => liked.reel === reel._id)
                    ? "❤️"
                    : "🤍"}
                </button>
                {reel.likes || 0}
              </div>

              <div className="absolute bottom-14 md:bottom-4 left-4 text-white font-bold">
                <p className="font-semibold text-base">
                  @{reel?.uploadedBy?.brandName || "seller"}
                </p>
                <button className="text-black bg-yellow-600 px-2 py-1 m-1 rounded">
                  <Link to={`/products/single/${reel?.caption}`}>Buy Now</Link>
                </button>
              </div>
            </div>
          </div>
        ))
      )}
      {loadingMore && (
        <div className="text-white text-center py-4">Loading more...</div>
      )}
    </div>
  );
};

export default UserReels;
