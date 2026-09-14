import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Icon from './Icon';
import EnquiryFormFields from './EnquiryFormFields';
import SuccessModal from './SuccessModal';

export default function EnquiryModal() {
  const { isEnquiryModalOpen, closeEnquiryModal, addLead } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: 'Madhya Pradesh',
    customerType: '',
    solarType: 'Not sure',
    capacity: '',
    bill: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isEnquiryModalOpen && !showSuccess) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name.';
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone.trim())) {
      errs.phone = 'Enter a valid 10-digit phone number.';
    }
    if (!formData.address.trim()) errs.address = 'Please enter your address.';
    if (!formData.customerType) errs.customerType = 'Please select customer type.';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    addLead(formData, 'General Modal Enquiry');
    closeEnquiryModal();
    setFormData({
      name: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      state: 'Madhya Pradesh',
      customerType: '',
      solarType: 'Not sure',
      capacity: '',
      bill: '',
      message: ''
    });
    setShowSuccess(true);
  };

  return (
    <>
      {/* Success popup shown after modal closes */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Quote Request Submitted!"
        message="Thank you! Your solar quote request has been received by Avani Green Solar."
        subMessage="☀️ Our solar engineer will contact you within 24 hours with a customized quote."
      />

      {isEnquiryModalOpen && (
        <div className="modal-bg open" onClick={closeEnquiryModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={closeEnquiryModal}
              aria-label="Close quote modal"
            >
              <Icon name="x" size={20} />
            </button>
            <h3 style={{ fontSize: '24px', marginBottom: 6 }}>Get a Solar Quote</h3>
            <p style={{ color: 'var(--ink-soft)', fontSize: '14px', marginBottom: 20 }}>
              Tell us about your requirement — our solar engineering team will get in touch shortly.
            </p>
            <form onSubmit={handleSubmit} noValidate>
              <EnquiryFormFields formData={formData} onChange={handleChange} errors={errors} />
              <button
                className="btn btn-primary"
                type="submit"
                style={{ width: '100%', justifyContent: 'center', marginTop: 12, padding: '13px 20px' }}
              >
                Submit Enquiry
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
