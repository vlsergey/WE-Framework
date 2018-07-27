import React, { PureComponent } from 'react';
import AnimatedTr from 'components/AnimatedTr';
import { Claim } from 'model/Shapes';
import expect from 'expect';
import generateRandomString from 'utils/generateRandomString';
import getDefaultQualifierSnak from 'enhancements/getDefaultQualifierSnak';
import i18n from './i18n';
import NewQualifierAutosuggest from './NewQualifierAutosuggest';
import NewQualifierSelect from './NewQualifierSelect';
import PropertyDescription from 'core/PropertyDescription';
import PropTypes from 'prop-types';
import SnaksMapEditor from 'components/snaks/SnaksMapEditor';
import styles from './ClaimQualifiersTable.css';

export default class ClaimQualifiersTable extends PureComponent {

  static propTypes = {
    allowedQualifiers: PropTypes.arrayOf( PropTypes.string ),
    defaultAddQuailifier: PropTypes.bool,
    disabledQualifiers: PropTypes.arrayOf( PropTypes.string ),
    claim: PropTypes.shape( Claim ).isRequired,
    claimPropertyDescription: PropTypes.instanceOf( PropertyDescription ).isRequired,
    onClaimUpdate: PropTypes.func.isRequired,
  }

  static defaultProps = {
    allowedQualifiers: [],
    defaultAddQuailifier: false,
    disabledQualifiers: [],
  }

  constructor() {
    super( ...arguments );

    this.state = {
      hiddenBehindLabel: true,
      addQualifierMode: this.props.defaultAddQuailifier
        ? this.props.allowedQualifiers.length > 0 ? 'SELECT' : 'AUTOSUGGEST'
        : 'HIDDEN',
    };

    const { claimPropertyDescription } = this.props;
    this.confirmRemoveQualifierTemplate = i18n.confirmRemoveQualifierTemplate
      .replace( '{claimPropertyId}', claimPropertyDescription.id )
      .replace( '{claimPropertyLabel}', claimPropertyDescription.label || claimPropertyDescription.id );

    this.handleQualifierAdd = this.handleQualifierAdd.bind( this );
    this.handleQualifiersUpdate = this.handleQualifiersUpdate.bind( this );
    this.removeButtonConfirmMessageF = this.removeButtonConfirmMessageF.bind( this );
    this.showFromBehindLabel = this.showFromBehindLabel.bind( this );
  }

  handleQualifierAdd( propertyId ) {
    if ( propertyId === 'OTHER' ) {
      // switch from simple select to complex autosuggest
      this.setState( {
        addQualifierMode: 'AUTOSUGGEST',
      } );
      return;
    }

    const { claim } = this.props;
    const qualifiers = claim.qualifiers || {};
    const propertyQualifiers = qualifiers[ propertyId ] || [];

    this.setState( {
      addQualifierMode: 'HIDDEN',
    } );

    const defaultSnak = getDefaultQualifierSnak( propertyId );
    const snak = defaultSnak
      ? { hash: generateRandomString(), property: propertyId, snaktype: 'value', ...defaultSnak }
      : { hash: generateRandomString(), property: propertyId, snaktype: 'value' };

    this.props.onClaimUpdate( {
      ...claim,
      qualifiers: {
        ...qualifiers,
        [ propertyId ]: [
          ...propertyQualifiers,
          snak,
        ],
      },
    } );
  }

  showFromBehindLabel() {
    if ( this.state.hiddenBehindLabel ) {
      this.setState( {
        hiddenBehindLabel: false,
      } );
    }
  }

  showQualifierSelect() {
    const { allowedQualifiers } = this.props;
    this.setState( {
      addQualifierMode: allowedQualifiers.length > 0 ? 'SELECT' : 'AUTOSUGGEST',
    } );
  }

  handleQualifiersUpdate( qualifiers ) {
    this.props.onClaimUpdate( {
      ...this.props.claim,
      qualifiers,
    } );
  }

  removeButtonConfirmMessageF( qualifierPropertyDescription ) {
    expect( qualifierPropertyDescription ).toBeA( PropertyDescription );

    return this.confirmRemoveQualifierTemplate
      .replace( '{qualifierPropertyId}', qualifierPropertyDescription.id )
      .replace( '{qualifierPropertyLabel}', qualifierPropertyDescription.label || qualifierPropertyDescription.id );
  }

  render() {
    const { allowedQualifiers, claim, disabledQualifiers } = this.props;
    const { addQualifierMode, hiddenBehindLabel } = this.state;

    const qualifiers = claim.qualifiers || {};
    const alreadyPresentQualifiers = Object.keys( qualifiers )
      .filter( propertyId => qualifiers[ propertyId ].length > 0 );

    return <table
      className={styles.wef_claim_qualifiers_table}
      onClick={this.showFromBehindLabel}>
      <SnaksMapEditor
        addButtonLabel={i18n.buttonLabelAddQualifier}
        ignorePropertyIds={disabledQualifiers}
        onSnaksMapUpdate={this.handleQualifiersUpdate}
        readOnly={hiddenBehindLabel}
        removeButtonConfirmMessageF={this.removeButtonConfirmMessageF}
        removeButtonLabel={i18n.buttonLabelRemoveQualifier}
        snaksMap={qualifiers} />
      { addQualifierMode === 'SELECT' &&
        <tbody className={styles.wef_claim_new_qualifier}>
          <AnimatedTr>
            <th colSpan={2}>
              <NewQualifierSelect
                allowedQualifiers={allowedQualifiers}
                alreadyPresent={alreadyPresentQualifiers}
                onSelect={this.handleQualifierAdd} />
            </th>
            <td />
          </AnimatedTr>
        </tbody>}
      { addQualifierMode === 'AUTOSUGGEST' &&
        <tbody className={styles.wef_claim_new_qualifier}>
          <AnimatedTr>
            <th colSpan={2}>
              <NewQualifierAutosuggest onSelect={this.handleQualifierAdd} />
            </th>
            <td />
          </AnimatedTr>
        </tbody>}
    </table>;
  }

}
