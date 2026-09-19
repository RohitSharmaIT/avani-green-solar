import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const REVEAL_SELECTOR = [
  'section',
  '.card-simple',
  '.cell-grid > *',
  '.grid-cards > *',
  '.blog-card-grid',
  '.blog-card-media > *',
  '.section-head',
  '.solar-workflow-arrow',
  '.solar-workflow-cta'
].join(', ');

export default function ScrollReveal({ children }) {
  const rootRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const reveal = (element) => {
      if (!element.classList.contains('scroll-reveal')) element.classList.add('scroll-reveal');
    };

    const observeElements = () => {
      const elements = root.querySelectorAll(REVEAL_SELECTOR);
      elements.forEach(reveal);
      return Array.from(elements);
    };

    const elements = observeElements();
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -40px' }
    );
    elements.forEach((element) => observer.observe(element));

    const mutations = new MutationObserver(() => {
      observeElements().forEach((element) => {
        if (!element.classList.contains('is-visible')) observer.observe(element);
      });
    });
    mutations.observe(root, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [pathname]);

  return <div ref={rootRef} className="scroll-reveal-root">{children}</div>;
}
