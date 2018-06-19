import { destroyEditor, openEditor } from '../../src/core/edit';
import MovieEditorTemplate from '../../src/editors/MovieEditorTemplate';
import Q2262932 from '../entities/Q2262932';

describe( 'edit.js', () => {
  it( 'Should be able to open MovieEditor', () => {

    const appDiv = openEditor( MovieEditorTemplate, Q2262932 );
    destroyEditor( appDiv );
  } );
} );
