import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/common/Icon';
import '../stylesheets/frontend/pages/careers.css';

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  async function fetchJobs() {
    try {
      const res = await fetch('/api/jobs');
      const data = await res.json();
      if (res.ok) setJobs(data);
    } catch (err) {
      console.error('Error fetching jobs', err);
    }
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  const normalizedSearch = search.trim().toLowerCase();
  const filteredJobs = jobs.filter((job) => {
    const role = String(job.role || '').toLowerCase();
    const location = String(job.location || '').toLowerCase();
    return !normalizedSearch || role.includes(normalizedSearch) || location.includes(normalizedSearch);
  });

  return (
    <>
      <section className="section" style={{ background: 'var(--sage)' }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <div className="eyebrow">Careers at Avani Solar</div>
          <h1 style={{ fontSize: 'clamp(28px, 6vw, 42px)', marginBottom: 16 }}>Join Our Mission</h1>
          <p className="lead" style={{ maxWidth: 600, margin: '0 auto', color: 'var(--ink-soft)' }}>
            We are looking for passionate individuals to help us build a sustainable future with clean solar energy.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className={`career-filters ${showFilters ? 'filters-open' : ''}`} style={{ marginBottom: 32, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <button type="button" className="filter-toggle btn btn-ghost btn-sm" onClick={() => setShowFilters((value) => !value)} aria-expanded={showFilters}>
              {showFilters ? 'Hide filters' : 'Filter jobs'}
            </button>
            <div className="career-filter-control" style={{ position: 'relative', flex: '1 1 240px', minWidth: 0 }}>
              <input
                type="text"
                placeholder="Search jobs by role or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ paddingLeft: 38 }}
              />
              <div style={{ position: 'absolute', left: 12, top: 11, color: 'var(--ink-soft)' }}>
                <Icon name="search" size={18} />
              </div>
            </div>
            <div className="career-filter-control" style={{ fontSize: 14, color: 'var(--ink-soft)', whiteSpace: 'nowrap' }}>
              Showing {filteredJobs.length} roles
            </div>
            {search && <button type="button" className="btn btn-ghost btn-sm career-filter-control" onClick={() => setSearch('')}>Clear filter</button>}
          </div>

          <div className="grid-cards">
            {filteredJobs.map((job) => (
              <div
                key={job._id}
                className="card-simple animate-slide-up"
                style={{ cursor: 'pointer', padding: 0, overflow: 'hidden' }}
              >
                {job.image ? (
                  <img src={job.image} alt={job.role} style={{ height: 160, width: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ height: 160, display: 'grid', placeItems: 'center', background: 'linear-gradient(135deg, var(--forest), var(--leaf))', color: '#fff', fontSize: 44 }}>☀</div>
                )}
                <div style={{ padding: 24 }}>
                  <h3 style={{ marginBottom: 8 }}>{job.role}</h3>
                  <div style={{ display: 'flex', gap: 16, color: 'var(--ink-soft)', fontSize: 13.5, marginBottom: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Icon name="pin" size={16} /> {job.location}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Icon name="wallet" size={16} /> {job.salary}
                    </div>
                  </div>
                  <Link to={`/careers/${job._id}`} className="btn btn-ghost btn-sm career-details-link">View Details</Link>
                </div>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="empty">No jobs found matching your search.</div>
          )}
        </div>
      </section>

    </>
  );
}
