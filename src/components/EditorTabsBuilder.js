import React, { PureComponent } from 'react';
import EditorPage from './EditorPage';
import PropTypes from 'prop-types';
import TabsWrapper from '../wrappers/TabsWrapper';

export default class EditorTabsBuilder extends PureComponent {

  render() {
    const { tabs } = this.props;

    return <TabsWrapper tabs={ tabs.map( ( tabDescription ) => ( {
      key: tabDescription.key,
      label: tabDescription.label,
      content: <EditorPage fields={tabDescription.fields} />,
    } ) ) } />;
  }

}

EditorTabsBuilder.propTypes = {
  tabs: PropTypes.arrayOf( PropTypes.shape( {
    label: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    fields: PropTypes.array,
  } ) ),
};
