// @flow

import React, { PureComponent } from 'react';
import { COLUMNS_FOR_DATA_VALUE_EDITOR } from 'components/TableColSpanConstants';
import i18n from './core.i18n';
import PropertyDescription from 'core/PropertyDescription';
import SelectSnakTypeButtonCell from './SelectSnakTypeButtonCell';
import SnakValueEditorFactory from './SnakValueEditorFactory';
import styles from './core.css';

/* eslint react/default-props-match-prop-types: 0 */
type PropsType = {
  onSnakChange : SnakType => any,
  propertyDescription : PropertyDescription,
  readOnly : boolean,
  snak : SnakType,
};

export default class SnakEditorTableRowPart extends PureComponent<PropsType> {

  static defaultProps = {
    snak: {
      snaktype: 'value',
    },
    readOnly: false,
  };

  constructor() {
    super( ...arguments );
    this.handleSnakTypeChange = this.handleSnakTypeChange.bind( this );
  }

  handleSnakTypeChange( snaktype ) {
    const { onSnakChange } = this.props;
    if ( onSnakChange ) {
      onSnakChange( {
        ...this.props.snak,
        snaktype,
      } );
    }
  }

  render() {
    const { onSnakChange, propertyDescription, readOnly, snak } = this.props;

    if ( readOnly ) {
      return snak.snaktype === 'value'
        ? <React.Fragment>
          <td />
          <SnakValueEditorFactory
            className={styles.wef_snak_replacement_label}
            onSnakChange={onSnakChange}
            propertyDescription={propertyDescription}
            readOnly
            snak={snak} />
        </React.Fragment>
        : <React.Fragment>
          <td />
          <NotAValueSnakReplacementCell snaktype={snak.snaktype} />
        </React.Fragment>;
    }

    return [
      <SelectSnakTypeButtonCell
        key="snaktype"
        onChange={this.handleSnakTypeChange}
        value={snak.snaktype} />,
      snak.snaktype === 'value'
        ? <SnakValueEditorFactory
          key="valueEditor"
          onSnakChange={onSnakChange}
          propertyDescription={propertyDescription}
          snak={snak} />
        : <NotAValueSnakReplacementCell
          key="valueEditor"
          snaktype={snak.snaktype} />,
    ];
  }
}

type NAVSRCPropType = {
  snaktype? : string,
};

class NotAValueSnakReplacementCell extends PureComponent<NAVSRCPropType> {

  static defautPropTypes = {
    snaktype: 'value',
  };

  render() {
    const { snaktype } = this.props;
    return <td colSpan={COLUMNS_FOR_DATA_VALUE_EDITOR} title={i18n.snakTypeTitle[ snaktype ]}>
      <span className={styles.wef_snak_replacement_label}>{i18n.snakType[ snaktype ]}</span>
    </td>;
  }
}
