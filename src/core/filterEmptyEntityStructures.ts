import isOkay from '../utils/isOkay';

function filterEmptyAliases (aliases: AliasesType): AliasesType {
  const result = {} as AliasesType;
  Object.entries(aliases).forEach(([langCode, langCodeAliases]) => {
    if (! Array.isArray(langCodeAliases))
      return;

    const langAliases = langCodeAliases
      .filter(alias => typeof alias.value === 'string')
      .filter(alias => alias.value.trim() !== '');
    if (langAliases.length > 0) {
      result[langCode] = langAliases;
    }
  });
  return result;
}

function filterEmptyClaims (claims: ClaimsType): ClaimsType {
  const result: ClaimsType = {};
  Object.entries(claims).forEach(([propertyId, claimsArray]) => {
    if (!Array.isArray(claimsArray))
      return;

    const propertyClaims = claimsArray
      .filter(claim => !isSnakEmtpy(claim.mainsnak))
      .map<ClaimType>(claim => {
        const oldQualifiers = claim.qualifiers;
        if (typeof oldQualifiers !== 'object')
          return claim;

        const newQualifiers = filterSnaksMap(claim.qualifiers || null);
        if (!newQualifiers || Object.keys(newQualifiers).length === 0) {
          const newClaim = {...claim};
          delete newClaim.qualifiers;
          return newClaim;
        }
        return {
          ...claim,
          qualifiers: newQualifiers,
        } as ClaimType;
      })
      .map<ClaimType>(claim => {
        const oldReferences = claim.references;
        if (!oldReferences) return claim;

        const newReferences = oldReferences
          .map<ReferenceType | undefined>(ref => {
            const snaks = filterSnaksMap(ref.snaks);
            if (!snaks) return;
            return {...ref, snaks};
          })
          .filter(isOkay);
        if (newReferences.length === 0) {
          const newClaim = {...claim};
          delete newClaim.references;
          return newClaim;
        }
        return {
          ...claim,
          references: newReferences,
        };
      });

    if (propertyClaims.length > 0) {
      result[propertyId] = propertyClaims;
    }
  });
  return result;
}

function filterEmptyLabelalikes<T extends DescriptionsType | LabelsType> (labelalikes: T): T {
  const result = {} as T;
  Object.entries(labelalikes).forEach(([langCode, labelalike]) => {
    if (typeof labelalike.value === 'string'
        && labelalike.value.trim() !== '') {
      result[langCode] = labelalike;
    }
  });
  return result;
}

function filterSnaksMap<T extends QualifiersType | SnaksType > (snaksMap: null | T): T | null {
  if (!snaksMap) return null;

  const result = {} as T;
  let resultIsEmpty = true;
  Object.entries(snaksMap).forEach(([propertyId, snaksArray]) => {
    const propertySnaks = snaksArray
      .filter(snak => !isSnakEmtpy(snak));

    if (propertySnaks.length > 0) {
      result[propertyId] = propertySnaks;
      resultIsEmpty = false;
    }
  });

  if (resultIsEmpty) return null; // undefined
  return result;
}

export default function filterEmptyEntityStructures (entity: EntityType) {
  return {
    ...entity,
    labels: entity.labels ? filterEmptyLabelalikes(entity.labels) : undefined,
    descriptions: entity.descriptions ? filterEmptyLabelalikes(entity.descriptions) : undefined,
    aliases: entity.aliases ? filterEmptyAliases(entity.aliases) : undefined,
    claims: entity.claims ? filterEmptyClaims(entity.claims) : undefined,
  };
}

function isStringBlank (str: null | string | undefined) {
  if (!str) return true;
  return str.trim() === '';
}

function isNumberDefined (number: number | null | undefined) {
  return typeof number !== 'undefined' && number !== null;
}

function isSnakEmtpy (snak?: SnakType | null) {
  if (!snak) return true;
  if (snak.snaktype !== 'value')
    return false;

  const {datavalue} = snak;
  if (!datavalue) return true;

  const value = datavalue.value;
  if (!datavalue || !value) return true;

  switch (datavalue.type) {
  case 'monolingualtext':
    return isStringBlank(datavalue?.value?.text) || isStringBlank(datavalue?.value?.language);
  case 'string':
    return isStringBlank(datavalue.value);
  case 'time':
    return isStringBlank(datavalue?.value?.time) || isStringBlank(datavalue?.value?.calendarmodel);
  case 'wikibase-entityid':
    return !isNumberDefined(datavalue?.value?.['numeric-id']) || isStringBlank(datavalue?.value?.['entity-type']);
  default:
    return false;
  }
}
