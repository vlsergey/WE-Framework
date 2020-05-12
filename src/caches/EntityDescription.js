// @flow

import React, { PureComponent } from 'react';
import LabelDescription from './LabelDescription';
import LabelDescriptionProvider from './LabelDescriptionProvider';

const EMPTY_OBJECT : any = Object.freeze( {} );

export function constructDescription( labelDescription : ?LabelDescription ) {
  return ( labelDescription || EMPTY_OBJECT ).description || null;
}

type PropsType = {
  entityId? : ?string,
};

export default class EntityLabel extends PureComponent<PropsType> {

  render() {
    const { entityId } = this.props;
    if ( !entityId ) return null;

    return <LabelDescriptionProvider entityId={entityId}>
      {constructDescription}
    </LabelDescriptionProvider>;
  }

}
