import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="empty" style={{ maxWidth: 540, margin: '0 auto', padding: 50 }}>
          <h2 style={{ fontSize: '32px', marginBottom: 10 }}>Page Not Found</h2>
          <p style={{ color: 'var(--ink-soft)', marginBottom: 24 }}>
            The page you are looking for does not exist or has been moved.
          </p>
          <Link to="/" className="btn btn-primary">
            Return to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
