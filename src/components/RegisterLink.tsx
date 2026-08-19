import type { ReactNode } from 'react';
import { REGISTRATION_URL, isExternalRegistration } from '../config/event';

interface RegisterLinkProps {
  children: ReactNode;
  className?: string;
  onNavigate?: () => void;
}

/**
 * The one place registration navigation is implemented. Reads
 * REGISTRATION_URL from src/config/event.ts — swap that single constant and
 * every register button on the site follows, including target/rel handling.
 */
export default function RegisterLink({ children, className = 'btn', onNavigate }: RegisterLinkProps) {
  const external = isExternalRegistration;

  return (
    <a
      className={className}
      href={REGISTRATION_URL}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onClick={onNavigate}
    >
      {children}
    </a>
  );
}
