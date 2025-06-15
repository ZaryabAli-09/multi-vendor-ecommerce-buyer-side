import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating, startFontSize }) => {
  const rounded = Math.round(rating * 2) / 2; // Round to nearest 0.5
  const fullStars = Math.floor(rounded);
  const hasHalfStar = rounded % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <FaStar
        key={`full-${i}`}
        className={`text-yellow-500 ${startFontSize}`}
      />
    );
  }

  if (hasHalfStar) {
    stars.push(
      <FaStarHalfAlt
        key="half"
        className={`text-yellow-500 ${startFontSize}`}
      />
    );
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <FaRegStar
        key={`empty-${i}`}
        className={`text-yellow-500  ${startFontSize}`}
      />
    );
  }

  return <div className="flex gap-1 mt-1">{stars}</div>;
};

export default StarRating;
