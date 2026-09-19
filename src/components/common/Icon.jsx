import React from 'react';

export default function Icon({ name, className = '', size = 20 }) {
  const icons = {
    bolt: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />,
    home: (
      <>
        <path d="M3 11 12 4l9 7" />
        <path d="M5 10v10h14V10" />
      </>
    ),
    building: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="1" />
        <path d="M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1" />
      </>
    ),
    factory: <path d="M3 21V10l6 4v-4l6 4V6l6 4v11H3z" />,
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
      </>
    ),
    battery: (
      <>
        <rect x="2" y="7" width="18" height="10" rx="2" />
        <path d="M22 11v2" />
      </>
    ),
    grid: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="1" />
        <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
      </>
    ),
    leaf: (
      <>
        <path d="M20 4C10 4 4 10 4 20c10 0 16-6 16-16Z" />
        <path d="M4 20 20 4" />
      </>
    ),
    shield: <path d="M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-4Z" />,
    wrench: <path d="M14.7 6.3a4 4 0 0 1-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 1 5.4-5.4l-3-3Z" />,
    check: <path d="M20 6 9 17l-5-5" />,
    'check-circle': (
      <>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <path d="M22 4 12 14.01l-3-3" />
      </>
    ),
    star: <path d="M12 2l3 6.5 7 1-5 5 1.3 7L12 18l-6.3 3.5L7 14.5l-5-5 7-1Z" />,
    whatsapp: (
      <>
        <path d="M4 20l1.3-4A8 8 0 1 1 8 19l-4 1Z" />
        <path d="M9 9c0 3 2 5 6 6" strokeLinecap="round" />
      </>
    ),
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </>
    ),
    youtube: (
      <>
        <path d="M21 8.2a2.7 2.7 0 0 0-1.9-1.9C17.4 6 12 6 12 6s-5.4 0-7.1.3A2.7 2.7 0 0 0 3 8.2 28 28 0 0 0 2.7 12 28 28 0 0 0 3 15.8a2.7 2.7 0 0 0 1.9 1.9C6.6 18 12 18 12 18s5.4 0 7.1-.3a2.7 2.7 0 0 0 1.9-1.9 28 28 0 0 0 .3-3.8 28 28 0 0 0-.3-3.8Z" />
        <path d="m10 9 5 3-5 3V9Z" />
      </>
    ),
    linkedin: (
      <>
        <path d="M5 8v11M5 5v.01M9 19v-6a4 4 0 0 1 8 0v6M9 12V8" />
        <path d="M3 3h18v18H3z" />
      </>
    ),
    phone: <path d="M5 4h4l1.5 4.5-2 2a11 11 0 0 0 5 5l2-2L20 15v4a1 1 0 0 1-1 1C10.5 20 4 13.5 4 5a1 1 0 0 1 1-1Z" />,
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="1" />
        <path d="M3 6l9 7 9-7" />
      </>
    ),
    pin: (
      <>
        <path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    upload: (
      <>
        <path d="M12 16V4M7 9l5-5 5 5" />
        <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
      </>
    ),
    chevron: <path d="M6 9l6 6 6-6" />,
    menu: <path d="M3 6h18M3 12h18M3 18h18" />,
    x: <path d="M18 6 6 18M6 6l12 12" />,
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    calc: (
      <>
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <path d="M8 6h8M7 11h2M11 11h2M15 11h2M7 15h2M11 15h2M15 15h2M7 19h2M11 19h2" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6" />
        <circle cx="17" cy="9" r="2.3" />
        <path d="M23 20c0-2.8-2-5-4.5-5.6" />
      </>
    ),
    doc: (
      <>
        <path d="M6 2h9l5 5v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" />
        <path d="M14 2v6h6" />
      </>
    ),
    dashboard: (
      <>
        <rect x="3" y="3" width="7" height="9" rx="1" />
        <rect x="14" y="3" width="7" height="5" rx="1" />
        <rect x="14" y="12" width="7" height="9" rx="1" />
        <rect x="3" y="16" width="7" height="5" rx="1" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </>
    ),
    wallet: (
      <>
        <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
        <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
        <path d="M18 12a2 2 0 0 0 0 4h4v-4z" />
      </>
    )
  };

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ verticalAlign: 'middle', flexShrink: 0 }}
    >
      {icons[name] || null}
    </svg>
  );
}
