import { Search } from "lucide-react";
import useStableFieldId from "../../hooks/useStableFieldId";

export default function SearchField({ label, placeholder, value, onChange }) {
  const id = useStableFieldId(label);
  return (
    <div>
      <label className="mb-1 block text-sm font-bold text-boca-text" htmlFor={id}>
        {label}
      </label>
      <div className="flex min-h-[44px] items-center gap-2 rounded-lg border border-boca-border bg-white px-3">
        <Search className="h-5 w-5 shrink-0 text-boca-muted" />
        <input
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 border-0 bg-transparent text-base outline-none"
        />
      </div>
    </div>
  );
}

