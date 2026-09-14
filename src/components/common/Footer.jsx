import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function Footer() {
  const { settings, openEnquiryModal } = useApp();

  return (
    <>
      <section className="footer-cta section">
        <div
          className="wrap"
          style={{
            textAlign: 'left',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 24
          }}
        >
          <div>
            <span className="tag" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', borderColor: 'transparent', marginBottom: 12 }}>
              Madhya Pradesh Clean Energy
            </span>
            <h2 style={{ fontSize: '32px', maxWidth: '22ch', marginTop: 8 }}>Ready to switch to solar?</h2>
            <p style={{ color: '#b9ccc0', marginTop: 8, fontSize: '15px' }}>
              Cut your electricity bills up to 90% and take advantage of PM Surya Ghar subsidies.
            </p>
          </div>
          <div className="cta-row">
            <button
              className="btn btn-amber"
              onClick={openEnquiryModal}
            >
              Get Solar Quote
            </button>
            <Link to="/subsidy-calculator" className="btn btn-ghost">
              Calculate Subsidy
            </Link>
            <Link to="/contact" className="btn btn-ghost">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <footer className="site">
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <div className="logo" style={{ color: '#fff', marginBottom: 12 }}>
                <span className="mark"></span>
                <span>{settings.company}</span>
              </div>
              <p style={{ fontSize: '13px', color: '#9db6a9', maxWidth: '34ch', lineHeight: 1.6 }}>
                Solar panel sales, engineering and turnkey installation for homes, businesses and industrial estates across Madhya Pradesh. Systems from 3 kW to 1 MW+.
              </p>
            </div>

            <div>
              <h4>Company</h4>
              <Link to="/about">About Us</Link>
              <Link to="/projects">Projects Portfolio</Link>
              <Link to="/reviews">Customer Reviews</Link>
              <Link to="/contact">Contact Us</Link>
            </div>

            <div>
              <h4>Solar Solutions</h4>
              <Link to="/services/residential">Residential Solar</Link>
              <Link to="/services/commercial">Commercial Solar</Link>
              <Link to="/services/industrial">Industrial Solar</Link>
              <Link to="/services">All Services</Link>
            </div>

            <div>
              <h4>Calculators & Guide</h4>
              <Link to="/solar-calculator">Solar Savings Calculator</Link>
              <Link to="/subsidy-calculator">Subsidy Calculator</Link>
              <Link to="/pm-surya-ghar">PM Surya Ghar Yojana</Link>
              <Link to="/blog">Solar Articles</Link>
            </div>

            <div>
              <h4>Partnership</h4>
              <Link to="/dealer">Dealer Network</Link>
              <Link to="/dealer/apply">Apply as Dealer</Link>
              <Link to="/contractor">Contractor Network</Link>
              <Link to="/contractor/apply">Apply as Contractor</Link>
            </div>

            <div>
              <h4>Contact</h4>
              <a href={`tel:${settings.phone}`}>{settings.phone}</a>
              <a href={`mailto:${settings.email}`}>{settings.email}</a>
              <span style={{ display: 'block', fontSize: '13.5px', color: '#b9ccc0', padding: '4px 0' }}>
                {settings.address}
              </span>
              <span style={{ display: 'block', fontSize: '12.5px', color: '#829c8e', marginTop: 4 }}>
                {settings.hours}
              </span>
            </div>
          </div>

          <div className="foot-bottom">
            <span>© {new Date().getFullYear()} {settings.company}. All rights reserved.</span>
            <span>
              <Link to="/privacy" style={{ display: 'inline', color: '#9db6a9', textDecoration: 'underline' }}>Privacy Policy</Link>
              {' · '}
              <Link to="/terms" style={{ display: 'inline', color: '#9db6a9', textDecoration: 'underline' }}>Terms &amp; Conditions</Link>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
