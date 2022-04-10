import {localize} from '../utils/I18nUtils';
import PropertyData from './PropertyData';

interface LabelAndDescription {
  label?: string;
  description?: string;
}

export default function getPropertyLocalTitleAndDescription (
    data: PropertyData
): LabelAndDescription {

  const translations = {} as Record<string, LabelAndDescription>;
  for (const [languageCode, label] of Object.entries(data.labels)) {
    translations[languageCode] = translations[languageCode] || {};
    translations[languageCode]!.label = label;
  }
  for (const [languageCode, description] of Object.entries(data.descriptions)) {
    translations[languageCode] = translations[languageCode] || {};
    translations[languageCode]!.description = description;
  }

  const translated = localize<string>({}, translations as Record<string, Record<string, string>>);
  return {
    label: translated.label,
    description: translated.description,
  };
}
