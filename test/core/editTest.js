import { destroyEditor, renderEditor } from '../../src/core/edit';
import AdmEntityEditorTemplate from '../../src/editors/AdmEntityEditorTemplate';
import EntityEditorTemplate from '../../src/editors/EntityEditorTemplate';
import MovieEditorTemplate from '../../src/editors/MovieEditorTemplate';
import Q1367759 from '../entities/Q1367759';
import Q2262932 from '../entities/Q2262932';
import Q30 from '../entities/Q30';

const NOOP = () => {};

describe( 'edit.js', () => {

  it( 'Should be able to open AdmEntityEditor for Q1367759', () => {
    destroyEditor( renderEditor( AdmEntityEditorTemplate, Q1367759, NOOP, NOOP ) );
  } );

  it( 'Should be able to open AdmEntityEditor for Q30', () => {
    destroyEditor( renderEditor( AdmEntityEditorTemplate, Q30, NOOP, NOOP ) );
  } );

  [ Q1367759, Q2262932, Q30 ].forEach( entity => {
    it( 'Should be able to open EntityEditor for ' + entity.id, () => {
      destroyEditor( renderEditor( EntityEditorTemplate, entity, NOOP, NOOP ) );
    } );
  } );

  it( 'Should be able to open MovieEditor', () => {
    destroyEditor( renderEditor( MovieEditorTemplate, Q2262932, NOOP, NOOP ) );
  } );

} );
