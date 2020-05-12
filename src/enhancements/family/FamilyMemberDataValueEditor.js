// @flow

import React, { PureComponent } from 'react';
import { boundMethod } from 'autobind-decorator';
import ButtonCell from 'components/ButtonCell';
import { connect } from 'react-redux';
import generateRandomString from 'utils/generateRandomString';
import GoToLocalButtonCell from 'components/dataValueEditors/wikibase-item/GoToLocalButtonCell';
import GoToWikidataButtonCell from 'components/dataValueEditors/wikibase-item/GoToWikidataButtonCell';
import i18n from './i18n';
import { openEditor } from 'core/edit';
import PersonEditorTemplate from 'editors/PersonEditorTemplate';
import PropertyDescription from 'core/PropertyDescription';
import { toWikibaseEntityIdValue } from 'model/ModelUtils';
import WikibaseItemDataValueEditor from 'components/dataValueEditors/wikibase-item/WikibaseItemDataValueEditor';

export function oppositeGender( entity : EntityType ) {
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
  entity : EntityType,
  newEntityGenderEntityId : ( EntityType => ?string ) | string,
  onDataValueChange : DataValueType => any,
  propertiesMapping : {| [string] : string |}, // current entity property to new entity property mapping
  propertyDescription : PropertyDescription,
  propertyIdSelfInto : string,
};

class FamilyMemberDataValueEditor extends PureComponent<PropsType, any> {

  @boundMethod
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

    const newEntityClaims : ClaimsType = {};
    const newEntity : EntityType = {
      claims: newEntityClaims,
      type: 'item',
    };

    newEntityClaims.P31 = [ {
      mainsnak: {
        snaktype: 'value',
        property: 'P31',
        hash: generateRandomString(),
        datavalue: {
          value: toWikibaseEntityIdValue( 'Q5' ),
          type: 'wikibase-entityid',
        },
        datatype: 'wikibase-item',
      },
      type: 'statement',
      id: generateRandomString(),
      rank: 'normal',
    } ];

    if ( actualNewEntityGenderEntityId ) {
      newEntityClaims.P21 = [ {
        mainsnak: {
          snaktype: 'value',
          property: 'P21',
          hash: generateRandomString(),
          datavalue: {
            // male
            value: toWikibaseEntityIdValue( actualNewEntityGenderEntityId ),
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
    const currentEntityId : ?string = entity.id;
    if ( !!propertyIdSelfInto && !!currentEntityId ) {
      newEntityClaims[ propertyIdSelfInto ] = [ {
        mainsnak: {
          snaktype: 'value',
          property: propertyIdSelfInto,
          hash: generateRandomString(),
          datavalue: {
            value: toWikibaseEntityIdValue( currentEntityId ),
            type: 'wikibase-entityid',
          },
          datatype: 'wikibase-item',
        },
        type: 'statement',
        id: generateRandomString(),
        rank: 'normal',
      } ];
    }

    Object.keys( propertiesMapping ).forEach( ( sourcePropertyId : string ) => {
      const targetPropertyId : string = propertiesMapping[ sourcePropertyId ];

      newEntityClaims[ targetPropertyId ] = ( ( entity.claims || {} )[ sourcePropertyId ] || [] )
        .filter( claim => claim.rank === 'normal' || claim.rank === 'preferred' )
        .map( claim => ( ( ( claim.mainsnak || {} ).datavalue || {} ).value || {} ).id )
        .filter( id => !!id )
        .map( entityId => ( {
          mainsnak: {
            snaktype: 'value',
            property: targetPropertyId,
            hash: generateRandomString(),
            datavalue: {
              value: toWikibaseEntityIdValue( entityId ),
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
      .then( entityId => this.props.onDataValueChange( ( {
        value: toWikibaseEntityIdValue( entityId ),
        type: 'wikibase-entityid',
      } : DataValueType ) ) );
  }

  render() {
    const { datavalue, onDataValueChange, propertyDescription, ...etc } = this.props;
    const entityId : ?string = ( ( datavalue || {} ).value || {} ).id || '';

    return <WikibaseItemDataValueEditor
      {...etc}
      buttons={this.renderButtons( entityId )}
      datavalue={datavalue}
      onDataValueChange={onDataValueChange}
      propertyDescription={propertyDescription} />;
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

// $FlowFixMe
const FamilyMemberDataValueEditorConnected = connect( mapStateToProps )( FamilyMemberDataValueEditor );
export default FamilyMemberDataValueEditorConnected;
