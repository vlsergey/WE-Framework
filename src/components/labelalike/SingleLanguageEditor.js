import React, { PureComponent } from 'react';
import i18n from 'components/core.i18n';
import labelalikeStyles from './labelalike.css';
import PropTypes from 'prop-types';
import styles from 'components/core.css';
import TagsInput from 'react-tagsinput';

const INPUT_PROPS = {
  className: labelalikeStyles[ 'react-tagsinput-input' ],
  placeholder: i18n.placeholderAliases,
};

const TAG_PROPS = {
  className: labelalikeStyles[ 'react-tagsinput-tag' ],
  classNameRemove: labelalikeStyles[ 'react-tagsinput-remove' ],
};

export default class SingleLanguageEditor extends PureComponent {

  static propTypes = {
    label: PropTypes.string,
    description: PropTypes.string,
    aliases: PropTypes.arrayOf( PropTypes.string ),

    onLabelChange: PropTypes.func.isRequired,
    onDescriptionChange: PropTypes.func.isRequired,
    onAliasesChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    label: '',
    description: '',
    aliases: [],
  }

  constructor() {
    super( ...arguments );

    this.handleLabelChange = this.handleLabelChange.bind( this );
    this.handleDescriptionChange = this.handleDescriptionChange.bind( this );
  }

  handleLabelChange( event ) {
    this.props.onLabelChange( event.target.value || '' );
  }

  handleDescriptionChange( event ) {
    this.props.onDescriptionChange( event.target.value || '' );
  }

  render() {
    /* eslint no-unused-vars: ["error", { "varsIgnorePattern": "on.*Change" }] */
    const { label, description, aliases, onLabelChange, onDescriptionChange, onAliasesChange, ...other } = this.props;

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
          <td >
            <TagsInput
              className={labelalikeStyles[ 'react-tagsinput' ]}
              focusedClassName={labelalikeStyles[ 'react-tagsinput--focused' ]}
              inputProps={INPUT_PROPS}
              onChange={onAliasesChange}
              onlyUnique
              tagProps={TAG_PROPS}
              value={aliases} />
          </td>
        </tr>
      </tbody>
    </table>;
  }

}
