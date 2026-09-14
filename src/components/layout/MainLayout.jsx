import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';
import EnquiryModal from '../common/EnquiryModal';
import Toast from '../common/Toast';
import FloatingWhatsApp from '../common/FloatingWhatsApp';

export default function MainLayout() {
  return (
    <div className="app-shell" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Toast />
      <Header />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
      <EnquiryModal />
      <FloatingWhatsApp />
    </div>
  );
}
