import * as I18nUtils from '../utils/I18nUtils';

export default class LabelDescription {

  description?: string = undefined;
  label?: string = undefined;

  constructor (entity: EntityType) {
    const translations: Record<string, {
      label?: string;
      description?: string;
    }> = {};

    if (entity.labels) {
      Object.values(entity.labels).forEach(label => {
        translations[label.language] = {
          ...translations[label.language],
          label: label.value,
        };
      });
    }

    if (entity.descriptions) {
      Object.values(entity.descriptions).forEach(description => {
        translations[description.language] = {
          ...translations[description.language],
          description: description.value,
        };
      });
    }

    const translated = I18nUtils.localize({}, translations);
    if (translated.label) this.label = translated.label;
    if (translated.description) this.description = translated.description;
  }

}
