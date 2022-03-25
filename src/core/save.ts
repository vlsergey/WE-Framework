import deepEqual from '../utils/deepEqual';
import {getWikidataApi} from './ApiUtils';
import i18n from './i18n';
import preSaveTransformations from './preSaveTransformations';

const EMPTY_OBJECT = Object.freeze({});
const TAG = 'WE-Framework gadget';

const notifyOptions = {
  autoHide: true,
  tag: 'WE-F Save',
};

function notify (text: string) {
  mw.notify('[WE-F] ' + text, notifyOptions);
}

type LAType = any;
export function collectlLabelalikeUpdates (
    originalEntity: EntityType,
    entity: EntityType,
    labelalikeType : ('labels' | 'descriptions' | 'aliases' | 'sitelinks'),
    removedPlaceholderF: (key: string) => (null | LAType)): Record<string, LAType | null> | null {

  const oldData: Record<string, LAType> = originalEntity[labelalikeType] || EMPTY_OBJECT;
  const newData: Record<string, LAType> = entity[labelalikeType] || EMPTY_OBJECT;

  const allKeys: Set< string > = new Set();
  Object.keys(oldData).forEach(key => allKeys.add(key));
  Object.keys(newData).forEach(key => allKeys.add(key));

  const allKeysSorted: string[] = [...allKeys];
  allKeysSorted.sort();

  const changes: {key: string; value: LAType | null}[] = [];
  allKeysSorted.forEach(key => {
    const oldValue = oldData[key] || null;
    const newValue = newData[key] || null;

    if (oldValue === null && newValue === null) {
      console.warn('Something strage goes here with ' + labelalikeType + '...');
    } else if (oldValue === null && newValue !== null) {
      console.log('Found change new entry of ' + labelalikeType + ' with key ' + key);
      changes.push({key, value: newValue});
    } else if (oldValue !== null && newValue === null) {
      console.log('Found removing of entry of ' + labelalikeType + ' with key ' + key);
      changes.push({key, value: removedPlaceholderF(key)});
    } else if (oldValue !== null && newValue !== null) {
      if (!deepEqual(oldValue, newValue)) {
        console.log('Found change in existing entry of ' + labelalikeType + ' for key ' + key);
        changes.push({key, value: newValue});
      }
    }

  });

  if (changes.length > 0) {
    const result: Record<string, LAType | null> = {};
    changes.forEach(value => result[value.key] = value.value);
    return result;
  }

  return null;
}

export function collectClaimUpdates (originalEntity: EntityType, entity: EntityType): EditClaimType[] {
  const toUpdate: EditClaimType[] = [];
  const checked: Set< string > = new Set();

  // calculate changed and removed claims
  for (const [propertyId, newClaims] of Object.entries(entity.claims || EMPTY_OBJECT as ClaimsType)) {
    const oldClaims = (originalEntity.claims || EMPTY_OBJECT as ClaimsType)[propertyId];

    if (!oldClaims) {
      newClaims.forEach(newClaim => {
        const {id, ...claimWithoutId} = newClaim;
        console.log('collectClaimUpdates: Saving claim with temporary id ' + id + ' as new claim without ID');
        toUpdate.push(claimWithoutId);
      });
      continue;
    }

    if (oldClaims === newClaims) {
      newClaims.forEach(newClaim => checked.add(newClaim.id));
      continue;
    }

    newClaims.forEach((newClaim: ClaimType) => {
      checked.add(newClaim.id);

      const oldClaim = oldClaims.find(({id}: ClaimType) => id === newClaim.id);
      if (oldClaim) {
        if (!deepEqual(oldClaim, newClaim)) {
          console.log('collectClaimUpdates: Saving claim with id ' + newClaim.id + ' as updated claim');
          toUpdate.push({...newClaim});
        }
      } else {
        // it's a new claim
        const {id, ...claimWithoutId} = newClaim;
        console.log(`collectClaimUpdates: Saving claim with temporary id ${String(id)} as new claim without ID`);
        toUpdate.push(claimWithoutId);
      }
    });
  }

  Object.values(originalEntity.claims || EMPTY_OBJECT as ClaimsType)
    .forEach(originalClaims => {
      originalClaims
        .filter(oldClaim => !checked.has(oldClaim.id))
        .forEach(oldClaim => toUpdate.push({id: oldClaim.id, remove: ''}));
    });

  return toUpdate.map((claim: EditClaimType) => {
    if (typeof claim.id === 'string' || claim.remove !== '')
      return claim;

    const dateValue = claim.mainsnak?.datavalue;
    if (!dateValue) {
      return {id: claim.id, remove: ''};
    }
    return claim;
  });
}

export function collectEntityUpdates (
    originalEntity: EntityType,
    dirtyEntity: EntityType) {
  const entity: EntityType = preSaveTransformations(dirtyEntity);
  let data = {};

  const updatedLabels = collectlLabelalikeUpdates(originalEntity, entity, 'labels',
    key => ({language: key, remove: ''}));
  if (updatedLabels)
    data = {...data, labels: updatedLabels};

  const updatedDescriptions = collectlLabelalikeUpdates(originalEntity, entity, 'descriptions',
    key => ({language: key, remove: ''}));
  if (updatedDescriptions)
    data = {...data, descriptions: updatedDescriptions};

  const updatedAliases = collectlLabelalikeUpdates(originalEntity, entity, 'aliases', () => []);
  if (updatedAliases)
    data = {...data, aliases: updatedAliases};

  const updatedClaims = collectClaimUpdates(originalEntity, entity);
  if (updatedClaims.length > 0)
    data = {...data, claims: updatedClaims};

  const updatedSitelinks = collectlLabelalikeUpdates(originalEntity, entity, 'sitelinks',
    key => ({site: key, remove: ''}));
  if (updatedSitelinks)
    data = {...data, sitelinks: updatedSitelinks};

  return data;
}

export function closeWithoutSave (reject : ((reason: string) => any)) {
  return (_dispatch: any, getState: () => ReduxState) => {
    notify('Analyzing changes...');
    const state = getState();
    const data = collectEntityUpdates(state.originalEntity, state.entity);
    const hasChanges = Object.keys(data).length !== 0;

    if (!hasChanges) {
      reject('User closed dialog window while no changes were made');
    } else if (confirm(i18n.confirmCloseWithoutSave)) {
      reject('User closed dialog window and confirmed discardind changes');
    }
  };
}

export function saveAndClose (
    resolve : ((entityId: string) => any),
    reject : ((reason: string) => any)
) {
  return (_dispatch: unknown, getState: () => ReduxState) => {
    notify('Analyzing changes...');
    const state = getState();
    const dirtyEntity = state.entity;
    const data = collectEntityUpdates(state.originalEntity, dirtyEntity);

    if (Object.keys(data).length === 0) {
      notify('No changes');
      reject('No changes');
      return;
    }

    notify('Saving changes...');

    const params: ApiCallParams = {
      action: 'wbeditentity',
      data: JSON.stringify(data),
      summary: 'via [[:w:ru:ВП:WE-F|WE-Framework gadget]] from ' + mw.config.get('wgDBname'),
      tags: TAG,
    };

    if (!dirtyEntity.id) {
      params.new = 'item';
    } else {
      params.id = dirtyEntity.id;
    }

    return getWikidataApi()
      .postWithEditToken(params)
      .catch((_code: string, {error}: any) => {
        mw.log.error(i18n.errorUpdateEntity);
        mw.log.error(error);
        notify(i18n.actionUpdateEntityFail);
        alert(i18n.errorUpdateEntity + ': ' + error.info);
      })
      .then((result: WbEditEntityActionResult) => {
        notify(i18n.actionUpdateEntityDone);
        const entityId = result.entity.id;
        resolve(entityId);
      })
      .catch((error: any) => {
        mw.log.error(i18n.errorUpdateEntity);
        mw.log.error(error);
        notify(i18n.actionUpdateEntityFail);
        alert(i18n.errorUpdateEntity + ': ' + JSON.stringify(error));
      });
  };

}
