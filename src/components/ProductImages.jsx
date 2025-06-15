import { useState } from "react";

import ProductSlider from "./ProductSlider";

function ProductImages({ images }) {
  const [displayedImgIndex, setDisplayedImgIndex] = useState(0);

  return (
    <div className="flex gap-x-3 w-[50%] h-min">
      {/* All images on side of selected variant  */}
      <div className="flex flex-col gap-y-2 w-[15%] cursor-pointer">
        {images.map((image, i) => {
          return (
            <img
              src={image.url}
              onMouseEnter={() => setDisplayedImgIndex(i)}
              key={image._id}
              className={`${
                displayedImgIndex === i
                  ? "border-[1.5px] border-black p-1"
                  : "border-[1.5px] border-transparent p-1"
              }`}
              alt=""
            />
          );
        })}
      </div>

      <ProductSlider
        images={images}
        displayedImgIndex={displayedImgIndex}
        setDisplayedImgIndex={setDisplayedImgIndex}
      />
    </div>
  );
}

export default ProductImages;
