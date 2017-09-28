export function datapoint(x) {
  return 8000 * Math.cos(x * 180 / Math.PI) + Math.random() * 20000;
}

export function generateData(weeks) {
  const days = (weeks || 6) * 7;
  const result = [];
  for (let i = 0; i < days; i++) {
    const date = new Date(2017, 5, 11, 0);
    date.setDate(date.getDate() + i);
    result.push({
      date,
      confirmed: datapoint(i) + 12000,
      unconfirmed: datapoint(i + 2) + 12000
    });
  }
  return result;
}

export function clamp(value, min, max) {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

export function dateCompare(d1, d2) {
  return d1.toLocaleDateString() === d2.toLocaleDateString();
}
