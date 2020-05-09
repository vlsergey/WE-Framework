// @flow

import compare from 'utils/compare';
import compareLanguageCodes from 'utils/compareLanguageCodes';
import { defaultMemoize } from 'reselect';
import { PureComponent } from 'react';
import stableSort from 'utils/stableSort';

const compareByLabel = ( a, b ) => compare( a.label, b.label );

const compareByLanguageCodes = ( a, b ) => compareLanguageCodes( a.languageCodes, b.languageCodes );

const sort = defaultMemoize( ( cache, fields, sortBy ) => {
  const result = fields.map( field => ( {
    ...field,
    ...cache[ field.property ],
  } ) );
  for ( let sortByIndex = sortBy.length - 1; sortByIndex >= 0; sortByIndex-- ) {
    const sortMethod = sortBy[ sortByIndex ];
    if ( !sortMethod ) continue;

    switch ( sortMethod ) {
    case 'language': stableSort( result, compareByLanguageCodes ); break;
    case 'label': stableSort( result, compareByLabel ); break;
    default: mw.log( 'Unknown sort method: ' + sortMethod ); break;
    }
  }
  return result.map( item => ( { property: item.property } ) );
} );

type PropsType = {
  children : any => any,
  fields : FieldDefType[],
  propertyDescriptionCache : any,
  sortBy? : ?( string[] ),
};

export default class FieldsSortBy extends PureComponent<PropsType> {

  render() {
    const { children, fields, propertyDescriptionCache, sortBy } = this.props;
    const sorted = !!sortBy && sortBy.length > 0 ? sort( propertyDescriptionCache, fields, sortBy ) : fields;
    return children( sorted );
  }
}
