import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import ReviewCard from '../components/cards/ReviewCard';
import '../stylesheets/frontend/pages/reviews.css';

export default function ReviewsPage() {
  const { reviews, addReview } = useApp();
  const approvedReviews = reviews.filter((r) => r.status === 'APPROVED');

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    rating: '5',
    capacity: '',
    text: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name.';
    if (!formData.text.trim()) errs.text = 'Please enter your review comments.';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    addReview(formData);
    setFormData({
      name: '',
      location: '',
      rating: '5',
      capacity: '',
      text: ''
    });
  };

  return (
    <section className="section reviews-page">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">Client reviews</div>
          <h2>What our customers say</h2>
          <p>
            Real feedback from homeowners and businesses who installed solar systems with Avani Green Solar.
          </p>
        </div>

        <div className="cell-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', marginBottom: 48 }}>
          {approvedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        <div className="card-simple" style={{ maxWidth: 620, margin: '0 auto' }}>
          <h3 style={{ fontSize: '20px', marginBottom: 6 }}>Share your experience</h3>
          <p style={{ color: 'var(--ink-soft)', fontSize: '14px', marginBottom: 20 }}>
            Have you installed a solar system with us? We'd love to hear your feedback.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div className={`field ${errors.name ? 'invalid' : ''}`}>
              <label className="req">Your full name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Ramesh Chandra"
                required
              />
              {errors.name && <div className="err">{errors.name}</div>}
            </div>

            <div className="field">
              <label>Location / City</label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Bhopal, MP"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div className="field">
                <label>Overall rating</label>
                <select name="rating" value={formData.rating} onChange={handleChange}>
                  <option value="5">★★★★★ (5 Stars - Excellent)</option>
                  <option value="4">★★★★☆ (4 Stars - Very Good)</option>
                  <option value="3">★★★☆☆ (3 Stars - Average)</option>
                  <option value="2">★★☆☆☆ (2 Stars - Below Average)</option>
                  <option value="1">★☆☆☆☆ (1 Star - Poor)</option>
                </select>
              </div>

              <div className="field">
                <label>System capacity installed (optional)</label>
                <input
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  placeholder="e.g. 5 kW"
                />
              </div>
            </div>

            <div className={`field ${errors.text ? 'invalid' : ''}`}>
              <label className="req">Your review / experience</label>
              <textarea
                name="text"
                rows={4}
                value={formData.text}
                onChange={handleChange}
                placeholder="How was the installation quality, generation performance, and customer support?"
                required
              />
              {errors.text && <div className="err">{errors.text}</div>}
            </div>

            <button className="btn btn-primary" type="submit" style={{ marginTop: 8 }}>
              Submit Review
            </button>
            <p className="hint" style={{ marginTop: 10 }}>
              Your review will be published upon review and moderation by our team.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
