import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import '../stylesheets/frontend/pages/contact.css';
import Icon from '../components/common/Icon';
import SuccessModal from '../components/common/SuccessModal';

export default function ContactPage() {
  const { settings, addContactMessage } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name.';
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone.trim())) {
      errs.phone = 'Enter a valid 10-digit phone number.';
    }
    if (!formData.message.trim()) errs.message = 'Please enter your message.';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    addContactMessage(formData);
    setFormData({
      name: '',
      phone: '',
      email: '',
      subject: '',
      message: ''
    });
    setShowSuccess(true);
  };

  return (
    <section className="section contact-page">
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Message Sent!"
        message="Thank you for reaching out to Avani Green Solar. We have received your message and will respond promptly."
        subMessage="📧 Expected response time: Within 24 hours on business days."
      />

      <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40 }}>
        <div>
          <div className="section-head">
            <div className="eyebrow">Contact</div>
            <h2>Get in touch with our team</h2>
            <p>
              Have a question about solar plant viability, subsidy documentation or commercial tariffs? We're here to help.
            </p>
          </div>

          <div className="card-simple" style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 700, fontSize: '16px', color: 'var(--forest)', marginBottom: 6 }}>
              {settings.company}
            </div>
            <div style={{ color: 'var(--ink-soft)', fontSize: '14.5px', display: 'flex', gap: 8, alignItems: 'center' }}>
              <Icon name="pin" size={18} /> {settings.address}
            </div>
          </div>

          <div className="card-simple" style={{ marginBottom: 16 }}>
            <div style={{ marginBottom: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Icon name="phone" size={18} />
              <a href={`tel:${settings.phone}`} style={{ fontWeight: 600, color: 'var(--leaf-dark)' }}>
                {settings.phone}
              </a>
            </div>
            <div style={{ marginBottom: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Icon name="phone" size={18} />
              <a href={`tel:${(settings.phone2 || '7879301745').replace(/[^0-9+]/g, '')}`} style={{ fontWeight: 600, color: 'var(--leaf-dark)' }}>
                {settings.phone2 || '+91 78793 01745'}
              </a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Icon name="mail" size={18} />
              <a href={`mailto:${settings.email}`} style={{ color: 'var(--ink-soft)' }}>
                {settings.email}
              </a>
            </div>
            <div className="contact-social-links" aria-label="Social media">
              {[
                ['socialInstagram', 'instagram', 'Instagram'],
                ['socialYoutube', 'youtube', 'YouTube'],
                ['socialLinkedin', 'linkedin', 'LinkedIn']
              ].map(([key, icon, label]) => settings[key] ? (
                <a key={key} href={settings[key]} target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <Icon name={icon} size={20} />
                </a>
              ) : null)}
            </div>
          </div>

          <div className="card-simple" style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: 4 }}>Working Hours</div>
            <div style={{ color: 'var(--ink-soft)', fontSize: '14px', marginBottom: 12 }}>{settings.hours}</div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-sm"
              style={{ width: '100%', justifyContent: 'center', display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <Icon name="pin" size={14} /> Get Directions in Google Maps ↗
            </a>
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="card-simple contact-form-card" noValidate>
            <h3 style={{ fontSize: '20px', marginBottom: 16 }}>Send us a Message</h3>

            <div className={`field ${errors.name ? 'invalid' : ''}`}>
              <label className="req">Full Name</label>
              <input name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Vikramaditya" required />
              {errors.name && <div className="err">{errors.name}</div>}
            </div>

            <div className={`field ${errors.phone ? 'invalid' : ''}`}>
              <label className="req">Phone Number</label>
              <input
                name="phone"
                type="tel"
                maxLength={10}
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit mobile"
                required
              />
              {errors.phone && <div className="err">{errors.phone}</div>}
            </div>

            <div className="field">
              <label>Email Address</label>
              <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="name@example.com" />
            </div>

            <div className="field">
              <label>Subject</label>
              <input name="subject" value={formData.subject} onChange={handleChange} placeholder="e.g. 15 kW Commercial Rooftop Quotation" />
            </div>

            <div className={`field ${errors.message ? 'invalid' : ''}`}>
              <label className="req">Message</label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us what you are looking for..."
                required
              />
              {errors.message && <div className="err">{errors.message}</div>}
            </div>

            <button className="btn btn-primary" type="submit" style={{ width: '100%', justifyContent: 'center' }}>
              Send Message
            </button>
          </form>
        </div>
      </div>

      <div className="wrap" style={{ marginTop: 40 }}>
        <div
          style={{
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid var(--line)',
            boxShadow: 'var(--shadow-md)',
            background: '#fff'
          }}
        >
          <div
            style={{
              padding: '14px 20px',
              background: 'var(--forest)',
              color: '#fff',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 10
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '14px', fontWeight: 600 }}>
              <Icon name="pin" size={18} /> Our Office Location: {settings.address}
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--amber)',
                fontSize: '13px',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4
              }}
            >
              Open in Google Maps ↗
            </a>
          </div>
          <iframe
            title="Avani Green Solar Office Sironj"
            src="https://maps.google.com/maps?q=Basoda%20Naka%20Basoda%20road%20Sironj%20Madhya%20Pradesh%20464228&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="360"
            style={{ border: 0, display: 'block' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
