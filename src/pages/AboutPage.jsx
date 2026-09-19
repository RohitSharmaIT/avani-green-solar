import React from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import Icon from '../components/common/Icon';
import '../stylesheets/frontend/pages/about.css';

export default function AboutPage() {
  const { settings } = useApp();

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Basoda Naka, Near by Nehar, Bosoda road, Sironj, 464228'
  )}`;

  const highlights = [
    {
      icon: 'home',
      title: 'Home & Business Solar',
      desc: 'Complete rooftop solar installation for homes, shops, and agricultural properties.'
    },
    {
      icon: 'sun',
      title: 'PM Surya Ghar Subsidy',
      desc: 'Step-by-step assistance with government subsidy applications (up to ₹78,000).'
    },
    {
      icon: 'bolt',
      title: 'Net-Metering Liaison',
      desc: 'End-to-end guidance with local DISCOM paperwork and solar meter setup.'
    },
    {
      icon: 'pin',
      title: 'Local Sironj Office',
      desc: 'Easily accessible office at Basoda Naka for in-person consultation and prompt support.'
    }
  ];

  const pillars = [
    {
      icon: 'shield',
      title: 'Quality Solar Panels',
      desc: 'We use high-efficiency solar modules and dependable inverters tested for reliable performance in local weather.'
    },
    {
      icon: 'sun',
      title: 'Subsidy Support',
      desc: 'Full assistance with registration on the national portal and guidance for the direct bank transfer (DBT) subsidy.'
    },
    {
      icon: 'wrench',
      title: 'Durable Mounting Structures',
      desc: 'Strong, weather-resistant galvanized mounting frames custom-fitted to your rooftop layout.'
    },
    {
      icon: 'bolt',
      title: 'Electricity Board Coordination',
      desc: 'Assistance with local electricity board (DISCOM) approvals and bidirectional smart meter connection.'
    },
    {
      icon: 'leaf',
      title: 'Lower Electricity Bills',
      desc: 'Generate your own power to offset daytime electricity consumption and reduce monthly bills.'
    },
    {
      icon: 'users',
      title: 'Friendly Local Service',
      desc: 'Located right here in Sironj, our team is always within reach whenever you have questions or need assistance.'
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Header Section */}
      <section className="section" style={{ paddingBottom: 36 }}>
        <div className="wrap">
          <div className="section-head" style={{ maxWidth: 740 }}>
            <div className="eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Icon name="sun" size={14} /> Solar Energy Solutions in Sironj
            </div>
            <h1 style={{ fontSize: '38px', lineHeight: 1.2, marginTop: 10, marginBottom: 16 }}>
              About {settings.company}
            </h1>
            <p style={{ fontSize: '16.5px', color: 'var(--ink-soft)', lineHeight: 1.7, margin: 0 }}>
              Based at <strong>Basoda Naka on Basoda Road, Sironj</strong>, {settings.company} provides simple, dependable rooftop solar installations for homeowners, businesses, and agricultural farms. We help you transition to clean solar energy with clear pricing, quality equipment, and dedicated local support.
            </p>
          </div>

          {/* Highlights Grid - Simple, Honest, & Practical */}
          <div
            className="cell-grid"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 20,
              marginTop: 14
            }}
          >
            {highlights.map((h, idx) => (
              <div
                key={idx}
                className="cell"
                style={{
                  background: '#fff',
                  border: '1px solid var(--line)',
                  borderRadius: '10px',
                  padding: '22px 20px',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '8px',
                    background: 'var(--sage)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--leaf-dark)',
                    marginBottom: 14
                  }}
                >
                  <Icon name={h.icon} size={20} />
                </div>
                <div style={{ fontWeight: 600, fontSize: '16px', color: 'var(--forest)', marginBottom: 6 }}>
                  {h.title}
                </div>
                <div style={{ fontSize: '13.5px', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
                  {h.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story & Background Section */}
      <section className="section" style={{ background: 'var(--sage)', paddingTop: 46, paddingBottom: 46 }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 36, alignItems: 'center' }}>
            <div>
              <div className="eyebrow">Our Story</div>
              <h2 style={{ fontSize: '28px', margin: '8px 0 14px' }}>Simple, Honest Solar Power for Sironj &amp; Surrounding Areas</h2>
              <p style={{ color: 'var(--ink-soft)', fontSize: '15px', lineHeight: 1.75, marginBottom: 14 }}>
                We started Avani Green Solar right here in Sironj to provide people with an easy, reliable way to generate their own clean electricity and reduce high monthly power bills.
              </p>
              <p style={{ color: 'var(--ink-soft)', fontSize: '15px', lineHeight: 1.75, margin: 0 }}>
                Whether you want to install a compact 3 kW solar plant for your home under the <strong>PM Surya Ghar Muft Bijli Yojana</strong> or need a larger setup for your shop or commercial building, our team assists you at every step — from rooftop survey and installation to net-metering approvals.
              </p>
            </div>

            <div
              className="card-simple"
              style={{
                background: '#fff',
                padding: '26px',
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(22, 58, 46, 0.06)',
                border: '1px solid var(--line)'
              }}
            >
              <h3 style={{ fontSize: '18px', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--forest)' }}>
                <Icon name="shield" size={20} /> Our Core Values
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  'Transparent pricing with no hidden costs',
                  'Honest advice on the right system size for your budget',
                  'Full support with PM Surya Ghar subsidy paperwork',
                  'Sturdy, weather-resistant structural installation',
                  'Direct local service right from our Sironj office'
                ].map((pt, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '14px', color: 'var(--ink)' }}>
                    <span style={{ color: 'var(--leaf-dark)', marginTop: 2 }}>
                      <Icon name="check" size={15} />
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="section">
        <div className="wrap">
          <div className="section-head" style={{ textAlign: 'center', margin: '0 auto 36px', maxWidth: 620 }}>
            <div className="eyebrow">What We Offer</div>
            <h2>How We Help You Go Solar</h2>
            <p>
              A straightforward process designed to make going solar simple, affordable, and worry-free.
            </p>
          </div>

          <div className="cell-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            {pillars.map((p, idx) => (
              <div
                key={idx}
                className="cell"
                style={{
                  padding: '24px',
                  borderRadius: '10px',
                  border: '1px solid var(--line)',
                  background: '#fff',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '8px',
                    background: 'var(--sage)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--leaf-dark)',
                    marginBottom: 14
                  }}
                >
                  <Icon name={p.icon} size={20} />
                </div>
                <h4 style={{ fontSize: '17px', marginBottom: 8 }}>{p.title}</h4>
                <p style={{ fontSize: '13.5px', color: 'var(--ink-soft)', lineHeight: 1.65, margin: 0 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Office & Clickable Map Section */}
      <section className="section" style={{ background: '#FAF7F2', borderTop: '1px solid var(--line-light)' }}>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Icon name="pin" size={14} /> Visit Our Office
            </div>
            <h2>Our Office Location in Sironj</h2>
            <p>
              Conveniently located at Basoda Naka on Basoda Road, near the canal (Nehar). Feel free to drop by to discuss your solar requirements with us in person.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: 28,
              alignItems: 'stretch'
            }}
          >
            {/* Office Details Card */}
            <div
              className="card-simple"
              style={{
                background: '#fff',
                padding: '30px',
                borderRadius: '12px',
                border: '1px solid var(--line)',
                boxShadow: '0 8px 24px rgba(22, 58, 46, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div
                  style={{
                    display: 'inline-block',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    color: 'var(--leaf-dark)',
                    background: 'var(--sage)',
                    padding: '3px 8px',
                    borderRadius: 4,
                    marginBottom: 14
                  }}
                >
                  Office &amp; Consultation Desk
                </div>

                <h3 style={{ fontSize: '20px', color: 'var(--forest)', marginBottom: 14 }}>
                  {settings.company}
                </h3>

                {/* Address */}
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 16 }}>
                  <div style={{ color: 'var(--leaf-dark)', marginTop: 2 }}>
                    <Icon name="pin" size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '13.5px', color: 'var(--forest)', marginBottom: 2 }}>
                      Address
                    </div>
                    <div style={{ color: 'var(--ink-soft)', fontSize: '14px', lineHeight: 1.5 }}>
                      {settings.address}
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 16 }}>
                  <div style={{ color: 'var(--leaf-dark)', marginTop: 2 }}>
                    <Icon name="phone" size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '13.5px', color: 'var(--forest)', marginBottom: 2 }}>
                      Phone
                    </div>
                    <a
                      href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                      style={{ color: 'var(--leaf-dark)', fontSize: '15px', fontWeight: 600, textDecoration: 'none' }}
                    >
                      {settings.phone}
                    </a>
                    <a
                      href={`tel:${(settings.phone2 || '7879301745').replace(/[^0-9+]/g, '')}`}
                      style={{ display: 'block', color: 'var(--leaf-dark)', fontSize: '15px', fontWeight: 600, textDecoration: 'none', marginTop: 4 }}
                    >
                      {settings.phone2 || '+91 78793 01745'}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 16 }}>
                  <div style={{ color: '#25D366', marginTop: 2 }}>
                    <Icon name="whatsapp" size={18} />
                  </div>

                  <div className="about-social-links" aria-label="Social media">
                    {[
                      ['socialInstagram', 'instagram', 'Instagram'],
                      ['socialYoutube', 'youtube', 'YouTube'],
                      ['socialLinkedin', 'linkedin', 'LinkedIn']
                    ].map(([key, icon, label]) => settings[key] ? (
                      <a key={key} href={settings[key]} target="_blank" rel="noopener noreferrer" aria-label={label}>
                        <Icon name={icon} size={20} />
                      </a>
                    ) : null)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '13.5px', color: 'var(--forest)', marginBottom: 2 }}>
                      WhatsApp
                    </div>
                    <a
                      href={`https://wa.me/${settings.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--leaf-dark)', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}
                    >
                      +91 {settings.whatsapp.replace(/^91/, '')} (Chat on WhatsApp)
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 16 }}>
                  <div style={{ color: 'var(--leaf-dark)', marginTop: 2 }}>
                    <Icon name="mail" size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '13.5px', color: 'var(--forest)', marginBottom: 2 }}>
                      Email
                    </div>
                    <a
                      href={`mailto:${settings.email}`}
                      style={{ color: 'var(--ink-soft)', fontSize: '14px', textDecoration: 'none' }}
                    >
                      {settings.email}
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 22 }}>
                  <div style={{ color: 'var(--leaf-dark)', marginTop: 2 }}>
                    <Icon name="sun" size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '13.5px', color: 'var(--forest)', marginBottom: 2 }}>
                      Working Hours
                    </div>
                    <div style={{ color: 'var(--ink-soft)', fontSize: '13.5px' }}>
                      {settings.hours}
                    </div>
                  </div>
                </div>
              </div>

              {/* Clickable Map Link Button */}
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '12px',
                  fontSize: '14px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  textDecoration: 'none'
                }}
              >
                <Icon name="pin" size={16} /> Open in Google Maps (Get Directions) ↗
              </a>
            </div>

            {/* Embedded Clickable Map Container */}
            <div
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid var(--line)',
                boxShadow: '0 8px 24px rgba(22, 58, 46, 0.08)',
                position: 'relative',
                background: '#e5e3df',
                display: 'flex',
                flexDirection: 'column',
                minHeight: 380
              }}
            >
              {/* Interactive Header Link */}
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'var(--forest)',
                  color: '#fff',
                  padding: '11px 16px',
                  textDecoration: 'none',
                  fontSize: '12.5px',
                  fontWeight: 600
                }}
                title="Click to open directions in Google Maps"
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icon name="pin" size={15} /> Basoda Naka, Near Nehar, Sironj (464228)
                </span>
                <span style={{ color: 'var(--amber)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: 4 }}>
                  Click to Navigate ↗
                </span>
              </a>

              {/* Google Maps iframe */}
              <iframe
                title="Avani Green Solar Location - Basoda Naka Sironj"
                src="https://maps.google.com/maps?q=Basoda%20Naka%20Basoda%20road%20Sironj%20Madhya%20Pradesh%20464228&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, flex: 1, minHeight: 320, display: 'block' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

              {/* Bottom Touch Link */}
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#ffffff',
                  padding: '9px 14px',
                  borderTop: '1px solid var(--line)',
                  fontSize: '12px',
                  color: 'var(--leaf-dark)',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>Tap to view live satellite map &amp; route</span>
                <span>Open Google Maps →</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{ paddingBottom: 50 }}>
        <div className="wrap">
          <div
            className="card-simple"
            style={{
              background: 'linear-gradient(135deg, #163A2E 0%, #2F7A4F 100%)',
              color: '#fff',
              border: 'none',
              padding: '36px 30px',
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 20,
              boxShadow: '0 12px 32px rgba(22, 58, 46, 0.15)'
            }}
          >
            <div style={{ maxWidth: 500 }}>
              <h3 style={{ color: '#fff', fontSize: '22px', marginBottom: 8 }}>
                Want to know more about rooftop solar?
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14.5px', lineHeight: 1.6, margin: 0 }}>
                Get in touch with our Sironj team for a friendly conversation about your home or business power needs.
              </p>
            </div>

            <div className="cta-row">
              <Link
                to="/book-site-visit"
                className="btn"
                style={{
                  background: 'var(--amber)',
                  color: 'var(--forest-dark)',
                  fontWeight: 700,
                  padding: '11px 20px',
                  border: 'none'
                }}
              >
                Book Site Visit
              </Link>

              <a
                href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                className="btn btn-ghost"
                style={{
                  color: '#fff',
                  borderColor: 'rgba(255,255,255,0.4)',
                  padding: '11px 18px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                <Icon name="phone" size={15} /> Call {settings.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
