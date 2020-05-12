// @flow

import { defaultMemoize } from 'reselect';
import type { FieldDefType } from 'editors/EditorDefModel';
import PropertyDescription from 'core/PropertyDescription';
import { PureComponent } from 'react';

type TempItemToFilter = {|
  description? : ?string,
  label? : ?string,
  property : string,
|};

const EMPTY_OBJECT : any = Object.freeze( {} );

const filterByTerm = defaultMemoize( (
  cache : Map< string, PropertyDescription >,
  sorted : FieldDefType[],
  originalTerm : ?string
) => {
  if ( !originalTerm || originalTerm.trim() === '' ) return sorted;
  const term = originalTerm.trim().toLowerCase();

  let toFilter : TempItemToFilter[] = sorted.map( field => ( {
    property: field.property,
    label: ( cache.get( field.property ) || EMPTY_OBJECT ).label,
    description: ( cache.get( field.property ) || EMPTY_OBJECT ).description,
  } ) );

  const result : FieldDefType[] = [];

  const filterImpl = ( fieldF, checkF ) => {
    toFilter = toFilter.filter( item => {
      const fieldValue = fieldF( item );
      if ( typeof fieldValue === 'string' && checkF( fieldValue.toLowerCase() ) ) {
        result.push( item );
        return false;
      }
      return true;
    } );
  };

  // TODO: aliases? other languages?
  filterImpl( item => item.property, value => value.startsWith( term ) );
  filterImpl( item => item.label, value => value.startsWith( term ) );
  filterImpl( item => item.description, value => value.startsWith( term ) );
  filterImpl( item => item.property, value => value.indexOf( term ) !== -1 );
  filterImpl( item => item.label, value => value.indexOf( term ) !== -1 );
  filterImpl( item => item.description, value => value.indexOf( term ) !== -1 );

  return result.map( item => ( { property: item.property } ) );
} );

type PropsType = {
  children : any => any,
  fields : FieldDefType[],
  propertyDescriptionCache : Map< string, PropertyDescription >,
  term : string,
};

export default class FieldsFilterByTerm extends PureComponent<PropsType> {

  render() {
    const { children, fields, propertyDescriptionCache, term } = this.props;
    const result = filterByTerm( propertyDescriptionCache, fields, term );
    return children( result );
  }

}
