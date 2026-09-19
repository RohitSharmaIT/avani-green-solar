import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import ProjectCard from '../components/cards/ProjectCard';
import '../stylesheets/frontend/pages/projects.css';

export default function ProjectsPage() {
  const { projects } = useApp();
  const [filter, setFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', 'Residential', 'Commercial', 'Industrial', 'On-grid', 'Off-grid', 'Hybrid'];

  const filteredProjects = projects.filter((p) => {
    if (filter === 'All') return true;
    const selected = filter.trim().toLowerCase();
    return [p.type, p.solarType].some((value) => String(value || '').trim().toLowerCase() === selected);
  });

  return (
    <section className="section projects-page">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">Our work</div>
          <h2>Projects Portfolio</h2>
          <p>
            Explore real-world turnkey solar installations executed by Avani Green Solar across Madhya Pradesh.
          </p>
        </div>

        <button type="button" className="filter-toggle btn btn-ghost btn-sm" onClick={() => setShowFilters((value) => !value)} aria-expanded={showFilters}>
          {showFilters ? 'Hide filters' : 'Filter projects'}
        </button>
        <div className={`filter-row ${showFilters ? 'filters-open' : ''}`} role="tablist" aria-label="Filter solar projects">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-chip ${filter === cat ? 'active' : ''}`}
              type="button"
              onClick={() => setFilter(cat)}
              role="tab"
              aria-selected={filter === cat}
            >
              {cat}
            </button>
          ))}
        </div>
        {filter !== 'All' && <button type="button" className="btn btn-ghost btn-sm filter-clear" onClick={() => setFilter('All')}>Clear filters</button>}

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
