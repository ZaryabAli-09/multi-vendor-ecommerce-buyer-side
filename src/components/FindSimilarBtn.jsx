import { useState } from "react";

import searchIcon from "../assets/images/research.png";

function FindSimilarBtn({
  setIsSimilarProductsVisible,
  setTargetProductId,
  id,
}) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <button
      onClick={(e) => {
        setIsSimilarProductsVisible(true);
        e.preventDefault();
        e.stopPropagation();
        console.log("Find Similar clicked for product ID:", id);
        setTargetProductId(id);
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="absolute right-1 bottom-1 flex items-center flex-wrap gap-x-2 p-2 rounded-md bg-white border-[1px] shadow-sm shadow-[#0000005b]"
    >
      <span className={isHovering ? "block" : "hidden"}>Find Similar</span>
      <img src={searchIcon} alt="" className="w-5" />
    </button>
  );
}

export default FindSimilarBtn;
