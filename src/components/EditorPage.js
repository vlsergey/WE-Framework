import React, { PureComponent } from 'react';
import ClaimEditors from './ClaimEditors';
import entityContext from '../core/entityContext';
import PropTypes from 'prop-types';
import styles from './core.css';

export default class EditorPage extends PureComponent {

  render() {
    const { fields } = this.props;

    return <table className={styles.wef_table}>
      <entityContext.Consumer>
        { entity => fields.map( fieldDescription =>
          <ClaimEditors code={fieldDescription.code} key={fieldDescription.code} entity={entity} />
        ) }
      </entityContext.Consumer>
    </table>;
  }

}

EditorPage.propTypes = {
  fields: PropTypes.array,
};
