import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function LegalPage() {
  const location = useLocation();
  const { settings } = useApp();
  const isPrivacy = location.pathname.includes('privacy');

  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 760 }}>
        <Link
          to="/"
          style={{ fontSize: '13.5px', color: 'var(--leaf-dark)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 16 }}
        >
          ← Back to home
        </Link>

        <h2>{isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}</h2>
        <p style={{ color: 'var(--ink-soft)', fontSize: '13.5px', marginBottom: 28 }}>
          Last updated: September 2026 · {settings.company}
        </p>

        <div className="card-simple" style={{ lineHeight: 1.8, fontSize: '15px', color: 'var(--ink)' }}>
          {isPrivacy ? (
            <>
              <h4 style={{ marginBottom: 8 }}>1. Information We Collect</h4>
              <p style={{ color: 'var(--ink-soft)' }}>
                When you request a solar quote, calculate solar savings or schedule a site visit, we collect your name, phone number, email, address, and indicative electricity consumption metrics.
              </p>

              <h4 style={{ margin: '20px 0 8px' }}>2. How We Use Your Data</h4>
              <p style={{ color: 'var(--ink-soft)' }}>
                Your information is strictly utilized to provide accurate solar plant engineering feasibility estimates, arrange site inspections, and process net-metering approvals with state DISCOM utilities. We never sell your personal information to third parties.
              </p>

              <h4 style={{ margin: '20px 0 8px' }}>3. Contact & Consent</h4>
              <p style={{ color: 'var(--ink-soft)' }}>
                By submitting our enquiry forms, you consent to being contacted by {settings.company} representatives via phone, WhatsApp or email regarding your solar enquiry.
              </p>
            </>
          ) : (
            <>
              <h4 style={{ marginBottom: 8 }}>1. Indicative Calculations & Quotes</h4>
              <p style={{ color: 'var(--ink-soft)' }}>
                Calculations provided via our online Solar and Subsidy calculators represent preliminary feasibility figures based on standard insolation and typical tariff assumptions. Final plant capacities and project commercials require on-site technical inspection.
              </p>

              <h4 style={{ margin: '20px 0 8px' }}>2. Warranties & Installation Norms</h4>
              <p style={{ color: 'var(--ink-soft)' }}>
                All installations are carried out using MNRE/ALMM approved components. Standard manufacturer warranties apply to solar PV panels (25-year performance) and inverters (5 to 10 years).
              </p>

              <h4 style={{ margin: '20px 0 8px' }}>3. Government Subsidy Disbursement</h4>
              <p style={{ color: 'var(--ink-soft)' }}>
                Direct Benefit Transfer (DBT) subsidy approval under PM Surya Ghar: Muft Bijli Yojana is subject to central government verification and timely inspection by local electricity distribution companies.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
