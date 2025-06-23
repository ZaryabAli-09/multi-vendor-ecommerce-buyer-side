import { useEffect, useState } from "react";

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

import img1 from "../assets/images/img1.webp";
import img2 from "../assets/images/img2.webp";
import img3 from "../assets/images/img3.webp";

const allImages = [img3, img1, img2, img3, img1];

function HomeSlider() {
  const [displayedImgIndex, setDisplayedImgIndex] = useState(1);
  const [isSliderTransitioning, setIsSliderTransitioing] = useState(true);

  function showNextImg() {
    setIsSliderTransitioing(true);
    setDisplayedImgIndex(
      displayedImgIndex + 1 === allImages.length ? 0 : displayedImgIndex + 1
    );
  }

  function showPreviousImg() {
    setIsSliderTransitioing(true);
    setDisplayedImgIndex(
      displayedImgIndex - 1 === -1
        ? allImages.length - 1
        : displayedImgIndex - 1
    );
  }

  useEffect(() => {
    if (displayedImgIndex === allImages.length - 1) {
      setTimeout(() => {
        setIsSliderTransitioing(false);
        setDisplayedImgIndex(1);
      }, 200);
    }

    if (displayedImgIndex === 0) {
      setTimeout(() => {
        setIsSliderTransitioing(false);
        setDisplayedImgIndex(3);
      }, 200);
    }
  }, [displayedImgIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      showNextImg();
    }, 5 * 1000);

    return () => {
      clearTimeout(interval);
    };
  }, [displayedImgIndex]);

  return (
    <div className="w-[90vw] h-[240px]  md:w-[50vw] md:h-[275px] rounded-md mt-12 mx-auto relative overflow-hidden">
      <div
        className={`flex w-full h-full ${
          isSliderTransitioning ? "transition-all" : ""
        }`}
        style={{ transform: `translateX(-${100 * displayedImgIndex}%)` }}
      >
        {allImages.map((img, i) => {
          return (
            <img
              src={img}
              key={i}
              className="object-cover w-full h-full rounded-md flex-shrink-0"
              alt=""
            />
          );
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

export default HomeSlider;
