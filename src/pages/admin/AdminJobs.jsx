import React, { useState, useEffect } from 'react';
import Icon from '../../components/common/Icon';
import { api } from '../../services/api';
import '../../stylesheets/frontend/pages/admin-content.css';
import RichContentEditor from '../../components/admin/RichContentEditor';

export default function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ role: '', location: '', salary: '', image: '', publicId: '', responsibilities: '', requirements: '', editorialNote: '', reminder: '' });
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    try {
      setJobs(await api.jobs.getAll());
    } catch (err) {
      console.error(err);
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) await api.jobs.update(editingId, form);
      else await api.jobs.create(form);
      fetchJobs();
      setShowModal(false);
      setEditingId(null);
      setForm({ role: '', location: '', salary: '', image: '', publicId: '', responsibilities: '', requirements: '', editorialNote: '', reminder: '' });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    setUploading(true);
    try {
      const result = await api.upload.image(file);
      setForm((prev) => ({ ...prev, image: result.url, publicId: result.public_id || '' }));
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this job and its image?')) return;
    await api.jobs.delete(id);
    fetchJobs();
  };

  const handleEdit = (job) => {
    setEditingId(job._id);
    setForm({
      role: job.role || '',
      location: job.location || '',
      salary: job.salary || '',
      image: job.image || '',
      publicId: job.publicId || '',
      responsibilities: job.responsibilities || '',
      requirements: job.requirements || '',
      editorialNote: job.editorialNote || '',
      reminder: job.reminder || ''
    });
    setShowModal(true);
  };

  return (
    <div className="admin-content-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 24 }}>Manage Jobs</h1>
        <button className="btn btn-primary" onClick={() => { setEditingId(null); setForm({ role: '', location: '', salary: '', image: '', publicId: '', responsibilities: '', requirements: '', editorialNote: '', reminder: '' }); setShowModal(true); }}>+ Post Job</button>
      </div>

      <div className="jobs-table-wrap">
      <table className="admin jobs-admin-table">
        <thead>
          <tr>
            <th>Role</th>
            <th>Location</th>
            <th>Salary</th>
            <th>Date Posted</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job._id}>
              <td><strong>{job.role}</strong></td>
              <td>{job.location}</td>
              <td>{job.salary}</td>
              <td>{new Date(job.createdAt).toLocaleDateString()}</td>
              <td>
                <button className="btn btn-ghost btn-sm" onClick={() => handleEdit(job)}>Edit</button>
                <button className="btn btn-ghost btn-sm" onClick={() => handleDelete(job._id)}><Icon name="x" size={14} /> Delete</button>
              </td>
            </tr>
          ))}
          {jobs.length === 0 && (
            <tr>
              <td colSpan="5" className="empty">No jobs posted yet.</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>

      {showModal && (
        <div className="modal-bg open" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}><Icon name="x" size={20} /></button>
            <h3 style={{ marginBottom: 20 }}>{editingId ? 'Edit Job' : 'Post New Job'}</h3>
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
                <label>Job image (Cloudinary upload)</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                {form.image && <img src={form.image} alt="Job preview" style={{ width: 120, height: 70, objectFit: 'cover', marginTop: 8 }} />}
              </div>
              <RichContentEditor label="Responsibilities" value={form.responsibilities} onChange={(responsibilities) => setForm((prev) => ({ ...prev, responsibilities }))} placeholder="Write the responsibilities..." required />
              <RichContentEditor label="Requirements" value={form.requirements} onChange={(requirements) => setForm((prev) => ({ ...prev, requirements }))} placeholder="Write the requirements..." required />
              <div className="field">
                <label>Editorial Note <span className="admin-field-hint">Internal light-yellow note</span></label>
                <textarea rows={2} value={form.editorialNote} onChange={e => setForm({ ...form, editorialNote: e.target.value })} placeholder="Add an internal note..." />
              </div>
              <div className="field">
                <label>Reminder <span className="admin-field-hint">Internal light-red reminder</span></label>
                <textarea rows={2} value={form.reminder} onChange={e => setForm({ ...form, reminder: e.target.value })} placeholder="Add a follow-up reminder..." />
              </div>
              <div className="cta-row" style={{ marginTop: 24 }}>
                <button type="submit" className="btn btn-primary" disabled={loading || uploading}>{loading ? 'Saving...' : editingId ? 'Save Changes' : 'Post Job'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
