import React, { PureComponent } from 'react';
import ArticleEditorTemplate from 'editors/ArticleEditorTemplate';
import BookEditorTemplate from 'editors/BookEditorTemplate';
import FrbrEditionEditorTemplate from 'editors/FrbrEditionEditorTemplate';
import FrbrWorkEditorTemplate from 'editors/FrbrWorkEditorTemplate';
import { onNewElementClick } from 'core/edit';
import PropTypes from 'prop-types';
import styles from './styles.css';

export default class NewSourceTab extends PureComponent {

  static propTypes = {
    onInsert: PropTypes.func.isRequired,
  }

  handleClickF( editorDescription, classId ) {
    return () => {
      onNewElementClick( editorDescription, classId )
        .then( entityId => this.props.onInsert( entityId ) );
    };
  }

  render() {
    const handleClickF = this.handleClickF.bind( this );

    return <div className={styles.newSourceTab}>
      <table>
        <tbody>
          <tr>
            <th>{FrbrWorkEditorTemplate.linkText}</th>
            <th>{FrbrEditionEditorTemplate.linkText}</th>
          </tr>
          <tr>
            <td>
              <button onClick={handleClickF( FrbrWorkEditorTemplate, 'Q571' )}>книга</button>
              <button onClick={handleClickF( FrbrWorkEditorTemplate, 'Q13442814' )}>научная статья</button>
              <button onClick={handleClickF( FrbrWorkEditorTemplate, 'Q191067' )}>статья</button>
              <button onClick={handleClickF( FrbrWorkEditorTemplate, 'Q591041' )}>научная публикация</button>
            </td>
            <td>
              <button onClick={handleClickF( FrbrEditionEditorTemplate, 'Q3331189' )}>версия или издание</button>
            </td>
          </tr>
          <tr>
            <th>{BookEditorTemplate.linkText}</th>
            <th>{ArticleEditorTemplate.linkText}</th>
          </tr>
          <tr>
            <td>
              <button onClick={handleClickF( BookEditorTemplate, 'Q737498' )}>академический журнал</button>
              <button onClick={handleClickF( BookEditorTemplate, 'Q11032' )}>газета</button>
              <button onClick={handleClickF( BookEditorTemplate, 'Q571' )}>книга</button>
              <button onClick={handleClickF( BookEditorTemplate, 'Q5633421' )}>научный журнал</button>
            </td>
            <td>
              <button onClick={handleClickF( ArticleEditorTemplate, 'Q591041' )}>научная публикация</button>
              <button onClick={handleClickF( ArticleEditorTemplate, 'Q13442814' )}>научная статья</button>
              <button onClick={handleClickF( ArticleEditorTemplate, 'Q191067' )}>статья</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>;
  }

}
