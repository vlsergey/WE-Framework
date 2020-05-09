// @flow

import React, { PureComponent } from 'react';
import LabelDescriptionProvider from './LabelDescriptionProvider';
import PropTypes from 'prop-types';

export function constructLabel( entityId, labelDescription, appendEntityId ) {
  if ( !labelDescription || !labelDescription.label )
    return entityId;

  let result = labelDescription.label;
  if ( appendEntityId ) {
    result += ' (' + entityId + ')';
  }
  return result;
}

export default class EntityLabel extends PureComponent {

  static propTypes ={
    appendEntityId: PropTypes.bool,
    entityId: PropTypes.string.isRequired,
  }

  static defaultProps = {
    appendEntityId: false,
  }

  render() {
    const { appendEntityId, entityId } = this.props;
    if ( !entityId )
      return null;

    return <LabelDescriptionProvider entityId={entityId}>
      {labelDescription => constructLabel( entityId, labelDescription, appendEntityId )}
    </LabelDescriptionProvider>;
  }

}
