import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Icon from '../components/common/Icon';

const CATEGORIES = ['All', 'Subsidy', 'Installation', 'Technology', 'Finance', 'Tips'];

export default function BlogListPage() {
  const { blog } = useApp();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = blog.filter((article) => {
    const matchCat = activeCategory === 'All' || article.cat === activeCategory;
    const matchSearch =
      !searchQuery ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.excerpt || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0f2a20 0%, #163A2E 50%, #1e4d34 100%)',
          padding: '60px 0 48px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: -40, right: -40, width: 280, height: 280, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />

        <div className="wrap">
          <div style={{ maxWidth: 640 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#86c9a0',
                background: 'rgba(255,255,255,0.08)',
                padding: '5px 12px',
                borderRadius: 99,
                marginBottom: 16
              }}
            >
              <Icon name="sun" size={13} />
              Blog &amp; Knowledge Centre
            </div>
            <h1 style={{ color: '#fff', fontSize: '40px', lineHeight: 1.2, marginBottom: 14, marginTop: 0 }}>
              Solar Knowledge &amp; Industry Updates
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '16px', lineHeight: 1.7, margin: 0 }}>
              Educational guides, subsidy explainers, and technical tips written for Madhya Pradesh property owners.
            </p>
          </div>

          {/* Search bar */}
          <div style={{ marginTop: 28, display: 'flex', gap: 10, maxWidth: 480 }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.5)' }}>
                <Icon name="search" size={17} />
              </div>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '11px 14px 11px 40px',
                  borderRadius: 10,
                  border: '1.5px solid rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.1)',
                  color: '#fff',
                  fontSize: '14.5px',
                  outline: 'none',
                  backdropFilter: 'blur(6px)',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Pills */}
      <section style={{ background: '#fff', borderBottom: '1px solid var(--line)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div className="wrap" style={{ paddingTop: 16, paddingBottom: 16 }}>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 2 }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '7px 16px',
                  borderRadius: 99,
                  border: '1.5px solid',
                  borderColor: activeCategory === cat ? 'var(--forest)' : 'var(--line)',
                  background: activeCategory === cat ? 'var(--forest)' : '#fff',
                  color: activeCategory === cat ? '#fff' : 'var(--ink)',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  fontFamily: 'inherit'
                }}
              >
                {cat}
              </button>
            ))}
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', color: 'var(--ink-soft)', fontSize: '13px', whiteSpace: 'nowrap' }}>
              {filtered.length} article{filtered.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="wrap">
          {filtered.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '80px 20px',
                color: 'var(--ink-soft)'
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
              <h3 style={{ fontSize: '20px', marginBottom: 8, color: 'var(--forest)' }}>No Articles Found</h3>
              <p>Try a different search term or category filter.</p>
              <button
                onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                className="btn btn-ghost btn-sm"
                style={{ marginTop: 16 }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              {/* Featured Article (first one) */}
              {featured && (
                <div style={{ marginBottom: 48 }}>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                      gap: 0,
                      borderRadius: 16,
                      overflow: 'hidden',
                      boxShadow: '0 8px 32px rgba(22, 58, 46, 0.1)',
                      border: '1px solid var(--line)',
                      background: '#fff'
                    }}
                  >
                    {/* Image */}
                    <div
                      style={{
                        aspectRatio: '16/10',
                        background: 'linear-gradient(135deg, #163A2E 0%, #2F7A4F 100%)',
                        overflow: 'hidden',
                        minHeight: 280,
                        position: 'relative'
                      }}
                    >
                      {featured.image ? (
                        <img
                          src={featured.image}
                          alt={featured.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <div style={{
                          width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: 'rgba(255,255,255,0.4)', fontSize: 56
                        }}>
                          ☀️
                        </div>
                      )}
                      <div style={{
                        position: 'absolute', top: 14, left: 14,
                        background: 'var(--amber)', color: 'var(--forest-dark)',
                        fontSize: '11px', fontWeight: 800, textTransform: 'uppercase',
                        letterSpacing: '0.06em', padding: '4px 10px', borderRadius: 99
                      }}>
                        Featured
                      </div>
                    </div>

                    {/* Content */}
                    <div style={{ padding: '32px 32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <div style={{ marginBottom: 12 }}>
                        <span className="tag">{featured.cat}</span>
                      </div>
                      <h2 style={{ fontSize: '24px', lineHeight: 1.3, marginBottom: 12, color: 'var(--forest)' }}>
                        <Link to={`/blog/${featured.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                          {featured.title}
                        </Link>
                      </h2>
                      <p style={{ fontSize: '15px', color: 'var(--ink-soft)', lineHeight: 1.65, marginBottom: 20, flexGrow: 1 }}>
                        {featured.excerpt}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                        <Link to={`/blog/${featured.slug}`} className="btn btn-primary btn-sm">
                          Read Full Article →
                        </Link>
                        <span style={{ fontSize: '13px', color: 'var(--ink-soft)' }}>
                          {new Date(featured.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Rest of Articles Grid */}
              {rest.length > 0 && (
                <>
                  <div style={{ marginBottom: 24 }}>
                    <h3 style={{ fontSize: '18px', color: 'var(--forest)', fontWeight: 700 }}>
                      {activeCategory === 'All' ? 'All Articles' : `${activeCategory} Articles`}
                    </h3>
                  </div>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                      gap: 24
                    }}
                  >
                    {rest.map((article) => (
                      <BlogCard key={article.id || article.slug} article={article} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter / CTA section */}
      <section className="section" style={{ background: 'var(--sage)', paddingTop: 40, paddingBottom: 40 }}>
        <div className="wrap">
          <div
            style={{
              background: 'linear-gradient(135deg, #163A2E 0%, #2F7A4F 100%)',
              borderRadius: 16,
              padding: '36px 32px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 20,
              color: '#fff'
            }}
          >
            <div>
              <h3 style={{ fontSize: '22px', color: '#fff', marginBottom: 8 }}>Have questions about going solar?</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14.5px', margin: 0 }}>
                Talk to our experts for free — we'll guide you through the entire process.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/talk-to-solar-expert" className="btn" style={{ background: 'var(--amber)', color: 'var(--forest-dark)', fontWeight: 700 }}>
                Talk to Expert
              </Link>
              <Link to="/book-site-visit" className="btn btn-ghost" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.35)' }}>
                Book Site Visit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function BlogCard({ article }) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 14,
        border: '1px solid var(--line)',
        overflow: 'hidden',
        boxShadow: '0 2px 12px rgba(22, 58, 46, 0.06)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 8px 28px rgba(22, 58, 46, 0.13)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(22, 58, 46, 0.06)';
      }}
    >
      {/* Rectangular Image */}
      <div
        style={{
          aspectRatio: '16/9',
          background: 'linear-gradient(135deg, #163A2E 0%, #2F7A4F 100%)',
          overflow: 'hidden',
          flexShrink: 0,
          position: 'relative'
        }}
      >
        {article.image ? (
          <img
            src={article.image}
            alt={article.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.35)', fontSize: 40 }}>
            ☀️
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '20px 20px 22px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ marginBottom: 10 }}>
          <span className="tag">{article.cat}</span>
        </div>
        <h4 style={{ fontSize: '17px', lineHeight: 1.4, marginBottom: 10, color: 'var(--forest)', flexGrow: 0 }}>
          <Link to={`/blog/${article.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
            {article.title}
          </Link>
        </h4>
        <p style={{ fontSize: '14px', color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: 16, flexGrow: 1 }}>
          {article.excerpt}
        </p>
        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: '1px solid var(--line-light)' }}>
          <Link
            to={`/blog/${article.slug}`}
            style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--leaf-dark)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}
          >
            Read more →
          </Link>
          <span style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>
            {new Date(article.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </div>
    </div>
  );
}
