import React, { useEffect } from 'react';

/**
 * SuccessModal - A beautiful confirmation popup with animated green checkmark
 * Used across all forms: Get Quote, Talk to Expert, Dealer, Contractor, Contact, Site Visit
 */
export default function SuccessModal({ isOpen, onClose, title, message, subMessage }) {
  // Auto-close after 5 seconds
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  // Close on ESC key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(10, 30, 20, 0.65)',
        backdropFilter: 'blur(6px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.2s ease'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '20px',
          padding: '48px 40px 40px',
          maxWidth: 440,
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 24px 64px rgba(22, 58, 46, 0.22)',
          animation: 'slideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: '#f3f4f3',
            border: 'none',
            borderRadius: '50%',
            width: 32,
            height: 32,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            color: '#666',
            transition: 'background 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#e5e7e5'}
          onMouseLeave={e => e.currentTarget.style.background = '#f3f4f3'}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Animated Green Circle Checkmark */}
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            boxShadow: '0 8px 32px rgba(34, 197, 94, 0.35)',
            animation: 'popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s both'
          }}
        >
          {/* Checkmark SVG */}
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            style={{ animation: 'drawCheck 0.4s ease 0.3s both' }}
          >
            <path
              d="M8 22L18 32L36 12"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 40,
                strokeDashoffset: 0,
                animation: 'checkDraw 0.5s ease 0.35s both'
              }}
            />
          </svg>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: '24px',
            fontWeight: 700,
            color: '#163A2E',
            marginBottom: 10,
            lineHeight: 1.3
          }}
        >
          {title || 'Submitted Successfully!'}
        </h3>

        {/* Message */}
        <p
          style={{
            fontSize: '15px',
            color: '#4a6358',
            lineHeight: 1.6,
            marginBottom: subMessage ? 8 : 28
          }}
        >
          {message || 'Thank you! Our team will get back to you shortly.'}
        </p>

        {/* Sub message */}
        {subMessage && (
          <p
            style={{
              fontSize: '13.5px',
              color: '#7a9488',
              lineHeight: 1.6,
              marginBottom: 28,
              background: '#f0fdf4',
              borderRadius: 10,
              padding: '10px 14px',
              border: '1px solid #bbf7d0'
            }}
          >
            {subMessage}
          </p>
        )}

        {/* Progress bar auto-close indicator */}
        <div
          style={{
            height: 4,
            background: '#e5e7e5',
            borderRadius: 99,
            overflow: 'hidden',
            marginBottom: 20
          }}
        >
          <div
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #22c55e, #16a34a)',
              borderRadius: 99,
              animation: 'progressBar 5s linear forwards'
            }}
          />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            background: 'linear-gradient(135deg, #163A2E 0%, #2F7A4F 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            padding: '12px 32px',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
            width: '100%',
            transition: 'transform 0.15s, box-shadow 0.15s',
            boxShadow: '0 4px 16px rgba(22, 58, 46, 0.25)'
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(22, 58, 46, 0.3)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(22, 58, 46, 0.25)'; }}
        >
          Got it, thank you!
        </button>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(40px) scale(0.92); opacity: 0; }
            to { transform: translateY(0) scale(1); opacity: 1; }
          }
          @keyframes popIn {
            from { transform: scale(0.4); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          @keyframes checkDraw {
            from { stroke-dashoffset: 40; }
            to { stroke-dashoffset: 0; }
          }
          @keyframes progressBar {
            from { width: 100%; }
            to { width: 0%; }
          }
        `}</style>
      </div>
    </div>
  );
}
