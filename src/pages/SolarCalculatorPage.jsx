import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Disclaimer from '../components/common/Disclaimer';
import EnquiryFormFields from '../components/common/EnquiryFormFields';

const formatMoney = (n) => '₹' + Math.round(n).toLocaleString('en-IN');

export default function SolarCalculatorPage() {
  const { settings, addLead } = useApp();

  const [inputs, setInputs] = useState({
    bill: 4000,
    units: '',
    state: settings.defaultState,
    customerType: 'Residential',
    roofArea: '',
    desired: ''
  });

  const [results, setResults] = useState(null);

  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: settings.defaultState,
    customerType: 'Residential',
    solarType: 'On-grid',
    capacity: '',
    bill: '4000',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const calculateSolar = (e) => {
    e?.preventDefault();
    const billNum = Number(inputs.bill || 0);
    const unitsInput = Number(inputs.units || 0);
    const desiredNum = Number(inputs.desired || 0);
    const tariff = Number(settings.tariffPerUnit || 7.5);
    const unitsPerKw = Number(settings.unitsPerKwPerMonth || 120);

    const units = unitsInput || (billNum > 0 ? Math.round(billNum / tariff) : 0);
    let recSize = desiredNum || (units > 0 ? Math.max(1, Math.round((units / unitsPerKw) * 10) / 10) : 3);
    const monthlyGen = recSize * unitsPerKw;
    const monthlySavings = Math.min(billNum, monthlyGen * tariff);
    const annualSavings = monthlySavings * 12;
    const systemCost = recSize * Number(settings.costPerKw || 55000);
    const payback = annualSavings > 0 ? (systemCost / annualSavings).toFixed(1) : 'N/A';

    const calculatedData = {
      bill: billNum,
      units,
      recSize,
      monthlyGen,
      monthlySavings,
      annualSavings,
      systemCost,
      payback
    };

    setResults(calculatedData);
    setLeadForm((prev) => ({
      ...prev,
      capacity: String(recSize),
      bill: String(billNum),
      customerType: inputs.customerType
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

    addLead({ ...leadForm, calculatorData: results }, 'Solar Calculator');
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
          <div className="eyebrow">Solar calculator</div>
          <h2>Estimate your solar savings</h2>
          <p>
            Enter your current monthly electricity bill or units below to receive an indicative sizing and financial feasibility calculation.
          </p>
        </div>

        <div className="card-simple">
          <form onSubmit={calculateSolar}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
              <div className="field">
                <label className="req">Monthly electricity bill (₹)</label>
                <input
                  name="bill"
                  type="number"
                  min="0"
                  value={inputs.bill}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="field">
                <label>Monthly units (optional)</label>
                <input
                  name="units"
                  type="number"
                  min="0"
                  placeholder="e.g. 500"
                  value={inputs.units}
                  onChange={handleInputChange}
                />
              </div>

              <div className="field">
                <label>State</label>
                <input
                  name="state"
                  value={inputs.state}
                  onChange={handleInputChange}
                />
              </div>

              <div className="field">
                <label>Customer type</label>
                <select
                  name="customerType"
                  value={inputs.customerType}
                  onChange={handleInputChange}
                >
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Industrial">Industrial</option>
                </select>
              </div>

              <div className="field">
                <label>Available roof area (sq. ft, optional)</label>
                <input
                  name="roofArea"
                  type="number"
                  min="0"
                  placeholder="e.g. 600"
                  value={inputs.roofArea}
                  onChange={handleInputChange}
                />
              </div>

              <div className="field">
                <label>Desired capacity (kW, optional)</label>
                <input
                  name="desired"
                  type="number"
                  min="0"
                  step="0.5"
                  placeholder="e.g. 5"
                  value={inputs.desired}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <button className="btn btn-primary" type="submit" style={{ marginTop: 6 }}>
              Calculate Solar Savings
            </button>
          </form>

          {results && (
            <div id="sc-result" style={{ marginTop: 32, animation: 'fadeIn 0.3s ease' }}>
              {/* Investment Payback & Free Solar Breakdown Section */}
              <div
                style={{
                  background: 'linear-gradient(135deg, var(--sage) 0%, #E2EFE5 100%)',
                  border: '1px solid var(--leaf)',
                  borderRadius: 6,
                  padding: '22px 24px',
                  marginBottom: 24
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <span className="tag" style={{ background: 'var(--leaf)', color: '#fff', borderColor: 'transparent', fontWeight: 700 }}>
                    100% Free Solar Payback Timeline
                  </span>
                </div>
                <h3 style={{ fontSize: '20px', color: 'var(--forest)', marginBottom: 8 }}>
                  Your solar system pays for itself in {results.payback} years!
                </h3>
                <p style={{ color: 'var(--ink)', fontSize: '14.5px', lineHeight: 1.65, margin: 0 }}>
                  If you install this required <strong>{results.recSize} kW</strong> solar plant, your estimated investment of <strong>{formatMoney(results.systemCost)}</strong> will be <strong>100% recovered in {results.payback} years</strong> through monthly bill savings of <strong>{formatMoney(results.monthlySavings)}</strong> ({formatMoney(results.annualSavings)}/year).
                </p>
                <p style={{ color: 'var(--leaf-dark)', fontSize: '14.5px', lineHeight: 1.65, marginTop: 8, fontWeight: 600 }}>
                  After {results.payback} years, your solar plant is completely paid off, giving you over {Math.max(0, 25 - Number(results.payback)).toFixed(0)}+ years of 100% FREE electricity with 25-year manufacturer panel warranties!
                </p>
              </div>

              <h4 style={{ marginBottom: 14, fontSize: '17px' }}>Your Estimated Solar &amp; Payback Metrics</h4>
              <div className="cell-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: 20 }}>
                <div className="cell">
                  <div style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>Recommended system size</div>
                  <div className="kpi">{results.recSize} kW</div>
                </div>
                <div className="cell">
                  <div style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>Est. monthly savings</div>
                  <div className="kpi">{formatMoney(results.monthlySavings)}</div>
                </div>
                <div className="cell">
                  <div style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>Est. annual savings</div>
                  <div className="kpi">{formatMoney(results.annualSavings)}</div>
                </div>
                <div className="cell">
                  <div style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>Est. capital investment</div>
                  <div className="kpi">{formatMoney(results.systemCost)}</div>
                </div>
                <div className="cell" style={{ background: 'var(--sage)' }}>
                  <div style={{ fontSize: '12px', color: 'var(--leaf-dark)', fontWeight: 700 }}>Years to free solar (Payback)</div>
                  <div className="kpi" style={{ color: 'var(--leaf-dark)' }}>{results.payback} yrs</div>
                  <div style={{ fontSize: '11px', color: 'var(--ink-soft)', marginTop: 2 }}>Investment 100% recovered</div>
                </div>
                <div className="cell">
                  <div style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>Free electricity window</div>
                  <div className="kpi" style={{ color: 'var(--amber)' }}>
                    {Math.max(0, (25 - Number(results.payback))).toFixed(0)}+ yrs
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--ink-soft)', marginTop: 2 }}>100% free power after payback</div>
                </div>
              </div>

              <Disclaimer>
                Estimates are indicative only. Sizing and payback timelines assume standard net-metering and continuous power generation over the plant's 25-year operational lifetime.
              </Disclaimer>

              <form onSubmit={handleLeadSubmit} style={{ marginTop: 28, borderTop: '1px solid var(--line)', paddingTop: 24 }}>
                <h4 style={{ marginBottom: 6 }}>Send this calculation to Avani Green Solar</h4>
                <p style={{ color: 'var(--ink-soft)', fontSize: '13.5px', marginBottom: 18 }}>
                  Our solar specialists will prepare a customized quotation based on your {results.recSize} kW system estimate.
                </p>

                <EnquiryFormFields formData={leadForm} onChange={handleLeadFormChange} errors={errors} />

                <div className="cta-row" style={{ marginTop: 12 }}>
                  <button className="btn btn-primary" type="submit">
                    Submit Result
                  </button>
                  <Link to="/talk-to-solar-expert" className="btn btn-ghost">
                    Talk to Expert
                  </Link>
                  <Link to="/book-site-visit" className="btn btn-ghost">
                    Book Site Visit
                  </Link>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
