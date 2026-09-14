import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function DealerPage() {
  const { settings } = useApp();

  const benefits = [
    { title: 'Solar Product Supply', desc: 'Direct access to tier-1 solar PV modules, on-grid/hybrid inverters, and certified DC electrical switchgear.' },
    { title: 'Local Territory Opportunity', desc: 'Protected regional dealerships across designated districts in Madhya Pradesh.' },
    { title: 'Technical & Engineering Support', desc: 'Assistance with 3D rooftop plant layouts, structural drawings, and single-line diagrams (SLD).' },
    { title: 'Installation Support', desc: 'Hands-on technical supervision and guidelines for certified site commissioning.' },
    { title: 'Sales & Marketing Kit', desc: 'Branded brochures, demonstration samples, digital collateral, and qualified inbound leads.' },
    { title: 'Dealer Onboarding & Training', desc: 'Regular product updates, subsidy portal training, and technical troubleshooting workshops.' }
  ];

  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 940 }}>
        <div className="section-head">
          <div className="eyebrow">Dealer Network</div>
          <h2>Become an {settings.company} Dealer</h2>
          <p>
            Join our expanding dealer network across Madhya Pradesh and capture the high-growth residential, agricultural and commercial solar market.
          </p>
        </div>

        <div className="cell-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', marginBottom: 36 }}>
          {benefits.map((b, idx) => (
            <div key={idx} className="cell">
              <h4 style={{ fontSize: '16px', marginBottom: 8, color: 'var(--forest)' }}>{b.title}</h4>
              <p style={{ fontSize: '14px', color: 'var(--ink-soft)', margin: 0 }}>{b.desc}</p>
            </div>
          ))}
        </div>

        <div className="card-simple" style={{ background: 'var(--sage)', border: 'none', padding: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <h3 style={{ marginBottom: 6 }}>Ready to grow your solar business?</h3>
            <p style={{ color: 'var(--ink-soft)', margin: 0, fontSize: '14.5px' }}>
              Fill out our simple application form and our dealer partnership manager will contact you.
            </p>
          </div>
          <Link to="/dealer/apply" className="btn btn-primary">
            Apply to Become a Dealer
          </Link>
        </div>
      </div>
    </section>
  );
}
