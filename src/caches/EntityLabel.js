import React, { PureComponent } from 'react';
import LabelDescriptionProvider from './LabelDescriptionProvider';
import PropTypes from 'prop-types';

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
      {labelDescription => {
        if ( !labelDescription )
          return entityId;

        let result = labelDescription.label;
        if ( appendEntityId ) {
          result += ' (' + entityId + ')';
        }
        return result;
      }}
    </LabelDescriptionProvider>;
  }

}
