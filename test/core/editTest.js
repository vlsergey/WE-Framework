import MovieEditorTemplate from "../../src/editors/MovieEditorTemplate";
import { openEditor } from "../../src/core/edit";
import Q2262932 from "../entities/Q2262932";

describe('edit.js', () => {
  it('Should be able to open MovieEditor', () => {

    openEditor(MovieEditorTemplate, Q2262932);
    
  });
});
