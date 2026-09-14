import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const { projects, openEnquiryModal } = useApp();

  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <section className="section">
        <div className="wrap">
          <div className="empty">
            <h3>Project Not Found</h3>
            <p style={{ marginTop: 8 }}>The requested installation project does not exist.</p>
            <Link to="/projects" className="btn btn-primary" style={{ marginTop: 16 }}>
              Back to Projects
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 840 }}>
        <Link
          to="/projects"
          style={{ fontSize: '13.5px', color: 'var(--leaf-dark)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6 }}
        >
          ← Back to all projects
        </Link>

        <div
          style={{
            aspectRatio: '16/8',
            background: 'linear-gradient(135deg, #163A2E 0%, #2F7A4F 100%)',
            margin: '20px 0 28px',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255,255,255,0.7)',
            fontSize: '28px',
            fontWeight: 700,
            fontFamily: 'Space Grotesk',
            position: 'relative'
          }}
        >
          {project.image ? (
            <img
              src={project.image}
              alt={project.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <span>{project.capacity} kW {project.solarType}</span>
          )}
        </div>

        <div className="section-head" style={{ maxWidth: 'none' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            <span className="tag">{project.type}</span>
            <span className="tag" style={{ background: 'var(--amber)', color: 'var(--forest)', borderColor: 'transparent' }}>
              {project.solarType}
            </span>
          </div>
          <h2>{project.name}</h2>
          <p style={{ fontSize: '16px', color: 'var(--ink-soft)' }}>
            Location: <strong>{project.location}</strong> · System Capacity: <strong>{project.capacity} kW</strong> · Commissioned: <strong>{project.year}</strong>
          </p>
        </div>

        <div className="card-simple" style={{ marginBottom: 30 }}>
          <h4 style={{ marginBottom: 12 }}>Installation Overview</h4>
          <p style={{ color: 'var(--ink-soft)', lineHeight: 1.7, fontSize: '15px', margin: 0 }}>
            {project.desc}
          </p>
        </div>

        <div className="cta-row">
          <button className="btn btn-primary" onClick={openEnquiryModal}>
            Get a Similar System Quote
          </button>
          <Link to="/talk-to-solar-expert" className="btn btn-ghost">
            Consult a Solar Expert
          </Link>
          <Link to="/book-site-visit" className="btn btn-ghost">
            Book Site Visit
          </Link>
        </div>
      </div>
    </section>
  );
}
