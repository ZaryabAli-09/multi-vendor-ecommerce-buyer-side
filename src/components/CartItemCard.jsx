import React from "react";

import { Link } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";

function CartItemCard({
  id,
  isChecked,
  image,
  selectedStoreId,
  storeId,
  productId,
  variantId,
  productName,
  size,
  color,
  price,
  discountedPrice,
  quantity,
  toggleItemSelect,
  handleRemoveFromCart,
  incrementCartItemCount,
  decrementCartItemCount,
}) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center border border-gray-300 p-4 rounded-lg mb-4 gap-4">
      {/* cart item checkbox */}

      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => toggleItemSelect(id)}
        disabled={selectedStoreId !== storeId && selectedStoreId !== null}
        className="self-start sm:self-center scale-150"
      />

      {/* cart item image */}

      <Link to={`/products/single/${productId}/${variantId}`}>
        <img
          src={image}
          alt="product"
          className="w-28 h-32 object-cover rounded-md"
        />
      </Link>

      {/* cart item information like name, size, color, price, quantity, delete btn */}

      <div className="flex-1">
        {/* name */}

        <Link
          to={`/products/single/${productId}/${variantId}`}
          className="font-medium text-lg line-clamp-1 text-ellipsis overflow-hidden hover:underline"
        >
          {productName}
        </Link>

        {/* size and color */}

        <p className="mt-1 flex items-center">
          {/* size */}
          <span className="font-semibold">Size</span> :{" "}
          {size === "S"
            ? "Small"
            : size === "M"
            ? "Medium"
            : size === "L"
            ? "Large"
            : size === "XL"
            ? "Extra Large"
            : size}{" "}
          |{/* color */}
          <span className="font-semibold">Color</span> :{" "}
          <span
            className="inline-block w-4 h-4 rounded-full ml-1 align-middle"
            style={{
              backgroundColor:
                color.toLowerCase() === "#ffffff" ? "#e7e6e6cc" : color,
            }}
          ></span>
        </p>

        {/* price, quantity increment & decrement, delete btn*/}

        <div className="flex items-center justify-between mt-1">
          {/* price */}

          <p className="flex items-center">
            {discountedPrice === null ? (
              <span className="text-orange-600 text-2xl font-semibold mr-2">
                Rs {price}
              </span>
            ) : (
              <>
                <span className="text-orange-600 text-2xl font-semibold mr-2">
                  Rs {discountedPrice}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  Rs {price}
                </span>{" "}
              </>
            )}
          </p>

          {/* quantity increment & decrement, delete btn */}
          <div className="mt-2 flex items-center space-x-6">
            <div>
              <button
                onClick={() => decrementCartItemCount(id, quantity)}
                className="px-2 py-1 border border-gray-400 rounded text-xl disabled:cursor-not-allowed"
                disabled={quantity === 1}
              >
                -
              </button>

              <span className="px-2 text-lg">{quantity}</span>

              <button
                onClick={() =>
                  incrementCartItemCount(productId, variantId, id, quantity)
                }
                className="px-2 py-1 border border-gray-400 rounded text-xl disabled:cursor-not-allowed"
                disabled={quantity === 3}
              >
                +
              </button>
            </div>

            <RiDeleteBinLine
              className="text-2xl text-gray-700 cursor-pointer"
              onClick={() => handleRemoveFromCart(id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItemCard;
