import { connect } from 'react-redux';
import expect from 'expect';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

const EMPTY_OBJECT = {};

class CacheValuesProvider extends PureComponent {

  static propTypes = {
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

  previousResult = {}

  memoizeResult( cache, cacheKeys ) {
    let hasChanges = false;
    const newResult = {};
    cacheKeys.forEach( key => {
      newResult[ key ] = cache[ key ];
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
    const child = this.props.children;
    expect( child ).toBeA( 'function' );

    const { cacheKeys, cache } = this.props;
    if ( !cacheKeys )
      return child( EMPTY_OBJECT );

    // limit cache return and memoize result for react speed-up
    const limitedCache = this.memoizeResult( cache, cacheKeys );
    return child( limitedCache );
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
