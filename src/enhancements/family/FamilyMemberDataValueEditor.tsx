import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import ButtonCell from '../../components/ButtonCell';
import GoToLocalButtonCell from '../../components/dataValueEditors/wikibase-item/GoToLocalButtonCell';
import GoToWikidataButtonCell from '../../components/dataValueEditors/wikibase-item/GoToWikidataButtonCell';
import WikibaseItemDataValueEditor from '../../components/dataValueEditors/wikibase-item/WikibaseItemDataValueEditor';
import {openEditor} from '../../core/edit';
import PropertyDescription from '../../core/PropertyDescription';
import PersonEditorTemplate from '../../editors/PersonEditorTemplate';
import {toWikibaseEntityIdValue} from '../../model/ModelUtils';
import generateRandomString from '../../utils/generateRandomString';
import isOkay from '../../utils/isOkay';
import i18n from './i18n';

export function oppositeGender (entity: EntityType) {
  return (entity.claims?.P21 || [])
    .filter(claim => claim.rank === 'normal' || claim.rank === 'preferred')
    .map(claim => claim.mainsnak?.datavalue?.value?.id).filter(isOkay)
    .map(id => {
      switch (id) {
      case 'Q6581097': return 'Q6581072';
      case 'Q6581072': return 'Q6581097';
      default: return null;
      }
    })
    .filter(isOkay)[0] || null;
}

interface PropsType {
  datavalue: WikibaseEntityIdDataValue | null;
  entity: EntityType;
  newEntityGenderEntityId: ((entity: EntityType) => string | null) | string;
  onDataValueChange: (dataValue: WikibaseEntityIdDataValue | null) => unknown;
  propertiesMapping: Map< string, string >; // current entity property to new entity property mapping
  propertyDescription: PropertyDescription;
  propertyIdSelfInto: string;
}

class FamilyMemberDataValueEditor extends PureComponent<PropsType, any> {

  handleCreateFamilyMember = async () => {
    const {entity, propertiesMapping, propertyIdSelfInto} = this.props;
    const {newEntityGenderEntityId} = this.props;

    let actualNewEntityGenderEntityId: null | string = null;
    // calculate newEntityGenderEntityId if function
    if (newEntityGenderEntityId instanceof Function) {
      if (entity) {
        actualNewEntityGenderEntityId = newEntityGenderEntityId(entity);
      } else {
        actualNewEntityGenderEntityId = null;
      }
    }
    if (typeof newEntityGenderEntityId === 'string') {
      actualNewEntityGenderEntityId = newEntityGenderEntityId;
    }

    const newEntityClaims: ClaimsType = {};
    const newEntity: EntityType = {
      claims: newEntityClaims,
      type: 'item',
    };

    newEntityClaims.P31 = [{
      mainsnak: {
        snaktype: 'value',
        property: 'P31',
        hash: generateRandomString(),
        datavalue: {
          value: toWikibaseEntityIdValue('Q5'),
          type: 'wikibase-entityid',
        },
        datatype: 'wikibase-item',
      },
      type: 'statement',
      id: generateRandomString(),
      rank: 'normal',
    }];

    if (actualNewEntityGenderEntityId) {
      newEntityClaims.P21 = [{
        mainsnak: {
          snaktype: 'value',
          property: 'P21',
          hash: generateRandomString(),
          datavalue: {
            // male
            value: toWikibaseEntityIdValue(actualNewEntityGenderEntityId),
            type: 'wikibase-entityid',
          },
          datatype: 'wikibase-item',
        },
        type: 'statement',
        id: generateRandomString(),
        rank: 'normal',
      }];
    }

    // self into something
    const currentEntityId = entity.id;
    if (!!propertyIdSelfInto && !!currentEntityId) {
      newEntityClaims[propertyIdSelfInto] = [{
        mainsnak: {
          snaktype: 'value',
          property: propertyIdSelfInto,
          hash: generateRandomString(),
          datavalue: {
            value: toWikibaseEntityIdValue(currentEntityId),
            type: 'wikibase-entityid',
          },
          datatype: 'wikibase-item',
        },
        type: 'statement',
        id: generateRandomString(),
        rank: 'normal',
      }];
    }

    [...propertiesMapping.entries()].forEach(([sourcePropertyId, targetPropertyId]: [string, string]) => {

      newEntityClaims[targetPropertyId] = (entity.claims?.[sourcePropertyId] || [])
        .filter(claim => claim.rank === 'normal' || claim.rank === 'preferred')
        .map(claim => claim.mainsnak?.datavalue?.value?.id).filter(isOkay)
        .map(entityId => ({
          mainsnak: {
            snaktype: 'value',
            property: targetPropertyId,
            hash: generateRandomString(),
            datavalue: {
              value: toWikibaseEntityIdValue(entityId),
              type: 'wikibase-entityid',
            },
            datatype: 'wikibase-item',
          },
          type: 'statement',
          id: generateRandomString(),
          rank: 'normal',
        }));
    });

    const oldEntity: EntityType = {type: 'item'};
    const newEntityId = await openEditor(PersonEditorTemplate, oldEntity, newEntity);
    this.props.onDataValueChange({
      value: toWikibaseEntityIdValue(newEntityId),
      type: 'wikibase-entityid',
    } as WikibaseEntityIdDataValue);
  };

  override render () {
    const {datavalue, onDataValueChange, propertyDescription, ...etc} = this.props;
    const entityId = datavalue?.value?.id;

    return <WikibaseItemDataValueEditor
      {...etc}
      buttonCells={this.renderButtons(entityId || undefined)}
      datavalue={datavalue}
      onDataValueChange={onDataValueChange}
      propertyDescription={propertyDescription} />;
  }

  renderButtons (entityId?: string) {
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

const mapStateToProps = (state: any) => ({
  entity: state.entity,
});

const FamilyMemberDataValueEditorConnected = connect(mapStateToProps)(FamilyMemberDataValueEditor);
export default FamilyMemberDataValueEditorConnected;
