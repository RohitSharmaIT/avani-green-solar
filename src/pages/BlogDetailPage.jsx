import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Icon from '../components/common/Icon';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const { blog } = useApp();
  const [sidebarTab, setSidebarTab] = useState('recent');
  const [isSticky, setIsSticky] = useState(false);
  const sidebarRef = useRef(null);
  const contentRef = useRef(null);

  const article = blog.find((b) => b.slug === slug);

  // Sticky sidebar logic
  useEffect(() => {
    const handleScroll = () => {
      if (sidebarRef.current) {
        const rect = sidebarRef.current.getBoundingClientRect();
        setIsSticky(window.scrollY > 120);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!article) {
    return (
      <section className="section">
        <div className="wrap">
          <div className="empty">
            <h3>Article Not Found</h3>
            <p style={{ marginTop: 8 }}>The requested solar article could not be located.</p>
            <Link to="/blog" className="btn btn-primary" style={{ marginTop: 16 }}>
              Back to Blog
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Build sidebar lists
  const otherArticles = blog.filter((b) => b.slug !== slug);

  const recentArticles = [...otherArticles]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const popularArticles = [...otherArticles]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5);
  // If no view data, just use different order (by title)
  const popularOrDefault = popularArticles.length > 0 && popularArticles[0].views
    ? popularArticles
    : [...otherArticles].slice(0, 5);

  const relatedArticles = otherArticles
    .filter((b) => b.cat === article.cat)
    .slice(0, 5);

  // Tab items to show
  const sidebarItems = {
    recent: recentArticles,
    popular: popularOrDefault,
    related: relatedArticles
  };

  const currentItems = sidebarItems[sidebarTab] || [];

  return (
    <div>
      {/* Hero banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0f2a20 0%, #163A2E 100%)',
          padding: '36px 0 0'
        }}
      >
        <div className="wrap">
          <Link
            to="/blog"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: '13.5px', color: 'rgba(255,255,255,0.75)', fontWeight: 600,
              textDecoration: 'none', marginBottom: 16,
              transition: 'color 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.75)'}
          >
            ← Back to all articles
          </Link>

          <div style={{ marginBottom: 14 }}>
            <span
              style={{
                background: 'rgba(255,255,255,0.12)',
                color: '#86c9a0',
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                padding: '4px 12px',
                borderRadius: 99
              }}
            >
              {article.cat}
            </span>
          </div>

          <h1
            style={{
              color: '#fff', fontSize: '34px', lineHeight: 1.25,
              maxWidth: 760, marginBottom: 16, marginTop: 0
            }}
          >
            {article.title}
          </h1>

          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13.5px', marginBottom: 32 }}>
            Published on {new Date(article.date).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })} · By Avani Green Solar Technical Team
          </p>
        </div>

        {/* Article Cover Image */}
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 20px' }}>
          <div
            style={{
              aspectRatio: '16/7',
              borderRadius: '14px 14px 0 0',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, #1a3d2b 0%, #2F7A4F 100%)',
              position: 'relative'
            }}
          >
            {article.image ? (
              <img
                src={article.image}
                alt={article.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div
                style={{
                  width: '100%', height: '100%', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.2)', fontSize: 80
                }}
              >
                ☀️
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content + Sidebar */}
      <section className="section" style={{ paddingTop: 40 }}>
        <div
          className="wrap blog-detail-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) 320px',
            gap: 40,
            alignItems: 'start'
          }}
        >
          {/* Article Content */}
          <div ref={contentRef}>
            {/* Article body */}
            <div
              style={{
                fontSize: '16.5px',
                lineHeight: 1.85,
                color: 'var(--ink)',
                background: '#fff',
                borderRadius: 14,
                padding: '32px 36px',
                border: '1px solid var(--line)',
                boxShadow: '0 2px 12px rgba(22,58,46,0.05)'
              }}
            >
              <p>{article.content}</p>
              <p style={{ marginTop: 20, color: 'var(--ink-soft)', borderTop: '1px solid var(--line-light)', paddingTop: 20 }}>
                Solar technology continues to advance rapidly, reducing levelized cost of energy (LCOE) while increasing panel efficiency. For tailored project sizing or engineering consultation regarding this topic, feel free to get in touch with our team.
              </p>
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 20 }}>
              {['Solar Energy', 'Madhya Pradesh', article.cat, 'Green Energy'].map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: 'var(--sage)',
                    color: 'var(--forest)',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    padding: '4px 12px',
                    borderRadius: 99,
                    border: '1px solid var(--line)'
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Share Section */}
            <div
              style={{
                marginTop: 28,
                padding: '20px 24px',
                background: '#fff',
                border: '1px solid var(--line)',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                flexWrap: 'wrap'
              }}
            >
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--forest)' }}>Share this article:</span>
              <div style={{ display: 'flex', gap: 8 }}>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(article.title + ' - ' + window.location.href)}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px',
                    background: '#25D366', color: '#fff', borderRadius: 8,
                    fontSize: '13px', fontWeight: 600, textDecoration: 'none'
                  }}
                >
                  <Icon name="whatsapp" size={15} /> WhatsApp
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px',
                    background: '#1877F2', color: '#fff', borderRadius: 8,
                    fontSize: '13px', fontWeight: 600, textDecoration: 'none'
                  }}
                >
                  Share
                </a>
              </div>
            </div>

            {/* CTA Card */}
            <div
              style={{
                marginTop: 32,
                background: 'linear-gradient(135deg, #163A2E 0%, #2F7A4F 100%)',
                borderRadius: 14,
                padding: '28px 28px',
                color: '#fff'
              }}
            >
              <h4 style={{ color: '#fff', fontSize: '19px', marginBottom: 10 }}>Have questions about this article?</h4>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginBottom: 20, lineHeight: 1.6 }}>
                Connect with our technical consultants to explore what makes financial and engineering sense for your property.
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Link to="/talk-to-solar-expert" className="btn" style={{ background: 'var(--amber)', color: 'var(--forest-dark)', fontWeight: 700 }}>
                  Talk to Expert
                </Link>
                <Link to="/solar-calculator" className="btn btn-ghost" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.35)' }}>
                  Calculate Savings
                </Link>
              </div>
            </div>

            {/* Related articles (mobile — shown below content) */}
            {relatedArticles.length > 0 && (
              <div style={{ marginTop: 40, display: 'none' }} className="mobile-related">
                <h3 style={{ fontSize: '18px', color: 'var(--forest)', marginBottom: 16 }}>Related Articles</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {relatedArticles.map((a) => (
                    <SmallBlogCard key={a.slug} article={a} currentSlug={slug} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Sidebar */}
          <div
            ref={sidebarRef}
            style={{
              position: 'sticky',
              top: 80,
              maxHeight: 'calc(100vh - 120px)',
              overflowY: 'auto'
            }}
          >
            {/* Tabs */}
            <div
              style={{
                background: '#fff',
                borderRadius: 14,
                border: '1px solid var(--line)',
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(22,58,46,0.07)'
              }}
            >
              {/* Tab header */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  borderBottom: '1px solid var(--line)'
                }}
              >
                {[
                  { key: 'recent', label: 'Recent' },
                  { key: 'popular', label: 'Popular' },
                  { key: 'related', label: 'Related' }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setSidebarTab(tab.key)}
                    style={{
                      padding: '12px 4px',
                      background: sidebarTab === tab.key ? 'var(--forest)' : '#fff',
                      color: sidebarTab === tab.key ? '#fff' : 'var(--ink)',
                      border: 'none',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      transition: 'all 0.2s',
                      borderRight: '1px solid var(--line)'
                    }}
                  >
                    {tab.label}
                    {tab.key === 'related' && relatedArticles.length === 0 && (
                      <span style={{ fontSize: '10px', display: 'block', color: sidebarTab === tab.key ? 'rgba(255,255,255,0.6)' : 'var(--ink-soft)' }}>0</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div style={{ padding: '4px 0' }}>
                {currentItems.length === 0 ? (
                  <div style={{ padding: '24px 16px', textAlign: 'center', color: 'var(--ink-soft)', fontSize: '13px' }}>
                    No {sidebarTab} articles found.
                  </div>
                ) : (
                  currentItems.map((a, idx) => (
                    <SidebarBlogItem key={a.slug} article={a} index={idx} currentSlug={slug} />
                  ))
                )}
              </div>
            </div>

            {/* Quick CTA widget */}
            <div
              style={{
                marginTop: 20,
                background: 'linear-gradient(135deg, #163A2E 0%, #2F7A4F 100%)',
                borderRadius: 14,
                padding: '22px 20px',
                color: '#fff'
              }}
            >
              <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#86c9a0', marginBottom: 10 }}>
                ☀️ Free Consultation
              </div>
              <h4 style={{ color: '#fff', fontSize: '16px', marginBottom: 8 }}>Interested in solar for your property?</h4>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px', lineHeight: 1.55, marginBottom: 16 }}>
                Get a free site assessment from our team of certified solar engineers.
              </p>
              <Link
                to="/talk-to-solar-expert"
                className="btn"
                style={{
                  background: 'var(--amber)', color: 'var(--forest-dark)',
                  fontWeight: 700, width: '100%', justifyContent: 'center',
                  fontSize: '13.5px', padding: '10px 16px', display: 'flex',
                  textDecoration: 'none', borderRadius: 8
                }}
              >
                Talk to an Expert
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive style for mobile */}
      <style>{`
        @media (max-width: 900px) {
          .blog-detail-grid {
            grid-template-columns: 1fr !important;
          }
          .mobile-related {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}

function SidebarBlogItem({ article, index, currentSlug }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={`/blog/${article.slug}`}
      style={{
        display: 'flex',
        gap: 12,
        padding: '12px 14px',
        textDecoration: 'none',
        background: hovered ? 'var(--sage)' : 'transparent',
        transition: 'background 0.2s',
        borderBottom: '1px solid var(--line-light)',
        alignItems: 'flex-start'
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <div
        style={{
          width: 60,
          height: 44,
          borderRadius: 7,
          background: 'linear-gradient(135deg, #163A2E 0%, #2F7A4F 100%)',
          overflow: 'hidden',
          flexShrink: 0
        }}
      >
        {article.image ? (
          <img
            src={article.image}
            alt={article.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: 'rgba(255,255,255,0.4)' }}>
            ☀️
          </div>
        )}
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '12px', color: 'var(--leaf-dark)', fontWeight: 700, marginBottom: 3 }}>{article.cat}</div>
        <div
          style={{
            fontSize: '13.5px',
            color: hovered ? 'var(--forest)' : 'var(--ink)',
            fontWeight: 600,
            lineHeight: 1.35,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {article.title}
        </div>
        <div style={{ fontSize: '11.5px', color: 'var(--ink-soft)', marginTop: 4 }}>
          {new Date(article.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
      </div>
    </Link>
  );
}

function SmallBlogCard({ article }) {
  return (
    <Link
      to={`/blog/${article.slug}`}
      style={{
        display: 'flex',
        gap: 14,
        textDecoration: 'none',
        background: '#fff',
        borderRadius: 10,
        border: '1px solid var(--line)',
        padding: '12px',
        alignItems: 'center'
      }}
    >
      <div style={{ width: 72, height: 52, borderRadius: 8, background: '#163A2E', overflow: 'hidden', flexShrink: 0 }}>
        {article.image ? (
          <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 20 }}>☀️</div>
        )}
      </div>
      <div>
        <div style={{ fontSize: '11.5px', color: 'var(--leaf-dark)', fontWeight: 700, marginBottom: 3 }}>{article.cat}</div>
        <div style={{ fontSize: '14px', color: 'var(--forest)', fontWeight: 600, lineHeight: 1.35 }}>{article.title}</div>
      </div>
    </Link>
  );
}
