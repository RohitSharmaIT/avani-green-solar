import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import Icon from '../../components/common/Icon';

export default function AdminBlog() {
  const { blog, addBlogPost, deleteBlogPost } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    cat: 'Solar Basics',
    excerpt: '',
    content: '',
    image: '',
    publicId: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      setUploadError(err.message || 'Cover image upload failed.');
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
    if (!formData.title.trim()) errs.title = 'Please enter an article title.';
    if (!formData.excerpt.trim()) errs.excerpt = 'Please enter a short excerpt summary.';
    if (!formData.content.trim()) errs.content = 'Please enter article body content.';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    addBlogPost(formData);
    setShowModal(false);
    setFormData({
      title: '',
      cat: 'Solar Basics',
      excerpt: '',
      content: '',
      image: '',
      publicId: ''
    });
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete article "${title}"? This will remove it from MongoDB.`)) {
      deleteBlogPost(id);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 14 }}>
        <div>
          <h2 style={{ fontSize: '24px', margin: 0 }}>Blog &amp; Knowledge Content (MongoDB)</h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: '14px', margin: '4px 0 0' }}>
            Publish educational guides and subsidy updates stored in MongoDB with Cloudinary cover images.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
        >
          <span>+</span> Post New Blog Article
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="admin">
          <thead>
            <tr>
              <th>Cover</th>
              <th>ID</th>
              <th>Article Title</th>
              <th>Category</th>
              <th>Date Published</th>
              <th>URL Slug</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blog.map((b) => (
              <tr key={b.id}>
                <td>
                  {b.image ? (
                    <img
                      src={b.image}
                      alt={b.title}
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
                        fontSize: '9px',
                        fontWeight: 700
                      }}
                    >
                      Article
                    </div>
                  )}
                </td>
                <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{b.id}</td>
                <td style={{ fontWeight: 600 }}>{b.title}</td>
                <td><span className="tag" style={{ fontSize: '11.5px' }}>{b.cat}</span></td>
                <td>{new Date(b.date).toLocaleDateString('en-IN')}</td>
                <td style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--ink-soft)' }}>
                  /blog/{b.slug}
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <Link to={`/blog/${b.slug}`} target="_blank" style={{ fontSize: '12.5px', color: 'var(--leaf-dark)', fontWeight: 600 }}>
                      View ↗
                    </Link>
                    <button
                      onClick={() => handleDelete(b.id, b.title)}
                      className="btn btn-ghost btn-sm"
                      style={{ color: '#992B1E', borderColor: 'transparent', padding: '2px 6px', fontSize: '12px' }}
                      title="Delete Article"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Post Blog Modal */}
      {showModal && (
        <div className="modal-bg open" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 660 }}>
            <button
              className="modal-close"
              onClick={() => setShowModal(false)}
              aria-label="Close modal"
            >
              <Icon name="x" size={20} />
            </button>
            <h3 style={{ fontSize: '22px', marginBottom: 6 }}>Write &amp; Publish Blog Article</h3>
            <p style={{ color: 'var(--ink-soft)', fontSize: '13.5px', marginBottom: 20 }}>
              Create an educational article saved to MongoDB with Cloudinary cover art.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              {/* Cloudinary Cover Image */}
              <div className="field" style={{ marginBottom: 18 }}>
                <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Article Cover Photo (Cloudinary)</span>
                  {uploading && <span style={{ color: 'var(--leaf-dark)', fontSize: '12px' }}>Uploading to Cloudinary...</span>}
                </label>

                {formData.image ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 10, background: 'var(--sage)', borderRadius: 6 }}>
                    <img
                      src={formData.image}
                      alt="Cover Preview"
                      style={{ width: 90, height: 60, objectFit: 'cover', borderRadius: 4, border: '1px solid var(--line)' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--forest)' }}>
                        Cover Photo Ready
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
                      Select a featured banner image (JPG, PNG, WebP)
                    </div>
                  </div>
                )}
                {uploadError && <div className="err">{uploadError}</div>}
              </div>

              <div className={`field ${errors.title ? 'invalid' : ''}`}>
                <label className="req">Article Title</label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. How Net Metering Works in MP: Step-by-Step Guide"
                  required
                />
                {errors.title && <div className="err">{errors.title}</div>}
              </div>

              <div className="field">
                <label className="req">Category</label>
                <select name="cat" value={formData.cat} onChange={handleChange}>
                  <option value="Solar Basics">Solar Basics</option>
                  <option value="PM Surya Ghar">PM Surya Ghar</option>
                  <option value="Solar Maintenance">Solar Maintenance</option>
                  <option value="Commercial Solar">Commercial Solar</option>
                  <option value="Policy & Subsidies">Policy &amp; Subsidies</option>
                </select>
              </div>

              <div className={`field ${errors.excerpt ? 'invalid' : ''}`}>
                <label className="req">Short Summary / Excerpt</label>
                <textarea
                  name="excerpt"
                  rows={2}
                  value={formData.excerpt}
                  onChange={handleChange}
                  placeholder="A concise 1-2 sentence overview shown in blog cards..."
                  required
                />
                {errors.excerpt && <div className="err">{errors.excerpt}</div>}
              </div>

              <div className={`field ${errors.content ? 'invalid' : ''}`}>
                <label className="req">Full Article Content</label>
                <textarea
                  name="content"
                  rows={6}
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Write the full body content for this article..."
                  required
                />
                {errors.content && <div className="err">{errors.content}</div>}
              </div>

              <div className="cta-row" style={{ marginTop: 16 }}>
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={uploading}
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  {uploading ? 'Uploading Cover Photo...' : 'Publish to MongoDB'}
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
