import {PureComponent} from 'react';
import {connect} from 'react-redux';

import AbstractQueuedCache from './AbstractQueuedCache';

type KeyType = number | string;

interface ExternalPropsType<V> {
  cache: AbstractQueuedCache<unknown, unknown, V>;
  cacheKey: KeyType | null;
  children: (value?: V) => any;
}

interface PropsType<V> extends ExternalPropsType<V> {
  cacheData: any;
  isKeyValid: (key: KeyType) => boolean;
  queue: (key: KeyType) => any;
}

class CacheValueProvider<V> extends PureComponent<PropsType<V>> {

  override componentDidMount () {
    const {cacheData, cacheKey, isKeyValid, queue} = this.props;
    if (cacheKey !== null && cacheKey !== undefined && isKeyValid(cacheKey)
        && cacheData[cacheKey] === undefined) {
      queue(cacheKey);
    }
  }

  override render () {
    const children = this.props.children;

    const {cacheKey, cacheData, isKeyValid} = this.props;

    const result = cacheKey !== null && cacheKey !== undefined && isKeyValid(cacheKey)
      ? children(cacheData[cacheKey])
      : children();

    return result || null;
  }

  override componentDidUpdate (prevProps: PropsType<V>) {
    const {cacheData, cacheKey, isKeyValid, queue} = this.props;

    if (prevProps.cacheKey !== cacheKey
        && (cacheKey !== null && cacheKey !== undefined && isKeyValid(cacheKey))
        && typeof cacheData[cacheKey] === 'undefined') {
      queue(cacheKey);
    }
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  cacheData: state[ownProps.cache.type].cache,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  isKeyValid: (cacheKey: KeyType) => ownProps.cache.isKeyValid(cacheKey),
  queue: (cacheKey: number | string) => dispatch(ownProps.cache.actionQueue([cacheKey])),
});

export default connect(mapStateToProps, mapDispatchToProps)(CacheValueProvider) as
  unknown as (new <Value>(props: ExternalPropsType<Value>) => React.Component<ExternalPropsType<Value>>);

// export default function ConnectedCacheValueProvider<V>(props : ExternalPropsType<V>): React.ReactElement<ExternalPropsType<V>>{
//   return connect(mapStateToProps, mapDispatchToProps)(CacheValueProvider)(props as any)!!;
// }
