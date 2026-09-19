import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ProjectCard from '../components/cards/ProjectCard';
import '../stylesheets/frontend/pages/services.css';

const SERVICE_DATA = {
  residential: {
    title: 'Residential Solar',
    desc: 'High-efficiency rooftop solar systems engineered for independent houses, villas, and housing societies. Sized precisely to offset household appliance usage and daytime peak loads.',
    uses: ['Independent Villas & Houses', 'Housing Societies & Apartments', 'Farmhouses & Rural Estates']
  },
  commercial: {
    title: 'Commercial Solar',
    desc: 'Customized rooftop and canopy solar solutions for commercial complexes, educational campuses, hospitals, and corporate office parks to drastically reduce operational overhead.',
    uses: ['Offices & Corporate Buildings', 'Colleges, Schools & Institutions', 'Hospitals, Clinics & Diagnostic Labs']
  },
  industrial: {
    title: 'Industrial Solar',
    desc: 'Turnkey MW-scale ground-mount and factory shed solar installations for manufacturing plants, textile mills, warehouses, and cold-chain infrastructure across Madhya Pradesh.',
    uses: ['Manufacturing & Production Facilities', 'Logistics Warehouses & Sheds', 'Agro-processing & Cold Storages']
  }
};

const TYPE_DATA = {
  'on-grid': {
    title: 'On-grid System',
    desc: 'Connected seamlessly to the electricity board grid. Any surplus solar power generated during peak sunshine is fed back into the grid via bidirectional net-metering to yield monthly electricity bill credits.'
  },
  'off-grid': {
    title: 'Off-grid System',
    desc: 'Equipped with dedicated solar battery banks (tubular or LiFePO4) for complete independence from utility power cuts. Ideal for farmhouses, remote rural facilities, and areas with unreliable grid infrastructure.'
  },
  'hybrid': {
    title: 'Hybrid System',
    desc: 'The best of both worlds: maintains grid connectivity with net-metering benefits while also incorporating battery storage to instantly deliver uninterrupted power backup during grid outages.'
  }
};

export default function ServicesPage() {
  const { category, type } = useParams();
  const { projects, openEnquiryModal } = useApp();

  const currentCat = category ? category.toLowerCase() : null;
  const currentType = type ? type.toLowerCase() : null;

  // Case 1: Specific category and type: /services/:category/:type
  if (currentCat && SERVICE_DATA[currentCat] && currentType && TYPE_DATA[currentType]) {
    const d = SERVICE_DATA[currentCat];
    const t = TYPE_DATA[currentType];
    const relatedProjects = projects.filter(
      (p) => p.type.toLowerCase() === currentCat && p.solarType.toLowerCase().replace(/[^a-z]/g, '') === currentType.replace(/[^a-z]/g, '')
    );

    return (
      <section className="section services-page">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">{d.title} · {t.title}</div>
            <h2>{d.title} — {t.title}</h2>
            <p>{t.desc}</p>
          </div>

          <div className="cta-row" style={{ marginBottom: 36 }}>
            <button className="btn btn-primary" onClick={openEnquiryModal}>Get Quote</button>
            <Link to={`/services/${currentCat}`} className="btn btn-ghost">Back to {d.title}</Link>
            <Link to="/solar-calculator" className="btn btn-ghost">Calculate Savings</Link>
          </div>

          <h4 style={{ margin: '30px 0 16px' }}>Related {d.title} Projects</h4>
          <div className="cell-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {relatedProjects.length > 0 ? (
              relatedProjects.map((p) => <ProjectCard key={p.id} project={p} />)
            ) : (
              <div className="empty">No projects found for this specific system configuration.</div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Case 2: Specific category: /services/:category
  if (currentCat && SERVICE_DATA[currentCat]) {
    const d = SERVICE_DATA[currentCat];
    const relatedProjects = projects.filter((p) => p.type.toLowerCase() === currentCat);

    return (
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Services</div>
            <h2>{d.title}</h2>
            <p>{d.desc}</p>
          </div>

          {/* System Type Tabs */}
          <div className="tabs">
            {Object.keys(TYPE_DATA).map((k) => (
              <Link
                key={k}
                to={`/services/${currentCat}/${k}`}
                className="tab"
              >
                {TYPE_DATA[k].title}
              </Link>
            ))}
          </div>

          <h4 style={{ marginBottom: 14 }}>Suitable for</h4>
          <div className="cell-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginBottom: 36 }}>
            {d.uses.map((u, i) => (
              <div key={i} className="cell" style={{ textAlign: 'center', fontSize: '15px', fontWeight: 600 }}>
                {u}
              </div>
            ))}
          </div>

          <div className="cta-row" style={{ marginBottom: 40 }}>
            <button className="btn btn-primary" onClick={openEnquiryModal}>Get Quote</button>
            <Link to="/solar-calculator" className="btn btn-ghost">Calculate Savings</Link>
            <Link to="/services" className="btn btn-ghost">All Services</Link>
          </div>

          <h4 style={{ margin: '34px 0 16px' }}>Related Projects ({d.title})</h4>
          <div className="cell-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {relatedProjects.length > 0 ? (
              relatedProjects.map((p) => <ProjectCard key={p.id} project={p} />)
            ) : (
              <div className="empty">No projects listed yet for this category.</div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Case 3: All services overview: /services
  return (
    <section className="section">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">Services</div>
          <h2>Solar solutions for every property type</h2>
          <p>
            From residential rooftops under PM Surya Ghar to 1 MW+ industrial solar arrays, we design customized renewable energy systems to maximize your returns.
          </p>
        </div>

        <div className="cell-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {Object.entries(SERVICE_DATA).map(([k, d]) => (
            <div key={k} className="cell" style={{ display: 'flex', flexDirection: 'column' }}>
              <h4 style={{ marginBottom: 10, fontSize: '18px' }}>{d.title}</h4>
              <p style={{ fontSize: '14px', color: 'var(--ink-soft)', marginBottom: 20, flexGrow: 1 }}>
                {d.desc}
              </p>
              <div style={{ display: 'flex', gap: 10 }}>
                <Link to={`/services/${k}`} className="btn btn-ghost btn-sm">
                  Explore {d.title} →
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
  );
}
