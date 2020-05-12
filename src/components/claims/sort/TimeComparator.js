// @flow

import { DatavalueComparator } from './DatavalueComparator';

const EMPTY_OBJECT : any = Object.freeze( {} );
const EMPTY_STRING : string = '';

export default class TimeComparator implements DatavalueComparator {

  code = 'time';

  compare(
    dataValue1 : ?DataValueType,
    dataValue2 : ?DataValueType,
    sortEmptyCompareConstant : number,
    sortOrderCompareConstant : number
  ) : number {
    let v1 : string = ( ( dataValue1 || EMPTY_OBJECT ).value || EMPTY_OBJECT ).time || EMPTY_STRING;
    let v2 : string = ( ( dataValue2 || EMPTY_OBJECT ).value || EMPTY_OBJECT ).time || EMPTY_STRING;

    if ( v1 === EMPTY_STRING && v2 === EMPTY_STRING ) return 0;
    if ( v1 === EMPTY_STRING && v2 !== EMPTY_STRING ) return sortEmptyCompareConstant;
    if ( v1 !== EMPTY_STRING && v2 === EMPTY_STRING ) return -sortEmptyCompareConstant;
    v1 = v1.replace( /^[+-]\d+-/, s => s.padStart( 15, '0' ) );
    v2 = v2.replace( /^[+-]\d+-/, s => s.padStart( 15, '0' ) );
    return v1 === v2 ? 0 : v1 > v2 ? sortOrderCompareConstant : -sortOrderCompareConstant;
  }

  supports( propertyId : string, exampleSnak : SnakType ) {
    const datatype = exampleSnak.datatype || null;
    if ( datatype === 'time' ) return true;
    if ( datatype !== 'time' ) return false;
    return null;
  }

}
