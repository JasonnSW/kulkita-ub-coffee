export const mapUrgencyToLabel = (urgencyLevel: string) => {
  switch (urgencyLevel) {
    case "CRITICAL":
      return "Sangat Tinggi";
    case "HIGH":
      return "Tinggi";
    case "MEDIUM":
      return "Sedang";
    case "LOW":
      return "Kecil";
    default:
      return "-";
  }
};

export const mapUrgencyToColor = (urgencyLevel: string) => {
  switch (urgencyLevel) {
    case "CRITICAL":
      return "border-red-500 text-red-500";
    case "HIGH":
      return "border-orange-500 text-orange-500 ";
    case "MEDIUM":
      return "border-yellow-500 text-yellow-500";
    case "LOW":
      return "border-green-500 text-green-500";
    default:
      return "border-gray-500 text-gray-500";
  }
};

export const calculateProgress = (entryDate: string, expiryDate: string) => {
  const entry = new Date(entryDate).getTime();
  const expiry = new Date(expiryDate).getTime();

  if (expiry <= entry) {
    return 100;
  }

  const now = Date.now();
  const totalDuration = expiry - entry;
  const elapsed = now - entry;

  const progress = Math.min(
    100,
    Math.max(0, Math.round((elapsed / totalDuration) * 100))
  );

  return progress;
};
