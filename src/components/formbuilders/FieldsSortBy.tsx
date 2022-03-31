import {PureComponent} from 'react';
import {defaultMemoize} from 'reselect';

import PropertyDescription from '../../core/PropertyDescription';
import {FieldDefType} from '../../editors/EditorDefModel';
import compare from '../../utils/compare';
import compareLanguageCodes from '../../utils/compareLanguageCodes';
import stableSort from '../../utils/stableSort';

const compareByLabel = (a: TempItemToSort, b: TempItemToSort) =>
  compare(a.label, b.label);
const compareByLanguageCodes = (a: TempItemToSort, b: TempItemToSort) =>
  compareLanguageCodes(a.languageCodes, b.languageCodes);

interface TempItemToSort {
  label?: string;
  languageCodes: readonly string[];
  property: string;
}

const sort = defaultMemoize((
  cache: Record< string, PropertyDescription >,
  fields: FieldDefType[],
  sortBy: string[]
) => {
  const toSort = fields.map<TempItemToSort>(field => ({
    property: field.property,
    label: cache[field.property]?.label || '',
    languageCodes: cache[field.property]?.languageCodes || [],
  }));

  for (let sortByIndex = sortBy.length - 1; sortByIndex >= 0; sortByIndex--) {
    const sortMethod = sortBy[sortByIndex];
    if (!sortMethod) continue;

    switch (sortMethod) {
    case 'language': stableSort(toSort, compareByLanguageCodes); break;
    case 'label': stableSort(toSort, compareByLabel); break;
    default: mw.log('Unknown sort method: ' + sortMethod); break;
    }
  }
  const result: FieldDefType[] = toSort.map(item => ({property: item.property}));
  return result;
});

interface PropsType {
  children: (fields: FieldDefType[]) => any;
  fields: FieldDefType[];
  propertyDescriptionCache: Record< string, PropertyDescription >;
  sortBy: string[];
}

export default class FieldsSortBy extends PureComponent<PropsType> {

  override render () {
    const {children, fields, propertyDescriptionCache, sortBy} = this.props;
    const sorted = !!sortBy && sortBy.length > 0 ? sort(propertyDescriptionCache, fields, sortBy) : fields;
    return children(sorted);
  }
}
