import * as Shapes from '../model/Shapes';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectSnakTypeButtonCell from './SelectSnakTypeButtonCell';
import SnakValueEditorFactory from './SnakValueEditorFactory';
import styles from './core.css';

export default class SnakEditorTableRowPart extends Component {

  constructor() {
    super( ...arguments );
    this.state = {
      hiddenBehindLabel: false,
    };
    this.showFromBehindLabel = this.showFromBehindLabel.bind( this );
  }

  showFromBehindLabel() {
    this.setState( {
      hiddenBehindLabel: false,
    } );
  }

  render() {
    const { hiddenBehindLabel } = this.state;
    const { onChange, snak } = this.props;

    if ( hiddenBehindLabel ) {
      return snak.snaktype === 'value'
        ? [ <td key="snaktype" />, <SnakValueEditorFactory className={styles.wef_snak_replacement_label} key="valueEditor" mode="label" onChange={onChange} onClick={this.showFromBehindLabel} snak={snak} /> ]
        : <td colSpan="13"><span className={styles.wef_snak_replacement_label} onClick={this.showFromBehindLabel}>i18n.snakValue[ snak.snaktype ]</span></td>;
    }
    
    return [
      <SelectSnakTypeButtonCell key="snaktype" rank={snak.snaktype} />,
      <SnakValueEditorFactory key="valueEditor" onChange={onChange} snak={snak} />,
    ];
  }
}

SnakEditorTableRowPart.propTypes = {
  onChange: PropTypes.func.isRequired,
  snak: PropTypes.shape( Shapes.Snak ).isRequired,
};
