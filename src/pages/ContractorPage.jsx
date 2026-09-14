import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function ContractorPage() {
  const { settings } = useApp();

  const perks = [
    { title: 'Regular Installation Contracts', desc: 'Continuous stream of turnkey rooftop, agricultural, and industrial solar projects across MP.' },
    { title: 'Technical Coordination & BOM', desc: 'Full engineering drawings, certified Bill of Materials (BOM), and standardized safety protocols provided.' },
    { title: 'Prompt Milestones & Payouts', desc: 'Guaranteed milestone-based contractor disbursements upon DISCOM inspection approvals.' },
    { title: 'Local-Area Execution', desc: 'Assignments matched to your team’s district base to minimize mobilization and travel overhead.' }
  ];

  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 940 }}>
        <div className="section-head">
          <div className="eyebrow">Contractor Network</div>
          <h2>Work With {settings.company}</h2>
          <p>
            Register as a certified electrical contractor or structural installation partner to execute commercial, residential, and megawatt solar installations.
          </p>
        </div>

        <div className="cell-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', marginBottom: 36 }}>
          {perks.map((p, idx) => (
            <div key={idx} className="cell">
              <h4 style={{ fontSize: '16.5px', marginBottom: 8, color: 'var(--forest)' }}>{p.title}</h4>
              <p style={{ fontSize: '14px', color: 'var(--ink-soft)', margin: 0 }}>{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="card-simple" style={{ background: 'var(--sage)', border: 'none', padding: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <h3 style={{ marginBottom: 6 }}>Are you an experienced installer or electrician?</h3>
            <p style={{ color: 'var(--ink-soft)', margin: 0, fontSize: '14.5px' }}>
              Join our approved contractor roster to receive project assignments in your region.
            </p>
          </div>
          <Link to="/contractor/apply" className="btn btn-primary">
            Apply as Contractor
          </Link>
        </div>
      </div>
    </section>
  );
}
