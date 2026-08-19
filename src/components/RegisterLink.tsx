import type { ReactNode } from 'react';
import { isExternalRegistration, primaryCtaHref } from '../config/event';

interface RegisterLinkProps {
  children: ReactNode;
  className?: string;
  onNavigate?: () => void;
}

/**
 * The one place registration navigation is implemented. Reads primaryCtaHref
 * from src/config/event.ts — swap REGISTRATION_URL there for the real absolute
 * URL and every register button on the site follows, including target/rel
 * handling. Until then these buttons open the event tour rather than dropping
 * the visitor on the "details to be announced" panel.
 */
export default function RegisterLink({ children, className = 'btn', onNavigate }: RegisterLinkProps) {
  const external = isExternalRegistration;

  return (
    <a
      className={className}
      href={primaryCtaHref}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onClick={onNavigate}
    >
      {children}
    </a>
  );
}
