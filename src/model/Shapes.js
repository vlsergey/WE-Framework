import PropTypes from 'prop-types';

export const Claim = {
  mainsnak: PropTypes.shape( Snak ),
};

export const DataValue = {
  type: PropTypes.string.isRequired,
  value: PropTypes.any,
};

export const Entity = {
  claims: PropTypes.object,
};

export const Snak = {
  snaktype: PropTypes.oneOf( [ 'value' ] ),
  property: PropTypes.string.isRequired,
  hash : PropTypes.string,
  datavalue: PropTypes.shape( DataValue ),
  type: PropTypes.string,
  id: PropTypes.string,
  rank: PropTypes.oneOf( [ 'preffered', 'normal', 'deprecated' ] ),
};
