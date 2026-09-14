import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import ProjectCard from '../components/cards/ProjectCard';

export default function ProjectsPage() {
  const { projects } = useApp();
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Residential', 'Commercial', 'Industrial', 'On-grid', 'Off-grid', 'Hybrid'];

  const filteredProjects = projects.filter((p) => {
    if (filter === 'All') return true;
    return p.type === filter || p.solarType === filter;
  });

  return (
    <section className="section">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">Our work</div>
          <h2>Projects Portfolio</h2>
          <p>
            Explore real-world turnkey solar installations executed by Avani Green Solar across Madhya Pradesh.
          </p>
        </div>

        <div className="filter-row" role="tablist" aria-label="Filter solar projects">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-chip ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
              role="tab"
              aria-selected={filter === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="cell-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className="empty">No projects found matching the selected filter.</div>
          )}
        </div>
      </div>
    </section>
  );
}
