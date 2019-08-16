import { defaultMemoize } from 'reselect';
import { FieldShape } from './FormShapes';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

const filterByTerm = defaultMemoize( ( cache, sorted, originalTerm ) => {
  if ( !originalTerm || originalTerm.trim() === '' ) return sorted;
  const term = originalTerm.trim().toLowerCase();

  let toFilter = sorted.map( field => ( {
    ...field,
    ...cache[ field.property ],
  } ) );

  const result = [];

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
  filterImpl( item => item.label, value => value.startsWith( term ) );
  filterImpl( item => item.description, value => value.startsWith( term ) );
  filterImpl( item => item.label, value => value.indexOf( term ) !== -1 );
  filterImpl( item => item.description, value => value.indexOf( term ) !== -1 );

  return result.map( item => ( { property: item.property } ) );
} );

export default class FieldsFilterByTerm extends PureComponent {

  static propTypes = {
    children: PropTypes.func.isRequired,
    fields: PropTypes.arrayOf( PropTypes.shape( FieldShape ) ).isRequired,
    term: PropTypes.string.isRequired,
    propertyDescriptionCache: PropTypes.object.isRequired,
  };

  render() {
    const { children, fields, propertyDescriptionCache, term } = this.props;
    const result = filterByTerm( propertyDescriptionCache, fields, term );
    return children( result );
  }

}
