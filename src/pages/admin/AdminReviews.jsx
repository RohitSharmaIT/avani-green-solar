import React from 'react';
import { useApp } from '../../context/AppContext';
import RatingStars from '../../components/common/RatingStars';

export default function AdminReviews() {
  const { reviews, approveReview } = useApp();

  return (
    <div>
      <h2 style={{ fontSize: '24px', marginBottom: 4 }}>Customer Reviews Moderation</h2>
      <p style={{ color: 'var(--ink-soft)', fontSize: '14px', marginBottom: 24 }}>
        Approve newly submitted customer testimonials to feature them on the public reviews page.
      </p>

      {reviews.length > 0 ? (
        <div style={{ overflowX: 'auto' }}>
          <table className="admin">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Rating</th>
                <th>Review Text</th>
                <th>Location</th>
                <th>Capacity</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((r) => (
                <tr key={r.id}>
                  <td style={{ fontWeight: 600 }}>{r.name}</td>
                  <td>
                    <RatingStars rating={r.rating} />
                  </td>
                  <td style={{ maxWidth: 300, fontSize: '13px' }}>"{r.text}"</td>
                  <td>{r.location || '—'}</td>
                  <td>{r.capacity || '—'}</td>
                  <td>
                    <span className={`badge-status ${r.status === 'APPROVED' ? 'st-APPROVED' : 'st-CONTACTED'}`}>
                      {r.status}
                    </span>
                  </td>
                  <td>
                    {r.status !== 'APPROVED' ? (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => approveReview(r.id)}
                      >
                        Approve &amp; Publish
                      </button>
                    ) : (
                      <span style={{ color: 'var(--ink-soft)', fontSize: '13px' }}>Published</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty">No customer reviews on file.</div>
      )}
    </div>
  );
}
