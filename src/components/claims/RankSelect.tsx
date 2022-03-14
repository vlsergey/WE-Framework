import React, { ChangeEvent, PureComponent } from 'react';
import i18n from '../core.i18n';
import styles from '../core.css';

const RANKS : RankType[] = [ 'preferred', 'normal', 'deprecated' ];

type PropsType = {
  onChange : (value : RankType) => any,
  value : RankType,
};

export default class RankSelect extends PureComponent<PropsType> {

  static defaultProps = {
    value: 'normal',
  };

  ref = React.createRef< HTMLSelectElement >();

  override componentDidMount() {
    if ( this.ref.current ) this.ref.current.focus();
  }

  handleChange = ( event : ChangeEvent< HTMLSelectElement > ) => {
    if ( this.ref.current ) {
      this.props.onChange( this.ref.current.value as RankType );
    }
    event.stopPropagation();
  }

  override render() {
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
