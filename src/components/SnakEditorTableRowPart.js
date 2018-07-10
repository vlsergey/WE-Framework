import * as Shapes from 'model/Shapes';
import React, { PureComponent } from 'react';
import i18n from './core.i18n';
import PropertyDescription from 'core/PropertyDescription';
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

export default class SnakEditorTableRowPart extends PureComponent {

  static TABLE_COLUMNS = SnakValueEditorFactory.TABLE_COLUMNS + 1;

  static propTypes = {
    onSnakChange: PropTypes.func.isRequired,
    propertyDescription: PropTypes.instanceOf( PropertyDescription ).isRequired,
    readOnly: PropTypes.bool,
    snak: PropTypes.shape( Shapes.Snak ),
  };

  static defaultProps = {
    snak: {
      snaktype: 'value',
    },
    readOnly: false,
  }

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
