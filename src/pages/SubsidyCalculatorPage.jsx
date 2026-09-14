import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Disclaimer from '../components/common/Disclaimer';
import EnquiryFormFields from '../components/common/EnquiryFormFields';

const formatMoney = (n) => '₹' + Math.round(n).toLocaleString('en-IN');

export default function SubsidyCalculatorPage() {
  const { settings, addLead } = useApp();

  const [inputs, setInputs] = useState({
    state: settings.defaultState,
    type: 'Residential',
    capacity: 3,
    bill: ''
  });

  const [subsidyResult, setSubsidyResult] = useState(null);

  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: settings.defaultState,
    customerType: 'Residential',
    solarType: 'On-grid',
    capacity: '3',
    bill: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const calculateSubsidy = (e) => {
    e?.preventDefault();
    const type = inputs.type;
    const cap = Number(inputs.capacity || 0);
    const systemCost = cap * Number(settings.costPerKw || 55000);

    let subsidy = 0;
    let schemeUsed = 'None configured for this category yet';

    if (type === 'Residential') {
      schemeUsed = 'PM Surya Ghar (Muft Bijli Yojana)';
      if (cap <= 2) {
        subsidy = cap * 15000;
      } else if (cap <= 3) {
        subsidy = 30000 + (cap - 2) * 18000;
      } else {
        subsidy = 78000; // standard cap for >= 3 kW
      }
    }

    const contribution = Math.max(0, systemCost - subsidy);

    const calculated = {
      type,
      cap,
      systemCost,
      subsidy,
      contribution,
      schemeUsed
    };

    setSubsidyResult(calculated);
    setLeadForm((prev) => ({
      ...prev,
      capacity: String(cap),
      customerType: type
    }));
  };

  const handleLeadFormChange = (e) => {
    const { name, value } = e.target;
    setLeadForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!leadForm.name.trim()) errs.name = 'Please enter your name.';
    if (!leadForm.phone.trim() || !/^\d{10}$/.test(leadForm.phone.trim())) {
      errs.phone = 'Enter a valid 10-digit phone number.';
    }
    if (!leadForm.address.trim()) errs.address = 'Please enter your address.';
    if (!leadForm.customerType) errs.customerType = 'Please select customer type.';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    addLead({ ...leadForm, subsidyData: subsidyResult }, 'Subsidy Calculator');
    setLeadForm({
      name: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      state: settings.defaultState,
      customerType: 'Residential',
      solarType: 'On-grid',
      capacity: '',
      bill: '',
      message: ''
    });
  };

  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 840 }}>
        <div className="section-head">
          <div className="eyebrow">Subsidy calculator</div>
          <h2>Estimate your solar subsidy</h2>
          <p>
            Calculate your eligible Central Financial Assistance (CFA) under the Government of India's PM Surya Ghar (Muft Bijli Yojana) residential solar program.
          </p>
        </div>

        <div className="card-simple">
          <form onSubmit={calculateSubsidy}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
              <div className="field">
                <label>State</label>
                <input
                  name="state"
                  value={inputs.state}
                  onChange={handleInputChange}
                />
              </div>

              <div className="field">
                <label className="req">Customer category</label>
                <select
                  name="type"
                  value={inputs.type}
                  onChange={handleInputChange}
                >
                  <option value="Residential">Residential (PM Surya Ghar)</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Industrial">Industrial</option>
                </select>
              </div>

              <div className="field">
                <label className="req">Solar capacity (kW)</label>
                <input
                  name="capacity"
                  type="number"
                  min="1"
                  step="0.5"
                  value={inputs.capacity}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="field">
                <label>Monthly electricity bill (₹, optional)</label>
                <input
                  name="bill"
                  type="number"
                  min="0"
                  placeholder="e.g. 3500"
                  value={inputs.bill}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <button className="btn btn-primary" type="submit" style={{ marginTop: 6 }}>
              Calculate Subsidy
            </button>
          </form>

          {subsidyResult && (
            <div style={{ marginTop: 28, animation: 'fadeIn 0.3s ease' }}>
              <h4 style={{ marginBottom: 16, fontSize: '17px' }}>Estimated Subsidy Breakdown</h4>
              <div className="cell-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginBottom: 20 }}>
                <div className="cell">
                  <div style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>Applicable scheme</div>
                  <div style={{ fontWeight: 600, fontSize: '15px', marginTop: 4 }}>{subsidyResult.schemeUsed}</div>
                </div>
                <div className="cell">
                  <div style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>Eligible capacity</div>
                  <div className="kpi">{subsidyResult.cap} kW</div>
                </div>
                <div className="cell">
                  <div style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>Estimated government subsidy</div>
                  <div className="kpi" style={{ color: 'var(--leaf-dark)' }}>{formatMoney(subsidyResult.subsidy)}</div>
                </div>
                <div className="cell">
                  <div style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>Estimated net customer share</div>
                  <div className="kpi">{formatMoney(subsidyResult.contribution)}</div>
                </div>
              </div>

              <Disclaimer>
                Indicative estimate. Final central government subsidy is subject to official national portal registration, DISCOM feasibility approval, and post-installation joint verification.
              </Disclaimer>

              <form onSubmit={handleLeadSubmit} style={{ marginTop: 28, borderTop: '1px solid var(--line)', paddingTop: 24 }}>
                <h4 style={{ marginBottom: 6 }}>Send this estimate to Avani Green Solar</h4>
                <p style={{ color: 'var(--ink-soft)', fontSize: '13.5px', marginBottom: 18 }}>
                  Our team assists you with end-to-end portal paperwork, DISCOM approvals, and maximum subsidy claim.
                </p>

                <EnquiryFormFields formData={leadForm} onChange={handleLeadFormChange} errors={errors} />

                <button className="btn btn-primary" type="submit" style={{ marginTop: 12 }}>
                  Submit Estimate Request
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
