import React from 'react';
import { useApp } from '../../context/AppContext';

export default function AdminDealers() {
  const { dealerApps, updateDealerAppStatus } = useApp();

  return (
    <div>
      <h2 style={{ fontSize: '24px', marginBottom: 4 }}>Dealer Applications</h2>
      <p style={{ color: 'var(--ink-soft)', fontSize: '14px', marginBottom: 24 }}>
        Review partner credentials and regional distributor requests.
      </p>

      {dealerApps.length > 0 ? (
        <div style={{ overflowX: 'auto' }}>
          <table className="admin">
            <thead>
              <tr>
                <th>App ID</th>
                <th>Name / Business</th>
                <th>City / District</th>
                <th>Phone</th>
                <th>Experience</th>
                <th>Infrastructure</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dealerApps.map((d) => (
                <tr key={d.id}>
                  <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{d.id}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{d.name}</div>
                    {d.businessName && <div style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>{d.businessName}</div>}
                  </td>
                  <td>{d.city || '—'} {d.district ? `(${d.district})` : ''}</td>
                  <td>{d.phone || '—'}</td>
                  <td>{d.years ? `${d.years} yrs` : '—'}</td>
                  <td style={{ fontSize: '12px' }}>
                    {[
                      d.office && 'Office',
                      d.warehouse && 'Warehouse',
                      d.salesTeam && 'Sales',
                      d.installTeam && 'Install'
                    ].filter(Boolean).join(', ') || 'None stated'}
                  </td>
                  <td>
                    <span className={`badge-status st-${d.status}`}>{d.status}</span>
                  </td>
                  <td>
                    {d.status === 'APPLIED' ? (
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => updateDealerAppStatus(d.id, 'APPROVED')}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => updateDealerAppStatus(d.id, 'REJECTED')}
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
        <div className="empty">No dealer applications received yet.</div>
      )}
    </div>
  );
}
