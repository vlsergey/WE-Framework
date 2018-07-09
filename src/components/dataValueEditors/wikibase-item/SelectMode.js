import React, { PureComponent } from 'react';
import { DataValue } from 'model/Shapes';
import expect from 'expect';
import i18n from './i18n';
import LabelDescriptionsProvider from 'caches/LabelDescriptionsProvider';
import PropertyDescription from 'core/PropertyDescription';
import PropTypes from 'prop-types';
import WikibaseItemDataValueEditor from './WikibaseItemDataValueEditor';

export default class SelectMode extends PureComponent {

  static propTypes = {
    datavalue: PropTypes.shape( DataValue ),
    onDataValueChange: PropTypes.func.isRequired,
    onOtherSelect: PropTypes.func.isRequired,
    propertyDescription: PropTypes.instanceOf( PropertyDescription ),
  }

  static isCompatibleWithProps( props ) {
    const currentValue = ( ( props.datavalue || {} ).value || {} ).id || '';
    const hasOneOfConstrain = !!props.propertyDescription.oneOf;
    return hasOneOfConstrain &&
        ( currentValue === '' || props.propertyDescription.oneOf.indexOf( currentValue ) !== -1 );
  }

  constructor() {
    super( ...arguments );

    this.handleChange = this.handleChange.bind( this );
  }

  handleChange( event ) {
    const selectedValue = event.target.value;
    if ( selectedValue === 'OTHER' ) {
      this.props.onOtherSelect();
      return;
    }

    const { datavalue, onDataValueChange } = this.props;
    if ( selectedValue === null || selectedValue.trim() === '' ) {
      onDataValueChange( {
        ...datavalue,
        value: null,
        type: WikibaseItemDataValueEditor.DATAVALUE_TYPE,
      } );
    } else {
      onDataValueChange( {
        ...datavalue,
        value: {
          'entity-type': 'item',
          'numeric-id': selectedValue.substr( 1 ),
          'id': selectedValue,
        },
        type: WikibaseItemDataValueEditor.DATAVALUE_TYPE,
      } );
    }
  }

  render() {
    const { datavalue, propertyDescription } = this.props;

    const oneOf = propertyDescription.oneOf;
    const currentValue = ( ( datavalue || {} ).value || {} ).id || '';

    return <select onChange={this.handleChange} value={currentValue}>
      <option key="_empty" value="" />
      <LabelDescriptionsProvider entityIds={oneOf}>
        { cache => oneOf.map( entityId => {
          expect( cache ).toBeAn( 'object', 'LabelDescriptionsProvider didn\'t return cache object (' + cache + ')' );

          const labelDescription = cache[ entityId ];
          if ( !labelDescription || !labelDescription.label ) {
            return <option key={entityId} value={entityId}>{entityId}</option>;
          }

          return <SelectOption
            description={labelDescription.description}
            entityId={entityId}
            key={entityId}
            label={labelDescription.label} />;
        } )}
      </LabelDescriptionsProvider>
      <option key="OTHER" value="OTHER">{i18n.optionOther}</option>
    </select>;
  }

}


class SelectOption extends PureComponent {

  static propTypes = {
    entityId: PropTypes.string.isRequired,
    description: PropTypes.string,
    label: PropTypes.string,
  }

  render() {
    const { entityId, description, label } = this.props;

    const actualLabel = label
      ? label + ' (' + entityId + ')'
      : entityId;

    return <option
      title={description}
      value={entityId}>{actualLabel}</option>;
  }
}
