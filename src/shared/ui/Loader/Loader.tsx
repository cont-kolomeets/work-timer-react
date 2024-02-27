export function Loader({ size }: { size?: "s" | "m" }) {
  return (
    <div className="wt-stretched wt-flex-row wt-flex-center">
      <div
        className="spinner-border text-warning"
        style={{
          width: size === "s" ? "20px" : "",
          height: size === "s" ? "20px" : "",
        }}
      ></div>
    </div>
  );
}
