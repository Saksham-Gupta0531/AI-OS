export default function AgentSpline() {
  return (
    <div
      className="
        absolute
        top-[-25px]
        right-[-148px]
        z-50
        w-[400px]
        h-[400px]
        pointer-events-auto
      "
    >
      <spline-viewer url={import.meta.env.VITE_SPLINE_URL} />
    </div>
  );
}
