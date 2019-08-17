import React, { PureComponent } from 'react';
import CreateNewButtonCell from './CreateNewButtonCell';
import { DataValue } from 'model/Shapes';
import EntityField from 'components/entityField';
import EntityLabel from 'caches/EntityLabel';
import GoToLocalButtonCell from './GoToLocalButtonCell';
import GoToWikidataButtonCell from './GoToWikidataButtonCell';
import PropertyDescription from 'core/PropertyDescription';
import PropTypes from 'prop-types';
import styles from './WikibaseItem.css';

export default class WikibaseItemDataValueEditor extends PureComponent {

  static DATATYPE = 'wikibase-item';
  static DATAVALUE_TYPE = 'wikibase-entityid';

  static propTypes = {
    datavalue: PropTypes.shape( DataValue ),
    onDataValueChange: PropTypes.func.isRequired,
    propertyDescription: PropTypes.instanceOf( PropertyDescription ),
    readOnly: PropTypes.bool,
  };

  static defaultProps = {
    readOnly: false,
  };

  WIKIDATA_LINK_URL = 'https://www.wikidata.org/wiki/';

  constructor() {
    super( ...arguments );

    this.handleChange = this.handleChange.bind( this );
    this.handleCreate = this.handleCreate.bind( this );
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

  handleChange( entityId ) {
    const { datavalue, onDataValueChange } = this.props;
    if ( entityId === null || entityId.trim() === '' ) {
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
          'numeric-id': entityId.substr( 1 ),
          'id': entityId,
        },
        type: WikibaseItemDataValueEditor.DATAVALUE_TYPE,
      } );
    }
  }

  render() {
    /* eslint no-unused-vars: ["error", { "varsIgnorePattern": "onDataValueChange" }] */
    const { datavalue, onDataValueChange, propertyDescription, readOnly, ...etc } = this.props;

    const currentValue = ( ( datavalue || {} ).value || {} ).id || '';
    const className = styles[ 'wef_datavalue_' + WikibaseItemDataValueEditor.DATATYPE ];

    if ( readOnly ) {
      return <td
        className={className + ' ' + styles[ 'wef_datavalue_' + WikibaseItemDataValueEditor.DATATYPE + '_readonly' ]}
        colSpan={12}>
        { currentValue && <a href={this.WIKIDATA_LINK_URL + currentValue}>
          <EntityLabel entityId={currentValue} />
        </a> }
      </td>;
    }

    const buttons = this.renderButtons( propertyDescription, currentValue );

    return <React.Fragment>
      <td className={className} colSpan={12 - buttons.length}>
        <EntityField
          {...etc}
          lruKey={propertyDescription.id}
          onChange={this.handleChange}
          oneOf={propertyDescription.oneOf}
          value={currentValue} />
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
