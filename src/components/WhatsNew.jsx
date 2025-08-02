// components/WhatsNewPopup.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WhatsNewPopup = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hasSeen = localStorage.getItem("whatsNewSeen");
    if (!hasSeen) {
      setShow(true);
    }
  }, []);

  const handleClose = () => {
    setShow(false);
    localStorage.setItem("whatsNewSeen", "true");
  };

  const handleNavigate = () => {
    setShow(false);
    navigate("/reels/all");
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full relative">
        <button
          className="absolute top-2 right-3 text-gray-400 hover:text-black text-xl"
          onClick={handleClose}
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">
          🎉 What's New!
        </h2>
        <p className="text-gray-600 mb-4 text-center">
          Bored of traditional navigation?
          <br />
          Now you can <strong>buy by scrolling through reels</strong> – yes, you
          heard that right! A completely new shopping experience.
        </p>
        <button
          className="w-full bg-black text-white rounded-md py-2 text-center hover:bg-gray-900"
          onClick={handleNavigate}
        >
          Check it Out
        </button>
      </div>
    </div>
  );
};

export default WhatsNewPopup;
