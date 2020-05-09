// @flow

import { DatavalueComparator } from './DatavalueComparator';

export default class TimeComparator implements DatavalueComparator {

  code = 'time';

  compare( dataValue1, dataValue2, sortEmptyCompareConstant, sortOrderCompareConstant ) {
    let v1 = ( ( dataValue1 || {} ).value || {} ).time || '';
    let v2 = ( ( dataValue2 || {} ).value || {} ).time || '';

    if ( v1 === '' && v2 === '' ) return 0;
    if ( v1 === '' && v2 !== '' ) return sortEmptyCompareConstant;
    if ( v1 !== '' && v2 === '' ) return -sortEmptyCompareConstant;
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
