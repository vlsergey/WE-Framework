import { Component } from 'react';
import { connect } from 'react-redux';
import expect from 'expect';
import PropTypes from 'prop-types';

class CacheValueProvider extends Component {

  static propTypes = {
    action: PropTypes.func,
    type: PropTypes.string.isRequired,
    cache: PropTypes.object.isRequired,
    cacheKey: PropTypes.string,
    children: PropTypes.func.isRequired,
    queue: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { cache, cacheKey, queue } = this.props;
    if ( !!cacheKey && typeof cache[ cacheKey ] === 'undefined' ) {
      queue( cacheKey );
    }
  }

  render() {
    const child = this.props.children;
    expect( child ).toBeA( 'function' );

    const { cacheKey, cache } = this.props;
    if ( !cacheKey )
      return child( null );

    return child( cache[ cacheKey ] );
  }

  componentDidUpdate( prevProps ) {
    const { cache, cacheKey, queue } = this.props;

    if ( prevProps.cacheKey !== cacheKey
        && !!cacheKey
        && typeof cache[ cacheKey ] === 'undefined' ) {
      queue( cacheKey );
    }
  }
}

const mapStateToProps = ( state, ownProps ) => ( {
  cache: state[ ownProps.type ].cache,
} );

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
  queue: cacheKey => dispatch( ownProps.action( cacheKey ) ),
} );

const CacheValueProviderConnected = connect( mapStateToProps, mapDispatchToProps )( CacheValueProvider );
export default CacheValueProviderConnected;
