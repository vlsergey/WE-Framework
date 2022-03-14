import PropertyDescription from '../core/PropertyDescription';

class EnhancementsFactory {

  findDataValueEditor (propertyDescription: PropertyDescription) {
    switch (propertyDescription.id) {

    case 'P22': return require('./family/FatherDataValueEditor').default;
    case 'P25': return require('./family/MotherDataValueEditor').default;
    case 'P26': return require('./family/SpouseDataValueEditor').default;
    case 'P451': return require('./family/PartnerDataValueEditor').default;

    case 'P212': return require('./isbn/Isbn13PropertyDataValueEditor').default;
    case 'P957': return require('./isbn/Isbn10PropertyDataValueEditor').default;

    case 'P1082': return require('./population/PopulationDataValueEditor').default;

    case 'P214': return require('./viaf/ViafPropertyDataValueEditor').default;

    default: return null;
    }
  }
}

const instance = new EnhancementsFactory();
export default instance;
