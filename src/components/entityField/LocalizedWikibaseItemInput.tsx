import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import labelDescriptionCache from '../../caches/labelDescriptionCache';
import WikibaseItemInput from './WikibaseItemInput';

interface ExternalProps {
  entityId: null | string;
  inputRef?: any;
  onBlur: () => unknown;
  onChange: () => unknown;
  onFocus: () => unknown;
  value?: string;
  wikibaseItemInputRef: any;
}

interface PropsType extends ExternalProps {
  cache: any;
  queue: (entityId: string) => any;
}

class LocalizedWikibaseItemInput extends PureComponent<PropsType> {

  override componentDidMount () {
    const {cache, entityId, queue} = this.props;
    if (!!entityId && typeof cache[entityId] === 'undefined') {
      queue(entityId);
    }
  }

  override componentDidUpdate (prevProps: PropsType) {
    const {cache, entityId, queue} = this.props;

    if (prevProps.entityId !== this.props.entityId
        && !!entityId
        && typeof cache[entityId] === 'undefined') {
      queue(entityId);
    }
  }

  override render () {
    const {cache, entityId, queue, wikibaseItemInputRef, ...etc} = this.props;

    if (!entityId) {
      return <WikibaseItemInput
        {...etc}
        entityId={null}
        entityLabel={null}
        ref={wikibaseItemInputRef} />;
    }
    const labelDescription = cache[entityId];
    const entityLabel = labelDescription ? labelDescription.label : null;
    return <WikibaseItemInput
      {...etc}
      entityId={entityId}
      entityLabel={entityLabel}
      ref={wikibaseItemInputRef} />;
  }
}

const mapStateToProps = (state: ReduxState, _ownProps: ExternalProps) => ({
  cache: state.LABELDESCRIPTIONS.cache,
});

const mapDispatchToProps = (dispatch: any, _ownProps: ExternalProps) => ({
  queue: (entityId: string) => dispatch(labelDescriptionCache.actionQueue([entityId])),
});

const LocalizedWikibaseItemInputConnected = connect(mapStateToProps, mapDispatchToProps)(LocalizedWikibaseItemInput);
export default LocalizedWikibaseItemInputConnected;
