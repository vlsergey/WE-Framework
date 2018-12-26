import AlphabeticalComparator from './AlphabeticalComparator';
import NaturalSortComparator from './NaturalSortComparator';
import TimeComparator from './TimeComparator';

const comparators = Object.freeze( [
  new AlphabeticalComparator(),
  new NaturalSortComparator(),
  new TimeComparator(),
] );
export default comparators;
