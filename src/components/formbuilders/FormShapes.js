import PropTypes from 'prop-types';

export const ChildrenContainer = {
  fields: PropTypes.arrayOf( PropTypes.shape( FieldShape ) ),
  fieldsets: PropTypes.arrayOf( PropTypes.shape( FieldsetShape ) ),
  specials: PropTypes.arrayOf( PropTypes.shape( SpecialShape ) ),
};

export const EditorShape = {
  linkTitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tabs: PropTypes.arrayOf( PropTypes.shape( TabShape ) ),
};

export const FieldShape = {
  property: PropTypes.string.isRequired,
};

export const FieldsetShape = {
  key: PropTypes.string,
  labelEntity: PropTypes.string,
  labelEntityId: PropTypes.string,
  ...ChildrenContainer,
};

export const SpecialShape = {
  key: PropTypes.string,
  type: PropTypes.string.isRequired,
};

export const TabShape = {
  label: PropTypes.string,
  labelEntityId: PropTypes.string,
  ...ChildrenContainer,
};
