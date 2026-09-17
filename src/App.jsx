import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Layouts
import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/layout/AdminLayout';

// Public Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import SolarCalculatorPage from './pages/SolarCalculatorPage';
import SubsidyCalculatorPage from './pages/SubsidyCalculatorPage';
import PMSuryaGharPage from './pages/PMSuryaGharPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ReviewsPage from './pages/ReviewsPage';
import BlogListPage from './pages/BlogListPage';
import BlogDetailPage from './pages/BlogDetailPage';
import DealerPage from './pages/DealerPage';
import DealerApplyPage from './pages/DealerApplyPage';
import ContractorPage from './pages/ContractorPage';
import ContractorApplyPage from './pages/ContractorApplyPage';
import ContactPage from './pages/ContactPage';
import ExpertPage from './pages/ExpertPage';
import SiteVisitPage from './pages/SiteVisitPage';
import LegalPage from './pages/LegalPage';
import NotFoundPage from './pages/NotFoundPage';
import CareersPage from './pages/Careers';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLeads from './pages/admin/AdminLeads';
import AdminSiteVisits from './pages/admin/AdminSiteVisits';
import AdminProjects from './pages/admin/AdminProjects';
import AdminReviews from './pages/admin/AdminReviews';
import AdminBlog from './pages/admin/AdminBlog';
import AdminDealers from './pages/admin/AdminDealers';
import AdminContractors from './pages/admin/AdminContractors';
import AdminMessages from './pages/admin/AdminMessages';
import AdminSettings from './pages/admin/AdminSettings';
import AdminJobs from './pages/admin/AdminJobs';
import AdminCandidates from './pages/admin/AdminCandidates';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Website Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/:category" element={<ServicesPage />} />
          <Route path="services/:category/:type" element={<ServicesPage />} />
          <Route path="solar-calculator" element={<SolarCalculatorPage />} />
          <Route path="subsidy-calculator" element={<SubsidyCalculatorPage />} />
          <Route path="pm-surya-ghar" element={<PMSuryaGharPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:id" element={<ProjectDetailPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
          <Route path="blog" element={<BlogListPage />} />
          <Route path="blog/:slug" element={<BlogDetailPage />} />
          <Route path="dealer" element={<DealerPage />} />
          <Route path="dealer/apply" element={<DealerApplyPage />} />
          <Route path="contractor" element={<ContractorPage />} />
          <Route path="contractor/apply" element={<ContractorApplyPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="talk-to-solar-expert" element={<ExpertPage />} />
          <Route path="book-site-visit" element={<SiteVisitPage />} />
          <Route path="privacy" element={<LegalPage />} />
          <Route path="terms" element={<LegalPage />} />
          <Route path="careers" element={<CareersPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Admin CRM Suite */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="leads" element={<AdminLeads />} />
          <Route path="sitevisits" element={<AdminSiteVisits />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="dealers" element={<AdminDealers />} />
          <Route path="contractors" element={<AdminContractors />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="jobs" element={<AdminJobs />} />
          <Route path="candidates" element={<AdminCandidates />} />
        </Route>
      </Routes>
    </>
  );
}
