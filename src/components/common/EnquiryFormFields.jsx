import React from 'react';
import { useApp } from '../../context/AppContext';
import Icon from './Icon';

export default function EnquiryFormFields({ formData, onChange, errors = {} }) {
  const { settings } = useApp();

  return (
    <>
      <div className={`field ${errors.name ? 'invalid' : ''}`}>
        <label className="req">Full name</label>
        <input
          name="name"
          value={formData.name || ''}
          onChange={onChange}
          placeholder="e.g. Rahul Sharma"
          required
        />
        {errors.name && <div className="err">{errors.name}</div>}
      </div>

      <div className={`field ${errors.phone ? 'invalid' : ''}`}>
        <label className="req">Phone number</label>
        <input
          name="phone"
          type="tel"
          value={formData.phone || ''}
          onChange={onChange}
          placeholder="10-digit mobile number"
          maxLength={10}
          required
        />
        {errors.phone && <div className="err">{errors.phone}</div>}
      </div>

      <div className="field">
        <label>Email address</label>
        <input
          name="email"
          type="email"
          value={formData.email || ''}
          onChange={onChange}
          placeholder="e.g. rahul@example.com"
        />
      </div>

      <div className={`field ${errors.address ? 'invalid' : ''}`}>
        <label className="req">Address</label>
        <input
          name="address"
          value={formData.address || ''}
          onChange={onChange}
          placeholder="Street, area, locality"
          required
        />
        {errors.address && <div className="err">{errors.address}</div>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div className="field">
          <label>City</label>
          <input
            name="city"
            value={formData.city || ''}
            onChange={onChange}
            placeholder="e.g. Bhopal"
          />
        </div>
        <div className="field">
          <label>State</label>
          <input
            name="state"
            value={formData.state || settings.defaultState}
            onChange={onChange}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div className={`field ${errors.customerType ? 'invalid' : ''}`}>
          <label className="req">Customer type</label>
          <select
            name="customerType"
            value={formData.customerType || ''}
            onChange={onChange}
            required
          >
            <option value="">Select customer type...</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Industrial">Industrial</option>
          </select>
          {errors.customerType && <div className="err">{errors.customerType}</div>}
        </div>

        <div className="field">
          <label>Solar type</label>
          <select
            name="solarType"
            value={formData.solarType || 'Not sure'}
            onChange={onChange}
          >
            <option value="Not sure">Not sure (Recommend for me)</option>
            <option value="On-grid">On-grid</option>
            <option value="Off-grid">Off-grid</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div className="field">
          <label>Required capacity (kW)</label>
          <input
            name="capacity"
            type="number"
            min="0"
            step="0.5"
            value={formData.capacity || ''}
            onChange={onChange}
            placeholder="e.g. 5"
          />
        </div>
        <div className="field">
          <label>Monthly electricity bill (₹)</label>
          <input
            name="bill"
            type="number"
            min="0"
            value={formData.bill || ''}
            onChange={onChange}
            placeholder="e.g. 4500"
          />
        </div>
      </div>

      <div className="field">
        <label>Message / Specific requirements</label>
        <textarea
          name="message"
          rows={2}
          value={formData.message || ''}
          onChange={onChange}
          placeholder="Tell us about your roof space, timing or queries..."
        />
      </div>

      <div className="field">
        <label>
          Installation location photos <span style={{ fontWeight: 400, color: 'var(--ink-soft)' }}>(optional)</span>
        </label>
        <div
          style={{
            border: '1px dashed var(--line)',
            padding: 16,
            textAlign: 'center',
            color: 'var(--ink-soft)',
            fontSize: '13px',
            borderRadius: 'var(--radius)',
            background: 'var(--sage-light)'
          }}
        >
          <Icon name="upload" size={24} className="" />
          <div style={{ marginTop: 6, fontWeight: 500 }}>
            JPG, PNG or WEBP — click to attach (demo file picker)
          </div>
          <input type="file" accept=".jpg,.jpeg,.png,.webp" multiple style={{ marginTop: 8 }} />
        </div>
      </div>

      <p className="hint">
        By submitting, you agree to be contacted by {settings.company} regarding your enquiry.
      </p>
    </>
  );
}
