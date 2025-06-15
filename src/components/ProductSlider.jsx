import { useState } from "react";

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

function ProductSlider({ images, displayedImgIndex, setDisplayedImgIndex }) {
  const [isSliderTransitioning, setIsSliderTransitioing] = useState(false);

  function showNextImg() {
    setIsSliderTransitioing(true);
    setDisplayedImgIndex(
      displayedImgIndex + 1 === images.length ? 0 : displayedImgIndex + 1
    );

    setTimeout(() => {
      setIsSliderTransitioing(false);
    }, 150);
  }

  function showPreviousImg() {
    setIsSliderTransitioing(true);
    setDisplayedImgIndex(
      displayedImgIndex - 1 === -1 ? images.length - 1 : displayedImgIndex - 1
    );

    setTimeout(() => {
      setIsSliderTransitioing(false);
    }, 150);
  }

  return (
    <div className="overflow-hidden w-[85%] relative">
      <div
        className={`flex w-full ${
          isSliderTransitioning ? "transition-all" : ""
        }`}
        style={{ transform: `translateX(-${100 * displayedImgIndex}%)` }}
      >
        {images.map((image) => {
          return <img src={image.url} alt="" key={image._id} />;
        })}
      </div>

      <button
        onClick={showPreviousImg}
        className="absolute top-[50%] translate-y-[-50%] left-[3%] w-[35px] h-[35px] rounded-[50%] bg-[#ffffff80] hover:bg-white flex justify-center items-center"
      >
        <IoIosArrowBack className="text-2xl relative right-[1px]" />
      </button>

      <button
        onClick={showNextImg}
        className="absolute top-[50%] translate-y-[-50%] right-[3%] w-[35px] h-[35px] rounded-[50%] bg-[#ffffff80] hover:bg-white flex justify-center items-center"
      >
        <IoIosArrowForward className="text-2xl relative left-[1px]" />
      </button>
    </div>
  );
}

export default ProductSlider;
