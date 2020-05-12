// @flow

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import labelDescriptionCache from 'caches/labelDescriptionCache';
import PropTypes from 'prop-types';
import WikibaseItemInput from './WikibaseItemInput';

type PropsType = {
  cache : any,
  entityId? : ?string,
  inputRef? : any,
  onBlur : () => any,
  onChange : any => any,
  onFocus : () => any,
  queue : string => any,
  value? : string,
  wikibaseItemInputRef : any,
};

class LocalizedWikibaseItemInput extends PureComponent<PropsType> {

  componentDidMount() {
    const { cache, entityId, queue } = this.props;
    if ( !!entityId && typeof cache[ entityId ] === 'undefined' ) {
      queue( entityId );
    }
  }

  componentDidUpdate( prevProps : PropsType ) {
    const { cache, entityId, queue } = this.props;

    if ( prevProps.entityId !== this.props.entityId
        && !!entityId
        && typeof cache[ entityId ] === 'undefined' ) {
      queue( entityId );
    }
  }

  render() {
    /* eslint no-unused-vars: 0 */
    const { cache, entityId, queue, wikibaseItemInputRef, ...etc } = this.props;

    if ( !entityId ) {
      return <WikibaseItemInput
        {...etc}
        entityId={null}
        entityLabel={null}
        ref={wikibaseItemInputRef} />;
    }
    const labelDescription = cache[ entityId ];
    const entityLabel = labelDescription ? labelDescription.label : null;
    return <WikibaseItemInput
      {...etc}
      entityId={entityId}
      entityLabel={entityLabel}
      ref={wikibaseItemInputRef} />;

  }
}

const mapStateToProps = state => ( {
  cache: state.LABELDESCRIPTIONS.cache,
} );

const mapDispatchToProps = dispatch => ( {
  queue: key => dispatch( labelDescriptionCache.actionQueue( [ key ] ) ),
} );

// $FlowFixMe
const LocalizedWikibaseItemInputConnected = connect( mapStateToProps, mapDispatchToProps )( LocalizedWikibaseItemInput );
export default LocalizedWikibaseItemInputConnected;
