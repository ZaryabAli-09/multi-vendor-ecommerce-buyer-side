import React from "react";

import StarRating from "./StarRating";

function ProductReviews({ reviews }) {
  console.log(reviews);
  return (
    <div className="mt-9">
      {reviews.map((review, i) => {
        return (
          <div
            key={review._id}
            className={`border-b-[1.5px] pt-2 pb-4 border-gray-200 ${
              i === 0 && "border-t-[1.5px]"
            } `}
          >
            <span className="block font-medium text-lg">
              {review?.user?.name}
            </span>

            <StarRating rating={review.rating} startFontSize={"text-lg"} />

            <p className="mt-4">{review.comment}</p>

            {review.sellerReply.text && (
              <div className="bg-gray-200 ml-4 p-4 mt-4">
                <span className="text-red-600">Seller Response</span>
                <p>{review?.sellerReply?.text}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ProductReviews;
