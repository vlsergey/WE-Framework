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
    const { snak } = this.props;

    if ( hiddenBehindLabel ) {
      return <span className={styles.wef_snak_replacement_label}>
        {snak.snaktype === 'value'
          ? <SnakValueEditorFactory onClick={this.showFromBehindLabel} snak={snak} mode="label" />
          : <span onClick={this.showFromBehindLabel}>i18n.snakValue[ snak.snaktype ]</span> }
      </span>;
    }

    return [
      <SelectSnakTypeButtonCell key="rank" rank={snak.rank} />,
      <SnakValueEditorFactory key="valueEditor" snak={snak} />,
    ];
  }
}

SnakEditorTableRowPart.propTypes = {
  snak: PropTypes.shape( Shapes.Snak ),
};
