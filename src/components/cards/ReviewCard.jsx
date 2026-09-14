import React from 'react';
import RatingStars from '../common/RatingStars';

export default function ReviewCard({ review }) {
  if (!review) return null;

  return (
    <div className="cell" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ marginBottom: 12 }}>
        <RatingStars rating={review.rating} />
      </div>
      <p style={{ fontSize: '14.5px', color: 'var(--ink)', fontStyle: 'italic', marginBottom: 16, flexGrow: 1 }}>
        "{review.text}"
      </p>
      <div style={{ borderTop: '1px solid var(--line-light)', paddingTop: 12 }}>
        <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--forest)', margin: 0 }}>
          {review.name}
        </p>
        <p style={{ fontSize: '12.5px', color: 'var(--ink-soft)', margin: '2px 0 0' }}>
          {review.location} {review.capacity ? ` · ${review.capacity}` : ''}
        </p>
      </div>
    </div>
  );
}
