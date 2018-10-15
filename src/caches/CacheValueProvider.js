import { connect } from 'react-redux';
import expect from 'expect';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

class CacheValueProvider extends PureComponent {

  static propTypes = {
    cacheData: PropTypes.object.isRequired,
    cacheKey: PropTypes.string,
    children: PropTypes.func.isRequired,
    isKeyValid: PropTypes.func.isRequired,
    queue: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { cacheData, cacheKey, isKeyValid, queue } = this.props;
    if ( isKeyValid( cacheKey ) && typeof cacheData[ cacheKey ] === 'undefined' ) {
      queue( cacheKey );
    }
  }

  render() {
    const child = this.props.children;
    expect( child ).toBeA( 'function' );

    const { cacheKey, cacheData, isKeyValid } = this.props;
    const result = isKeyValid( cacheKey )
      ? child( cacheData[ cacheKey ] )
      : child( null );

    return result || null;
  }

  componentDidUpdate( prevProps ) {
    const { cacheData, cacheKey, isKeyValid, queue } = this.props;

    if ( prevProps.cacheKey !== cacheKey
        && isKeyValid( cacheKey )
        && typeof cacheData[ cacheKey ] === 'undefined' ) {
      queue( cacheKey );
    }
  }
}

const mapStateToProps = ( state, ownProps ) => ( {
  cacheData: state[ ownProps.cache.type ].cache,
} );

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
  isKeyValid: cacheKey => ownProps.cache.isKeyValid( cacheKey ),
  queue: cacheKey => dispatch( ownProps.cache.actionQueue( [ cacheKey ] ) ),
} );

const CacheValueProviderConnected = connect( mapStateToProps, mapDispatchToProps )( CacheValueProvider );
export default CacheValueProviderConnected;
