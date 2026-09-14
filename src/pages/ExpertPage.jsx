import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import SuccessModal from '../components/common/SuccessModal';

export default function ExpertPage() {
  const { addLead } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    capacity: '',
    customerType: 'Residential',
    callbackTime: '',
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

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    addLead(formData, 'Talk to Solar Expert');
    setFormData({
      name: '',
      phone: '',
      email: '',
      city: '',
      capacity: '',
      customerType: 'Residential',
      callbackTime: '',
      message: ''
    });
    setShowSuccess(true);
  };

  return (
    <section className="section">
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Request Submitted!"
        message="Thank you! A solar expert from Avani Green Solar will call you back at your preferred time."
        subMessage="📞 We typically respond within 2–4 business hours. Keep your phone handy!"
      />

      <div className="wrap" style={{ maxWidth: 640 }}>
        <div className="section-head">
          <div className="eyebrow">Talk to solar expert</div>
          <h2>Not sure which system you need?</h2>
          <p>
            Leave your contact details and an experienced solar engineer from Avani Green Solar will call you back to evaluate your property's electrical requirements.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card-simple" noValidate>
          <div className={`field ${errors.name ? 'invalid' : ''}`}>
            <label className="req">Full Name</label>
            <input name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. Deepak Joshi" />
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
            <label>City / Location</label>
            <input name="city" value={formData.city} onChange={handleChange} placeholder="e.g. Indore, MP" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="field">
              <label>Estimated Capacity (kW)</label>
              <input name="capacity" type="number" min="1" step="0.5" value={formData.capacity} onChange={handleChange} placeholder="e.g. 5" />
            </div>
            <div className="field">
              <label>Customer Category</label>
              <select name="customerType" value={formData.customerType} onChange={handleChange}>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Industrial">Industrial</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label>Preferred Callback Time</label>
            <input name="callbackTime" placeholder="e.g. Weekday evenings between 5 PM – 7 PM" value={formData.callbackTime} onChange={handleChange} />
          </div>

          <div className="field">
            <label>Specific Questions or Bill Info</label>
            <textarea
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="Mention your average monthly electricity bill or roof constraints..."
            />
          </div>

          <button className="btn btn-primary" type="submit" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
            Request Callback
          </button>
        </form>
      </div>
    </section>
  );
}
