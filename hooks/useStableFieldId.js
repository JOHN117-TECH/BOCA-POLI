import { useId } from "react";

export default function useStableFieldId(label) {
  const reactId = useId().replace(/:/g, "");
  return `${makeId(label)}-${reactId}`;
}

function makeId(label) {
  return label
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

