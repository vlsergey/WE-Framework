import Isbn10PropertyDataValueEditor from './isbn/Isbn10PropertyDataValueEditor';
import Isbn13PropertyDataValueEditor from './isbn/Isbn13PropertyDataValueEditor';
import ViafPropertyDataValueEditor from './viaf/ViafPropertyDataValueEditor';

class EnhancementsFactory {

  constructor() {
    this.dataValueEditorsByProperty = {};

    this.dataValueEditorsByProperty.P212 = Isbn13PropertyDataValueEditor;
    this.dataValueEditorsByProperty.P957 = Isbn10PropertyDataValueEditor;

    this.dataValueEditorsByProperty.P214 = ViafPropertyDataValueEditor;
  }

  findDataValueEditor( propertyDescription ) {
    return this.dataValueEditorsByProperty[ propertyDescription.id ] || null;
  }

}

const instance = new EnhancementsFactory();
export default instance;
