import React, { Component } from 'react';
import i18n from '../core.i18n';
import PropTypes from 'prop-types';
import styles from '../core.css';

const RANKS = [ 'preferred', 'normal', 'deprecated' ];

export default class RankSelect extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOf( RANKS ),
  };

  static defaultProps = {
    value: 'normal',
  };

  constructor() {
    super( ...arguments );
    this.ref = React.createRef();
    this.handleChange = this.handleChange.bind( this );
  }

  componentDidMount() {
    this.ref.current.focus();
  }

  handleChange( event ) {
    this.props.onChange( this.ref.current.value );
    event.stopPropagation();
  }

  render() {
    /* eslint no-unused-vars: ["error", { "varsIgnorePattern": "onChange" }]*/
    const { onChange, value, ...other } = this.props;

    return <select
      className={styles[ 'wef-rankselector-menu' ]}
      onChange={this.handleChange}
      ref={this.ref}
      size={3}
      value={value}
      {...other}>
      {RANKS.map( rank => <option
        key={rank}
        title={i18n.rankTitle[ rank ]}
        value={rank}>{i18n.rank[ rank ]}</option> )}
    </select>;
  }
}
