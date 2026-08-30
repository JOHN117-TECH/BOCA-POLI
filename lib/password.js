export const passwordOptions = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789#$%";

export function getPasswordStrength(password) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  const options = [
    { value: 18, label: "Muy débil", color: "bg-boca-danger" },
    { value: 42, label: "Débil", color: "bg-boca-warning" },
    { value: 70, label: "Aceptable", color: "bg-boca-secondary" },
    { value: 100, label: "Fuerte", color: "bg-boca-success" }
  ];

  return options[Math.max(0, score - 1)] ?? options[0];
}

