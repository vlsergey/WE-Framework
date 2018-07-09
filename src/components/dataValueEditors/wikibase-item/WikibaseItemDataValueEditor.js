import React, { PureComponent } from 'react';
import AutocompleteMode from './AutocompleteMode';
import { DataValue } from 'model/Shapes';
import EntityLabel from 'caches/EntityLabel';
import GoToWikidataButtonCell from './GoToWikidataButtonCell';
import PropertyDescription from 'core/PropertyDescription';
import PropTypes from 'prop-types';
import SelectMode from './SelectMode';
import styles from './WikibaseItem.css';

export default class WikibaseItemDataValueEditor extends PureComponent {

  static DATATYPE = 'wikibase-item';
  static DATAVALUE_TYPE = 'wikibase-entityid';

  static propTypes = {
    datavalue: PropTypes.shape( DataValue ),
    onDataValueChange: PropTypes.func.isRequired,
    propertyDescription: PropTypes.instanceOf( PropertyDescription ),
    readOnly: PropTypes.bool,
  }

  static defaultProps = {
    readOnly: false,
  }

  constructor() {
    super( ...arguments );

    this.state = {
      selectMode: SelectMode.isCompatibleWithProps( this.props ),
    };

    this.handleOtherSelect = () => this.setState( { selectMode: false } );
  }

  render() {
    const { datavalue, readOnly, ...etc } = this.props;

    const currentValue = ( ( datavalue || {} ).value || {} ).id || '';
    const className = styles[ 'wef_datavalue_' + WikibaseItemDataValueEditor.DATATYPE ];

    if ( readOnly ) {
      return <td
        className={className + ' ' + styles[ 'wef_datavalue_' + WikibaseItemDataValueEditor.DATATYPE + '_readonly' ]}
        colSpan={12}>
        { currentValue && <a href={'https://www.wikidata.org/wiki/' + currentValue}>
          <EntityLabel entityId={currentValue} />
        </a> }
      </td>;
    }

    const { selectMode } = this.state;
    return <React.Fragment>
      <td className={className} colSpan={11}>
        {
          selectMode
            ? <SelectMode datavalue={datavalue} onOtherSelect={this.handleOtherSelect} {...etc} />
            : <AutocompleteMode datavalue={datavalue} {...etc} />
        }
      </td>
      <GoToWikidataButtonCell entityId={currentValue} />
    </React.Fragment>;
  }
}
