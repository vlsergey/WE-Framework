// @flow

import { connect } from 'react-redux';
import { PureComponent } from 'react';

type KeyType = number | string;
type ValueType = any;

type PropsType = {
  cacheData : any,
  cacheKey : ?KeyType,
  children : ?ValueType => any,
  isKeyValid : KeyType => boolean,
  queue : KeyType => any,
};

class CacheValueProvider extends PureComponent<PropsType> {

  componentDidMount() {
    const { cacheData, cacheKey, isKeyValid, queue } = this.props;
    if ( cacheKey !== null && cacheKey !== undefined && isKeyValid( cacheKey )
        && cacheData[ cacheKey ] === undefined ) {
      queue( cacheKey );
    }
  }

  render() {
    const children : ( any => any ) = this.props.children;

    const { cacheKey, cacheData, isKeyValid } = this.props;

    const result = ( cacheKey !== null && cacheKey !== undefined && isKeyValid( cacheKey ) )
      ? children( cacheData[ cacheKey ] )
      : children( null );

    return result || null;
  }

  componentDidUpdate( prevProps : PropsType ) {
    const { cacheData, cacheKey, isKeyValid, queue } = this.props;

    if ( prevProps.cacheKey !== cacheKey
        && ( cacheKey !== null && cacheKey !== undefined && isKeyValid( cacheKey ) )
        && typeof cacheData[ cacheKey ] === 'undefined' ) {
      queue( cacheKey );
    }
  }
}

const mapStateToProps = ( state, ownProps ) => ( {
  cacheData: state[ ownProps.cache.type ].cache,
} );

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
  isKeyValid: ( cacheKey : KeyType ) => ownProps.cache.isKeyValid( cacheKey ),
  queue: cacheKey => dispatch( ownProps.cache.actionQueue( [ cacheKey ] ) ),
} );

// $FlowFixMe
const CacheValueProviderConnected = connect( mapStateToProps, mapDispatchToProps )( CacheValueProvider );
export default CacheValueProviderConnected;
