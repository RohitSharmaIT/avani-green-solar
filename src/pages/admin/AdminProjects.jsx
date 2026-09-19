import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import '../../stylesheets/frontend/pages/admin-content.css';
import { api } from '../../services/api';
import Icon from '../../components/common/Icon';
import RichContentEditor from '../../components/admin/RichContentEditor';

export default function AdminProjects() {
  const { projects, addProject, deleteProject } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    type: 'Residential',
    solarType: 'On-grid',
    capacity: 5,
    location: 'Bhopal, MP',
    year: new Date().getFullYear(),
    desc: '',
    editorialNote: '',
    reminder: '',
    featured: true,
    image: '',
    publicId: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    setUploading(true);
    setUploadError('');
    try {
      const res = await api.upload.image(file);
      if (res && res.url) {
        setFormData((prev) => ({
          ...prev,
          image: res.url,
          publicId: res.public_id || ''
        }));
      }
    } catch (err) {
      setUploadError(err.message || 'Image upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: '', publicId: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter project name.';
    if (!formData.location.trim()) errs.location = 'Please enter installation location.';
    if (!formData.capacity || Number(formData.capacity) <= 0) errs.capacity = 'Enter valid capacity in kW.';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    addProject(formData);
    setShowModal(false);
    setFormData({
      name: '',
      type: 'Residential',
      solarType: 'On-grid',
      capacity: 5,
      location: 'Bhopal, MP',
      year: new Date().getFullYear(),
      desc: '',
      editorialNote: '',
      reminder: '',
      featured: true,
      image: '',
      publicId: ''
    });
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete project "${name}"? This will remove it from MongoDB.`)) {
      deleteProject(id);
    }
  };

  return (
    <div className="admin-content-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 14 }}>
        <div>
          <h2 style={{ fontSize: '24px', margin: 0 }}>Projects Inventory (MongoDB)</h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: '14px', margin: '4px 0 0' }}>
            Manage installed solar plants across Residential, Commercial, and Industrial categories with Cloudinary images.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
        >
          <span>+</span> Add New Project
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="admin">
          <thead>
            <tr>
              <th>Image</th>
              <th>ID</th>
              <th>Project Name</th>
              <th>Category</th>
              <th>Solar Type</th>
              <th>Capacity</th>
              <th>Location</th>
              <th>Year</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id}>
                <td>
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{ width: 44, height: 32, objectFit: 'cover', borderRadius: 4, border: '1px solid var(--line-light)' }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 44,
                        height: 32,
                        borderRadius: 4,
                        background: 'linear-gradient(135deg, #163A2E 0%, #2F7A4F 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontSize: '10px',
                        fontWeight: 700
                      }}
                    >
                      {p.capacity}k
                    </div>
                  )}
                </td>
                <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{p.id}</td>
                <td style={{ fontWeight: 600 }}>{p.name}</td>
                <td>
                  <span className="tag" style={{ fontSize: '11px' }}>{p.type}</span>
                </td>
                <td><span className="tag" style={{ fontSize: '11px', background: 'var(--sage-light)' }}>{p.solarType}</span></td>
                <td style={{ fontWeight: 600 }}>{p.capacity} kW</td>
                <td>{p.location}</td>
                <td>{p.year}</td>
                <td>
                  <span className={`badge-status ${p.featured ? 'st-WON' : 'st-APPLIED'}`}>
                    {p.featured ? 'Featured' : 'Standard'}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(p.id, p.name)}
                    className="btn btn-ghost btn-sm"
                    style={{ color: '#992B1E', borderColor: 'transparent', padding: '4px 8px' }}
                    title="Delete Project from MongoDB"
                  >
                    <Icon name="x" size={14} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Project Modal with Cloudinary Upload */}
      {showModal && (
        <div className="modal-bg open" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 640 }}>
            <button
              className="modal-close"
              onClick={() => setShowModal(false)}
              aria-label="Close modal"
            >
              <Icon name="x" size={20} />
            </button>
            <h3 style={{ fontSize: '22px', marginBottom: 6 }}>Add New Solar Project</h3>
            <p style={{ color: 'var(--ink-soft)', fontSize: '13.5px', marginBottom: 20 }}>
              This project will be saved to MongoDB and instantly featured on the live site.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              {/* Cloudinary Image Upload Section */}
              <div className="field" style={{ marginBottom: 18 }}>
                <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Project Photo (Cloudinary)</span>
                  {uploading && <span style={{ color: 'var(--leaf-dark)', fontSize: '12px' }}>Uploading to Cloudinary...</span>}
                </label>

                {formData.image ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 10, background: 'var(--sage)', borderRadius: 6 }}>
                    <img
                      src={formData.image}
                      alt="Project Preview"
                      style={{ width: 90, height: 60, objectFit: 'cover', borderRadius: 4, border: '1px solid var(--line)' }}
                    />
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--forest)', wordBreak: 'break-all' }}>
                        Image Ready
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--ink-soft)', marginTop: 2 }}>
                        Stored on Cloudinary CDN
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="btn btn-ghost btn-sm"
                      style={{ color: '#992B1E' }}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      style={{
                        padding: '12px',
                        border: '2px dashed var(--line)',
                        borderRadius: 6,
                        background: '#fafafa',
                        cursor: 'pointer',
                        width: '100%'
                      }}
                    />
                    <div style={{ fontSize: '11.5px', color: 'var(--ink-soft)', marginTop: 4 }}>
                      Select high-resolution installation photo (JPG, PNG, WebP up to 10MB)
                    </div>
                  </div>
                )}
                {uploadError && <div className="err">{uploadError}</div>}
              </div>

              <div className={`field ${errors.name ? 'invalid' : ''}`}>
                <label className="req">Project Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Green Valley Farmhouse Solar Plant"
                  required
                />
                {errors.name && <div className="err">{errors.name}</div>}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div className="field">
                  <label className="req">Target Category</label>
                  <select name="type" value={formData.type} onChange={handleChange}>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Industrial">Industrial</option>
                  </select>
                </div>

                <div className="field">
                  <label className="req">Solar System Type</label>
                  <select name="solarType" value={formData.solarType} onChange={handleChange}>
                    <option value="On-grid">On-grid</option>
                    <option value="Off-grid">Off-grid</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div className={`field ${errors.capacity ? 'invalid' : ''}`}>
                  <label className="req">Plant Capacity (kW)</label>
                  <input
                    name="capacity"
                    type="number"
                    step="0.5"
                    min="1"
                    value={formData.capacity}
                    onChange={handleChange}
                    required
                  />
                  {errors.capacity && <div className="err">{errors.capacity}</div>}
                </div>

                <div className="field">
                  <label>Commissioning Year</label>
                  <input
                    name="year"
                    type="number"
                    value={formData.year}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={`field ${errors.location ? 'invalid' : ''}`}>
                <label className="req">Location / City</label>
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Bhopal, MP"
                  required
                />
                {errors.location && <div className="err">{errors.location}</div>}
              </div>

              <RichContentEditor
                label="Project Description / Technical Details"
                value={formData.desc}
                onChange={(desc) => setFormData((prev) => ({ ...prev, desc }))}
                placeholder="Describe panel modules, inverters, structural height, and key benefits..."
              />
              <div className="field">
                <label>Editorial Note <span className="admin-field-hint">Internal light-yellow note</span></label>
                <textarea name="editorialNote" rows={2} value={formData.editorialNote} onChange={handleChange} placeholder="Add an internal project note..." />
              </div>
              <div className="field">
                <label>Reminder <span className="admin-field-hint">Internal light-red reminder</span></label>
                <textarea name="reminder" rows={2} value={formData.reminder} onChange={handleChange} placeholder="Add a project follow-up reminder..." />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontWeight: 500 }}>
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    style={{ width: 'auto', display: 'inline' }}
                  />
                  Feature this project on the Home page
                </label>
              </div>

              <div className="cta-row">
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={uploading}
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  {uploading ? 'Uploading Photo...' : 'Publish to MongoDB'}
                </button>
                <button className="btn btn-ghost" type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
