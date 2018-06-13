import * as Shapes from '../model/Shapes';
import React, { Component } from 'react';
import i18n from './core.i18n';
import PropertyDescription from '../core/PropertyDescription';
import PropTypes from 'prop-types';
import SelectSnakTypeButtonCell from './SelectSnakTypeButtonCell';
import SnakValueEditorFactory from './SnakValueEditorFactory';
import styles from './core.css';

const NotAValueSnakReplacementCell = ( { onClick, snaktype } ) =>
  <td colSpan={SnakValueEditorFactory.TABLE_COLUMNS} title={i18n.snakTypeTitle[ snaktype ]}>
    <span className={styles.wef_snak_replacement_label} onClick={onClick}>{i18n.snakType[ snaktype ]}</span>
  </td>;

NotAValueSnakReplacementCell.propTypes = {
  onClick: PropTypes.func,
  snaktype: PropTypes.string,
};
  
NotAValueSnakReplacementCell.defautPropTypes = {
  snaktype: 'value',
};

export default class SnakEditorTableRowPart extends Component {

  static TABLE_COLUMNS = SnakValueEditorFactory.TABLE_COLUMNS + 1;

  static propTypes = {
    onSnakChange: PropTypes.func.isRequired,
    propertyDescription: PropTypes.instanceOf( PropertyDescription ).isRequired,
    snak: PropTypes.shape( Shapes.Snak ).isRequired,
  };

  constructor() {
    super( ...arguments );
    this.state = {
      hiddenBehindLabel: false,
    };
    this.handleSnakTypeChange = this.handleSnakTypeChange.bind( this );
    this.showFromBehindLabel = this.showFromBehindLabel.bind( this );
  }

  handleSnakTypeChange( snaktype ) {
    const { onSnakChange } = this.props;
    if ( onSnakChange ) {
      onSnakChange( {
        ...this.props.snak,
        snaktype: snaktype
      } );
    }
  }

  showFromBehindLabel() {
    this.setState( {
      hiddenBehindLabel: false,
    } );
  }

  render() {
    const { hiddenBehindLabel } = this.state;
    const { onSnakChange, propertyDescription, snak } = this.props;

    if ( hiddenBehindLabel ) {
      return snak.snaktype === 'value'
        ? [ <td key="snaktype" />, <SnakValueEditorFactory className={styles.wef_snak_replacement_label} key="valueEditor" mode="label" onChange={onSnakChange} onClick={this.showFromBehindLabel} snak={snak} /> ]
        : <NotAValueSnakReplacementCell onClick={this.showFromBehindLabel} snaktype={snak.snaktype} />;
    }

    return [
      <SelectSnakTypeButtonCell key="snaktype" onChange={this.handleSnakTypeChange} value={snak.snaktype} />,
      snak.snaktype === 'value'
        ? <SnakValueEditorFactory key="valueEditor" onSnakChange={onSnakChange} propertyDescription={propertyDescription} snak={snak} />
        : <NotAValueSnakReplacementCell key="valueEditor" snaktype={snak.snaktype} />,
    ];
  }
}
