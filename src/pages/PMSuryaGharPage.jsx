import React from 'react';
import { Link } from 'react-router-dom';
import Disclaimer from '../components/common/Disclaimer';
import FaqAccordion from '../components/common/FaqAccordion';

export default function PMSuryaGharPage() {
  const steps = [
    'Register on National Portal',
    'Submit Technical Application',
    'DISCOM Site Survey & Approval',
    'Installation & Net-Metering'
  ];

  const faqs = [
    [
      'What is PM Surya Ghar: Muft Bijli Yojana?',
      'It is a flagship central government initiative launched by the Ministry of New and Renewable Energy (MNRE) to provide rooftop solar systems to 1 crore residential households across India, offering direct financial assistance up to ₹78,000.'
    ],
    [
      'Who is eligible to apply for the subsidy?',
      'Any residential electricity consumer with a valid electricity consumer number (CA number) and suitable rooftop space on their residential premises is eligible. Commercial and industrial properties are not eligible for this specific residential subsidy.'
    ],
    [
      'What documents are required for application?',
      'You will need your latest electricity bill, Aadhaar card, photograph of the rooftop, electricity bill consumer number, and a cancelled bank cheque/passbook copy for direct subsidy transfer.'
    ],
    [
      'How does the net-metering process work in Madhya Pradesh?',
      'Once your solar plant is installed, your local DISCOM (MPPKVVCL / MPMKVVCL / MPPoKVVCL) installs a bidirectional smart meter that records both energy consumed from the grid and solar power exported. Your net bill reflects only the difference.'
    ],
    [
      'How long does the entire installation and subsidy process take?',
      'Typically, physical installation takes 3 to 7 days once structural materials arrive. DISCOM net-meter inspection and subsidy disbursement into your linked bank account generally takes 30 to 45 days after commissioning.'
    ]
  ];

  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 880 }}>
        <div className="section-head">
          <div className="eyebrow">Government scheme</div>
          <h2>PM Surya Ghar: Muft Bijli Yojana</h2>
          <p>
            Complete step-by-step guidance on securing rooftop solar subsidies and zero electricity bills for residential homeowners in Madhya Pradesh.
          </p>
        </div>

        <Disclaimer>
          Subsidy details are based on current MNRE central financial assistance guidelines. Final approvals and meter releases are governed by local electricity distribution companies (DISCOMs).
        </Disclaimer>

        <div style={{ margin: '24px 0 32px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--line)', boxShadow: 'var(--shadow-md)' }}>
          <img
            src="/images/pm-surya-ghar-modi-yadav.jpg"
            alt="PM Surya Ghar Muft Bijli Yojana - MP Government Subsidy"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        <div style={{ margin: '36px 0' }}>
          <h3 style={{ fontSize: '20px', marginBottom: 8 }}>Overview of the Scheme</h3>
          <p style={{ color: 'var(--ink-soft)', fontSize: '15px', lineHeight: 1.7 }}>
            Under PM Surya Ghar, eligible households receive up to ₹30,000 per kW for systems up to 2 kW capacity, and ₹18,000 for the 3rd kW, totaling up to ₹78,000 for 3 kW and higher systems. As an authorized solar vendor, Avani Green Solar manages the entire portal application and DISCOM approvals on your behalf.
          </p>

          <h3 style={{ fontSize: '20px', margin: '30px 0 14px' }}>4-Step Implementation Process</h3>
          <div className="cell-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
            {steps.map((step, idx) => (
              <div key={idx} className="cell" style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: '20px', color: 'var(--leaf-dark)', marginBottom: 6 }}>
                  0{idx + 1}
                </div>
                <div style={{ fontSize: '14px', fontWeight: 600 }}>{step}</div>
              </div>
            ))}
          </div>

          <h3 style={{ fontSize: '20px', margin: '30px 0 12px' }}>Required Documents Checklist</h3>
          <ul style={{ color: 'var(--ink-soft)', lineHeight: 1.8, fontSize: '14.5px', paddingLeft: 20 }}>
            <li>Latest electricity bill copy (showing consumer number & sanctioned load)</li>
            <li>Aadhaar card copy of electricity connection owner</li>
            <li>Clear photo of the terrace / rooftop installation area</li>
            <li>Bank account passbook or cancelled cheque (for direct DBT subsidy transfer)</li>
          </ul>
        </div>

        <h3 style={{ fontSize: '22px', marginBottom: 16 }}>Frequently Asked Questions</h3>
        <FaqAccordion items={faqs} />

        <div className="cta-row" style={{ marginTop: 36 }}>
          <Link to="/subsidy-calculator" className="btn btn-primary">
            Calculate My Subsidy
          </Link>
          <Link to="/talk-to-solar-expert" className="btn btn-ghost">
            Talk to Solar Expert
          </Link>
          <Link to="/book-site-visit" className="btn btn-ghost">
            Book Site Visit
          </Link>
        </div>
      </div>
    </section>
  );
}
