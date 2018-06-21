import { destroyEditor, openEditor } from '../../src/core/edit';
import AdmEntityEditorTemplate from '../../src/editors/AdmEntityEditorTemplate';
import MovieEditorTemplate from '../../src/editors/MovieEditorTemplate';
import Q1367759 from '../entities/Q1367759';
import Q2262932 from '../entities/Q2262932';

describe( 'edit.js', () => {

  it( 'Should be able to open MovieEditor', () => {
    const appDiv = openEditor( MovieEditorTemplate, Q2262932 );
    destroyEditor( appDiv );
  } );

  it( 'Should be able to open AdmEntityEditor', () => {
    const appDiv = openEditor( AdmEntityEditorTemplate, Q1367759 );
    destroyEditor( appDiv );
  } );

} );
