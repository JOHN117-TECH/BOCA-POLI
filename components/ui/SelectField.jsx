import useStableFieldId from "../../hooks/useStableFieldId";

export default function SelectField({ label, value, onChange, options, required = false, error }) {
  const id = useStableFieldId(label);
  return (
    <div>
      <label className="mb-1 block text-sm font-bold text-boca-text" htmlFor={id}>
        {label} {required && <span className="text-boca-danger" aria-label="obligatorio">*</span>}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`min-h-[44px] w-full rounded-lg border bg-white px-3 text-base text-boca-text ${
          error ? "border-boca-danger" : "border-boca-border"
        }`}
        aria-invalid={Boolean(error)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option || "Seleccione una opción"}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-boca-danger">{error}</p>}
    </div>
  );
}

