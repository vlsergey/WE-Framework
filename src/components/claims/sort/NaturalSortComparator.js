// @flow

import { DatavalueComparator } from './DatavalueComparator';

const EMPTY_OBJECT : any = Object.freeze( {} );
const EMPTY_STRING : string = '';

export default class NaturalSortComparator implements DatavalueComparator {

  code = 'naturalSort';

  compare(
    dataValue1 : ?DataValueType,
    dataValue2 : ?DataValueType,
    sortEmptyCompareConstant : number,
    sortOrderCompareConstant : number
  ) : number {
    const v1 = ( dataValue1 || EMPTY_OBJECT ).value || EMPTY_STRING;
    const v2 = ( dataValue2 || EMPTY_OBJECT ).value || EMPTY_STRING;

    if ( v1 === EMPTY_STRING && v2 === EMPTY_STRING ) return 0;
    if ( v1 === EMPTY_STRING && v2 !== EMPTY_STRING ) return sortEmptyCompareConstant;
    if ( v1 !== EMPTY_STRING && v2 === EMPTY_STRING ) return -sortEmptyCompareConstant;

    return v1 === v2
      ? 0
      : v1.localeCompare( v2, undefined, { numeric: true, sensitivity: 'base' } ) * sortOrderCompareConstant;
  }

  supports( propertyId : string, exampleSnak : SnakType ) {
    const datatype = exampleSnak.datatype || null;
    if ( datatype === 'string' ) return true;
    if ( datatype !== 'string' ) return false;
    return null;
  }

}
