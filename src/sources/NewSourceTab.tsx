import React, {PureComponent, useCallback} from 'react';

import {onNewElementClick} from '../core/edit';
import Article from '../editors/ArticleEditorTemplate';
import Book from '../editors/BookEditorTemplate';
import {EditorDefType} from '../editors/EditorDefModel';
import FrbrEdition from '../editors/FrbrEditionEditorTemplate';
import FrbrWork from '../editors/FrbrWorkEditorTemplate';
import styles from './styles.css';

interface PropsType {
  onInsert: (entityId: string) => unknown;
}

export default class NewSourceTab extends PureComponent<PropsType> {

  override render () {
    const {onInsert} = this.props;

    return <div className={styles.newSourceTab}>
      <table>
        <tbody>
          <tr>
            <th>{FrbrWork.linkText}</th>
            <th>{FrbrEdition.linkText}</th>
          </tr>
          <tr>
            <td>
              <EditorButton clsEntityId="Q571" editorDef={FrbrWork} onInsert={onInsert} title="книга" />
              <EditorButton clsEntityId="Q13442814" editorDef={FrbrWork} onInsert={onInsert} title="научная статья" />
              <EditorButton clsEntityId="Q191067" editorDef={FrbrWork} onInsert={onInsert} title="статья" />
              <EditorButton clsEntityId="Q591041" editorDef={FrbrWork} onInsert={onInsert} title="научная публикация" />
            </td>
            <td>
              <EditorButton clsEntityId="Q3331189" editorDef={FrbrEdition} onInsert={onInsert} title="версия или издание" />
            </td>
          </tr>
          <tr>
            <th>{Book.linkText}</th>
            <th>{Article.linkText}</th>
          </tr>
          <tr>
            <td>
              <EditorButton clsEntityId="Q737498" editorDef={Book} onInsert={onInsert} title="академический журнал" />
              <EditorButton clsEntityId="Q11032" editorDef={Book} onInsert={onInsert} title="газета" />
              <EditorButton clsEntityId="Q571" editorDef={Book} onInsert={onInsert} title="книга" />
              <EditorButton clsEntityId="Q5633421" editorDef={Book} onInsert={onInsert} title="научный журнал" />
            </td>
            <td>
              <EditorButton clsEntityId="Q591041" editorDef={Article} onInsert={onInsert} title="научная публикация" />
              <EditorButton clsEntityId="Q13442814" editorDef={Article} onInsert={onInsert} title="научная статья" />
              <EditorButton clsEntityId="Q191067" editorDef={Article} onInsert={onInsert} title="статья" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>;
  }

}

const EditorButtonImpl = ({
  editorDef, clsEntityId, onInsert, title,
}: {
  clsEntityId: string;
  editorDef: EditorDefType;
  onInsert: (entityId: string) => unknown;
  title: string;
}) => {

  const onClick = useCallback(async () => {
    onInsert(await onNewElementClick(editorDef, clsEntityId));
  }, [clsEntityId, editorDef, onInsert]);

  return <button onClick={onClick}>{title}</button>;
};

const EditorButton = React.memo(EditorButtonImpl);
