import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Icon from '../../components/common/Icon';

export default function AdminLoginPage() {
  const { adminLogin } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const success = await adminLogin(username, password);
      if (!success) {
        setError('Invalid username or password. Please check your admin credentials.');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0F271F 0%, #163A2E 100%)',
        padding: 20
      }}
    >
      <div
        className="card-simple"
        style={{
          maxWidth: 440,
          width: '100%',
          padding: 36,
          boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
          border: '1px solid rgba(255,255,255,0.1)',
          background: '#fff',
          borderRadius: 8
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div
            style={{
              width: 48,
              height: 48,
              background: 'var(--forest)',
              borderRadius: 8,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--amber)',
              marginBottom: 14
            }}
          >
            <Icon name="shield" size={26} />
          </div>
          <h2 style={{ fontSize: '24px', color: 'var(--forest)' }}>Admin Portal Access</h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: '13.5px', marginTop: 6 }}>
            Avani Green Solar Management Suite
          </p>
        </div>

        {error && (
          <div
            style={{
              background: '#FBE4E1',
              color: '#992B1E',
              padding: '10px 14px',
              borderRadius: 4,
              fontSize: '13.5px',
              marginBottom: 18,
              border: '1px solid #F5C6CB'
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="req">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter admin username"
              required
              autoFocus
            />
          </div>

          <div className="field">
            <label className="req">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center', marginTop: 10, padding: 12, fontSize: '15px', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Authenticating with MongoDB...' : 'Login to Admin Panel'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 24, fontSize: '12.5px', color: 'var(--ink-soft)' }}>
          Protected system · Authorized personnel only
        </div>
      </div>
    </div>
  );
}
