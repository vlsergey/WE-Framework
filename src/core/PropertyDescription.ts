import * as I18nUtils from '../utils/I18nUtils';
import PropertyData, {FormatterUrlData} from './PropertyData';

class UrlFormatter {

  _format: string | null;
  _regexp: string | null;

  constructor (formatterUrlData: FormatterUrlData) {
    this._format = formatterUrlData.urlTemplate;
    this._regexp = formatterUrlData.regexp;
  }

  hasRegexp () {
    return !!this._regexp;
  }

  isCompliant (value: string) {
    return !this._regexp || new RegExp('^' + this._regexp + '$').test(value);
  }

  format (value: string): string | null {
    return this._format ? this._format.replace(/\$1/g, value) : null;
  }

}

const EMPTY_ARRAY = [] as const;

export default class PropertyDescription {

  allowedQualifiers: readonly string[];
  countries: readonly string[];
  countryFlags: readonly string[];
  datatype: string;
  description?: string;
  id: string;
  label?: string;
  languageCodes: readonly string[];
  languageIds: readonly string[];
  lastrevid?: number;
  oneOf: readonly string[];
  pageid?: number;
  quantityUnitEnabled: boolean;
  quantityUnits: readonly string[];
  regexp?: string;
  sourceWebsites: readonly string[];
  sourceWebsitesLanguages: readonly string[];
  valueTypeConstraint?: {
    instanceOf?: readonly string[];
  };

  version?: number;
  urlFormatters: UrlFormatter[];

  constructor (
    data: PropertyData,
    countryFlags: readonly string[] = EMPTY_ARRAY,
    languageCodes: readonly string[] = EMPTY_ARRAY,
    languageIds: readonly string[] = EMPTY_ARRAY
  ) {
    if (!data.id) throw new Error('Missing property id in PropertyData: ' + JSON.stringify(data));

    this.id = data.id;
    this.datatype = data.datatype;
    this.pageid = data.pageid;
    this.lastrevid = data.lastrevid;

    const translations = {} as Record<string, {
      label?: string;
      description?: string;
    }>;
    Object.entries(data.labels).forEach(([languageCode, label]) => {
      translations[languageCode] = translations[languageCode] || {};
      translations[languageCode]!.label = label;
    });
    Object.entries(data.descriptions).forEach(([languageCode, description]) => {
      translations[languageCode] = translations[languageCode] || {};
      translations[languageCode]!.description = description;
    });

    const translated = I18nUtils.localize({}, translations);
    if (translated.label) this.label = translated.label;
    if (translated.description) this.description = translated.description;

    this.allowedQualifiers = data.allowedQualifiers;
    this.countries = data.countries;
    this.countryFlags = countryFlags;
    this.languageCodes = languageCodes;
    this.languageIds = languageIds;
    this.oneOf = data.oneOf;
    this.quantityUnitEnabled = data.quantityUnitEnabled;
    this.quantityUnits = data.quantityUnits;
    this.regexp = data.regexp;
    this.sourceWebsites = data.sourceWebsites;
    this.sourceWebsitesLanguages = data.sourceWebsitesLanguages || [];
    this.urlFormatters = data.formatterUrls.map(data => new UrlFormatter(data));
    this.valueTypeConstraint = data.valueTypeConstraint;
  }

  formatUrl (value: string | null): null | string {
    if (value === null || value === '')
      return '';

    if (typeof value !== 'string')
      return null;

    const formatter = this.urlFormatters.find(formatter => formatter.isCompliant(value));
    if (formatter)
      return formatter.format(value);

    return null;
  }

}
