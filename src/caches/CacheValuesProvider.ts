import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import AbstractQueuedCache from './AbstractQueuedCache';

const EMPTY_OBJECT = Object.freeze({});

export type CacheType<Value> = { [key : string] : Value };

interface ExternalProps<Value> {
  cache: AbstractQueuedCache<unknown, unknown, Value>,
  children? : ( cache : CacheType<Value> ) => any
  cacheKeys : null | readonly string[]
}

interface PropsType<Value> {
  cacheData : any
  cacheKeys : null | readonly string[]
  children : ( cache : CacheType<Value> ) => any
  queue : (keys : string[]) => any
}

class CacheValuesProvider<Value> extends PureComponent<PropsType<Value>> {

  override componentDidMount() {
    const { cacheData, cacheKeys, queue } = this.props;
    if ( cacheKeys ) {
      const missing = cacheKeys.filter( cacheKey => cacheData[ cacheKey ] === undefined );
      if ( missing.length > 0 ) queue( missing );
    }
  }

  previousResult : CacheType<Value> = {}

  memoizeResult( cacheData : CacheType<Value>, cacheKeys : readonly string[] ) {
    let hasChanges = false;
    const newResult : CacheType<Value> = {};
    cacheKeys.forEach( key => {
      const newValue = cacheData[ key ];
      if (newValue !== undefined) {
        newResult[ key ] = newValue;
      }
      if ( this.previousResult[ key ] !== newValue ) {
        hasChanges = true;
      }
    } );
    if ( hasChanges ) {
      this.previousResult = newResult;
    }
    return this.previousResult;
  }

  override render() {
    const children = this.props.children;

    const { cacheKeys, cacheData } = this.props;
    if ( !cacheKeys || cacheKeys.length === 0 )
      return children( EMPTY_OBJECT );

    // limit cache return and memoize result for react speed-up
    const limitedCache = this.memoizeResult( cacheData, cacheKeys );
    return children( limitedCache );
  }

  override componentDidUpdate( prevProps : PropsType<Value> ) {
    const { cacheData, cacheKeys, queue } = this.props;

    if ( prevProps.cacheKeys !== cacheKeys
        && !!cacheKeys ) {
      const missing = cacheKeys.filter( cacheKey => cacheData[ cacheKey ] === undefined );
      if ( missing.length > 0 ) queue( missing );
    }
  }
}

const mapStateToProps = <V>( state : any, ownProps: ExternalProps<V> ) => ( {
  cacheData: state[ ownProps.cache.type ].cache,
} );

const mapDispatchToProps = <V>( dispatch: any, ownProps: ExternalProps<V> ) => ( {
  queue: (cacheKeys : string[]) => dispatch( ownProps.cache.actionQueue( cacheKeys ) ),
} );

export default connect(mapStateToProps, mapDispatchToProps)(CacheValuesProvider) as
  unknown as (new <Value>(props: ExternalProps<Value>) => React.Component<ExternalProps<Value>>);
// export default function ConnectedCacheValuesProvider<V>(props : ExternalProps<V>): React.ReactElement<ExternalProps<V>>{
//   return connect(mapStateToProps, mapDispatchToProps)(CacheValuesProvider)(props as any)!!;
// }
