import { Component } from 'react';
import { connect } from 'react-redux';
import expect from 'expect';
import { propertyDescriptionQueue } from 'caches/actions';
import PropTypes from 'prop-types';

class PropertyDescriptionProvider extends Component {

  static propTypes = {
    cache: PropTypes.object.isRequired,
    children: PropTypes.func.isRequired,
    propertyId: PropTypes.string.isRequired,
    queue: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { cache, propertyId, queue } = this.props;
    if ( typeof cache[ propertyId ] === 'undefined' ) {
      queue( propertyId );
    }
  }

  render() {
    const child = this.props.children;
    expect( child ).toBeA( 'function' );

    const { propertyId, cache } = this.props;
    if ( !propertyId )
      return child( null );

    return child( cache[ propertyId ] );
  }

  componentDidUpdate( prevProps ) {
    const { cache, propertyId, queue } = this.props;

    if ( prevProps.propertyId !== this.props.propertyId
        && typeof cache[ propertyId ] === 'undefined' ) {
      queue( propertyId );
    }
  }
}

const mapStateToProps = state => ( {
  cache: state.PROPERTYDESCRIPTIONS.cache,
} );

const mapDispatchToProps = dispatch => ( {
  queue: key => dispatch( propertyDescriptionQueue( key ) ),
} );

const PropertyDescriptionProviderConnected = connect( mapStateToProps, mapDispatchToProps )( PropertyDescriptionProvider );
export default PropertyDescriptionProviderConnected;
