import React from 'react';
import { useApp } from '../../context/AppContext';

export default function AdminContractors() {
  const { contractorApps, updateContractorAppStatus } = useApp();

  return (
    <div>
      <h2 style={{ fontSize: '24px', marginBottom: 4 }}>Contractor Network Applications</h2>
      <p style={{ color: 'var(--ink-soft)', fontSize: '14px', marginBottom: 24 }}>
        Vetting electrical engineers, technician crews and installation subcontractors.
      </p>

      {contractorApps.length > 0 ? (
        <div style={{ overflowX: 'auto' }}>
          <table className="admin">
            <thead>
              <tr>
                <th>App ID</th>
                <th>Contractor / Company</th>
                <th>Base City</th>
                <th>Phone</th>
                <th>Experience</th>
                <th>Team Size</th>
                <th>Max Capacity</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {contractorApps.map((c) => (
                <tr key={c.id}>
                  <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{c.id}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{c.name}</div>
                    {c.company && <div style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>{c.company}</div>}
                  </td>
                  <td>{c.city || '—'} {c.district ? `(${c.district})` : ''}</td>
                  <td>{c.phone || '—'}</td>
                  <td>{c.experience ? `${c.experience} yrs` : '—'}</td>
                  <td>{c.teamSize ? `${c.teamSize} crew` : '—'}</td>
                  <td>{c.maxCapacity ? `${c.maxCapacity} kW` : '—'}</td>
                  <td>
                    <span className={`badge-status st-${c.status}`}>{c.status}</span>
                  </td>
                  <td>
                    {c.status === 'APPLIED' ? (
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => updateContractorAppStatus(c.id, 'APPROVED')}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => updateContractorAppStatus(c.id, 'REJECTED')}
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span style={{ color: 'var(--ink-soft)', fontSize: '13px' }}>Actioned</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty">No contractor applications received yet.</div>
      )}
    </div>
  );
}
