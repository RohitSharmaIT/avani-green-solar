import React from 'react';
import { useApp } from '../../context/AppContext';

export default function AdminSiteVisits() {
  const { siteVisits } = useApp();

  return (
    <div>
      <h2 style={{ fontSize: '24px', marginBottom: 4 }}>Site Survey Visits</h2>
      <p style={{ color: 'var(--ink-soft)', fontSize: '14px', marginBottom: 24 }}>
        Scheduled technical site feasibility and rooftop dimension assessments.
      </p>

      {siteVisits.length > 0 ? (
        <div style={{ overflowX: 'auto' }}>
          <table className="admin">
            <thead>
              <tr>
                <th>Survey ID</th>
                <th>Client Name</th>
                <th>Phone</th>
                <th>Site Address</th>
                <th>Preferred Schedule</th>
                <th>Capacity / Type</th>
                <th>Roof Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {siteVisits.map((v) => (
                <tr key={v.id}>
                  <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{v.id}</td>
                  <td style={{ fontWeight: 600 }}>{v.name}</td>
                  <td>{v.phone || '—'}</td>
                  <td style={{ maxWidth: 220 }}>{v.address || '—'} {v.city ? `(${v.city})` : ''}</td>
                  <td>
                    {v.preferredDate || 'Flexible'} {v.preferredTime ? `at ${v.preferredTime}` : ''}
                  </td>
                  <td>
                    {v.capacity ? `${v.capacity} kW` : '—'} {v.customerType ? `(${v.customerType})` : ''}
                  </td>
                  <td>{v.roofType || 'Standard'}</td>
                  <td>
                    <span className={`badge-status st-${v.status}`}>{v.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty">No site visit appointments have been requested yet.</div>
      )}
    </div>
  );
}
