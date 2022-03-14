import {defaultMemoize} from 'reselect';

import stableSort from '../../utils/stableSort';

const ok = (x: any) => x !== undefined && x !== null;
const EMPTY_ARRAY = Object.freeze([]);

const MAX_COLUMNS = 2;

const PREDEFINED_SORT = [
  'P580', // start time
  'P585', // point in time
  'P582', // end time
];

export const claimColumnsF = () => {

  const sortColumns : ((propertyIds: string[]) => string[]) =
   defaultMemoize(propertyIds => stableSort<string>(propertyIds, (c1: string, c2: string) => {
     let o1 = PREDEFINED_SORT.indexOf(c1);
     o1 = o1 === -1 ? PREDEFINED_SORT.length : o1;
     let o2 = PREDEFINED_SORT.indexOf(c2);
     o2 = o2 === -1 ? PREDEFINED_SORT.length : o2;
     return o1 === o2 ? 0 : o1 > o2 ? +1 : -1;
   }));

  return defaultMemoize((claims?: ClaimType[]): readonly string[] => {
    if (!claims) return EMPTY_ARRAY;

    if (claims.length < 5) {
      return EMPTY_ARRAY;
    }

    const qualifierStats: Map< string, number > = new Map();
    claims
      .map(claim => claim.qualifiers).filter(ok)
      .forEach(qualifiers => { Object.entries(qualifiers || {})
        .forEach(([propertyId, qualifiersArray]) => {
          const plus = (qualifiersArray || EMPTY_ARRAY).length > 0 ? 1 : 0;
          qualifierStats.set(propertyId, (qualifierStats.get(propertyId) || 0) + plus);
        }); }
      );

    const columns: string[] = [];
    while (columns.length < MAX_COLUMNS && qualifierStats.size !== 0) {
      const qualifierCounts: number[] = [...qualifierStats.values()];
      const allValues = qualifierCounts.sort((a: number, b: number) => b - a);
      const [max] = allValues;
      if ((max as number) < claims.length / 5.0) break;

      const countOfMax = allValues.filter(item => item === max).length;
      if (columns.length + countOfMax > MAX_COLUMNS) break;

      [...qualifierStats.keys()]
        .filter(propertyId => qualifierStats.get(propertyId) === max)
        .forEach(propertyId => {
          columns.push(propertyId);
          qualifierStats.delete(propertyId);
        });
    }

    return sortColumns(columns);
  });
};
