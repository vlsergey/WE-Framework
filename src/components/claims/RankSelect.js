// @flow

import React, { PureComponent } from 'react';
import { boundMethod } from 'autobind-decorator';
import i18n from '../core.i18n';
import styles from '../core.css';

const RANKS : RankType[] = [ 'preferred', 'normal', 'deprecated' ];

type PropsType = {
  onChange : RankType => any,
  value : RankType,
};

export default class RankSelect extends PureComponent<PropsType> {

  static defaultProps = {
    value: 'normal',
  };

  ref : ReactObjRef< HTMLSelectElement > = React.createRef();

  componentDidMount() {
    if ( this.ref.current ) this.ref.current.focus();
  }

  @boundMethod
  handleChange( event : SyntheticEvent< HTMLSelectElement > ) {
    if ( this.ref.current ) {
      this.props.onChange( this.ref.current.value );
    }
    event.stopPropagation();
  }

  render() {
    /* eslint no-unused-vars: ["error", { "varsIgnorePattern": "onChange" }]*/
    const { onChange, value, ...etc } = this.props;

    return <select
      {...etc}
      className={styles[ 'wef-rankselector-menu' ]}
      onChange={this.handleChange}
      ref={this.ref}
      size={3}
      value={value}>
      {RANKS.map( rank => <option
        key={rank}
        title={i18n.rankTitle[ rank ]}
        value={rank}>{i18n.rank[ rank ]}</option> )}
    </select>;
  }
}
