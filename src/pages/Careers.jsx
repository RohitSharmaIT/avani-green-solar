import React, { useState, useEffect } from 'react';
import Icon from '../components/common/Icon';

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [applyForm, setApplyForm] = useState({
    name: '',
    phone: '',
    email: '',
    googleMeetLink: '',
    portfolioLink: '',
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch('/api/jobs');
      const data = await res.json();
      if (res.ok) setJobs(data);
    } catch (err) {
      console.error('Error fetching jobs', err);
    }
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.role.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleApply = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      setError('Please upload your resume');
      return;
    }
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('jobId', selectedJob._id);
    formData.append('name', applyForm.name);
    formData.append('phone', applyForm.phone);
    formData.append('email', applyForm.email);
    formData.append('googleMeetLink', applyForm.googleMeetLink);
    formData.append('portfolioLink', applyForm.portfolioLink);
    formData.append('resume', resumeFile);

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setShowApplyModal(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000);
        setApplyForm({ name: '', phone: '', email: '', googleMeetLink: '', portfolioLink: '' });
        setResumeFile(null);
      } else {
        const data = await res.json();
        setError(data.message || 'Error submitting application');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="section" style={{ background: 'var(--sage)' }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <div className="eyebrow">Careers at Avani Solar</div>
          <h1 style={{ fontSize: 'clamp(28px, 6vw, 42px)', marginBottom: 16 }}>Join Our Mission</h1>
          <p className="lead" style={{ maxWidth: 600, margin: '0 auto', color: 'var(--ink-soft)' }}>
            We are looking for passionate individuals to help us build a sustainable future with clean solar energy.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div style={{ marginBottom: 32, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: '1 1 240px', minWidth: 0 }}>
              <input
                type="text"
                placeholder="Search jobs by role or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ paddingLeft: 38 }}
              />
              <div style={{ position: 'absolute', left: 12, top: 11, color: 'var(--ink-soft)' }}>
                <Icon name="search" size={18} />
              </div>
            </div>
            <div style={{ fontSize: 14, color: 'var(--ink-soft)', whiteSpace: 'nowrap' }}>
              Showing {filteredJobs.length} roles
            </div>
          </div>

          <div className="grid-cards">
            {filteredJobs.map((job) => (
              <div
                key={job._id}
                className="card-simple animate-slide-up"
                style={{ cursor: 'pointer', padding: 0, overflow: 'hidden' }}
                onClick={() => setSelectedJob(job)}
              >
                <img src={job.image} alt={job.role} style={{ height: 160, width: '100%', objectFit: 'cover' }} />
                <div style={{ padding: 24 }}>
                  <h3 style={{ marginBottom: 8 }}>{job.role}</h3>
                  <div style={{ display: 'flex', gap: 16, color: 'var(--ink-soft)', fontSize: 13.5, marginBottom: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Icon name="pin" size={16} /> {job.location}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Icon name="wallet" size={16} /> {job.salary}
                    </div>
                  </div>
                  <button className="btn btn-ghost btn-sm" style={{ width: '100%' }}>View Details</button>
                </div>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="empty">No jobs found matching your search.</div>
          )}
        </div>
      </section>

      {/* Job Details Modal */}
      {selectedJob && !showApplyModal && (
        <div className="modal-bg open" onClick={() => setSelectedJob(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 700 }}>
            <button className="modal-close" onClick={() => setSelectedJob(null)}>
              <Icon name="x" size={20} />
            </button>
            <h2 style={{ marginBottom: 12 }}>{selectedJob.role}</h2>
            <div style={{ display: 'flex', gap: 12, color: 'var(--ink-soft)', fontSize: 14.5, marginBottom: 24, flexWrap: 'wrap' }}>
              <span><strong>Location:</strong> {selectedJob.location}</span>
              <span><strong>Salary:</strong> {selectedJob.salary}</span>
            </div>

            <div style={{ marginBottom: 24 }}>
              <h4 style={{ marginBottom: 8, fontSize: 18 }}>Responsibilities</h4>
              <p style={{ whiteSpace: 'pre-line', color: 'var(--ink-soft)', fontSize: 14.5 }}>{selectedJob.responsibilities}</p>
            </div>

            <div style={{ marginBottom: 32 }}>
              <h4 style={{ marginBottom: 8, fontSize: 18 }}>Requirements</h4>
              <p style={{ whiteSpace: 'pre-line', color: 'var(--ink-soft)', fontSize: 14.5 }}>{selectedJob.requirements}</p>
            </div>

            <div className="cta-row">
              <button className="btn btn-primary" onClick={() => setShowApplyModal(true)}>Apply Now</button>
              <button className="btn btn-ghost" onClick={() => setSelectedJob(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="modal-bg open" onClick={() => setShowApplyModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 560 }}>
            <button className="modal-close" onClick={() => setShowApplyModal(false)}>
              <Icon name="x" size={20} />
            </button>
            <h3 style={{ marginBottom: 24 }}>Apply for {selectedJob?.role}</h3>
            
            {error && <div className="err" style={{ marginBottom: 16 }}>{error}</div>}

            <form onSubmit={handleApply}>
              <div className="field">
                <label className="req">Full Name</label>
                <input required value={applyForm.name} onChange={(e) => setApplyForm({ ...applyForm, name: e.target.value })} />
              </div>
              <div className="field">
                <label className="req">Phone Number</label>
                <input required type="tel" value={applyForm.phone} onChange={(e) => setApplyForm({ ...applyForm, phone: e.target.value })} />
              </div>
              <div className="field">
                <label className="req">Email Address</label>
                <input required type="email" value={applyForm.email} onChange={(e) => setApplyForm({ ...applyForm, email: e.target.value })} />
              </div>
              <div className="field">
                <label className="req">Resume (PDF, DOCX)</label>
                <input required type="file" accept=".pdf,.doc,.docx" onChange={(e) => setResumeFile(e.target.files[0])} />
              </div>
              <div className="field">
                <label>Google Meet Link (Optional for intro video)</label>
                <input type="url" value={applyForm.googleMeetLink} onChange={(e) => setApplyForm({ ...applyForm, googleMeetLink: e.target.value })} />
              </div>
              <div className="field">
                <label>Portfolio Link (Optional)</label>
                <input type="url" value={applyForm.portfolioLink} onChange={(e) => setApplyForm({ ...applyForm, portfolioLink: e.target.value })} />
              </div>

              <div className="cta-row" style={{ marginTop: 24 }}>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit Application'}
                </button>
                <button type="button" className="btn btn-ghost" onClick={() => setShowApplyModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Animation Modal */}
      {showSuccess && (
        <div className="modal-bg open" style={{ alignItems: 'center' }}>
          <div className="modal animate-pop-in" style={{ maxWidth: 400, textAlign: 'center', padding: 48 }}>
            <div style={{ color: 'var(--leaf)', marginBottom: 24, display: 'flex', justifyContent: 'center' }}>
              <Icon name="check-circle" size={64} />
            </div>
            <h2 style={{ marginBottom: 12 }}>Thank You for Applying!</h2>
            <p style={{ color: 'var(--ink-soft)' }}>We have received your application and will be in touch shortly.</p>
          </div>
        </div>
      )}
    </>
  );
}
