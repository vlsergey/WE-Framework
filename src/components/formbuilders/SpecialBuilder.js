import React, { PureComponent } from 'react';
import LanguageSelectContainer from 'components/labelalike/LanguageSelectContainer';
import PropTypes from 'prop-types';
import SparqlPropertyGroup from './SparqlPropertyGroup';

export default class SpecialBuilder extends PureComponent {

  static propTypes = {
    type: PropTypes.string.isRequired,
  };

  render() {
    const { type, ...etc } = this.props;

    switch ( type ) {
    case 'LabelsAndDescriptionArea': return <LanguageSelectContainer />;
    case 'SparqlPropertyGroup': return <SparqlPropertyGroup {...etc} />;
    default: return <span>unsupported special type: {type}</span>;
    }
  }

}
