import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

const STATUS_OPTIONS = [
  'NEW',
  'CONTACTED',
  'SITE_VISIT_PLANNED',
  'SITE_VISIT_COMPLETED',
  'QUOTATION_SENT',
  'NEGOTIATION',
  'WON',
  'LOST'
];

export default function AdminLeads() {
  const { leads, updateLeadStatus } = useApp();
  const [filter, setFilter] = useState('ALL');

  const filteredLeads = leads.filter((l) => (filter === 'ALL' ? true : l.status === filter));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 14 }}>
        <div>
          <h2 style={{ fontSize: '24px' }}>Lead Pipeline Management</h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: '14px', margin: '4px 0 0' }}>
            Track and update statuses of customer enquiries from web forms and calculators.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <label style={{ margin: 0, fontSize: '13px', color: 'var(--ink-soft)' }}>Filter:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ width: 'auto', padding: '6px 12px', fontSize: '13px' }}
          >
            <option value="ALL">All Statuses ({leads.length})</option>
            {STATUS_OPTIONS.map((st) => (
              <option key={st} value={st}>
                {st} ({leads.filter((l) => l.status === st).length})
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredLeads.length > 0 ? (
        <div style={{ overflowX: 'auto' }}>
          <table className="admin">
            <thead>
              <tr>
                <th>Lead ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Location / Address</th>
                <th>Customer Type</th>
                <th>Capacity</th>
                <th>Source</th>
                <th>Status</th>
                <th>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((l) => (
                <tr key={l.id}>
                  <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{l.id}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{l.name || '—'}</div>
                    {l.email && <div style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>{l.email}</div>}
                  </td>
                  <td>
                    <a href={`tel:${l.phone}`} style={{ color: 'var(--leaf-dark)', fontWeight: 500 }}>
                      {l.phone || '—'}
                    </a>
                  </td>
                  <td style={{ fontSize: '13px', maxWidth: 200 }}>
                    {l.address ? `${l.address}${l.city ? `, ${l.city}` : ''}` : l.city || '—'}
                  </td>
                  <td>{l.customerType || '—'}</td>
                  <td>{l.capacity ? `${l.capacity} kW` : '—'}</td>
                  <td><span className="tag" style={{ fontSize: '11px' }}>{l.source}</span></td>
                  <td><span className={`badge-status st-${l.status}`}>{l.status}</span></td>
                  <td>
                    <select
                      value={l.status}
                      onChange={(e) => updateLeadStatus(l.id, e.target.value)}
                      style={{ padding: '6px 8px', fontSize: '12.5px', borderRadius: 4 }}
                    >
                      {STATUS_OPTIONS.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty">No leads found matching the filter "{filter}".</div>
      )}
    </div>
  );
}
