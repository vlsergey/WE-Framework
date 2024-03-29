type Comparable = any;

export default function compare (a: Comparable, b: Comparable) {
  if (typeof a === 'undefined' && typeof b === 'undefined')
    return 0;
  if (typeof a === 'undefined' && typeof b !== 'undefined')
    return 1;
  if (typeof a !== 'undefined' && typeof b === 'undefined')
    return -1;

  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  }
  return 0;
}
