// @flow

import type { LabelsAndDescriptionAreaSpecialGroup, SparqlSpecialGroup } from 'editors/EditorDefModel';
import React, { PureComponent } from 'react';
import LanguageSelectContainer from 'components/labelalike/LanguageSelectContainer';
import SparqlPropertyGroup from './SparqlPropertyGroup';

type PropsType = SparqlSpecialGroup | LabelsAndDescriptionAreaSpecialGroup;

export default class SpecialBuilder extends PureComponent<PropsType> {

  render() {
    const params : SparqlSpecialGroup | LabelsAndDescriptionAreaSpecialGroup = this.props;

    switch ( params.type ) {
    case 'LabelsAndDescriptionArea': {
      return <LanguageSelectContainer />;
    }
    case 'SparqlPropertyGroup': {
      return <SparqlPropertyGroup {...params} />;
    }
    default: {
      return <span>unsupported special type: {params.type}</span>;
    }
    }

  }

}
