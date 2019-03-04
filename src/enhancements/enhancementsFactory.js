import FatherDataValueEditor from './family/FatherDataValueEditor';
import Isbn10PropertyDataValueEditor from './isbn/Isbn10PropertyDataValueEditor';
import Isbn13PropertyDataValueEditor from './isbn/Isbn13PropertyDataValueEditor';
import MotherDataValueEditor from './family/MotherDataValueEditor';
import PartnerDataValueEditor from './family/PartnerDataValueEditor';
import PopulationDataValueEditor from './population/PopulationDataValueEditor';
import SpouseDataValueEditor from './family/SpouseDataValueEditor';
import ViafPropertyDataValueEditor from './viaf/ViafPropertyDataValueEditor';

class EnhancementsFactory {

  constructor() {
    this.dataValueEditorsByProperty = {};

    // family
    this.dataValueEditorsByProperty.P22 = FatherDataValueEditor;
    this.dataValueEditorsByProperty.P25 = MotherDataValueEditor;
    this.dataValueEditorsByProperty.P26 = SpouseDataValueEditor;
    this.dataValueEditorsByProperty.P451 = PartnerDataValueEditor;

    this.dataValueEditorsByProperty.P212 = Isbn13PropertyDataValueEditor;
    this.dataValueEditorsByProperty.P957 = Isbn10PropertyDataValueEditor;

    this.dataValueEditorsByProperty.P1082 = PopulationDataValueEditor;

    this.dataValueEditorsByProperty.P214 = ViafPropertyDataValueEditor;
  }

  findDataValueEditor( propertyDescription ) {
    return this.dataValueEditorsByProperty[ propertyDescription.id ] || null;
  }

}

const instance = new EnhancementsFactory();
export default instance;
