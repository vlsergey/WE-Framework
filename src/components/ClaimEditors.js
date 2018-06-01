import * as ModelUtils from '../model/ModelUtils';
import React, { Component } from 'react';
import ClaimEditorTableRow from './ClaimEditorTableRow';
import { Entity } from '../model/Shapes';
import PropTypes from 'prop-types';
import styles from './core.css';

export default class ClaimEditors extends Component {

  constructor() {
    super( ...arguments );
    this.state = {
      code: null,
      claims: null,
    };
  }

  render() {
    const { code, claims } = this.state;
    return <tbody className={styles.wef_property_editor_tbody + ' ' + styles[ 'wef_property_editor_' + code ]}>
      { !claims || claims.length === 0 
        ? <ClaimEditorTableRow claim={{}} />
        : claims.map( claim => <ClaimEditorTableRow key={claim.id} claim={claim} /> )
      }
    </tbody>;
  }

}

ClaimEditors.propTypes = {
  entity: PropTypes.shape( Entity ),
  code: PropTypes.string,
};

ClaimEditors.getDerivedStateFromProps = ( nextProps ) => ( {
  code: nextProps.code,
  claims: ModelUtils.filterClaims( nextProps.entity, nextProps.code )
} );
