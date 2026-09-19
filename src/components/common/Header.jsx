import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Icon from './Icon';

export default function Header() {
  const { settings } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = () => setMobileOpen(!mobileOpen);
  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="site">
      <div className="wrap nav-row">
        <Link to="/" className="logo" onClick={closeMobile}>
          <span className="mark"></span>
          <span>{settings.company}</span>
        </Link>

        <nav className="main">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>About Us</NavLink>

          <div className="dd">
            <span>Services <Icon name="chevron" size={14} /></span>
            <div className="dd-menu">
              <Link to="/services/residential">Residential Solar</Link>
              <Link to="/services/commercial">Commercial Solar</Link>
              <Link to="/services/industrial">Industrial Solar</Link>
              <Link to="/services" style={{ borderTop: '1px solid var(--line-light)', fontWeight: 600 }}>All Services →</Link>
            </div>
          </div>

          <NavLink to="/projects" className={({ isActive }) => (isActive ? 'active' : '')}>Projects</NavLink>
          <NavLink to="/subsidy-calculator" className={({ isActive }) => (isActive ? 'active' : '')}>Subsidy Calculator</NavLink>
          <NavLink to="/blog" className={({ isActive }) => (isActive ? 'active' : '')}>Blog</NavLink>
          <NavLink to="/dealer" className={({ isActive }) => (isActive ? 'active' : '')}>Dealer</NavLink>
          <NavLink to="/careers" className={({ isActive }) => (isActive ? 'active' : '')}>Careers</NavLink>
        </nav>

        <div className="head-cta">
          <Link to="/talk-to-solar-expert" className="btn btn-primary btn-sm">Talk to Solar Expert</Link>
          <button
            className="hamburger"
            onClick={toggleMobile}
            aria-label="Toggle navigation menu"
          >
            <Icon name={mobileOpen ? 'x' : 'menu'} size={24} />
          </button>
        </div>
      </div>

      <div id="mobileNav" className={mobileOpen ? 'open' : ''}>
        <Link to="/" onClick={closeMobile}>Home</Link>
        <Link to="/about" onClick={closeMobile}>About Us</Link>
        <Link to="/services" onClick={closeMobile}>Services Overview</Link>
        <div className="sub">
          <Link to="/services/residential" onClick={closeMobile}>Residential Solar</Link>
          <Link to="/services/commercial" onClick={closeMobile}>Commercial Solar</Link>
          <Link to="/services/industrial" onClick={closeMobile}>Industrial Solar</Link>
        </div>
        <Link to="/projects" onClick={closeMobile}>Projects</Link>
        <Link to="/subsidy-calculator" onClick={closeMobile}>Subsidy Calculator</Link>
        <Link to="/reviews" onClick={closeMobile}>Customer Reviews</Link>
        <Link to="/blog" onClick={closeMobile}>Blog & Knowledge</Link>
        <Link to="/dealer" onClick={closeMobile}>Dealer Network</Link>
        <Link to="/careers" onClick={closeMobile}>Careers</Link>
        <Link to="/talk-to-solar-expert" onClick={closeMobile} style={{ color: 'var(--leaf-dark)', fontWeight: 600 }}>Talk to Solar Expert</Link>
      </div>
    </header>
  );
}
