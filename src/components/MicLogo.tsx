/**
 * Microsoft Innovations Club mark — the organising club's logo.
 *
 * Every placement on the site renders through this component, and the artwork
 * itself is a single file in public/assets. Swap that file (and the aspect in
 * the --mic-h rule in globals.css if its proportions differ) and all
 * placements update at once; nothing else needs to change.
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
      src="./assets/mic_logo_pixel.png"
      alt={label ?? ''}
      aria-hidden={label ? undefined : true}
      width={220}
      height={159}
      decoding="async"
    />
  );
}
