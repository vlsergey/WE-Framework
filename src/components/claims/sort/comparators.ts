import AlphabeticalComparator from './AlphabeticalComparator';
import {ComparatorCode, DatavalueComparator} from './DatavalueComparator';
import NaturalSortComparator from './NaturalSortComparator';
import TimeComparator from './TimeComparator';

export default Object.freeze({
  alphabetical: new AlphabeticalComparator(),
  naturalSort: new NaturalSortComparator(),
  time: new TimeComparator(),
}) as Readonly<Record<ComparatorCode, DatavalueComparator>>;
