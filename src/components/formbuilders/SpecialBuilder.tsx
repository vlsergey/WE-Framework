import type { LabelsAndDescriptionAreaSpecialGroup, SparqlSpecialGroup } from '../../editors/EditorDefModel';
import React, { PureComponent } from 'react';
import LanguageSelectContainer from '../labelalike/LanguageSelectContainer';
import SparqlPropertyGroup from './SparqlPropertyGroup';

type PropsType = SparqlSpecialGroup | LabelsAndDescriptionAreaSpecialGroup;

export default class SpecialBuilder extends PureComponent<PropsType> {

  override render() {
    const params = this.props;

    switch ( params.type ) {
    case 'LabelsAndDescriptionArea': {
      return <LanguageSelectContainer />;
    }
    case 'SparqlPropertyGroup': {
      return <SparqlPropertyGroup {...params} />;
    }
    }

  }

}
