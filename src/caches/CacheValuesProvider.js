import { Component } from 'react';
import { connect } from 'react-redux';
import expect from 'expect';
import PropTypes from 'prop-types';

const EMPTY_OBJECT = {};

class CacheValuesProvider extends Component {

  static propTypes = {
    action: PropTypes.func,
    type: PropTypes.string.isRequired,
    cache: PropTypes.object.isRequired,
    cacheKeys: PropTypes.arrayOf( PropTypes.string ),
    children: PropTypes.func.isRequired,
    queue: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { cache, cacheKeys, queue } = this.props;
    if ( cacheKeys ) {
      cacheKeys.forEach( cacheKey => {
        if ( typeof cache[ cacheKey ] === 'undefined' ) {
          queue( cacheKey );
        }
      } );
    }
  }

  render() {
    const child = this.props.children;
    expect( child ).toBeA( 'function' );

    const { cacheKeys, cache } = this.props;
    if ( !cacheKeys )
      return child( EMPTY_OBJECT );

    // it's okay to return the whole cache
    return child( cache );
  }

  componentDidUpdate( prevProps ) {
    const { cache, cacheKeys, queue } = this.props;

    if ( prevProps.cacheKeys !== cacheKeys
        && !!cacheKeys ) {
      cacheKeys.forEach( cacheKey => {
        if ( typeof cache[ cacheKey ] === 'undefined' ) {
          queue( cacheKey );
        }
      } );
    }
  }
}

const mapStateToProps = ( state, ownProps ) => ( {
  cache: state[ ownProps.type ].cache,
} );

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
  queue: cacheKey => dispatch( ownProps.action( cacheKey ) ),
} );

const CacheValuesProviderConnected = connect( mapStateToProps, mapDispatchToProps )( CacheValuesProvider );
export default CacheValuesProviderConnected;
