import React, {PureComponent} from 'react';

import PropertyDescription from '../core/PropertyDescription';
import i18n from './core.i18n';
import SelectSnakTypeButtonCell from './SelectSnakTypeButtonCell';
import SnakValueEditorFactory from './SnakValueEditorFactory';
import {COLUMNS_FOR_DATA_VALUE_EDITOR} from './TableColSpanConstants';

interface PropsType {
  onSnakChange: (snak: SnakType) => any;
  propertyDescription: PropertyDescription;
  readOnly: boolean;
  snak: SnakType;
}

export default class SnakEditorTableRowPart extends PureComponent<PropsType> {

  static defaultProps = {
    snak: {
      snaktype: 'value',
    },
    readOnly: false,
  };

  handleSnakTypeChange = (snaktype: SnakTypeType) => {
    const {onSnakChange} = this.props;
    if (onSnakChange) {
      onSnakChange({
        ...this.props.snak,
        snaktype,
      });
    }
  };

  override render () {
    const {onSnakChange, propertyDescription, readOnly, snak} = this.props;

    if (readOnly) {
      return snak.snaktype === 'value'
        ? <React.Fragment>
          <td />
          <SnakValueEditorFactory
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

const NotAValueSnakReplacementCell = ({
  snaktype = 'value',
}: {
  snaktype?: SnakTypeType;
}) => <td colSpan={COLUMNS_FOR_DATA_VALUE_EDITOR} title={i18n.snakTypeTitle[snaktype]}>
  <span>{i18n.snakType[snaktype]}</span>
</td>;
