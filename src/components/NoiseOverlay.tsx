/** Fixed film grain + vignette. Purely decorative, never intercepts pointers. */
export default function NoiseOverlay() {
  return (
    <>
      <div className="noise" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
    </>
  );
}
