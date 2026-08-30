export default function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex min-h-[54px] cursor-pointer items-center justify-between gap-3 rounded-lg border border-boca-border bg-white px-3">
      <span className="text-sm font-bold text-boca-text">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-5 w-5 accent-boca-secondary"
      />
    </label>
  );
}

