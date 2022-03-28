import React, {ChangeEvent, PureComponent} from 'react';

import LabelDescription from '../../caches/LabelDescription';
import {LabelDescriptionsProvider} from '../../caches/labelDescriptionCache';
import stableSort from '../../utils/stableSort';
import i18n from './i18n';

function sort (cache: Record<string, LabelDescription>, oneOf: string[]) {
  return stableSort([...oneOf], (o1: string, o2: string) => {
    const v1 = cache[o1]?.label?.toLowerCase() || '';
    const v2 = cache[o2]?.label?.toLowerCase() || '';
    return v1 === v2 ? 0 : v1 > v2 ? +1 : -1;
  });
}

interface PropsType {
  oneOf: string[];
  onOtherSelect: () => any;
  onSelect: (entityId: null | string) => any;
  value: null | string;
}

export default class SelectMode extends PureComponent<PropsType> {

  handleChange = ({currentTarget: {value}}: ChangeEvent< HTMLSelectElement >) => {
    if (value === 'OTHER') {
      this.props.onOtherSelect();
      return;
    }
    this.props.onSelect(value);
  };

  override render () {
    const {value, oneOf} = this.props;

    // include SELECT into LDP, becase rerendering only options leads to lost current option in SELECT
    return <LabelDescriptionsProvider cacheKeys={oneOf}>
      { cache => <select onChange={this.handleChange} value={value || ''}>
        <option key="_empty" value="" />
        {sort(cache, oneOf).map((entityId: string) => {
          const labelDescription = cache[entityId];
          if (!labelDescription || !labelDescription.label) {
            return <option key={entityId} value={entityId}>{entityId}</option>;
          }

          return <SelectOption
            description={labelDescription.description}
            entityId={entityId}
            key={entityId}
            label={labelDescription.label} />;
        })}
        <option key="OTHER" value="OTHER">{i18n.optionOther}</option>
      </select>}
    </LabelDescriptionsProvider>;
  }

}

interface SelectOptionPropsType {
  description?: string;
  entityId: string;
  label?: string;
}

class SelectOption extends PureComponent<SelectOptionPropsType> {

  override render () {
    const {entityId, description, label} = this.props;

    const actualLabel = label
      ? label + ' (' + entityId + ')'
      : entityId;

    return <option
      title={description}
      value={entityId}>{actualLabel}</option>;
  }
}
