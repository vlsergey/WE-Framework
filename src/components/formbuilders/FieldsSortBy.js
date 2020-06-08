// @flow

import compare from 'utils/compare';
import compareLanguageCodes from 'utils/compareLanguageCodes';
import { defaultMemoize } from 'reselect';
import type { FieldDefType } from 'editors/EditorDefModel';
import PropertyDescription from 'core/PropertyDescription';
import { PureComponent } from 'react';
import stableSort from 'utils/stableSort';

const compareByLabel = ( a, b ) => compare( a.label, b.label );
const compareByLanguageCodes = ( a, b ) => compareLanguageCodes( a.languageCodes, b.languageCodes );

const EMPTY_ARRAY : any[] = Object.freeze( [] );
const EMPTY_OBJECT : any = Object.freeze( {} );

type TempItemToSort = {|
  label? : ?string,
  languageCodes : string[],
  property : string,
|};

const sort = defaultMemoize( (
  cache : Map< string, PropertyDescription >,
  fields : FieldDefType[],
  sortBy : string[]
) => {
  const toSort : TempItemToSort[] = fields.map( field => ( {
    property: field.property,
    label: ( cache.get( field.property ) || EMPTY_OBJECT ).label || '',
    languageCodes: ( cache.get( field.property ) || EMPTY_OBJECT ).languageCodes || EMPTY_ARRAY,
  } ) );

  for ( let sortByIndex = sortBy.length - 1; sortByIndex >= 0; sortByIndex-- ) {
    const sortMethod = sortBy[ sortByIndex ];
    if ( !sortMethod ) continue;

    switch ( sortMethod ) {
    case 'language': stableSort( toSort, compareByLanguageCodes ); break;
    case 'label': stableSort( toSort, compareByLabel ); break;
    default: mw.log( 'Unknown sort method: ' + sortMethod ); break;
    }
  }
  const result : FieldDefType[] = toSort.map( item => ( { property: item.property } ) );
  return result;
} );

type PropsType = {
  children : any => any,
  fields : FieldDefType[],
  propertyDescriptionCache : Map< string, PropertyDescription >,
  sortBy? : ?( string[] ),
};

export default class FieldsSortBy extends PureComponent<PropsType> {

  render() {
    const { children, fields, propertyDescriptionCache, sortBy } = this.props;
    const sorted = !!sortBy && sortBy.length > 0 ? sort( propertyDescriptionCache, fields, sortBy ) : fields;
    return children( sorted );
  }
}
