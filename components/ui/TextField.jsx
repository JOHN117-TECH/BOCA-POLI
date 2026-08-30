import useStableFieldId from "../../hooks/useStableFieldId";

export default function TextField({ label, value, onChange, type = "text", required = false, help, error }) {
  const id = useStableFieldId(label);
  return (
    <div>
      <label className="mb-1 block text-sm font-bold text-boca-text" htmlFor={id}>
        {label} {required && <span className="text-boca-danger" aria-label="obligatorio">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`min-h-[44px] w-full rounded-lg border bg-white px-3 text-base text-boca-text ${
          error ? "border-boca-danger" : "border-boca-border"
        }`}
        aria-invalid={Boolean(error)}
        aria-describedby={help || error ? `${id}-support` : undefined}
      />
      {(help || error) && (
        <p id={`${id}-support`} className={`mt-1 text-sm ${error ? "text-boca-danger" : "text-boca-muted"}`}>
          {error || help}
        </p>
      )}
    </div>
  );
}

