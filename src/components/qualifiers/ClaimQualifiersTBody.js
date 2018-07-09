import React, { PureComponent } from 'react';
import ClaimQualifierTableRow from './ClaimQualifierTableRow';
import expect from 'expect';
import generateRandomString from 'utils/generateRandomString';
import PropertyDescription from 'core/PropertyDescription';
import PropTypes from 'prop-types';
import QualifierAddButtonCell from './QualifierAddButtonCell';
import QualifierRemoveButtonCell from './QualifierRemoveButtonCell';

export default class ClaimQualifiersTBody extends PureComponent {

  static propTypes = {
    claim: PropTypes.object,
    claimPropertyDescription: PropTypes.instanceOf( PropertyDescription ).isRequired,
    displayEmpty: PropTypes.bool,
    displayLabels: PropTypes.bool,
    onClaimUpdate: PropTypes.func.isRequired,
    propertyDescription: PropTypes.instanceOf( PropertyDescription ).isRequired,
    readOnly: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    displayEmpty: false,
    displayLabels: true,
  }

  constructor() {
    super( ...arguments );

    this.emptyQualifierHash = generateRandomString();
    this.handleEmptyQualifierChange = this.handleEmptyQualifierChange.bind( this );
    this.handleQualifierAdd = this.handleQualifierAdd.bind( this );
    this.handleQualifierAddTwice = this.handleQualifierAddTwice.bind( this );
  }

  handleQualifiersChange( reducer ) {
    const { id } = this.props.propertyDescription;

    const claim = this.props.claim || {};
    const allQualifiers = claim.qualifiers || {};
    const qualifiers = allQualifiers[ id ] || [];
    const newQualifiers = reducer( qualifiers );
    expect( newQualifiers ).toBeAn( 'array' );

    this.props.onClaimUpdate( {
      ...claim,
      qualifiers: {
        ...allQualifiers,
        [ id ]: newQualifiers,
      },
    } );
  }

  handleQualifierAdd() {
    const { datatype, id } = this.props.propertyDescription;

    this.handleQualifiersChange( qualifiers => [ ...qualifiers, {
      snaktype: 'value',
      property: id,
      hash: generateRandomString(),
      datatype,
    } ] );
  }

  handleQualifierAddTwice() {
    const { datatype, id } = this.props.propertyDescription;

    this.handleQualifiersChange( qualifiers => [ ...qualifiers, {
      snaktype: 'value',
      property: id,
      hash: generateRandomString(),
      datatype,
    }, {
      snaktype: 'value',
      property: id,
      hash: generateRandomString(),
      datatype,
    } ] );
  }

  handleQualifierChangeF( index ) {
    return qualifier => this.handleQualifiersChange( qualifiers => {
      const newQualifiers = [ ...qualifiers ];
      newQualifiers[ index ] = qualifier;
      return newQualifiers;
    } );
  }

  handleEmptyQualifierChange( qualifier ) {
    this.handleQualifiersChange( () => [ qualifier ] );
  }

  handleQualifierRemoveF( indexToDelete ) {
    return () => this.handleQualifiersChange( qualifiers => qualifiers
      .filter( ( item, i ) => i !== indexToDelete ) );
  }

  render() {
    const { claim, claimPropertyDescription, displayEmpty, displayLabels, propertyDescription, readOnly } = this.props;
    const qualifiers = ( claim.qualifiers || {} )[ propertyDescription.id ];

    if ( !qualifiers || qualifiers.length == 0 ) {
      if ( !displayEmpty )
        return null;

      const { datatype, id } = this.props.propertyDescription;

      return <tbody>
        <ClaimQualifierTableRow
          displayLabel={displayLabels}
          firstCell={<QualifierAddButtonCell onClick={this.handleQualifierAddTwice} />}
          key={this.emptyQualifierHash}
          lastCell={<td />}
          onQualifierChange={this.handleEmptyQualifierChange}
          propertyDescription={propertyDescription}
          qualifier={{
            snaktype: 'value',
            property: id,
            hash: this.emptyQualifierHash,
            datatype,
          }} />
      </tbody>;
    }


    expect( qualifiers ).toBeAn( 'array' );

    return <tbody>
      { qualifiers.map( ( qualifier, index ) =>
        <ClaimQualifierTableRow
          displayLabel={displayLabels}
          firstCell={index === 0
            ? <QualifierAddButtonCell onClick={this.handleQualifierAdd} />
            : <td />}
          key={qualifier.hash}
          lastCell={<QualifierRemoveButtonCell
            claimPropertyId={claimPropertyDescription.id}
            claimPropertyLabel={claimPropertyDescription.label}
            onClick={this.handleQualifierRemoveF( index )}
            qualifierPropertyId={propertyDescription.id}
            qualifierPropertyLabel={propertyDescription.label} />}
          onQualifierChange={this.handleQualifierChangeF( index )}
          propertyDescription={propertyDescription}
          qualifier={qualifier}
          readOnly={readOnly} />
      ) }
    </tbody>;
  }
}
