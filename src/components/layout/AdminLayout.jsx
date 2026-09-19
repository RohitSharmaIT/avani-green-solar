import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import Toast from '../common/Toast';
import Icon from '../common/Icon';
import { useApp } from '../../context/AppContext';
import AdminLoginPage from '../../pages/admin/AdminLoginPage';
import ScrollReveal from '../common/ScrollReveal';

export default function AdminLayout() {
  const {
    settings,
    leads,
    siteVisits,
    reviews,
    dealerApps,
    contractorApps,
    contactMessages,
    isAdminAuthenticated,
    adminLogout
  } = useApp();

  // If not authenticated, render login screen
  if (!isAdminAuthenticated) {
    return (
      <>
        <Toast />
        <AdminLoginPage />
      </>
    );
  }

  const pendingReviews = reviews.filter((r) => r.status === 'PENDING').length;
  const newLeads = leads.filter((l) => l.status === 'NEW').length;

  const navItems = [
    { to: '/admin', end: true, label: 'Dashboard', icon: 'dashboard' },
    { to: '/admin/leads', label: 'Leads', icon: 'users', badge: newLeads > 0 ? newLeads : null },
    { to: '/admin/sitevisits', label: 'Site Visits', icon: 'pin', count: siteVisits.length },
    { to: '/admin/projects', label: 'Projects', icon: 'grid' },
    { to: '/admin/reviews', label: 'Reviews', icon: 'star', badge: pendingReviews > 0 ? pendingReviews : null },
    { to: '/admin/blog', label: 'Blog', icon: 'doc' },
    { to: '/admin/dealers', label: 'Dealers', icon: 'building', count: dealerApps.length },
    { to: '/admin/contractors', label: 'Contractors', icon: 'wrench', count: contractorApps.length },
    { to: '/admin/jobs', label: 'Jobs', icon: 'wallet' },
    { to: '/admin/candidates', label: 'Candidates', icon: 'users' },
    { to: '/admin/messages', label: 'Messages', icon: 'mail', count: contactMessages.length },
    { to: '/admin/settings', label: 'Settings', icon: 'settings' }
  ];

  return (
    <div className="admin-shell">
      <Toast />
      <aside className="admin-side">
        <div className="side-title">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="mark" style={{ width: 18, height: 18, display: 'inline-block', background: 'var(--amber)' }}></span>
            <span>Admin CRM</span>
          </div>
          <div style={{ fontSize: '11.5px', color: '#9db6a9', fontWeight: 400, marginTop: 4 }}>
            {settings.company}
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <Icon name={item.icon} size={17} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge && (
                <span
                  style={{
                    background: 'var(--amber)',
                    color: 'var(--forest)',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '1px 6px',
                    borderRadius: 10
                  }}
                >
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div style={{ marginTop: 28, padding: '0 24px', borderTop: '1px solid #234d3c', paddingTop: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: '13.5px',
              color: '#b9ccc0'
            }}
          >
            ← Back to website
          </Link>

          <button
            onClick={adminLogout}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(255,255,255,0.08)',
              color: '#FBE4E1',
              padding: '8px 12px',
              borderRadius: 4,
              fontSize: '13px',
              cursor: 'pointer',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <Icon name="x" size={15} /> Log Out
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <ScrollReveal><Outlet /></ScrollReveal>
      </main>
    </div>
  );
}
