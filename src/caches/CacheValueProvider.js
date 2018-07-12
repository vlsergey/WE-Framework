import { connect } from 'react-redux';
import expect from 'expect';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

class CacheValueProvider extends PureComponent {

  static propTypes = {
    cacheData: PropTypes.object.isRequired,
    cacheKey: PropTypes.string,
    children: PropTypes.func.isRequired,
    queue: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { cacheData, cacheKey, queue } = this.props;
    if ( !!cacheKey && typeof cacheData[ cacheKey ] === 'undefined' ) {
      queue( cacheKey );
    }
  }

  render() {
    const child = this.props.children;
    expect( child ).toBeA( 'function' );

    const { cacheKey, cacheData } = this.props;
    const result = cacheKey
      ? child( cacheData[ cacheKey ] )
      : child( null );

    return result || null;
  }

  componentDidUpdate( prevProps ) {
    const { cacheData, cacheKey, queue } = this.props;

    if ( prevProps.cacheKey !== cacheKey
        && !!cacheKey
        && typeof cacheData[ cacheKey ] === 'undefined' ) {
      queue( cacheKey );
    }
  }
}

const mapStateToProps = ( state, ownProps ) => ( {
  cacheData: state[ ownProps.cache.type ].cache,
} );

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
  queue: cacheKey => dispatch( ownProps.cache.actionQueue( [ cacheKey ] ) ),
} );

const CacheValueProviderConnected = connect( mapStateToProps, mapDispatchToProps )( CacheValueProvider );
export default CacheValueProviderConnected;
