export default function InfoItem({ label, value }) {
  return (
    <div className="rounded-lg border border-boca-border bg-white p-4">
      <dt className="text-sm font-bold text-boca-muted">{label}</dt>
      <dd className="mt-1 text-base font-bold text-boca-text">{value}</dd>
    </div>
  );
}

