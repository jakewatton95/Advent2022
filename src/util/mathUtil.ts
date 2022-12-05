// used on day 2 - we don't want the remainder (%) operator, we want mod
function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export default { mod };
