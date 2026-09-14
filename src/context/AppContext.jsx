import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  INITIAL_SETTINGS,
  SUBSIDY_RULES,
  INITIAL_PROJECTS,
  INITIAL_REVIEWS,
  INITIAL_BLOG,
  INITIAL_LEADS
} from '../data/initialData';
import { api, setAuthToken, getAuthToken } from '../services/api';

const AppContext = createContext();

const uid = () => Math.random().toString(36).slice(2, 9);

export function AppProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('ags_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('ags_leads');
    return saved ? JSON.parse(saved) : INITIAL_LEADS;
  });

  const [siteVisits, setSiteVisits] = useState(() => {
    const saved = localStorage.getItem('ags_site_visits');
    return saved ? JSON.parse(saved) : [
      { id: 'SV-DEMO01', name: 'Alok Mishra', address: 'Arera Colony, Bhopal', preferredDate: '2026-09-10', preferredTime: '11:00', status: 'REQUESTED' }
    ];
  });

  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('ags_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [dealerApps, setDealerApps] = useState(() => {
    const saved = localStorage.getItem('ags_dealers');
    return saved ? JSON.parse(saved) : [
      { id: 'DL-90812', name: 'Sunil Verma', city: 'Hoshangabad', phone: '9893012345', status: 'APPLIED', created: new Date().toISOString() }
    ];
  });

  const [contractorApps, setContractorApps] = useState(() => {
    const saved = localStorage.getItem('ags_contractors');
    return saved ? JSON.parse(saved) : [
      { id: 'CT-34211', name: 'Mohit Sharma', city: 'Ujjain', phone: '9826054321', status: 'APPLIED', created: new Date().toISOString() }
    ];
  });

  const [contactMessages, setContactMessages] = useState(() => {
    const saved = localStorage.getItem('ags_messages');
    return saved ? JSON.parse(saved) : [
      { id: 'msg-1', name: 'Kavita Singh', phone: '9827011223', subject: 'Industrial 100 kW enquiry', message: 'Need quotation for food processing unit near Mandideep.', created: new Date().toISOString() }
    ];
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('ags_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [blog, setBlog] = useState(() => {
    const saved = localStorage.getItem('ags_blog');
    return saved ? JSON.parse(saved) : INITIAL_BLOG;
  });

  const [subsidyRules] = useState(SUBSIDY_RULES);
  const [toastMessage, setToastMessage] = useState(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [isDbConnected, setIsDbConnected] = useState(false);
  const [isCloudinaryActive, setIsCloudinaryActive] = useState(false);

  // Admin authentication state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return Boolean(getAuthToken()) || localStorage.getItem('ags_admin_auth') === 'true';
  });

  // Local storage cache effects
  useEffect(() => { localStorage.setItem('ags_settings', JSON.stringify(settings)); }, [settings]);
  useEffect(() => { localStorage.setItem('ags_leads', JSON.stringify(leads)); }, [leads]);
  useEffect(() => { localStorage.setItem('ags_site_visits', JSON.stringify(siteVisits)); }, [siteVisits]);
  useEffect(() => { localStorage.setItem('ags_reviews', JSON.stringify(reviews)); }, [reviews]);
  useEffect(() => { localStorage.setItem('ags_dealers', JSON.stringify(dealerApps)); }, [dealerApps]);
  useEffect(() => { localStorage.setItem('ags_contractors', JSON.stringify(contractorApps)); }, [contractorApps]);
  useEffect(() => { localStorage.setItem('ags_messages', JSON.stringify(contactMessages)); }, [contactMessages]);
  useEffect(() => { localStorage.setItem('ags_projects', JSON.stringify(projects)); }, [projects]);
  useEffect(() => { localStorage.setItem('ags_blog', JSON.stringify(blog)); }, [blog]);

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  }, []);

  // Sync data with MongoDB on initial load
  useEffect(() => {
    async function loadDataFromMongo() {
      try {
        const [
          settingsRes,
          projectsRes,
          blogRes,
          leadsRes,
          visitsRes,
          reviewsRes,
          dealersRes,
          contractorsRes,
          messagesRes,
          statusRes
        ] = await Promise.allSettled([
          api.settings.get(),
          api.projects.getAll(),
          api.blog.getAll(),
          api.leads.getAll(),
          api.siteVisits.getAll(),
          api.reviews.getAll(),
          api.dealers.getAll(),
          api.contractors.getAll(),
          api.contact.getAll(),
          api.auth.systemStatus()
        ]);

        if (settingsRes.status === 'fulfilled' && settingsRes.value) {
          setSettings(settingsRes.value);
          setIsDbConnected(true);
        }
        if (projectsRes.status === 'fulfilled' && Array.isArray(projectsRes.value) && projectsRes.value.length > 0) {
          setProjects(projectsRes.value);
        }
        if (blogRes.status === 'fulfilled' && Array.isArray(blogRes.value) && blogRes.value.length > 0) {
          setBlog(blogRes.value);
        }
        if (leadsRes.status === 'fulfilled' && Array.isArray(leadsRes.value)) {
          setLeads(leadsRes.value);
        }
        if (visitsRes.status === 'fulfilled' && Array.isArray(visitsRes.value)) {
          setSiteVisits(visitsRes.value);
        }
        if (reviewsRes.status === 'fulfilled' && Array.isArray(reviewsRes.value)) {
          setReviews(reviewsRes.value);
        }
        if (dealersRes.status === 'fulfilled' && Array.isArray(dealersRes.value)) {
          setDealerApps(dealersRes.value);
        }
        if (contractorsRes.status === 'fulfilled' && Array.isArray(contractorsRes.value)) {
          setContractorApps(contractorsRes.value);
        }
        if (messagesRes.status === 'fulfilled' && Array.isArray(messagesRes.value)) {
          setContactMessages(messagesRes.value);
        }
        if (statusRes.status === 'fulfilled' && statusRes.value) {
          setIsCloudinaryActive(statusRes.value.cloudinaryConfigured);
        }
      } catch (err) {
        console.info('[AppContext] Connected to local cache mode:', err.message);
      }
    }

    loadDataFromMongo();
  }, []);

  // Admin authentication against MongoDB
  const adminLogin = async (username, password) => {
    try {
      const res = await api.auth.login(username, password);
      if (res && res.token) {
        setAuthToken(res.token);
        setIsAdminAuthenticated(true);
        localStorage.setItem('ags_admin_auth', 'true');
        showToast('Welcome back, Admin! (Connected to MongoDB)');
        return true;
      }
    } catch (err) {
      console.info('[Auth] Server login fallback:', err.message);
      // Local fallback check for offline dev
      if (username.trim() === 'Avani122' && password.trim() === 'Avani@2025') {
        setIsAdminAuthenticated(true);
        localStorage.setItem('ags_admin_auth', 'true');
        showToast('Welcome back, Admin! (Offline mode)');
        return true;
      }
      return false;
    }
    return false;
  };

  const adminLogout = () => {
    setAuthToken(null);
    setIsAdminAuthenticated(false);
    localStorage.removeItem('ags_admin_auth');
    showToast('Logged out of Admin CRM.');
  };

  const addLead = async (data, source) => {
    const tempLead = {
      id: 'LD-' + uid().toUpperCase(),
      status: 'NEW',
      created: new Date().toISOString(),
      source,
      assigned: 'Unassigned',
      notes: [],
      ...data
    };
    setLeads((prev) => [tempLead, ...prev]);
    showToast('Thank you! Your solar enquiry has been received. Our team will contact you shortly.');

    try {
      const saved = await api.leads.create({ ...data, source });
      if (saved) {
        setLeads((prev) => prev.map((l) => (l.id === tempLead.id ? saved : l)));
        return saved;
      }
    } catch (e) {
      console.warn('Lead saved to local storage:', e.message);
    }
    return tempLead;
  };

  const updateLeadStatus = async (id, status) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    showToast(`Lead ${id} updated to ${status}`);
    try {
      await api.leads.update(id, { status });
    } catch (e) {
      console.warn('Lead status update fallback:', e.message);
    }
  };

  const addSiteVisit = async (data) => {
    const tempVisit = {
      id: 'SV-' + uid().toUpperCase(),
      status: 'REQUESTED',
      created: new Date().toISOString(),
      ...data
    };
    setSiteVisits((prev) => [tempVisit, ...prev]);
    showToast('Thank you! Your site visit request has been booked.');

    try {
      const saved = await api.siteVisits.create(data);
      if (saved) {
        setSiteVisits((prev) => prev.map((v) => (v.id === tempVisit.id ? saved : v)));
        return saved;
      }
    } catch (e) {
      console.warn('Site visit saved locally:', e.message);
    }
    return tempVisit;
  };

  const addDealerApp = async (data) => {
    const tempApp = {
      id: 'DL-' + uid().toUpperCase(),
      status: 'APPLIED',
      created: new Date().toISOString(),
      ...data
    };
    setDealerApps((prev) => [tempApp, ...prev]);
    showToast('Thank you! Your dealer application has been submitted successfully.');

    try {
      const saved = await api.dealers.create(data);
      if (saved) {
        setDealerApps((prev) => prev.map((a) => (a.id === tempApp.id ? saved : a)));
        return saved;
      }
    } catch (e) {
      console.warn('Dealer app saved locally:', e.message);
    }
    return tempApp;
  };

  const updateDealerAppStatus = async (id, status) => {
    setDealerApps((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    showToast(`Dealer application ${id} marked as ${status}`);
    try {
      await api.dealers.update(id, { status });
    } catch (e) {
      console.warn('Dealer update local:', e.message);
    }
  };

  const addContractorApp = async (data) => {
    const tempApp = {
      id: 'CT-' + uid().toUpperCase(),
      status: 'APPLIED',
      created: new Date().toISOString(),
      ...data
    };
    setContractorApps((prev) => [tempApp, ...prev]);
    showToast('Thank you! Your contractor application has been received.');

    try {
      const saved = await api.contractors.create(data);
      if (saved) {
        setContractorApps((prev) => prev.map((a) => (a.id === tempApp.id ? saved : a)));
        return saved;
      }
    } catch (e) {
      console.warn('Contractor app saved locally:', e.message);
    }
    return tempApp;
  };

  const updateContractorAppStatus = async (id, status) => {
    setContractorApps((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    showToast(`Contractor application ${id} marked as ${status}`);
    try {
      await api.contractors.update(id, { status });
    } catch (e) {
      console.warn('Contractor update local:', e.message);
    }
  };

  const addReview = async (data) => {
    const tempRev = {
      id: 'rv-' + uid(),
      status: 'PENDING',
      rating: Number(data.rating || 5),
      created: new Date().toISOString(),
      ...data
    };
    setReviews((prev) => [tempRev, ...prev]);
    showToast('Thank you for sharing your experience! Your review is pending admin approval.');

    try {
      const saved = await api.reviews.create(data);
      if (saved) {
        setReviews((prev) => prev.map((r) => (r.id === tempRev.id ? saved : r)));
        return saved;
      }
    } catch (e) {
      console.warn('Review saved locally:', e.message);
    }
    return tempRev;
  };

  const approveReview = async (id) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'APPROVED' } : r)));
    showToast('Review approved and published live to the website.');
    try {
      await api.reviews.updateStatus(id, 'APPROVED');
    } catch (e) {
      console.warn('Review status update local:', e.message);
    }
  };

  const deleteReview = async (id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    showToast('Review deleted.');
    try {
      await api.reviews.delete(id);
    } catch (e) {
      console.warn('Review delete local:', e.message);
    }
  };

  const addProject = async (data) => {
    const tempProject = {
      id: 'p' + (projects.length + 1) + '-' + uid().slice(0, 3),
      year: new Date().getFullYear(),
      featured: false,
      ...data,
      capacity: Number(data.capacity || 5)
    };
    setProjects((prev) => [tempProject, ...prev]);
    showToast(`Project "${tempProject.name}" added successfully!`);

    try {
      const saved = await api.projects.create(data);
      if (saved) {
        setProjects((prev) => prev.map((p) => (p.id === tempProject.id ? saved : p)));
        return saved;
      }
    } catch (e) {
      console.warn('Project saved locally:', e.message);
    }
    return tempProject;
  };

  const deleteProject = async (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    showToast('Project deleted successfully.');
    try {
      await api.projects.delete(id);
    } catch (e) {
      console.warn('Project delete local:', e.message);
    }
  };

  const addBlogPost = async (data) => {
    const slug = (data.title || 'post')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const tempPost = {
      id: 'b' + (blog.length + 1),
      slug: slug || 'post-' + uid(),
      date: new Date().toISOString().split('T')[0],
      ...data
    };
    setBlog((prev) => [tempPost, ...prev]);
    showToast(`Article "${tempPost.title}" published live!`);

    try {
      const saved = await api.blog.create(data);
      if (saved) {
        setBlog((prev) => prev.map((b) => (b.id === tempPost.id ? saved : b)));
        return saved;
      }
    } catch (e) {
      console.warn('Blog saved locally:', e.message);
    }
    return tempPost;
  };

  const deleteBlogPost = async (id) => {
    setBlog((prev) => prev.filter((b) => b.id !== id));
    showToast('Blog article deleted.');
    try {
      await api.blog.delete(id);
    } catch (e) {
      console.warn('Blog delete local:', e.message);
    }
  };

  const addContactMessage = async (data) => {
    const tempMsg = {
      id: 'msg-' + uid(),
      created: new Date().toISOString(),
      status: 'OPEN',
      ...data
    };
    setContactMessages((prev) => [tempMsg, ...prev]);
    showToast('Thank you! Your message has been sent. We will respond promptly.');

    try {
      const saved = await api.contact.create(data);
      if (saved) {
        setContactMessages((prev) => prev.map((m) => (m.id === tempMsg.id ? saved : m)));
        return saved;
      }
    } catch (e) {
      console.warn('Message saved locally:', e.message);
    }
    return tempMsg;
  };

  const updateSettings = async (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Settings saved successfully.');
    try {
      await api.settings.update(newSettings);
    } catch (e) {
      console.warn('Settings saved locally:', e.message);
    }
  };

  return (
    <AppContext.Provider
      value={{
        settings,
        updateSettings,
        leads,
        addLead,
        updateLeadStatus,
        siteVisits,
        addSiteVisit,
        reviews,
        addReview,
        approveReview,
        deleteReview,
        dealerApps,
        addDealerApp,
        updateDealerAppStatus,
        contractorApps,
        addContractorApp,
        updateContractorAppStatus,
        contactMessages,
        addContactMessage,
        projects,
        addProject,
        deleteProject,
        blog,
        addBlogPost,
        deleteBlogPost,
        subsidyRules,
        toastMessage,
        showToast,
        isEnquiryModalOpen,
        openEnquiryModal: () => setIsEnquiryModalOpen(true),
        closeEnquiryModal: () => setIsEnquiryModalOpen(false),
        isAdminAuthenticated,
        adminLogin,
        adminLogout,
        isDbConnected,
        isCloudinaryActive
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
