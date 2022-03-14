import React, {ChangeEvent, PureComponent} from 'react';

import styles from '../core.css';
import i18n from '../core.i18n';
import AliasesEditor from './AliasesEditor';

interface PropsType {
  aliases: string[];
  description: string;
  draftAlias: string;
  label: string;
  onAliasesChange: (aliases: string[] | null) => any;
  onDescriptionChange: (descriptions: string | null) => any;
  onDraftAliasChange: (draft: string | null) => any;
  onLabelChange: (label: string | null) => any;
}

export default class SingleLanguageEditor extends PureComponent<PropsType> {

  static defaultProps = {
    label: '',
    description: '',
    aliases: [],
    draftAlias: '',
  };

  handleLabelChange = ({currentTarget: {value}}: ChangeEvent< HTMLInputElement >) => {
    this.props.onLabelChange(value || '');
  };

  handleDescriptionChange = ({currentTarget: {value}}: ChangeEvent< HTMLInputElement >) => {
    this.props.onDescriptionChange(value || '');
  };

  override render () {
    /* eslint no-unused-vars: ["error", { "varsIgnorePattern": "on.*Change" }] */
    const {label, description, draftAlias, aliases, onLabelChange,
      onDescriptionChange, onDraftAliasChange, onAliasesChange, ...etc} = this.props;

    return <table
      {...etc}
      className={styles.wef_labels_description_area}>
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
