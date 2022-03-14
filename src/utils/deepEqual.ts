export default function deepEqual (a: any, b: any) {
  if (typeof a !== typeof b) return false;
  if (typeof a !== 'object' || typeof b !== 'object') {
    return a === b;
  }

  const aKeys = [];
  for (const aKey in a) aKeys.push(aKey);

  const bKeys = [];
  for (const bKey in b) bKeys.push(bKey);

  if (aKeys.length != bKeys.length) return false;
  aKeys.sort();
  bKeys.sort();

  for (let i = 0; i < aKeys.length; i++) {
    const aKey = aKeys[i] as string;
    if (aKey !== bKeys[i]) return false;
    if (!deepEqual(a[aKey], b[aKey])) return false;
  }
  return true;
}
