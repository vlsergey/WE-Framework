import React, { ChangeEvent, PureComponent } from 'react';
import i18n from './i18n';

const EMPTY_STRING : string = '';

type PropsType = {
  onChange : (value : number) => any,
  readOnly : boolean,
  value : number | null,
};

export default class PrecisionSelect extends PureComponent<PropsType> {

  handleChange = ( event : ChangeEvent< HTMLSelectElement > ) => {
    this.props.onChange( Number( event.currentTarget.value ) );
    event.stopPropagation();
  }

  override render() {
    /* eslint no-unused-vars: ["error", { "varsIgnorePattern": "onChange" }]*/
    const { onChange, readOnly, value, ...etc } = this.props;

    return <select
      {...etc}
      disabled={readOnly}
      onChange={this.handleChange}
      value={typeof value === 'number' ? value.toString() : EMPTY_STRING}>
      {[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ].map( precision =>
        <option key={precision} value={precision.toString()}>{i18n.precision[ precision ]}</option>
      )}
    </select>;
  }
}
