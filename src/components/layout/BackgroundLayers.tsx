export function BackgroundLayers() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 grid-bg" aria-hidden />
      <div className="noise-bg pointer-events-none fixed inset-0 z-0" aria-hidden />
    </>
  );
}
