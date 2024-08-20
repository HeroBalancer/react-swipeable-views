// Extended version of % with negative integer support.
export function mod(n, m) {
  const q = n % m;
  return q < 0 ? q + m : q;
}
