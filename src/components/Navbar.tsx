import { useEffect, useState } from 'react';
import { event, navLinks } from '../config/event';
import MicLogo from './MicLogo';
import RegisterLink from './RegisterLink';

export default function Navbar() {
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('is-locked', open);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('is-locked');
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <header className={`nav${condensed ? ' nav--condensed' : ''}${open ? ' nav--menu-open' : ''}`}>
        <a
          className="nav__mark"
          href="#top"
          aria-label="Recursion Edition II by Microsoft Innovations Club, back to top"
        >
          <MicLogo className="nav__logo" />
          <span className="nav__mark-name">{event.name}</span>
          <span className="nav__mark-slash" aria-hidden="true">
            /
          </span>
          <span className="nav__mark-num">{event.editionNumeral}</span>
        </a>

        <nav className="nav__links" aria-label="Sections">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="nav__link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <RegisterLink className="btn nav__cta">
            <span>REGISTER</span>
          </RegisterLink>
          <button
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="recursion-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <span className={`nav__bars${open ? ' is-open' : ''}`} aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </div>
      </header>

      <div
        id="recursion-menu"
        className={`menu${open ? ' menu--open' : ''}`}
        aria-hidden={!open}
        aria-label="Site menu"
      >
        <div className="menu__frames" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <nav className="menu__list">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="menu__link"
              style={{ transitionDelay: `${0.05 + i * 0.045}s` }}
              onClick={() => setOpen(false)}
            >
              <span className="menu__index">{String(i + 1).padStart(2, '0')}</span>
              <span>{link.label}</span>
            </a>
          ))}
          <RegisterLink className="btn btn--solid menu__cta" onNavigate={() => setOpen(false)}>
            <span>ENTER RECURSION</span>
            <span className="btn__arrow" aria-hidden="true">
              →
            </span>
          </RegisterLink>
        </nav>
        <div className="menu__foot sysline">
          <span className="menu__foot-org">
            <MicLogo className="menu__logo" />
            MIC · VIT CHENNAI
          </span>
          <span>
            <i className="dot" />
            LOOP: {event.editionNumeral}
          </span>
          <span>NODE: VITC</span>
          <span>{event.dateShort}</span>
        </div>
      </div>
    </>
  );
}
