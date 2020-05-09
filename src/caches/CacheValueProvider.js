// @flow

import { connect } from 'react-redux';
import { PureComponent } from 'react';

type PropsType = {
  cacheData : any,
  cacheKey? : ?string,
  children : any => any,
  isKeyValid : any => boolean,
  queue : any => any,
};

class CacheValueProvider extends PureComponent<PropsType> {

  componentDidMount() {
    const { cacheData, cacheKey, isKeyValid, queue } = this.props;
    if ( isKeyValid( cacheKey ) && typeof cacheData[ cacheKey ] === 'undefined' ) {
      queue( cacheKey );
    }
  }

  render() {
    const children : ( any => any ) = this.props.children;

    const { cacheKey, cacheData, isKeyValid } = this.props;
    const result = isKeyValid( cacheKey )
      ? children( cacheData[ cacheKey ] )
      : children( null );

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
