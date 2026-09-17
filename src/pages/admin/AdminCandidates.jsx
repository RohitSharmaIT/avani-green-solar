import React, { useState, useEffect } from 'react';
import Icon from '../../components/common/Icon';

export default function AdminCandidates() {
  const [candidates, setCandidates] = useState([]);
  const [activeTab, setActiveTab] = useState('Applied');
  const tabs = ['Applied', 'Shortlisted', 'Assessment', 'Schedule Interview', 'Schedule HR discussion', 'Selected', 'Reject'];

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const res = await fetch('/api/applications');
      const data = await res.json();
      if (res.ok) setCandidates(data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/applications/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setCandidates(candidates.map(c => c._id === id ? { ...c, status } : c));
      }
    } catch (err) {
      console.error('Error updating status', err);
    }
  };

  const filteredCandidates = candidates.filter(c => c.status === activeTab);

  return (
    <div>
      <h1 style={{ fontSize: 24, marginBottom: 24 }}>Candidate Tracking</h1>

      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="table-wrap">
        <table className="admin">
          <thead>
            <tr>
              <th>Name &amp; Contact</th>
              <th>Role Applied</th>
              <th>Resume</th>
              <th>Links</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.map(candidate => (
              <tr key={candidate._id}>
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--forest)' }}>{candidate.name}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>{candidate.email}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>{candidate.phone}</div>
                </td>
                <td>{candidate.jobId?.role || 'Unknown'}</td>
                <td>
                  <a href={candidate.resumeUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--leaf)', fontWeight: 600 }}>
                    View Resume
                  </a>
                </td>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {candidate.googleMeetLink && (
                      <a href={candidate.googleMeetLink} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: '#25D366' }}>Meet Link</a>
                    )}
                    {candidate.portfolioLink && (
                      <a href={candidate.portfolioLink} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: 'var(--amber)' }}>Portfolio</a>
                    )}
                  </div>
                </td>
                <td>
                  <select
                    value={candidate.status}
                    onChange={(e) => updateStatus(candidate._id, e.target.value)}
                    style={{ padding: '6px 10px', width: 'auto', minWidth: 140 }}
                  >
                    {tabs.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {filteredCandidates.length === 0 && (
              <tr>
                <td colSpan="5" className="empty">No candidates found in {activeTab}.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
