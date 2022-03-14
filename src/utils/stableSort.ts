export default function stableSort<T> (arr: T[], cmp: (a: T, b: T) => number): T[] {
  type WithIndex = [T, number];
  const stabilizedThis: WithIndex[] = arr.map((el, index) => [el, index]);
  const stableCmp = (a: WithIndex, b: WithIndex) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  };
  stabilizedThis.sort(stableCmp);
  for (let i = 0; i < arr.length; i++) {
    // @ts-expect-error
    arr[i] = stabilizedThis[i][0];
  }
  return arr;
}
