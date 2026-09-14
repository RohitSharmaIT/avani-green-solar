import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import SuccessModal from '../components/common/SuccessModal';

export default function ContractorApplyPage() {
  const { settings, addContractorApp } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    city: '',
    district: '',
    state: settings.defaultState,
    experience: '',
    teamSize: '',
    solarExp: '',
    area: '',
    maxCapacity: '',
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
    if (!formData.name.trim()) errs.name = 'Please enter contractor name.';
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone.trim())) {
      errs.phone = 'Enter a valid 10-digit phone number.';
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    addContractorApp(formData);
    setFormData({
      name: '',
      company: '',
      phone: '',
      email: '',
      city: '',
      district: '',
      state: settings.defaultState,
      experience: '',
      teamSize: '',
      solarExp: '',
      area: '',
      maxCapacity: '',
      message: ''
    });
    setShowSuccess(true);
  };

  return (
    <section className="section">
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Registration Received!"
        message="Your contractor registration has been submitted to Avani Green Solar successfully."
        subMessage="🔧 Our operations team will review your profile and reach out within 3–5 business days."
      />

      <div className="wrap" style={{ maxWidth: 680 }}>
        <Link
          to="/contractor"
          style={{ fontSize: '13.5px', color: 'var(--leaf-dark)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6 }}
        >
          ← Back to contractor network
        </Link>

        <div className="section-head" style={{ marginTop: 16 }}>
          <h2>Contractor Application</h2>
          <p>Register your electrical or structural installation agency with {settings.company}.</p>
        </div>

        <form onSubmit={handleSubmit} className="card-simple" noValidate>
          <div className={`field ${errors.name ? 'invalid' : ''}`}>
            <label className="req">Lead Contractor Name</label>
            <input name="name" value={formData.name} onChange={handleChange} required />
            {errors.name && <div className="err">{errors.name}</div>}
          </div>

          <div className="field">
            <label>Firm / Contractor Agency Name</label>
            <input name="company" value={formData.company} onChange={handleChange} />
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
            <div className="field">
              <label>Base City</label>
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="field">
              <label>Years of Contracting Experience</label>
              <input name="experience" type="number" min="0" value={formData.experience} onChange={handleChange} />
            </div>
            <div className="field">
              <label>Field Team Size (Technicians/Helpers)</label>
              <input name="teamSize" type="number" min="1" value={formData.teamSize} onChange={handleChange} />
            </div>
          </div>

          <div className="field">
            <label>Solar Experience Summary</label>
            <input
              name="solarExp"
              placeholder="e.g. 2 years installing residential rooftops (3 kW to 20 kW)"
              value={formData.solarExp}
              onChange={handleChange}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="field">
              <label>Preferred Working Districts / Radius</label>
              <input name="area" placeholder="e.g. Bhopal & 50km radius" value={formData.area} onChange={handleChange} />
            </div>
            <div className="field">
              <label>Maximum Project Capacity Handled (kW)</label>
              <input name="maxCapacity" type="number" min="1" placeholder="e.g. 50" value={formData.maxCapacity} onChange={handleChange} />
            </div>
          </div>

          <div className="field">
            <label>Tools, Equipment & Certifications</label>
            <textarea
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="List available tools (torque wrenches, crimping tools, megger meter) or electrical contractor licenses..."
            />
          </div>

          <button className="btn btn-primary" type="submit" style={{ marginTop: 8, width: '100%', justifyContent: 'center' }}>
            Submit Contractor Registration
          </button>
        </form>
      </div>
    </section>
  );
}
