// @flow

import React, { PureComponent } from 'react';
import ButtonCell from 'components/ButtonCell';
import { connect } from 'react-redux';
import generateRandomString from 'utils/generateRandomString';
import GoToLocalButtonCell from 'components/dataValueEditors/wikibase-item/GoToLocalButtonCell';
import GoToWikidataButtonCell from 'components/dataValueEditors/wikibase-item/GoToWikidataButtonCell';
import i18n from './i18n';
import { openEditor } from 'core/edit';
import PersonEditorTemplate from 'editors/PersonEditorTemplate';
import WikibaseItemDataValueEditor from 'components/dataValueEditors/wikibase-item/WikibaseItemDataValueEditor';

export function oppositeGender( entity ) {
  return ( ( entity.claims || {} ).P21 || [] )
    .filter( claim => claim.rank === 'normal' || claim.rank === 'preferred' )
    .map( claim => ( ( ( claim.mainsnak || {} ).datavalue || {} ).value || {} ).id )
    .filter( id => !!id )
    .map( id => {
      switch ( id ) {
      case 'Q6581097': return 'Q6581072';
      case 'Q6581072': return 'Q6581097';
      default: return null;
      }
    } )
    .filter( id => !!id )[ 0 ] || null;
}

type PropsType = {
  datavalue? : ?DataValueType,
  entity : any,
  newEntityGenderEntityId : ( EntityType => ?string ) | string,
  onDataValueChange : any => any,
  propertiesMapping : any,
  propertyIdSelfInto : string,
};

class FamilyMemberDataValueEditor extends PureComponent<PropsType, any> {

  constructor() {
    super( ...arguments );

    this.handleCreateFamilyMember = this.handleCreateFamilyMember.bind( this );
  }

  handleCreateFamilyMember() {
    const { entity, propertiesMapping, propertyIdSelfInto } = this.props;
    const { newEntityGenderEntityId } = this.props;

    let actualNewEntityGenderEntityId : ?string = null;
    // calculate newEntityGenderEntityId if function
    if ( newEntityGenderEntityId instanceof Function ) {
      if ( entity ) {
        actualNewEntityGenderEntityId = newEntityGenderEntityId( entity );
      } else {
        actualNewEntityGenderEntityId = null;
      }
    }
    if ( typeof newEntityGenderEntityId === 'string' ) {
      actualNewEntityGenderEntityId = newEntityGenderEntityId;
    }

    const newEntity : EntityType = {
      claims: {},
      type: 'item',
    };

    newEntity.claims.P31 = [ {
      mainsnak: {
        snaktype: 'value',
        property: 'P31',
        hash: generateRandomString(),
        datavalue: {
          value: { 'entity-type': 'item', 'numeric-id': '5', 'id': 'Q5' },
          type: 'wikibase-entityid',
        },
        datatype: 'wikibase-item',
      },
      type: 'statement',
      id: generateRandomString(),
      rank: 'normal',
    } ];

    if ( actualNewEntityGenderEntityId ) {
      newEntity.claims.P21 = [ {
        mainsnak: {
          snaktype: 'value',
          property: 'P21',
          hash: generateRandomString(),
          datavalue: {
            // male
            value: { 'entity-type': 'item',
              'numeric-id': actualNewEntityGenderEntityId.substr( 1 ),
              'id': actualNewEntityGenderEntityId,
            },
            type: 'wikibase-entityid',
          },
          datatype: 'wikibase-item',
        },
        type: 'statement',
        id: generateRandomString(),
        rank: 'normal',
      } ];
    }

    // self into something
    if ( !!propertyIdSelfInto && !!entity.id ) {
      newEntity.claims[ propertyIdSelfInto ] = [ {
        mainsnak: {
          snaktype: 'value',
          property: propertyIdSelfInto,
          hash: generateRandomString(),
          datavalue: {
            value: { 'entity-type': 'item', 'numeric-id': entity.id.substr( 1 ), 'id': entity.id },
            type: 'wikibase-entityid',
          },
          datatype: 'wikibase-item',
        },
        type: 'statement',
        id: generateRandomString(),
        rank: 'normal',
      } ];
    }

    Object.keys( propertiesMapping ).forEach( sourcePropertyId => {
      const targetPropertyId = propertiesMapping[ sourcePropertyId ];

      newEntity.claims[ targetPropertyId ] = ( ( entity.claims || {} )[ sourcePropertyId ] || [] )
        .filter( claim => claim.rank === 'normal' || claim.rank === 'preferred' )
        .map( claim => ( ( ( claim.mainsnak || {} ).datavalue || {} ).value || {} ).id )
        .filter( id => !!id )
        .map( entityId => ( {
          mainsnak: {
            snaktype: 'value',
            property: targetPropertyId,
            hash: generateRandomString(),
            datavalue: {
              value: { 'entity-type': 'item', 'numeric-id': entityId.substr( 1 ), 'id': entityId },
              type: 'wikibase-entityid',
            },
            datatype: 'wikibase-item',
          },
          type: 'statement',
          id: generateRandomString(),
          rank: 'normal',
        } ) );
    } );

    const oldEntity : EntityType = { type: 'item' };
    openEditor( PersonEditorTemplate, oldEntity, newEntity )
      .then( entityId => super.handleCreate( entityId ) );
  }

  render() {
    const { datavalue, onDataValueChange, ...etc } = this.props;
    const entityId : ?string = ( ( datavalue || {} ).value || {} ).id || '';

    return <WikibaseItemDataValueEditor
      {...etc}
      buttons={this.renderButtons( entityId )}
      datavalue={datavalue}
      onDataValueChange={onDataValueChange} />;
  }

  renderButtons( entityId : ?string ) {
    return [
      <ButtonCell
        disabled={!!entityId}
        icon={'ui-icon-pencil'}
        key="CreateNew"
        label={i18n.buttonLabelCreateNew}
        onClick={this.handleCreateFamilyMember} />,
      <GoToLocalButtonCell entityId={entityId} key="GoToLocal" />,
      <GoToWikidataButtonCell entityId={entityId} key="GoToWikidata" />,
    ];
  }

}

const mapStateToProps = state => ( {
  entity: state.entity,
} );

const FamilyMemberDataValueEditorConnected = connect( mapStateToProps )( FamilyMemberDataValueEditor );
export default FamilyMemberDataValueEditorConnected;
