import { defaultMemoize } from 'reselect';
import type { FieldDefType } from '../../editors/EditorDefModel';
import PropertyDescription from '../../core/PropertyDescription';
import { PureComponent } from 'react';

type TempItemToFilter = {
  description? : string,
  label? : string,
  property : string,
};

const filterByTerm = defaultMemoize( (
  cache : Record< string, PropertyDescription >,
  sorted : FieldDefType[],
  originalTerm : string | null
) : FieldDefType[] => {
  if ( !originalTerm || originalTerm.trim() === '' ) return sorted;
  const term = originalTerm.trim().toLowerCase();

  let toFilter = sorted.map<TempItemToFilter>( field => ( {
    property: field.property,
    label: cache[ field.property]?.label,
    description: cache[ field.property]?.description,
  } ) );

  const tempResult : TempItemToFilter[] = [];

  type GetterType = (item : TempItemToFilter) => any;
  type CheckerType = (str : string) => boolean;

  const filterImpl = ( fieldF : GetterType, checkF : CheckerType ) => {
    toFilter = toFilter.filter( item => {
      const fieldValue = fieldF( item );
      if ( typeof fieldValue === 'string' && checkF( fieldValue.toLowerCase() ) ) {
        tempResult.push( item );
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

  const result : FieldDefType[] = tempResult.map( item => ( { property: item.property } ) );
  return result;
} );

type PropsType = {
  children : (filtered : FieldDefType[]) => JSX.Element,
  fields : FieldDefType[],
  propertyDescriptionCache : Record< string, PropertyDescription >,
  term : string,
};

export default class FieldsFilterByTerm extends PureComponent<PropsType> {

  override render() {
    const { children, fields, propertyDescriptionCache, term } = this.props;
    const result = filterByTerm( propertyDescriptionCache, fields, term );
    return children( result );
  }

}
