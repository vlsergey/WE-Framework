// @flow

import React, { PureComponent } from 'react';
import ChildrenBuilder from './ChildrenBuilder';
import EntityLabel from 'caches/EntityLabel';
import type { FieldsetDefType } from 'editors/EditorDefModel';

type PropsType = {
  fieldset : FieldsetDefType,
};

export default class FieldsetBuilder extends PureComponent<PropsType> {

  render() {
    const { fieldset } = this.props;
    const { label, labelEntityId, ...etc } = fieldset;

    return <fieldset>
      { label && <legend>{label}</legend> }
      { labelEntityId && <legend>
        <EntityLabel entityId={labelEntityId} />
      </legend> }
      <ChildrenBuilder {...etc} parentLabelEntityId={labelEntityId} />
    </fieldset>;
  }

}
