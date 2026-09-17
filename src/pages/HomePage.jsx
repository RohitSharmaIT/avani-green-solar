import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Icon from '../components/common/Icon';
import ProjectCard from '../components/cards/ProjectCard';
import ReviewCard from '../components/cards/ReviewCard';

export default function HomePage() {
  const { projects, reviews, addReview, openEnquiryModal } = useApp();

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    location: '',
    rating: '5',
    capacity: '',
    text: ''
  });
  const [reviewErrors, setReviewErrors] = useState({});

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 6);
  const approvedReviews = reviews.filter((r) => r.status === 'APPROVED');

  const reasons = [
    { icon: 'bolt', title: 'Lower electricity bills', text: 'Generate your own power and reduce dependence on grid electricity over time.' },
    { icon: 'leaf', title: 'Clean renewable energy', text: 'Solar power reduces reliance on fossil fuels for your daily electricity needs.' },
    { icon: 'shield', title: 'Long-term savings', text: 'A well-sized system is designed to offset costs over its operating lifetime.' },
    { icon: 'battery', title: 'Energy independence', text: 'Reduce exposure to rising tariffs and, with hybrid systems, grid outages.' },
    { icon: 'wrench', title: 'Low maintenance', text: 'Solar systems generally require only periodic cleaning and inspection.' },
    { icon: 'sun', title: 'Sustainable future', text: 'Contribute to cleaner energy generation for your household or business.' }
  ];

  const workflow = [
    'Electricity consumption',
    'Solar installation',
    'Solar generation',
    'Lower grid consumption',
    'Reduced electricity bill'
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <h1 style={{ marginTop: 0 }}>Power your future with clean solar energy</h1>
            <p className="lead">
              Reliable solar solutions for homes, businesses and industries across Madhya Pradesh — from engineering and net-metering to turnkey installation and after-sales support.
            </p>
            <div className="cta-row">
              <Link to="/solar-calculator" className="btn btn-primary">
                Calculate Solar Savings
              </Link>
              <Link to="/subsidy-calculator" className="btn btn-ghost">
                Calculate Subsidy
              </Link>
            </div>
            <div className="cta-row" style={{ marginTop: 14 }}>
              <Link to="/talk-to-solar-expert" className="btn btn-ghost btn-sm">
                <Icon name="phone" size={16} /> Talk to Solar Expert
              </Link>
              <Link to="/book-site-visit" className="btn btn-ghost btn-sm">
                <Icon name="pin" size={16} /> Book Site Visit
              </Link>
            </div>
          </div>

          <div className="hero-banner-wrapper">
            <Link
              to="/pm-surya-ghar"
              className="hero-banner-card"
              title="PM Surya Ghar: Muft Bijli Yojana - MP Government Subsidy Upto ₹78,000"
            >
              <img
                src="/images/pm-surya-ghar-modi-yadav.jpg"
                alt="PM Surya Ghar Muft Bijli Yojana - Prime Minister Narendra Modi and MP Chief Minister Dr. Mohan Yadav"
                className="hero-banner-img"
              />
              <div className="hero-banner-badge-bar">
                <span className="hero-banner-tag">
                  <Icon name="shield" size={15} /> Govt of MP · Official Subsidy Partner
                </span>
                <span className="hero-banner-cta">
                  Scheme Details →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 3 Pillars Solutions Grid */}
      <section className="section">
        <div className="wrap">
          <div className="cell-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            {[
              { icon: 'home', title: 'Residential Solutions' },
              { icon: 'building', title: 'Commercial Solutions' },
              { icon: 'factory', title: 'Industrial Solutions' }
            ].map((pillar, idx) => (
              <div key={idx} className="cell" style={{ textAlign: 'center' }}>
                <div style={{ color: 'var(--leaf-dark)', marginBottom: 10, display: 'flex', justifyContent: 'center' }}>
                  <Icon name={pillar.icon} size={28} />
                </div>
                <div style={{ fontWeight: 600, fontSize: '15.5px' }}>{pillar.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Go Solar */}
      <section className="section" style={{ background: 'var(--sage)' }}>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Why go solar</div>
            <h2>Six reasons homes and businesses are switching</h2>
          </div>
          <div className="cell-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', background: 'var(--sage)' }}>
            {reasons.map((r, i) => (
              <div key={i} className="cell">
                <div style={{ color: 'var(--leaf-dark)', marginBottom: 10 }}>
                  <Icon name={r.icon} size={24} />
                </div>
                <h4 style={{ fontSize: '16.5px', marginBottom: 8 }}>{r.title}</h4>
                <p style={{ fontSize: '14px', color: 'var(--ink-soft)', margin: 0 }}>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">How it works</div>
            <h2>How solar reduces your electricity bill</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            {workflow.map((step, idx) => (
              <React.Fragment key={idx}>
                <div className="card-simple" style={{ minWidth: 160, textAlign: 'center', fontSize: '14px', fontWeight: 600 }}>
                  {step}
                </div>
                {idx < workflow.length - 1 && (
                  <div style={{ padding: '0 4px', color: 'var(--leaf-dark)', display: 'flex', alignItems: 'center' }}>
                    <Icon name="arrow" size={18} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          <div style={{ marginTop: 28 }}>
            <Link to="/solar-calculator" className="btn btn-primary">
              Calculate My Savings
            </Link>
          </div>
        </div>
      </section>

      {/* Built for every property */}
      <section className="section" style={{ background: 'var(--sage)' }}>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Solar solutions</div>
            <h2>Built for every kind of property</h2>
          </div>
          <div className="cell-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', background: 'var(--sage)' }}>
            {[
              { icon: 'home', title: 'Residential Solar', desc: 'Rooftop solar systems designed for homes and farmhouses, sized to typical household load.', link: 'residential' },
              { icon: 'building', title: 'Commercial Solar', desc: 'For offices, shops, institutions and commercial complexes seeking day-tariff offset.', link: 'commercial' },
              { icon: 'factory', title: 'Industrial Solar', desc: 'High-capacity systems for factories, warehouses and large processing consumers.', link: 'industrial' }
            ].map((s, idx) => (
              <div key={idx} className="cell">
                <div style={{ color: 'var(--leaf-dark)', marginBottom: 12 }}>
                  <Icon name={s.icon} size={28} />
                </div>
                <h4 style={{ fontSize: '18px', marginBottom: 8 }}>{s.title}</h4>
                <p style={{ fontSize: '14px', color: 'var(--ink-soft)', marginBottom: 20 }}>{s.desc}</p>
                <div style={{ display: 'flex', gap: 10 }}>
                  <Link to={`/services/${s.link}`} className="btn btn-ghost btn-sm">
                    Learn More
                  </Link>
                  <button className="btn btn-primary btn-sm" onClick={openEnquiryModal}>
                    Get Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="wrap" style={{ textAlign: 'center', marginBottom: 36 }}>
          <div className="eyebrow">Our Trusted Partners</div>
          <h2 style={{ fontSize: 32 }}>Powered by India's Leading Brands</h2>
          <p style={{ color: 'var(--ink-soft)', marginTop: 10, fontSize: 15.5, maxWidth: 520, margin: '10px auto 0' }}>
            We source and install only from India's most reputed solar manufacturers — for quality and reliability you can count on.
          </p>
        </div>
      </section>

      {/* Partners Marquee — seamless infinite scroll */}
      <section className="marquee-container">
        {/* .marquee-inner animates; two identical .marquee-track children = seamless -50% loop */}
        <div className="marquee-inner">
          {/* Track A */}
          <div className="marquee-track">
            <img src="/images/partners/partner1.png" alt="UTL Solar" />
            <img src="/images/partners/partner2.png" alt="Tata Power Solar" />
            <img src="/images/partners/partner3.png" alt="Adani Power" />
            <img src="/images/partners/partner4.png" alt="Waaree Solar" />
            <img src="/images/partners/partner1.png" alt="UTL Solar" />
            <img src="/images/partners/partner2.png" alt="Tata Power Solar" />
            <img src="/images/partners/partner3.png" alt="Adani Power" />
            <img src="/images/partners/partner4.png" alt="Waaree Solar" />
            <img src="/images/partners/partner1.png" alt="UTL Solar" />
            <img src="/images/partners/partner2.png" alt="Tata Power Solar" />
            <img src="/images/partners/partner3.png" alt="Adani Power" />
            <img src="/images/partners/partner4.png" alt="Waaree Solar" />
          </div>
          {/* Track B — exact duplicate for seamless join */}
          <div className="marquee-track">
            <img src="/images/partners/partner1.png" alt="UTL Solar" />
            <img src="/images/partners/partner2.png" alt="Tata Power Solar" />
            <img src="/images/partners/partner3.png" alt="Adani Power" />
            <img src="/images/partners/partner4.png" alt="Waaree Solar" />
            <img src="/images/partners/partner1.png" alt="UTL Solar" />
            <img src="/images/partners/partner2.png" alt="Tata Power Solar" />
            <img src="/images/partners/partner3.png" alt="Adani Power" />
            <img src="/images/partners/partner4.png" alt="Waaree Solar" />
            <img src="/images/partners/partner1.png" alt="UTL Solar" />
            <img src="/images/partners/partner2.png" alt="Tata Power Solar" />
            <img src="/images/partners/partner3.png" alt="Adani Power" />
            <img src="/images/partners/partner4.png" alt="Waaree Solar" />
          </div>
        </div>
      </section>

      {/* System Types */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">System types</div>
            <h2>On-grid, off-grid or hybrid</h2>
          </div>
          <div className="cell-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {[
              { icon: 'grid', title: 'On-grid', desc: 'Connected directly to the electricity grid — typically the lowest-cost configuration where utility power is reliable, utilizing net-metering.' },
              { icon: 'battery', title: 'Off-grid', desc: 'A battery-based solution designed for remote areas or farmhouses that require energy independence from the main grid.' },
              { icon: 'bolt', title: 'Hybrid', desc: 'Solar paired with both utility grid connection and battery backup, automatically switching to battery during power cuts.' }
            ].map((type, idx) => (
              <div key={idx} className="cell">
                <div style={{ color: 'var(--leaf-dark)', marginBottom: 12 }}>
                  <Icon name={type.icon} size={26} />
                </div>
                <h4 style={{ fontSize: '17px', marginBottom: 8 }}>{type.title}</h4>
                <p style={{ fontSize: '14px', color: 'var(--ink-soft)', marginBottom: 16 }}>{type.desc}</p>
                <Link to="/services" style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--leaf-dark)' }}>
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mid CTA Banner */}
      <section className="section" style={{ background: 'var(--forest)', color: '#fff' }}>
        <div className="wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div className="eyebrow" style={{ color: '#a9d3ba' }}>Estimate in a minute</div>
            <h2 style={{ color: '#fff', maxWidth: '24ch', marginTop: 6 }}>See what solar could save you every month</h2>
          </div>
          <Link to="/solar-calculator" className="btn btn-amber">
            Calculate My Solar Savings
          </Link>
        </div>
      </section>

      {/* Recent Projects */}
      <section className="section">
        <div className="wrap">
          <div className="section-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', maxWidth: 'none', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div className="eyebrow">Our work</div>
              <h2>Recent projects</h2>
            </div>
            <Link to="/projects" className="btn btn-ghost btn-sm">
              View All Projects
            </Link>
          </div>
          <div className="cell-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {featuredProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Client Reviews */}
      <section className="section" style={{ background: 'var(--sage)' }}>
        <div className="wrap">
          <div className="section-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', maxWidth: 'none', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div className="eyebrow">Client reviews</div>
              <h2>What customers say</h2>
              <p style={{ margin: '6px 0 0', color: 'var(--ink-soft)' }}>
                Verified customer installations across Madhya Pradesh approved by our team.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setShowReviewModal(true)}
              >
                + Write a Review
              </button>
              <Link to="/reviews" className="btn btn-ghost btn-sm">
                View All Reviews ({approvedReviews.length})
              </Link>
            </div>
          </div>

          <div className="cell-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', background: 'var(--sage)' }}>
            {approvedReviews.length > 0 ? (
              approvedReviews.map((r) => (
                <ReviewCard key={r.id} review={r} />
              ))
            ) : (
              <div className="empty" style={{ background: '#fff' }}>No approved customer reviews yet. Be the first to share your experience!</div>
            )}
          </div>
        </div>
      </section>

      {/* Review Submission Modal on Home Page */}
      {showReviewModal && (
        <div className="modal-bg open" onClick={() => setShowReviewModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 560 }}>
            <button
              className="modal-close"
              onClick={() => setShowReviewModal(false)}
              aria-label="Close review modal"
            >
              <Icon name="x" size={20} />
            </button>
            <h3 style={{ fontSize: '22px', marginBottom: 6 }}>Share Your Solar Experience</h3>
            <p style={{ color: 'var(--ink-soft)', fontSize: '13.5px', marginBottom: 20 }}>
              Your review will appear on our website once reviewed and approved by the admin team.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const errs = {};
                if (!reviewForm.name.trim()) errs.name = 'Please enter your name.';
                if (!reviewForm.text.trim()) errs.text = 'Please enter your review comments.';
                if (Object.keys(errs).length > 0) {
                  setReviewErrors(errs);
                  return;
                }
                addReview(reviewForm);
                setShowReviewModal(false);
                setReviewForm({ name: '', location: '', rating: '5', capacity: '', text: '' });
                setReviewErrors({});
              }}
              noValidate
            >
              <div className={`field ${reviewErrors.name ? 'invalid' : ''}`}>
                <label className="req">Your Full Name</label>
                <input
                  value={reviewForm.name}
                  onChange={(e) => {
                    setReviewForm({ ...reviewForm, name: e.target.value });
                    if (reviewErrors.name) setReviewErrors({ ...reviewErrors, name: null });
                  }}
                  placeholder="e.g. Ramesh Chandra"
                  required
                />
                {reviewErrors.name && <div className="err">{reviewErrors.name}</div>}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div className="field">
                  <label>City / Location</label>
                  <input
                    value={reviewForm.location}
                    onChange={(e) => setReviewForm({ ...reviewForm, location: e.target.value })}
                    placeholder="e.g. Bhopal, MP"
                  />
                </div>
                <div className="field">
                  <label>Rating</label>
                  <select
                    value={reviewForm.rating}
                    onChange={(e) => setReviewForm({ ...reviewForm, rating: e.target.value })}
                  >
                    <option value="5">★★★★★ (5 Stars)</option>
                    <option value="4">★★★★☆ (4 Stars)</option>
                    <option value="3">★★★☆☆ (3 Stars)</option>
                    <option value="2">★★☆☆☆ (2 Stars)</option>
                    <option value="1">★☆☆☆☆ (1 Star)</option>
                  </select>
                </div>
              </div>

              <div className="field">
                <label>System Capacity (optional)</label>
                <input
                  value={reviewForm.capacity}
                  onChange={(e) => setReviewForm({ ...reviewForm, capacity: e.target.value })}
                  placeholder="e.g. 5 kW Rooftop"
                />
              </div>

              <div className={`field ${reviewErrors.text ? 'invalid' : ''}`}>
                <label className="req">Review Details</label>
                <textarea
                  rows={4}
                  value={reviewForm.text}
                  onChange={(e) => {
                    setReviewForm({ ...reviewForm, text: e.target.value });
                    if (reviewErrors.text) setReviewErrors({ ...reviewErrors, text: null });
                  }}
                  placeholder="How was the installation experience, team support, and power bill savings?"
                  required
                />
                {reviewErrors.text && <div className="err">{reviewErrors.text}</div>}
              </div>

              <div className="cta-row" style={{ marginTop: 14 }}>
                <button className="btn btn-primary" type="submit" style={{ flex: 1, justifyContent: 'center' }}>
                  Submit for Approval
                </button>
                <button className="btn btn-ghost" type="button" onClick={() => setShowReviewModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Consultation Dual Cards */}
      <section className="section">
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
          <div className="card-simple" style={{ textAlign: 'center', padding: 44 }}>
            <div style={{ color: 'var(--leaf)', marginBottom: 12 }}>
              <Icon name="phone" size={32} />
            </div>
            <h3 style={{ marginBottom: 10 }}>Not sure which solar system you need?</h3>
            <p style={{ color: 'var(--ink-soft)', fontSize: '14.5px', marginBottom: 20 }}>
              Speak directly with an experienced technical advisor to evaluate your energy bills and system requirements.
            </p>
            <Link to="/talk-to-solar-expert" className="btn btn-primary">
              Talk to a Solar Expert
            </Link>
          </div>

          <div className="card-simple" style={{ textAlign: 'center', padding: 44 }}>
            <div style={{ color: 'var(--leaf)', marginBottom: 12 }}>
              <Icon name="pin" size={32} />
            </div>
            <h3 style={{ marginBottom: 10 }}>Get your site assessed</h3>
            <p style={{ color: 'var(--ink-soft)', fontSize: '14.5px', marginBottom: 20 }}>
              Book an on-site rooftop survey to measure roof shadow, structural load capacity and optimal tilt angles.
            </p>
            <Link to="/book-site-visit" className="btn btn-primary">
              Book a Site Visit
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
