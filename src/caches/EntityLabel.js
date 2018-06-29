import React, { PureComponent } from 'react';
import LabelDescriptionProvider from './LabelDescriptionProvider';
import PropTypes from 'prop-types';

export default class EntityLabel extends PureComponent {

  static propTypes ={
    entityId: PropTypes.string.isRequired,
  }

  render() {
    const { entityId } = this.props;
    return <LabelDescriptionProvider entityId={entityId}>
      {labelDescription => ( labelDescription ? labelDescription.label : null ) || entityId }
    </LabelDescriptionProvider>;
  }

}
