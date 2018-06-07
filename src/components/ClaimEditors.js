import * as ModelUtils from '../model/ModelUtils';
import { emptyStatementClaim, Entity } from '../model/Shapes';
import React, { Component } from 'react';
import ClaimEditorTableRow from './ClaimEditorTableRow';
import PropTypes from 'prop-types';
import styles from './core.css';

export default class ClaimEditors extends Component {

  constructor() {
    super( ...arguments );
    this.state = {
      code: null,
      claims: null,
      label: null,
    };
  }

  render() {
    const { code, claims, label } = this.state;
    return <tbody className={styles.wef_property_editor_tbody + ' ' + styles[ 'wef_property_editor_' + code ]}>
      { !claims || claims.length === 0 
        ? <ClaimEditorTableRow claim={ emptyStatementClaim( code ) } label={label} />
        : claims.map( claim => <ClaimEditorTableRow claim={claim} key={claim.id} label={label} /> )
      }
    </tbody>;
  }

}

ClaimEditors.propTypes = {
  code: PropTypes.string.isRequired,
  entity: PropTypes.shape( Entity ),
  label: PropTypes.oneOfType( [ PropTypes.string, PropTypes.node ] ).isRequired,
};

ClaimEditors.getDerivedStateFromProps = ( nextProps ) => ( {
  claims: ModelUtils.filterClaims( nextProps.entity, nextProps.code ),
  code: nextProps.code,
  label: nextProps.label,
} );
