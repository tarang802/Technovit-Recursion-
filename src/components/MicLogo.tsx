/**
 * Microsoft Innovations Club mark — the organising club's logo.
 *
 * Every placement on the site renders through this component, and the artwork
 * itself is a single file at public/assets/mic-logo.svg. Drop the official
 * vector in at that path and all placements update at once; nothing else needs
 * to change.
 */
interface MicLogoProps {
  className?: string;
  /**
   * Accessible name. Omit where the mark is decorative — i.e. where the club
   * name is already written out in adjacent text.
   */
  label?: string;
}

export default function MicLogo({ className = 'mic-logo', label }: MicLogoProps) {
  return (
    <img
      className={className}
      src="./assets/mic-logo.svg"
      alt={label ?? ''}
      aria-hidden={label ? undefined : true}
      width={160}
      height={112}
      decoding="async"
    />
  );
}
