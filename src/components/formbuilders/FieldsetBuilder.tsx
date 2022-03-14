import React, {PureComponent} from 'react';

import EntityLabel from '../../caches/EntityLabel';
import {FieldsetDefType} from '../../editors/EditorDefModel';
import ChildrenBuilder from './ChildrenBuilder';

interface PropsType {
  fieldset: FieldsetDefType;
}

export default class FieldsetBuilder extends PureComponent<PropsType> {

  override render () {
    const {fieldset} = this.props;
    const {label, labelEntityId, ...etc} = fieldset;

    return <fieldset>
      { label && <legend>{label}</legend> }
      { labelEntityId && <legend>
        <EntityLabel entityId={labelEntityId} />
      </legend> }
      <ChildrenBuilder {...etc} parentLabelEntityId={labelEntityId} />
    </fieldset>;
  }

}
