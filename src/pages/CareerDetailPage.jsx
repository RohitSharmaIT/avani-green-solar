import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Icon from '../components/common/Icon';
import '../stylesheets/frontend/pages/careers.css';

const emptyForm = {
  name: '',
  phone: '',
  email: '',
  googleMeetLink: '',
  portfolioLink: '',
};

export default function CareerDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    fetch('/api/jobs')
      .then((response) => response.json())
      .then((jobs) => {
        if (active) setJob(jobs.find((item) => item._id === id) || null);
      })
      .catch(() => {
        if (active) setError('Unable to load this job. Please try again.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [id]);

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!resumeFile) {
      setError('Please upload your resume.');
      return;
    }
    setSubmitting(true);
    setError('');
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    formData.append('jobId', job._id);
    formData.append('resume', resumeFile);

    try {
      const response = await fetch('/api/applications', { method: 'POST', body: formData });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to submit application.');
      setSubmitted(true);
      setForm(emptyForm);
      setResumeFile(null);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <section className="section"><div className="wrap"><div className="empty">Loading job details...</div></div></section>;
  if (!job) return <section className="section"><div className="wrap"><div className="empty">This job is no longer available.</div><Link to="/careers" className="btn btn-primary career-back-link">Back to Careers</Link></div></section>;

  return (
    <>
      <section className="career-detail-hero">
        <div className="wrap">
          <Link to="/careers" className="career-back-link"><Icon name="arrow" className="career-back-icon" size={16} /> Back to Careers</Link>
          <div className="eyebrow">Career opportunity</div>
          <h1>{job.role}</h1>
          <div className="career-detail-meta">
            <span><Icon name="pin" size={17} /> {job.location}</span>
            <span><Icon name="wallet" size={17} /> {job.salary}</span>
          </div>
        </div>
      </section>

      <section className="section career-detail-page">
        <div className="wrap career-detail-grid">
          <article className="career-description card-simple">
            {job.image && <img src={job.image} alt={job.role} className="career-detail-image" />}
            <div className="career-detail-copy">
              <h2>About this role</h2>
              <h3>Responsibilities</h3>
              <div className="career-rich-content" dangerouslySetInnerHTML={{ __html: job.responsibilities }} />
              <h3>Requirements</h3>
              <div className="career-rich-content" dangerouslySetInnerHTML={{ __html: job.requirements }} />
            </div>
          </article>

          <aside className="career-application-card card-simple">
            <div className="eyebrow">Join our team</div>
            <h2>Apply for this role</h2>
            {submitted ? (
              <div className="career-success">
                <Icon name="check-circle" size={48} />
                <h3>Application received</h3>
                <p>Thank you for applying. Our team will be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="career-application-form">
                {error && <div className="err career-form-error">{error}</div>}
                <div className="field"><label className="req" htmlFor="name">Full Name</label><input id="name" name="name" value={form.name} onChange={updateField} required /></div>
                <div className="field"><label className="req" htmlFor="phone">Phone Number</label><input id="phone" name="phone" type="tel" value={form.phone} onChange={updateField} required /></div>
                <div className="field"><label className="req" htmlFor="email">Email Address</label><input id="email" name="email" type="email" value={form.email} onChange={updateField} required /></div>
                <div className="field"><label className="req" htmlFor="resume">Resume (PDF, DOCX)</label><input id="resume" type="file" accept=".pdf,.doc,.docx" onChange={(event) => setResumeFile(event.target.files[0] || null)} required /></div>
                <div className="field"><label htmlFor="googleMeetLink">Google Meet Link <span>(optional)</span></label><input id="googleMeetLink" name="googleMeetLink" type="url" value={form.googleMeetLink} onChange={updateField} /></div>
                <div className="field"><label htmlFor="portfolioLink">Portfolio Link <span>(optional)</span></label><input id="portfolioLink" name="portfolioLink" type="url" value={form.portfolioLink} onChange={updateField} /></div>
                <button type="submit" className="btn btn-primary career-submit-button" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit Application'}</button>
              </form>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
