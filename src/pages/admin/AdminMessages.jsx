import React from 'react';
import { useApp } from '../../context/AppContext';

export default function AdminMessages() {
  const { contactMessages } = useApp();

  return (
    <div>
      <h2 style={{ fontSize: '24px', marginBottom: 4 }}>Contact Inquiries</h2>
      <p style={{ color: 'var(--ink-soft)', fontSize: '14px', marginBottom: 24 }}>
        Direct messages submitted via the public Contact Us page.
      </p>

      {contactMessages.length > 0 ? (
        <div style={{ overflowX: 'auto' }}>
          <table className="admin">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Message Content</th>
                <th>Received</th>
              </tr>
            </thead>
            <tbody>
              {contactMessages.map((m) => (
                <tr key={m.id}>
                  <td style={{ fontWeight: 600 }}>{m.name}</td>
                  <td>
                    <a href={`tel:${m.phone}`} style={{ color: 'var(--leaf-dark)' }}>
                      {m.phone}
                    </a>
                  </td>
                  <td>{m.email || '—'}</td>
                  <td style={{ fontWeight: 500 }}>{m.subject || 'General inquiry'}</td>
                  <td style={{ maxWidth: 320, fontSize: '13px', lineHeight: 1.5 }}>
                    {m.message}
                  </td>
                  <td style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>
                    {new Date(m.created).toLocaleDateString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty">No direct contact messages on file.</div>
      )}
    </div>
  );
}
