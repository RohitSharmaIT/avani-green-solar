import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import Icon from '../../components/common/Icon';

export default function AdminSettings() {
  const { settings, updateSettings, isDbConnected, isCloudinaryActive, showToast } = useApp();
  const [form, setForm] = useState(settings);

  // Admin password change state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdMessage, setPwdMessage] = useState(null);
  const [pwdError, setPwdError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateSettings({
      ...form,
      tariffPerUnit: Number(form.tariffPerUnit || 7.5),
      unitsPerKwPerMonth: Number(form.unitsPerKwPerMonth || 120),
      costPerKw: Number(form.costPerKw || 55000)
    });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPwdMessage(null);
    setPwdError(null);

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPwdError('New passwords do not match.');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setPwdError('New password must be at least 6 characters long.');
      return;
    }

    setPwdLoading(true);
    try {
      const res = await api.auth.changePassword(
        passwordForm.currentPassword,
        passwordForm.newPassword
      );
      setPwdMessage(res.message || 'Admin password updated successfully in MongoDB.');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      showToast('Admin password updated successfully.');
    } catch (err) {
      setPwdError(err.message || 'Failed to update password.');
    } finally {
      setPwdLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 14 }}>
        <div>
          <h2 style={{ fontSize: '24px', margin: 0 }}>System Settings &amp; Security</h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: '14px', margin: '4px 0 0' }}>
            Configure database persistence, Cloudinary asset delivery, and admin login security.
          </p>
        </div>

        {/* Status Pills */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <div
            style={{
              padding: '6px 14px',
              borderRadius: 20,
              fontSize: '12px',
              fontWeight: 600,
              background: isDbConnected ? '#E6F4EA' : '#FEF7E0',
              color: isDbConnected ? '#137333' : '#B06000',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: isDbConnected ? '#137333' : '#B06000' }}></span>
            MongoDB: {isDbConnected ? 'Active (127.0.0.1:27017)' : 'Local Fallback'}
          </div>

          <div
            style={{
              padding: '6px 14px',
              borderRadius: 20,
              fontSize: '12px',
              fontWeight: 600,
              background: isCloudinaryActive ? '#E8F0FE' : '#FEF7E0',
              color: isCloudinaryActive ? '#1A73E8' : '#B06000',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: isCloudinaryActive ? '#1A73E8' : '#B06000' }}></span>
            Cloudinary: {isCloudinaryActive ? 'Connected' : 'Local Fallback (Active)'}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1.4fr) minmax(280px, 1fr)', gap: 24, alignItems: 'start' }}>
        {/* Company Settings Form */}
        <form onSubmit={handleSave} className="card-simple">
          <h4 style={{ marginBottom: 14, borderBottom: '1px solid var(--line-light)', paddingBottom: 8 }}>
            Business &amp; Communication Details (Stored in MongoDB)
          </h4>

          <div className="field">
            <label>Company Display Name</label>
            <input name="company" value={form.company} onChange={handleChange} required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="field">
              <label>Support Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} required />
            </div>
            <div className="field">
              <label>WhatsApp Number (no spaces/plus)</label>
              <input name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="e.g. 919000000000" required />
            </div>
          </div>

          <div className="field">
            <label>Email Address</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="field">
              <label>Additional Phone</label>
              <input name="phone2" value={form.phone2 || ''} onChange={handleChange} placeholder="+91 78793 01745" required />
            </div>
            <div className="field">
              <label>Instagram URL</label>
              <input name="socialInstagram" type="url" value={form.socialInstagram || ''} onChange={handleChange} placeholder="https://instagram.com/..." />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="field">
              <label>YouTube URL</label>
              <input name="socialYoutube" type="url" value={form.socialYoutube || ''} onChange={handleChange} placeholder="https://youtube.com/..." />
            </div>
            <div className="field">
              <label>LinkedIn URL</label>
              <input name="socialLinkedin" type="url" value={form.socialLinkedin || ''} onChange={handleChange} placeholder="https://linkedin.com/..." />
            </div>
          </div>

          <div className="field">
            <label>Office Address</label>
            <input name="address" value={form.address} onChange={handleChange} required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="field">
              <label>Business Operating Hours</label>
              <input name="hours" value={form.hours} onChange={handleChange} />
            </div>
            <div className="field">
              <label>Default State</label>
              <input name="defaultState" value={form.defaultState} onChange={handleChange} />
            </div>
          </div>

          <h4 style={{ margin: '24px 0 14px', borderBottom: '1px solid var(--line-light)', paddingBottom: 8 }}>
            Solar Calculator Engineering Parameters
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
            <div className="field">
              <label>Grid Tariff (₹/unit)</label>
              <input
                name="tariffPerUnit"
                type="number"
                step="0.1"
                value={form.tariffPerUnit}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label>Gen. (Units/kW/mo)</label>
              <input
                name="unitsPerKwPerMonth"
                type="number"
                value={form.unitsPerKwPerMonth}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label>Capex (₹/kW)</label>
              <input
                name="costPerKw"
                type="number"
                step="1000"
                value={form.costPerKw}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button className="btn btn-primary" type="submit" style={{ marginTop: 16 }}>
            Save Configuration to MongoDB
          </button>
        </form>

        {/* Security & Password Change */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <form onSubmit={handlePasswordChange} className="card-simple">
            <h4 style={{ marginBottom: 14, borderBottom: '1px solid var(--line-light)', paddingBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon name="shield" size={18} /> Admin Password in MongoDB
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--ink-soft)', marginBottom: 16 }}>
              Default admin: <strong>Avani122</strong>. Update your credentials securely hashed with bcrypt in the MongoDB database.
            </p>

            {pwdError && (
              <div style={{ background: '#FBE4E1', color: '#992B1E', padding: '8px 12px', borderRadius: 4, fontSize: '12.5px', marginBottom: 14 }}>
                {pwdError}
              </div>
            )}
            {pwdMessage && (
              <div style={{ background: '#E6F4EA', color: '#137333', padding: '8px 12px', borderRadius: 4, fontSize: '12.5px', marginBottom: 14 }}>
                {pwdMessage}
              </div>
            )}

            <div className="field">
              <label className="req">Current Admin Password</label>
              <input
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm((p) => ({ ...p, currentPassword: e.target.value }))}
                placeholder="Enter current password"
                required
              />
            </div>

            <div className="field">
              <label className="req">New Admin Password</label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm((p) => ({ ...p, newPassword: e.target.value }))}
                placeholder="Minimum 6 characters"
                required
              />
            </div>

            <div className="field">
              <label className="req">Confirm New Password</label>
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm((p) => ({ ...p, confirmPassword: e.target.value }))}
                placeholder="Re-enter new password"
                required
              />
            </div>

            <button
              className="btn btn-primary"
              type="submit"
              disabled={pwdLoading}
              style={{ width: '100%', justifyContent: 'center', marginTop: 10 }}
            >
              {pwdLoading ? 'Updating Password...' : 'Update Admin Password'}
            </button>
          </form>

          {/* Cloudinary Info Card */}
          <div className="card-simple" style={{ background: 'var(--sage)', border: 'none' }}>
            <h4 style={{ marginBottom: 10, fontSize: '15px' }}>Cloudinary Integration</h4>
            <p style={{ fontSize: '13px', color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0 }}>
              To connect your own Cloudinary cloud, open <code>.env</code> in your root folder and set your credentials:
            </p>
            <pre
              style={{
                fontSize: '11.5px',
                background: '#fff',
                padding: '10px',
                borderRadius: 4,
                margin: '10px 0',
                overflowX: 'auto',
                border: '1px solid var(--line)'
              }}
            >
{`CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret`}
            </pre>
            <p style={{ fontSize: '12px', color: 'var(--ink-soft)', margin: 0 }}>
              Images uploaded will automatically stream to your Cloudinary storage and optimize CDN delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
