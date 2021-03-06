export function formatValue(rawValue) {
  let value;
  if (rawValue > 1000000) {
    value = (rawValue / Math.pow(10, 6)).toFixed(2) + "M";
  } else if (rawValue >= 1000) {
    value = (rawValue / Math.pow(10, 3)).toFixed(2) + "k";
  } else if (rawValue >= 0.55) {
    try {
      value = rawValue.toFixed(2);
    } catch {}
  } else {
    try {
      value = rawValue.toFixed(4);
    } catch {}
  }
  return value;
}
