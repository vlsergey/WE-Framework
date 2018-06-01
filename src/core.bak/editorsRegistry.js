import * as WEF_Utils from './utils';
import WEF_Editor from './Editor';

class EditorsRegistry {
  constructor() {
    /** @type {WEF_Editor[]} */
    this.registry = {};
    this.registryLength = 0;

    console.log( '[WE-F] Editors registry initialized' );
  }

  registerEditor( classEntityId, editor ) {
    if ( WEF_Utils.isEmpty( classEntityId ) ) {
      throw new Error( 'Illegal argument: classEntityId not provided' );
    }
    if ( !( editor instanceof WEF_Editor ) ) {
      throw new Error( 'Illegal argument: ' + editor + ' is not instanceof WEF_Editor' );
    }
    this.registry[ classEntityId ] = editor;
    this.registryLength++;
    console.log( '[WE-F] Successfully registered editor ' + editor + ' for class ' + classEntityId );
  }
}

const editorsRegistry = new EditorsRegistry();
export default editorsRegistry;
