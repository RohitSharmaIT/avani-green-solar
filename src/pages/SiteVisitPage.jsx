import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import SuccessModal from '../components/common/SuccessModal';

export default function SiteVisitPage() {
  const { addSiteVisit } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    preferredDate: '',
    preferredTime: '',
    capacity: '',
    customerType: 'Residential',
    solarType: 'Not sure',
    roofType: '',
    notes: ''
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
    if (!formData.address.trim()) errs.address = 'Please enter your property address.';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    addSiteVisit(formData);
    setFormData({
      name: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      pincode: '',
      preferredDate: '',
      preferredTime: '',
      capacity: '',
      customerType: 'Residential',
      solarType: 'Not sure',
      roofType: '',
      notes: ''
    });
    setShowSuccess(true);
  };

  return (
    <section className="section">
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Site Visit Booked!"
        message="Your site visit request has been received. Our engineering team will confirm the appointment shortly."
        subMessage="📅 We will call you to confirm the exact date and time of the site visit."
      />

      <div className="wrap" style={{ maxWidth: 720 }}>
        <div className="section-head">
          <div className="eyebrow">Book site visit</div>
          <h2>Get your site assessed by our engineers</h2>
          <p>
            Schedule a professional on-site physical survey to inspect roof structure, shadow profile, electrical distribution box, and inverter cable routing.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card-simple" noValidate>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className={`field ${errors.name ? 'invalid' : ''}`}>
              <label className="req">Full Name</label>
              <input name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. Narendra Verma" />
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
          </div>

          <div className="field">
            <label>Email Address</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="name@example.com" />
          </div>

          <div className={`field ${errors.address ? 'invalid' : ''}`}>
            <label className="req">Complete Site Address</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="House/Plot No, Colony/Road, Landmark"
              required
            />
            {errors.address && <div className="err">{errors.address}</div>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="field">
              <label>City</label>
              <input name="city" value={formData.city} onChange={handleChange} placeholder="e.g. Bhopal" />
            </div>
            <div className="field">
              <label>Pincode</label>
              <input name="pincode" value={formData.pincode} onChange={handleChange} placeholder="e.g. 462001" maxLength={6} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="field">
              <label>Preferred Visit Date</label>
              <input name="preferredDate" type="date" value={formData.preferredDate} onChange={handleChange} />
            </div>
            <div className="field">
              <label>Preferred Time Slot</label>
              <input name="preferredTime" type="time" value={formData.preferredTime} onChange={handleChange} />
            </div>
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="field">
              <label>Preferred Solar Type</label>
              <select name="solarType" value={formData.solarType} onChange={handleChange}>
                <option value="Not sure">Not sure (Advise during visit)</option>
                <option value="On-grid">On-grid</option>
                <option value="Off-grid">Off-grid</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div className="field">
              <label>Roof Construction Type</label>
              <input name="roofType" placeholder="e.g. Flat concrete RCC, Tin shed, Tiled" value={formData.roofType} onChange={handleChange} />
            </div>
          </div>

          <div className="field">
            <label>Additional Notes / Access Instructions</label>
            <textarea
              name="notes"
              rows={3}
              value={formData.notes}
              onChange={handleChange}
              placeholder="Mention roof floor level (e.g. 2nd floor terrace) or available staircase access..."
            />
          </div>

          <button className="btn btn-primary" type="submit" style={{ width: '100%', justifyContent: 'center', marginTop: 10 }}>
            Request Site Visit
          </button>
        </form>
      </div>
    </section>
  );
}
