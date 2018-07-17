import Isbn10PropertyDataValueEditor from './isbn/Isbn10PropertyDataValueEditor';
import Isbn13PropertyDataValueEditor from './isbn/Isbn13PropertyDataValueEditor';

class EnhancementsFactory {

  constructor() {
    this.dataValueEditorsByProperty = {};

    this.dataValueEditorsByProperty.P212 = Isbn13PropertyDataValueEditor;
    this.dataValueEditorsByProperty.P957 = Isbn10PropertyDataValueEditor;
  }

  findDataValueEditor( propertyDescription ) {
    return this.dataValueEditorsByProperty[ propertyDescription.id ] || null;
  }

}

const instance = new EnhancementsFactory();
export default instance;
