export type ComparatorCode =
  | 'alphabetical'
  | 'time'
  | 'naturalSort';

export interface DatavalueComparator {

  compare: (
    dv1: DataValueType | null | undefined,
    dv2: DataValueType | null | undefined,
    sortEmptyCompareConstant: number,
    sortOrderCompareConstant: number) => number;

  supports: (propertyId: string, exampleSnake: SnakType) => boolean | null;

}
