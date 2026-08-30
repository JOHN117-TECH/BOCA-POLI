import useStableFieldId from "../../hooks/useStableFieldId";

export default function TextAreaField({ label, value, onChange, required = false, help, error }) {
  const id = useStableFieldId(label);
  return (
    <div className="md:col-span-2">
      <label className="mb-1 block text-sm font-bold text-boca-text" htmlFor={id}>
        {label} {required && <span className="text-boca-danger" aria-label="obligatorio">*</span>}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={4}
        className={`w-full rounded-lg border bg-white px-3 py-2 text-base text-boca-text ${
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

