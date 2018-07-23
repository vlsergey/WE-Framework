import React, { PureComponent } from 'react';
import AutocompleteMode from './AutocompleteMode';
import CreateNewButtonCell from './CreateNewButtonCell';
import { DataValue } from 'model/Shapes';
import EntityLabel from 'caches/EntityLabel';
import GoToLocalButtonCell from './GoToLocalButtonCell';
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

    this.handleCreate = this.handleCreate.bind( this );
    this.handleOtherSelect = () => this.setState( { selectMode: false } );
  }

  handleCreate( entityId ) {
    const { datavalue, onDataValueChange } = this.props;

    onDataValueChange( {
      ...datavalue,
      value: {
        'entity-type': 'item',
        'numeric-id': entityId.substr( 1 ),
        'id': entityId,
      },
      type: WikibaseItemDataValueEditor.DATAVALUE_TYPE,
    } );
  }

  render() {
    const { datavalue, propertyDescription, readOnly, ...etc } = this.props;

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

    const buttons = this.renderButtons( propertyDescription, currentValue );

    const { selectMode } = this.state;
    return <React.Fragment>
      <td className={className} colSpan={12 - buttons.length}>
        {
          selectMode
            ? <SelectMode
              datavalue={datavalue}
              onOtherSelect={this.handleOtherSelect}
              propertyDescription={propertyDescription}
              {...etc} />
            : <AutocompleteMode
              datavalue={datavalue}
              propertyDescription={propertyDescription}
              {...etc} />
        }
      </td>
      { buttons }
    </React.Fragment>;
  }

  renderButtons( propertyDescription, entityId ) {
    return [
      <CreateNewButtonCell
        disabled={!!entityId}
        key="CreateNew"
        onCreate={this.handleCreate}
        propertyDescription={propertyDescription} />,
      <GoToLocalButtonCell entityId={entityId} key="GoToLocal" />,
      <GoToWikidataButtonCell entityId={entityId} key="GoToWikidata" />,
    ];
  }
}
