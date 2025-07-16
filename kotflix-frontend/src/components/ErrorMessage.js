export default function ErrorMessage({
  message = "Ops, womething went wrong",
}) {
  return (
    <p className="error">
      <span>💢</span>
      {message}
    </p>
  );
}
