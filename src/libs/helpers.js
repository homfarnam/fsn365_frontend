export function formatValue(rawValue) {
  let value;
  if (rawValue > 1000000) {
    value = (rawValue / Math.pow(10, 6)).toFixed(2) + "M";
  } else if (rawValue >= 1000) {
    value = (rawValue / Math.pow(10, 3)).toFixed(2) + "K";
  } else if (rawValue >= 0.55) {
    value = rawValue.toFixed(2);
  } else {
    value = rawValue.toFixed(4);
  }
  return value;
}
