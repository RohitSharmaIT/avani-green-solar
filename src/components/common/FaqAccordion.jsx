import React, { useState } from 'react';
import Icon from './Icon';

export default function FaqAccordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((curr) => (curr === index ? null : index));
  };

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="card-simple"
            style={{
              marginBottom: 10,
              cursor: 'pointer',
              border: isOpen ? '1px solid var(--leaf)' : '1px solid var(--line)',
              transition: 'var(--transition)'
            }}
            onClick={() => toggle(index)}
          >
            <div
              style={{
                fontWeight: 600,
                fontSize: '15px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: isOpen ? 'var(--forest)' : 'var(--ink)'
              }}
            >
              <span>{item[0]}</span>
              <span
                style={{
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                  color: isOpen ? 'var(--leaf-dark)' : 'var(--ink-soft)'
                }}
              >
                <Icon name="chevron" size={18} />
              </span>
            </div>
            {isOpen && (
              <div
                style={{
                  marginTop: 12,
                  paddingTop: 12,
                  borderTop: '1px solid var(--line-light)',
                  fontSize: '14px',
                  color: 'var(--ink-soft)',
                  lineHeight: 1.6
                }}
              >
                {item[1]}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
