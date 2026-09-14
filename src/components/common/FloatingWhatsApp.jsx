import React from 'react';
import { useApp } from '../../context/AppContext';
import Icon from './Icon';

export default function FloatingWhatsApp() {
  const { settings } = useApp();
  const defaultText = encodeURIComponent('Hi, I am interested in installing solar with Avani Green Solar. Please contact me.');
  const whatsappUrl = `https://wa.me/${settings.whatsapp}?text=${defaultText}`;

  return (
    <div className="fab">
      <a
        className="fab-btn"
        title="Chat on WhatsApp with Avani Green Solar"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <Icon name="whatsapp" size={26} />
      </a>
    </div>
  );
}
