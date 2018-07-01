import { animated, Spring } from 'react-spring';
import React, { PureComponent } from 'react';
import { Claim } from 'model/Shapes';
import ClaimDeleteButtonCell from './ClaimDeleteButtonCell';
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
    hasClaimDelete: PropTypes.bool.isRequired,
    onClaimDelete: PropTypes.func.isRequired,
    onClaimUpdate: PropTypes.func.isRequired,
    propertyDescription: PropTypes.instanceOf( PropertyDescription ).isRequired,
  };

  constructor() {
    super( ...arguments );

    this.handleClaimDelete = this.handleClaimDelete.bind( this );
    this.handleRankChange = this.handleRankChange.bind( this );
    this.handleSnakChange = this.handleSnakChange.bind( this );
  }

  handleClaimDelete() {
    return this.props.onClaimDelete( this.props.claim );
  }

  handleRankChange( rank ) {
    this.props.onClaimUpdate( {
      ...this.props.claim,
      rank,
    } );
  }

  handleSnakChange( snak ) {
    expect( snak ).toBeAn( 'object' );
    expect( snak.property ).toBeAn( 'string' );
    expect( snak.snaktype ).toBeAn( 'string' );
    expect( snak.datatype ).toBeAn( 'string' );

    this.props.onClaimUpdate( {
      ...this.props.claim,
      mainsnak: snak,
    } );
  }

  render() {
    /* eslint no-unused-vars: ["error", { "varsIgnorePattern": "on.*" }] */
    const { claim, firstCell, hasClaimDelete, onClaimDelete, onClaimUpdate, propertyDescription, ...other } = this.props;
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
          target="_blank"
          title={propertyDescription.title}>
          <span>{propertyDescription.label}</span>
        </a>
      </th>
      {/* add quialifier button cell */}
      {/* next component renders multiple cells */}
      <SnakEditorTableRowPart
        onSnakChange={this.handleSnakChange}
        propertyDescription={propertyDescription}
        snak={claim.mainsnak} />
      {/* references editor button cell */}
      <ClaimDeleteButtonCell
        disabled={!hasClaimDelete}
        onClaimDelete={this.handleClaimDelete}
        propertyId={propertyDescription.id}
        propertyLabel={propertyDescription.label} />
      {/* delete claim button cell */}
    </AnimatedTr>;
  }

}
