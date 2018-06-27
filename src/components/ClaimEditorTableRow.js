import { animated, Spring } from 'react-spring';
import React, { PureComponent } from 'react';
import { Claim } from 'model/Shapes';
import expect from 'expect';
import FlagCell from './FlagCell';
import PropertyDescription from 'core/PropertyDescription';
import PropTypes from 'prop-types';
import SnakEditorTableRowPart from './SnakEditorTableRowPart';
import styles from './core.css';

const AnimatedTr = ( { children } ) => <Spring from={{ opacity: 0 }} native to={{ opacity: 1 }}>
  {props =>
    <animated.tr style={props}>
      {children}
    </animated.tr>
  }
</Spring>;

AnimatedTr.propTypes = {
  children: PropTypes.node,
};

export default class ClaimEditorTableRow extends PureComponent {

  static TABLE_COLUMNS = 3 + SnakEditorTableRowPart.TABLE_COLUMNS;

  static propTypes = {
    firstCell: PropTypes.node.isRequired,
    claim: PropTypes.shape( Claim ).isRequired,
    flag: PropTypes.string,
    label: PropTypes.oneOfType( [ PropTypes.string, PropTypes.node ] ).isRequired,
    onClaimChange: PropTypes.func.isRequired,
    propertyDescription: PropTypes.instanceOf( PropertyDescription ).isRequired,
  };

  constructor() {
    super( ...arguments );

    this.handleSnakChange = this.handleSnakChange.bind( this );
  }

  handleSnakChange( snak ) {
    expect( snak ).toBeAn( 'object' );
    expect( snak.property ).toBeAn( 'string' );
    expect( snak.snaktype ).toBeAn( 'string' );
    expect( snak.datatype ).toBeAn( 'string' );

    this.props.onClaimChange( {
      ...this.props.claim,
      mainsnak: snak,
    } );
  }

  render() {
    /* eslint no-unused-vars: ["error", { "varsIgnorePattern": "onClaimChange" }] */
    const { claim, firstCell, flag, label, onClaimChange, propertyDescription, ...other } = this.props;

    return <AnimatedTr {...other}>
      {firstCell}
      <FlagCell country={flag} />
      <th className={styles.wef_property_editor_label}>{label}</th>
      {/* add quialifier button cell */}
      {/* next component renders multiple cells */}
      <SnakEditorTableRowPart onSnakChange={this.handleSnakChange} propertyDescription={propertyDescription} snak={claim.mainsnak} />
      {/* references editor button cell */}
      {/* delete claim button cell */}
    </AnimatedTr>;
  }

}
