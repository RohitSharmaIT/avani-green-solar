import React from 'react';
import { Link } from 'react-router-dom';

export default function ProjectCard({ project }) {
  if (!project) return null;

  return (
    <div className="cell project-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div
        className="project-card-media"
        style={{
          aspectRatio: '16/10',
          background: 'linear-gradient(135deg, #163A2E 0%, #2F7A4F 100%)',
          marginBottom: 16,
          position: 'relative',
          borderRadius: '4px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)'
        }}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={project.name}
            className="project-card-image"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Space Grotesk', fontSize: '20px', fontWeight: 700 }}>
            {project.capacity} kW
          </div>
        )}
        <span
          className="tag"
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            background: 'rgba(255,255,255,0.95)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}
        >
          {project.solarType}
        </span>
        {project.image && (
          <span
            style={{
              position: 'absolute',
              bottom: 10,
              right: 10,
              background: 'rgba(15, 39, 31, 0.85)',
              color: '#fff',
              padding: '3px 8px',
              borderRadius: 4,
              fontSize: '11px',
              fontWeight: 700,
              fontFamily: 'Space Grotesk'
            }}
          >
            {project.capacity} kW
          </span>
        )}
      </div>
      <h4 style={{ fontSize: '16px', marginBottom: 6 }}>{project.name}</h4>
      <p style={{ fontSize: '13px', color: 'var(--ink-soft)', marginBottom: 14 }}>
        {project.location} · {project.capacity} kW · {project.type}
      </p>
      <div style={{ marginTop: 'auto' }}>
        <Link
          to={`/projects/${project.id}`}
          style={{
            fontSize: '13.5px',
            fontWeight: 600,
            color: 'var(--leaf-dark)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4
          }}
        >
          View project details →
        </Link>
      </div>
    </div>
  );
}
