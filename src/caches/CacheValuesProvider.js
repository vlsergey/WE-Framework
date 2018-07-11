import { connect } from 'react-redux';
import expect from 'expect';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

const EMPTY_OBJECT = {};

class CacheValuesProvider extends PureComponent {

  static propTypes = {
    cacheData: PropTypes.object.isRequired,
    cacheKeys: PropTypes.arrayOf( PropTypes.string ),
    children: PropTypes.func.isRequired,
    queue: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { cacheData, cacheKeys, queue } = this.props;
    if ( cacheKeys ) {
      cacheKeys.forEach( cacheKey => {
        if ( typeof cacheData[ cacheKey ] === 'undefined' ) {
          queue( cacheKey );
        }
      } );
    }
  }

  previousResult = {}

  memoizeResult( cacheData, cacheKeys ) {
    let hasChanges = false;
    const newResult = {};
    cacheKeys.forEach( key => {
      newResult[ key ] = cacheData[ key ];
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

    const { cacheKeys, cacheData } = this.props;
    if ( !cacheKeys )
      return child( EMPTY_OBJECT );

    // limit cache return and memoize result for react speed-up
    const limitedCache = this.memoizeResult( cacheData, cacheKeys );
    return child( limitedCache );
  }

  componentDidUpdate( prevProps ) {
    const { cacheData, cacheKeys, queue } = this.props;

    if ( prevProps.cacheKeys !== cacheKeys
        && !!cacheKeys ) {
      cacheKeys.forEach( cacheKey => {
        if ( typeof cacheData[ cacheKey ] === 'undefined' ) {
          queue( cacheKey );
        }
      } );
    }
  }
}

const mapStateToProps = ( state, ownProps ) => ( {
  cacheData: state[ ownProps.cache.type ].cache,
} );

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
  queue: cacheKey => dispatch( ownProps.cache.actionQueue( cacheKey ) ),
} );

const CacheValuesProviderConnected = connect( mapStateToProps, mapDispatchToProps )( CacheValuesProvider );
export default CacheValuesProviderConnected;
