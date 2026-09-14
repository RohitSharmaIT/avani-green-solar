import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import SuccessModal from '../components/common/SuccessModal';

export default function DealerApplyPage() {
  const { settings, addDealerApp } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    district: '',
    state: settings.defaultState,
    businessType: '',
    years: '',
    solarExp: '',
    area: '',
    office: false,
    warehouse: false,
    salesTeam: false,
    installTeam: false,
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter contact name.';
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone.trim())) {
      errs.phone = 'Enter a valid 10-digit phone number.';
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    addDealerApp(formData);
    setFormData({
      name: '',
      businessName: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      district: '',
      state: settings.defaultState,
      businessType: '',
      years: '',
      solarExp: '',
      area: '',
      office: false,
      warehouse: false,
      salesTeam: false,
      installTeam: false,
      message: ''
    });
    setShowSuccess(true);
  };

  return (
    <section className="section">
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Application Received!"
        message="Your dealer application has been submitted successfully to Avani Green Solar."
        subMessage="🤝 Our partnership team will review your application and contact you within 3–5 business days."
      />

      <div className="wrap" style={{ maxWidth: 680 }}>
        <Link
          to="/dealer"
          style={{ fontSize: '13.5px', color: 'var(--leaf-dark)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6 }}
        >
          ← Back to dealer overview
        </Link>

        <div className="section-head" style={{ marginTop: 16 }}>
          <h2>Dealer Application</h2>
          <p>Submit your enterprise profile to register as an authorized regional sales partner.</p>
        </div>

        <form onSubmit={handleSubmit} className="card-simple" noValidate>
          <h4 style={{ marginBottom: 16, borderBottom: '1px solid var(--line-light)', paddingBottom: 8 }}>
            1. Basic Contact Details
          </h4>

          <div className={`field ${errors.name ? 'invalid' : ''}`}>
            <label className="req">Primary Contact Name</label>
            <input name="name" value={formData.name} onChange={handleChange} required />
            {errors.name && <div className="err">{errors.name}</div>}
          </div>

          <div className="field">
            <label>Registered Business / Firm Name</label>
            <input name="businessName" value={formData.businessName} onChange={handleChange} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className={`field ${errors.phone ? 'invalid' : ''}`}>
              <label className="req">Phone Number</label>
              <input
                name="phone"
                type="tel"
                maxLength={10}
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {errors.phone && <div className="err">{errors.phone}</div>}
            </div>
            <div className="field">
              <label>Email Address</label>
              <input name="email" type="email" value={formData.email} onChange={handleChange} />
            </div>
          </div>

          <div className="field">
            <label>Business Address</label>
            <input name="address" value={formData.address} onChange={handleChange} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
            <div className="field">
              <label>City</label>
              <input name="city" value={formData.city} onChange={handleChange} />
            </div>
            <div className="field">
              <label>District</label>
              <input name="district" value={formData.district} onChange={handleChange} />
            </div>
            <div className="field">
              <label>State</label>
              <input name="state" value={formData.state} onChange={handleChange} />
            </div>
          </div>

          <h4 style={{ margin: '24px 0 16px', borderBottom: '1px solid var(--line-light)', paddingBottom: 8 }}>
            2. Business Profile
          </h4>

          <div className="field">
            <label>Current Business Line / Domain</label>
            <input
              name="businessType"
              placeholder="e.g. Electrical contracting, Hardware, Battery retail"
              value={formData.businessType}
              onChange={handleChange}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="field">
              <label>Years in Operation</label>
              <input name="years" type="number" min="0" value={formData.years} onChange={handleChange} />
            </div>
            <div className="field">
              <label>Prior Solar Experience (if any)</label>
              <input name="solarExp" value={formData.solarExp} onChange={handleChange} />
            </div>
          </div>

          <div className="field">
            <label>Preferred Territory / Operating Tehsil</label>
            <input name="area" value={formData.area} onChange={handleChange} />
          </div>

          <h4 style={{ margin: '24px 0 16px', borderBottom: '1px solid var(--line-light)', paddingBottom: 8 }}>
            3. Available Infrastructure
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: '14px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontWeight: 500 }}>
              <input
                type="checkbox"
                name="office"
                checked={formData.office}
                onChange={handleChange}
                style={{ width: 'auto', display: 'inline' }}
              />
              Commercial Office Space
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontWeight: 500 }}>
              <input
                type="checkbox"
                name="warehouse"
                checked={formData.warehouse}
                onChange={handleChange}
                style={{ width: 'auto', display: 'inline' }}
              />
              Storage / Warehouse Facility
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontWeight: 500 }}>
              <input
                type="checkbox"
                name="salesTeam"
                checked={formData.salesTeam}
                onChange={handleChange}
                style={{ width: 'auto', display: 'inline' }}
              />
              Dedicated Field Sales Team
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontWeight: 500 }}>
              <input
                type="checkbox"
                name="installTeam"
                checked={formData.installTeam}
                onChange={handleChange}
                style={{ width: 'auto', display: 'inline' }}
              />
              Technical Installation Crew
            </label>
          </div>

          <div className="field" style={{ marginTop: 20 }}>
            <label>Additional Notes / Queries</label>
            <textarea
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us more about your existing customer reach..."
            />
          </div>

          <button className="btn btn-primary" type="submit" style={{ marginTop: 12, width: '100%', justifyContent: 'center' }}>
            Submit Dealer Application
          </button>
        </form>
      </div>
    </section>
  );
}
