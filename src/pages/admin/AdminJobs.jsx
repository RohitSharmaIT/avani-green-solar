import React, { useState, useEffect } from 'react';
import Icon from '../../components/common/Icon';

export default function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ role: '', location: '', salary: '', image: '', responsibilities: '', requirements: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch('/api/jobs');
      const data = await res.json();
      if (res.ok) setJobs(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        fetchJobs();
        setShowModal(false);
        setForm({ role: '', location: '', salary: '', image: '', responsibilities: '', requirements: '' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 24 }}>Manage Jobs</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Post Job</button>
      </div>

      <table className="admin" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Role</th>
            <th>Location</th>
            <th>Salary</th>
            <th>Date Posted</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job._id}>
              <td><strong>{job.role}</strong></td>
              <td>{job.location}</td>
              <td>{job.salary}</td>
              <td>{new Date(job.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
          {jobs.length === 0 && (
            <tr>
              <td colSpan="4" className="empty">No jobs posted yet.</td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-bg open" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}><Icon name="x" size={20} /></button>
            <h3 style={{ marginBottom: 20 }}>Post New Job</h3>
            <form onSubmit={handleCreate}>
              <div className="field">
                <label className="req">Role / Title</label>
                <input required value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="field">
                  <label className="req">Location</label>
                  <input required value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
                </div>
                <div className="field">
                  <label className="req">Salary</label>
                  <input required value={form.salary} onChange={e => setForm({ ...form, salary: e.target.value })} />
                </div>
              </div>
              <div className="field">
                <label>Image URL (Optional)</label>
                <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
              </div>
              <div className="field">
                <label className="req">Responsibilities</label>
                <textarea required rows={4} value={form.responsibilities} onChange={e => setForm({ ...form, responsibilities: e.target.value })}></textarea>
              </div>
              <div className="field">
                <label className="req">Requirements</label>
                <textarea required rows={4} value={form.requirements} onChange={e => setForm({ ...form, requirements: e.target.value })}></textarea>
              </div>
              <div className="cta-row" style={{ marginTop: 24 }}>
                <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Saving...' : 'Post Job'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
