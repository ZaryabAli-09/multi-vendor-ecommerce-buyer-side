import { useState } from "react";

function ProductVariants({ variants, selectedVariant, setSelectedVariant }) {
  const uniqureColors = [...new Set(variants.map((variant) => variant.color))];

  const selectedColor = selectedVariant.color;
  const selectedSize = selectedVariant.size;

  // sizesForSelectedColor contains the objects with selected color present in them

  const sizesForSelectedColor = variants.filter(
    (variant) => variant.color === selectedColor
  );

  function handleColorChange(color) {
    let newVaraint;
    for (let i = 0; i < variants.length; i++) {
      if (variants[i].color === color) {
        newVaraint = variants[i];
        break;
      }
    }
    setSelectedVariant(newVaraint);
  }

  function handleSizeChange(size) {
    let newVaraint;
    for (let i = 0; i < variants.length; i++) {
      if (variants[i].size === size && variants[i].color === selectedColor) {
        newVaraint = variants[i];
        break;
      }
    }
    setSelectedVariant(newVaraint);
  }

  return (
    <div>
      {/* Showing selected color */}

      <div>
        <span className="font-semibold">Color</span> :
        <span> {selectedVariant.color}</span>
      </div>

      {/* showing all colors */}

      <div className="flex gap-x-2">
        {uniqureColors.map((color, i) => {
          return (
            <button
              onClick={() => handleColorChange(color)}
              key={i}
              className={`flex justify-center items-center cursor-pointer w-[40px] h-[40px] rounded-[50%] my-4 ${
                color === selectedColor
                  ? "border-[2px] border-black"
                  : "border-[2px] border-transparent"
              }`}
            >
              <span
                className="w-[90%] h-[90%] rounded-[50%] block"
                style={{
                  backgroundColor:
                    color.toLowerCase() === "#ffffff" ? "#e7e6e6cc" : color,
                }}
              ></span>
            </button>
          );
        })}
      </div>

      {/* showing all sizes for selected color */}

      <div>
        <span className="text-xl my-2 font-medium block">
          Size :{" "}
          {selectedSize === "S"
            ? "Small"
            : selectedSize === "M"
            ? "Medium"
            : selectedSize === "L"
            ? "Large"
            : selectedSize === "XL"
            ? "Extra Large"
            : selectedSize}
        </span>

        <div className="flex gap-4 my-4">
          {sizesForSelectedColor.map((variant, i) => (
            <button
              key={i}
              onClick={() => handleSizeChange(variant.size)}
              className={`text-xl px-8 py-[2px] rounded-2xl ${
                variant.size === selectedSize
                  ? "border-2 border-black "
                  : "border-[1.5px] border-gray-200"
              }`}
            >
              {variant.size}{" "}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductVariants;
