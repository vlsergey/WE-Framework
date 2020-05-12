// @flow

import React, { PureComponent } from 'react';
import AliasesEditor from './AliasesEditor';
import { boundMethod } from 'autobind-decorator';
import i18n from 'components/core.i18n';
import styles from 'components/core.css';

type PropsType = {
  aliases : string[],
  description : string,
  draftAlias : string,
  label : string,
  onAliasesChange : ?( string[] ) => any,
  onDescriptionChange : ?string => any,
  onDraftAliasChange : ?string => any,
  onLabelChange : ?string => any,
};

export default class SingleLanguageEditor extends PureComponent<PropsType> {

  static defaultProps = {
    label: '',
    description: '',
    aliases: [],
    draftAlias: '',
  };

  @boundMethod
  handleLabelChange( { currentTarget: { value } } : SyntheticEvent< HTMLInputElement > ) {
    this.props.onLabelChange( value || '' );
  }

  @boundMethod
  handleDescriptionChange( { currentTarget: { value } } : SyntheticEvent< HTMLInputElement > ) {
    this.props.onDescriptionChange( value || '' );
  }

  render() {
    /* eslint no-unused-vars: ["error", { "varsIgnorePattern": "on.*Change" }] */
    const { label, description, draftAlias, aliases, onLabelChange,
      onDescriptionChange, onDraftAliasChange, onAliasesChange, ...etc } = this.props;

    return <table
      {...etc}
      className={styles.wef_table + ' ' + styles.wef_labels_description_area}>
      <tbody>
        <tr>
          <th>{i18n.labelLabel}</th>
          <td>
            <input onChange={this.handleLabelChange} value={label} />
          </td>
        </tr>
        <tr>
          <th>{i18n.labelDescription}</th>
          <td>
            <input onChange={this.handleDescriptionChange} value={description} />
          </td>
        </tr>
        <tr>
          <th>{i18n.labelAliases}</th>
          <td>
            <AliasesEditor
              draft={draftAlias}
              onChange={onAliasesChange}
              onChangeDraft={onDraftAliasChange}
              values={aliases} />
          </td>
        </tr>
      </tbody>
    </table>;
  }

}
