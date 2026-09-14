import React from 'react';

export default function RatingStars({ rating = 5 }) {
  const rounded = Math.round(Number(rating) || 5);
  return (
    <span className="stars" aria-label={`${rounded} out of 5 stars`}>
      {'★'.repeat(rounded)}{'☆'.repeat(Math.max(0, 5 - rounded))}
    </span>
  );
}
