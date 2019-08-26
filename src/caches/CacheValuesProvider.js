import { connect } from 'react-redux';
import { PureComponent } from 'react';

const EMPTY_OBJECT = {};

type PropsType = {
  cacheData : any,
  cacheKeys? : ?string[],
  children : any => any,
  queue : any => any,
};

class CacheValuesProvider extends PureComponent<PropsType> {

  componentDidMount() {
    const { cacheData, cacheKeys, queue } = this.props;
    if ( cacheKeys ) {
      const missing = cacheKeys.filter( cacheKey => cacheData[ cacheKey ] === undefined );
      if ( missing.length > 0 ) queue( missing );
    }
  }

  previousResult = {}

  memoizeResult( cacheData, cacheKeys ) {
    let hasChanges = false;
    const newResult = {};
    cacheKeys.forEach( key => {
      newResult[ key ] = cacheData[ key ] || null;
      if ( this.previousResult[ key ] !== newResult[ key ] ) {
        hasChanges = true;
      }
    } );
    if ( hasChanges ) {
      this.previousResult = newResult;
    }
    return this.previousResult;
  }

  render() {
    const children = this.props.children;

    const { cacheKeys, cacheData } = this.props;
    if ( !cacheKeys || cacheKeys.length === 0 )
      return children( EMPTY_OBJECT );

    // limit cache return and memoize result for react speed-up
    const limitedCache = this.memoizeResult( cacheData, cacheKeys );
    return children( limitedCache );
  }

  componentDidUpdate( prevProps ) {
    const { cacheData, cacheKeys, queue } = this.props;

    if ( prevProps.cacheKeys !== cacheKeys
        && !!cacheKeys ) {
      const missing = cacheKeys.filter( cacheKey => cacheData[ cacheKey ] === undefined );
      if ( missing.length > 0 ) queue( missing );
    }
  }
}

const mapStateToProps = ( state, ownProps ) => ( {
  cacheData: state[ ownProps.cache.type ].cache,
} );

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
  queue: cacheKeys => dispatch( ownProps.cache.actionQueue( cacheKeys ) ),
} );

const CacheValuesProviderConnected = connect( mapStateToProps, mapDispatchToProps )( CacheValuesProvider );
export default CacheValuesProviderConnected;
