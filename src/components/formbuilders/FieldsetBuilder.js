import React, { PureComponent } from 'react';
import ChildrenBuilder from './ChildrenBuilder';
import EntityLabel from 'caches/EntityLabel';
import { FieldsetShape } from './FormShapes';
import PropTypes from 'prop-types';

export default class FieldsetBuilder extends PureComponent {

  static propTypes = {
    fieldset: PropTypes.shape( FieldsetShape ).isRequired,
  };

  render() {
    const { fieldset } = this.props;
    const { label, labelEntityId, ...etc } = fieldset;

    return <fieldset>
      { label && <legend>{label}</legend> }
      { labelEntityId && <legend>
        <EntityLabel entityId={labelEntityId} />
      </legend> }
      <ChildrenBuilder parentLabelEntityId={labelEntityId} {...etc} />
    </fieldset>;
  }

}
