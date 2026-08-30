export default function FieldGroup({ title, children }) {
  return (
    <fieldset className="rounded-lg border border-boca-border bg-white p-4">
      <legend className="px-2 text-[18px] font-bold tracking-normal text-boca-text">{title}</legend>
      <div className="drawer-grid pt-2">{children}</div>
    </fieldset>
  );
}

