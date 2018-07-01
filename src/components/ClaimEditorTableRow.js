import { animated, Spring } from 'react-spring';
import React, { PureComponent } from 'react';
import { Claim } from 'model/Shapes';
import expect from 'expect';
import FlagCell from './FlagCell';
import PropertyDescription from 'core/PropertyDescription';
import PropTypes from 'prop-types';
import SelectRankButtonCell from './SelectRankButtonCell';
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
    label: PropTypes.oneOfType( [ PropTypes.string, PropTypes.node ] ).isRequired,
    onClaimChange: PropTypes.func.isRequired,
    propertyDescription: PropTypes.instanceOf( PropertyDescription ).isRequired,
  };

  constructor() {
    super( ...arguments );

    this.handleRankChange = this.handleRankChange.bind( this );
    this.handleSnakChange = this.handleSnakChange.bind( this );
  }

  handleRankChange( rank ) {
    this.props.onClaimChange( {
      ...this.props.claim,
      rank,
    } );
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
    const { claim, firstCell, label, onClaimChange, propertyDescription, ...other } = this.props;
    const flagImage = propertyDescription.countryFlags && propertyDescription.countryFlags.length > 0
      ? propertyDescription.countryFlags[ 0 ]
      : null;

    return <AnimatedTr {...other}>
      {firstCell}
      <SelectRankButtonCell onChange={this.handleRankChange} value={claim.rank} />
      <FlagCell flagImage={flagImage} />
      <th className={styles.wef_property_editor_label}>
        <a
          href={'//www.wikidata.org/wiki/Property:' + propertyDescription.id}
          rel="noopener noreferrer"
          target="_blank">{label}</a>
      </th>
      {/* add quialifier button cell */}
      {/* next component renders multiple cells */}
      <SnakEditorTableRowPart onSnakChange={this.handleSnakChange} propertyDescription={propertyDescription} snak={claim.mainsnak} />
      {/* references editor button cell */}
      {/* delete claim button cell */}
    </AnimatedTr>;
  }

}
