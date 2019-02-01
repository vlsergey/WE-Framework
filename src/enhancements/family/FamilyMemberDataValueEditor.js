import ButtonCell from 'components/ButtonCell';
import { connect } from 'react-redux';
import generateRandomString from 'utils/generateRandomString';
import GoToLocalButtonCell from 'components/dataValueEditors/wikibase-item/GoToLocalButtonCell';
import GoToWikidataButtonCell from 'components/dataValueEditors/wikibase-item/GoToWikidataButtonCell';
import i18n from './i18n';
import { openEditor } from 'core/edit';
import PersonEditorTemplate from 'editors/PersonEditorTemplate';
import PropTypes from 'prop-types';
import React from 'react';
import WikibaseItemDataValueEditor from 'components/dataValueEditors/wikibase-item/WikibaseItemDataValueEditor';

class FamilyMemberDataValueEditor extends WikibaseItemDataValueEditor {

  static propTypes = {
    ...WikibaseItemDataValueEditor.propTypes,
    entity: PropTypes.object.isRequired,
    newEntityGenderEntityId: PropTypes.string.isRequired,
    propertyIdSelfInto: PropTypes.string.isRequired,
    propertiesMapping: PropTypes.object.isRequired,
  }

  constructor() {
    super( ...arguments );

    this.handleCreateFamilyMember = this.handleCreateFamilyMember.bind( this );
  }

  handleCreateFamilyMember() {
    const { entity, newEntityGenderEntityId, propertiesMapping, propertyIdSelfInto } = this.props;

    const newEntity = {
      claims: {},
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

    if (newEntityGenderEntityId) {
      newEntity.claims.P21 = [{
        mainsnak: {
          snaktype: 'value',
          property: 'P21',
          hash: generateRandomString(),
          datavalue: {
              // male
              value: { 'entity-type': 'item',
              'numeric-id': newEntityGenderEntityId.substr(1),
              'id': newEntityGenderEntityId,
            },
            type: 'wikibase-entityid',
          },
          datatype: 'wikibase-item',
        },
        type: 'statement',
        id: generateRandomString(),
        rank: 'normal',
      }]
    }

    // self into something
    if ( !!propertyIdSelfInto && !!entity.id ) {
      newEntity.claims[propertyIdSelfInto] = [ {
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

    Object.keys(propertiesMapping).forEach( sourcePropertyId => {
      const targetPropertyId = propertiesMapping[sourcePropertyId];

      newEntity.claims[targetPropertyId] = ( ( entity.claims || {} )[sourcePropertyId] || [] )
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

    openEditor( PersonEditorTemplate, {}, newEntity )
      .then( entityId => super.handleCreate( entityId ) );
  }

  renderButtons( propertyDescription, entityId ) {
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
