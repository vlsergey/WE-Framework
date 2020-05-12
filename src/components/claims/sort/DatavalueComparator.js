// @flow

export interface DatavalueComparator {

  code : string,

  compare(
    dv1 : ?DataValueType,
    dv2 : ?DataValueType,
    sortEmptyCompareConstant : number,
    sortOrderCompareConstant : number ) : number,

  supports( propertyId : string, exampleSnake : SnakType ) : ?boolean,

}
