// @flow

import React, { PureComponent } from 'react';
import createTalkPageWithPlaceholder from './createTalkPageWithPlaceholder';
import DialogWrapper from 'wrappers/DialogWrapper';
import { getServerApi } from 'core/ApiUtils';
import styles from './styles.css';

const isBlank = str => str === undefined || str === null || str.trim() === '';

type PropsType= {
  entityId : string,
  onClose : () => any,
  onInsert : ( string ) => any,
};

type StateType = {
  addRefAuthor : boolean,
  addRefComment : boolean,
  addRefYear : boolean,
  insertAsRef : boolean,
  issue : string,
  pages : string,
  part : string,
  partUrl : string,
  refAuthor : string,
  refComment : string,
  refYear : string,
  volume : string,
};

export default class AdditionalArgumentsDialog
  extends PureComponent<PropsType, StateType> {

  constructor() {
    super( ...arguments );

    this.state = {
      part: '',
      partUrl: '',
      pages: '',
      volume: '',
      issue: '',

      insertAsRef: false,
      addRefAuthor: true, refAuthor: '',
      addRefYear: true, refYear: '',
      addRefComment: true, refComment: '',
    };

    this.handleChange = this.handleChange.bind( this );
    this.handleInsertClick = this.handleInsertClick.bind( this );
  }

  componentDidMount() {
    const { entityId } = this.props;

    this.expandtemplates( 'Sources-authors', 'renderSourceAuthors', entityId, 'refAuthor' );
    this.expandtemplates( 'Sources-year', 'renderSourceYear', entityId, 'refYear' );
    this.expandtemplates( 'Sources-title', 'renderSourceTitle', entityId, 'refComment' );
  }

  expandtemplates( renderModule : string, renderFunction : string, entityId : string, stateKey : string ) {
    getServerApi()
      .postPromise( {
        action: 'expandtemplates',
        format: 'json',
        prop: 'wikitext',
        text: '{' + '{#invoke:' + renderModule + ' | ' + renderFunction + ' | ' + entityId + '}}',
      } )
      .then( result => result.expandtemplates.wikitext )
      .then( text => this.setState( { [ stateKey ]: text } ) );
  }

  handleChange( event ) {
    const { name, value } = event.target;
    this.setState( { [ name ]: value } );
  }

  handleInsertClick( ) {
    let textToInsert;
    if ( this.state.insertAsRef ) {
      textToInsert = '{{source-ref|';
    } else {
      textToInsert = '{{source|';
    }

    textToInsert += this.props.entityId;

    [ 'part', 'partUrl', 'pages', 'volume', 'issue' ].forEach( key => {
      if ( !isBlank( this.state[ key ] ) ) {
        textToInsert += '|' + key + '=' + this.state[ key ];
      }
    } );

    if ( this.state.addRefAuthor && !isBlank( this.state.refAuthor ) )
      textToInsert += '|ref=' + this.state.refAuthor;
    if ( this.state.addRefYear && !isBlank( this.state.refYear ) )
      textToInsert += '|ref-year=' + this.state.refYear;

    textToInsert += '}}';

    if ( this.state.addRefComment && !isBlank( this.state.refComment ) ) {
      textToInsert += ' <!-- ' + this.state.refComment + ' -->';
    }

    this.props.onInsert( textToInsert );

    // TODO: WEF_LatestUsedSources.add( entityId );
    createTalkPageWithPlaceholder( this.props.entityId );
  }

  render() {
    const { onClose } = this.props;

    const buttons = [];

    buttons.push( {
      text: 'Добавить',
      label: 'Добавить',
      click: this.handleInsertClick,
    } );

    return <DialogWrapper
      buttons={buttons}
      onClose={onClose}
      title={'Дополнительные параметры источника'}
      width={550}>
      <div className={styles.additionalArgumentsDialog}>
        <p>При необходимости укажите дополнительные параметры источника</p>
        <table>
          <tbody>
            <tr>
              <th>Название главы, части или раздела:</th>
              <td>
                <input
                  name="part"
                  onChange={this.handleChange}
                  value={this.state.part} />
              </td>
            </tr>
            <tr>
              <th>URL для главы, части или раздела:</th>
              <td>
                <input
                  name="partUrl"
                  onChange={this.handleChange}
                  value={this.state.partUrl} />
              </td>
            </tr>
            <tr>
              <th>Номера страниц:</th>
              <td>
                <input
                  name="pages"
                  onChange={this.handleChange}
                  value={this.state.pages} />
              </td>
            </tr>
            <tr>
              <th>Том:</th>
              <td>
                <input name="volume"
                  onChange={this.handleChange}
                  value={this.state.volume} />
              </td>
            </tr>
            <tr>
              <th>Выпуск:</th>
              <td>
                <input
                  name="issue"
                  onChange={this.handleChange}
                  value={this.state.issue} />
              </td>
            </tr>
          </tbody>
        </table>
        <hr />
        <p>Если Вам необходимо указать другие параметры, например, автора или год публикации, нужно завести отдельный элемент источника.</p>
        <hr />
        <table>
          <tbody>
            <tr>
              <th>
                <label>
                  <input
                    checked={this.state.insertAsRef || false}
                    name="insertAsRef"
                    onChange={this.handleChange}
                    type="checkbox" />
                  {'Вставить как сноску'}
                </label>
              </th>
            </tr>
            <tr>
              <th>
                <label>
                  <input
                    checked={this.state.addRefAuthor || false}
                    name="addRefAuthor"
                    onChange={this.handleChange}
                    type="checkbox" />
                  {'Добавить параметр ref с фамилиями авторов'}
                </label>
              </th>
              <td>
                <input
                  name="refAuthor"
                  onChange={this.handleChange}
                  value={this.state.refAuthor} />
              </td>
            </tr>
            <tr>
              <th>
                <label>
                  <input
                    checked={this.state.addRefYear || false}
                    name="addRefYear"
                    onChange={this.handleChange}
                    type="checkbox" />
                  {'Добавить параметр ref-year'}
                </label>
              </th>
              <td>
                <input
                  name="refYear"
                  onChange={this.handleChange}
                  value={this.state.refYear} />
              </td>
            </tr>
            <tr>
              <th>
                <label>
                  <input
                    checked={this.state.addRefComment || false}
                    name="addRefComment"
                    onChange={this.handleChange}
                    type="checkbox" />
                  {'Добавить комментарий с названием источника'}
                </label>
              </th>
              <input
                name="refComment"
                onChange={this.handleChange}
                value={this.state.refComment} />
            </tr>
          </tbody>
        </table>
      </div>
    </DialogWrapper>;
  }

}
