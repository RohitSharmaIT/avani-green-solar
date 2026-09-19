import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import '../../stylesheets/frontend/pages/admin.css';

export default function AdminDashboard() {
  const { leads, siteVisits, reviews, dealerApps, contractorApps, contactMessages } = useApp();

  const countStatus = (s) => leads.filter((l) => l.status === s).length;
  const pendingReviews = reviews.filter((r) => r.status === 'PENDING').length;

  const stats = [
    { label: 'Total Inbound Leads', value: leads.length, link: '/admin/leads' },
    { label: 'New Unassigned Leads', value: countStatus('NEW'), link: '/admin/leads', highlight: true },
    { label: 'Site Visits Requested', value: siteVisits.length, link: '/admin/sitevisits' },
    { label: 'Won Solar Projects', value: countStatus('WON'), link: '/admin/leads' },
    { label: 'Dealer Applications', value: dealerApps.length, link: '/admin/dealers' },
    { label: 'Contractor Applications', value: contractorApps.length, link: '/admin/contractors' },
    { label: 'Contact Messages', value: contactMessages.length, link: '/admin/messages' },
    { label: 'Pending Reviews', value: pendingReviews, link: '/admin/reviews', alert: pendingReviews > 0 }
  ];

  return (
    <div className="admin-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 style={{ fontSize: '24px' }}>CRM Dashboard</h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: '14px', margin: '4px 0 0' }}>
            Real-time pipeline metrics and customer activity.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link to="/admin/leads" className="btn btn-primary btn-sm">Manage Leads</Link>
          <Link to="/admin/sitevisits" className="btn btn-ghost btn-sm">View Site Visits</Link>
        </div>
      </div>

      <div className="cell-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginBottom: 36 }}>
        {stats.map((s, idx) => (
          <Link key={idx} to={s.link} className="cell" style={{ display: 'block', transition: 'var(--transition)' }}>
            <div style={{ fontSize: '12.5px', color: 'var(--ink-soft)', fontWeight: 500 }}>{s.label}</div>
            <div
              className="kpi"
              style={{
                color: s.alert ? 'var(--amber)' : s.highlight ? 'var(--leaf-dark)' : 'var(--forest)'
              }}
            >
              {s.value}
            </div>
          </Link>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <h3 style={{ fontSize: '18px' }}>Recent Inbound Leads</h3>
        <Link to="/admin/leads" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--leaf-dark)' }}>
          View all {leads.length} leads →
        </Link>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="admin">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer Name</th>
              <th>Phone</th>
              <th>Type</th>
              <th>Source</th>
              <th>Status</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {leads.slice(0, 6).map((lead) => (
              <tr key={lead.id}>
                <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{lead.id}</td>
                <td style={{ fontWeight: 600 }}>{lead.name || '—'}</td>
                <td>{lead.phone || '—'}</td>
                <td>{lead.customerType || '—'}</td>
                <td><span className="tag" style={{ fontSize: '11px' }}>{lead.source}</span></td>
                <td><span className={`badge-status st-${lead.status}`}>{lead.status}</span></td>
                <td style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>
                  {new Date(lead.created).toLocaleDateString('en-IN')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
