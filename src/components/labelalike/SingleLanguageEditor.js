import React, { PureComponent } from 'react';
import AliasesEditor from './AliasesEditor';
import i18n from 'components/core.i18n';
import PropTypes from 'prop-types';
import styles from 'components/core.css';

export default class SingleLanguageEditor extends PureComponent {

  static propTypes = {
    label: PropTypes.string,
    description: PropTypes.string,
    draftAlias: PropTypes.string,
    aliases: PropTypes.arrayOf( PropTypes.string ),

    onLabelChange: PropTypes.func.isRequired,
    onDescriptionChange: PropTypes.func.isRequired,
    onAliasesChange: PropTypes.func.isRequired,
    onDraftAliasChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    label: '',
    description: '',
    aliases: [],
    draftAlias: '',
  }

  constructor() {
    super( ...arguments );

    this.handleLabelChange = event => this.props.onLabelChange( event.target.value || '' );
    this.handleDescriptionChange = event => this.props.onDescriptionChange( event.target.value || '' );
  }

  render() {
    /* eslint no-unused-vars: ["error", { "varsIgnorePattern": "on.*Change" }] */
    const { label, description, draftAlias, aliases,
      onLabelChange, onDescriptionChange, onDraftAliasChange, onAliasesChange, ...other } = this.props;

    return <table className={styles.wef_table + ' ' + styles.wef_labels_description_area} {...other}>
      <tbody>
        <tr>
          <th>{i18n.labelLabel}</th>
          <td >
            <input onChange={this.handleLabelChange} value={label} />
          </td>
        </tr>
        <tr>
          <th>{i18n.labelDescription}</th>
          <td >
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
