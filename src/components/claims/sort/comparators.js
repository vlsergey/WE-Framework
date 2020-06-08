// @flow

import AlphabeticalComparator from './AlphabeticalComparator';
import { DatavalueComparator } from './DatavalueComparator';
import NaturalSortComparator from './NaturalSortComparator';
import TimeComparator from './TimeComparator';

const comparators : DatavalueComparator[] = Object.freeze( [
  new AlphabeticalComparator(),
  new NaturalSortComparator(),
  new TimeComparator(),
] );
export default comparators;
