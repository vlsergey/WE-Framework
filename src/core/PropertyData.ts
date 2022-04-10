import {filterClaimsByRank, findClaimQualifiers, findEntityIdsFromClaims,
  findEntityIdsFromQualifiers, findStringsFromClaims,
  findStringsFromQualifiers, getStringFromSnak} from '../model/ModelUtils';
import {DEFAULT_LANGUAGES} from '../utils/I18nUtils';

const claimHasMainsnakValue = (statement: ClaimType) => statement.mainsnak
    && statement.mainsnak.datavalue
    && statement.mainsnak.datavalue.value;

function findSingleStatementByEntityIdValue (
    entity: EntityType, property: string, entityId: string
): ClaimType | null {
  const claims = entity?.claims?.[property];
  if (!claims) return null;

  // TODO: make use of rank
  const candidates = claims
    .filter(statement =>
      statement.mainsnak
        && statement.mainsnak.datavalue
        && statement.mainsnak.datavalue.value
        && (statement.mainsnak.datavalue.value as WikibaseEntityIdValue).id === entityId);

  if (candidates.length === 1) {
    return candidates[0] || null;
  }

  return null;
}

function getWikibaseItemRestrictions (
    propertyEntity: PropertyType,
    restrictionId: string,
    valuePropertyId: string
): string[] {
  const statement = findSingleStatementByEntityIdValue(propertyEntity, 'P2302', restrictionId);
  if (!statement) return [];
  return findEntityIdsFromQualifiers(statement, valuePropertyId);
}

function getStringRestriction (propertyEntity: PropertyType, restrictionId: string, valuePropertyId: string): string | undefined {
  const statement = findSingleStatementByEntityIdValue(propertyEntity, 'P2302', restrictionId);
  if (!statement)
    return undefined;

  const restricionQualifiers = statement?.qualifiers?.[valuePropertyId];
  if (restricionQualifiers?.length !== 1 || !restricionQualifiers[0]?.datavalue?.value)
    return undefined;

  const dataValue = restricionQualifiers[0]!.datavalue as StringDataValue;
  return dataValue?.value || undefined;
}

export interface FormatterUrlData {
  regexp: string | null;
  urlTemplate: string;
}

/**
 * Little data extraction from PropertyType that small enought
   and can be serialized to IndexDb as JSON
 */
export default class PropertyData {

  datatype: string;
  id: string;
  lastrevid?: number;
  pageid?: number;

  labels: Readonly<Record<string, string>>;
  descriptions: Readonly<Record<string, string>>;

  allowedQualifiers: readonly string[];
  countries: readonly string[];
  formatterUrls: readonly FormatterUrlData[];
  oneOf: readonly string[];
  quantityUnitEnabled: boolean;
  quantityUnits: readonly string[];
  regexp?: string;
  sourceWebsites: readonly string[];
  sourceWebsitesLanguages: readonly string[];
  valueTypeConstraint?: {
    instanceOf?: readonly string[];
  };

  constructor (propertyEntity: PropertyType) {
    if (!propertyEntity.id) throw new Error('Missing property id in PropertyType: ' + JSON.stringify(propertyEntity));

    this.id = propertyEntity.id;
    this.datatype = propertyEntity.datatype;
    this.pageid = propertyEntity.pageid;
    this.lastrevid = propertyEntity.lastrevid;

    const labels: Record<string, string> = {};
    const entityLabels = propertyEntity.labels;
    if (entityLabels) {
      DEFAULT_LANGUAGES.forEach(code => {
        const labelObject = entityLabels[code];
        if (labelObject?.value) {
          labels[code] = labelObject.value;
        }
      });
    }
    this.labels = Object.freeze(labels);

    const descriptions: Record<string, string> = {};
    const entityDescriptions = propertyEntity.descriptions;
    if (entityDescriptions) {
      DEFAULT_LANGUAGES.forEach(code => {
        const labelObject = entityDescriptions[code];
        if (labelObject?.value) {
          descriptions[code] = labelObject.value;
        }
      });
    }
    this.descriptions = Object.freeze(descriptions);

    this.allowedQualifiers = getWikibaseItemRestrictions(propertyEntity, 'Q21510851', 'P2306');
    this.countries = findEntityIdsFromClaims(propertyEntity, 'P17');

    const formatterUrls: FormatterUrlData[] = [];
    filterClaimsByRank((propertyEntity.claims || {}).P1630 || null).forEach(statement => {
      const urlTemplate = getStringFromSnak(statement.mainsnak || null) || null;
      const regexp = findStringsFromQualifiers(statement, 'P1793')[0] || null;

      if (urlTemplate) {
        const data: FormatterUrlData = {urlTemplate, regexp};
        formatterUrls.push(data);
      }
    });
    this.formatterUrls = Object.freeze(formatterUrls);

    findStringsFromClaims(propertyEntity, 'P1630');

    const oneOfConstrains = findSingleStatementByEntityIdValue(propertyEntity, 'P2302', 'Q21510859');
    if (oneOfConstrains) {
      this.oneOf = findEntityIdsFromQualifiers(oneOfConstrains, 'P2305');
    } else {
      this.oneOf = [];
    }

    this.quantityUnitEnabled = false;
    this.quantityUnits = [];
    const unitRestriction = findSingleStatementByEntityIdValue(propertyEntity, 'P2302', 'Q21514353');
    if (unitRestriction) {
      const qualifiers: QualifierType[] = findClaimQualifiers(unitRestriction, 'P2305');
      this.quantityUnitEnabled = !(qualifiers.length === 1 && qualifiers[0]?.snaktype === 'novalue');
      this.quantityUnits = findEntityIdsFromQualifiers(unitRestriction, 'P2305');
    } else {
      this.quantityUnitEnabled = false;
      this.quantityUnits = [];
    }

    this.regexp = getStringRestriction(propertyEntity, 'Q21502404', 'P1793');

    this.sourceWebsites = findStringsFromClaims(propertyEntity, 'P1896');
    this.sourceWebsitesLanguages = filterClaimsByRank((propertyEntity.claims || {}).P1896 || null)
      .filter(claimHasMainsnakValue)
      .flatMap(claim => findEntityIdsFromQualifiers(claim, 'P407'));

    this.valueTypeConstraint = undefined;
    const valueTypeConstraint = findSingleStatementByEntityIdValue(propertyEntity, 'P2302', 'Q21510865');
    if (valueTypeConstraint) {
      const classes: string[] = findEntityIdsFromQualifiers(valueTypeConstraint, 'P2308');
      const relations: string[] = findEntityIdsFromQualifiers(valueTypeConstraint, 'P2309');

      // instance of
      if (relations.length === 1 && relations[0] === 'Q21503252' && classes.length !== 0) {
        this.valueTypeConstraint = {
          instanceOf: classes,
        };
      }
    }
  }

}
