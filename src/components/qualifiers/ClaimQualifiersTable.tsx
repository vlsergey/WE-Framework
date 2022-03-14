import React, { PureComponent } from 'react';
import AnimatedTr from '../AnimatedTr';
import generateRandomString from '../../utils/generateRandomString';
import getDefaultQualifierSnak from '../../enhancements/getDefaultQualifierSnak';
import i18n from './i18n';
import NewQualifierAutosuggest from './NewQualifierAutosuggest';
import NewQualifierSelect from './NewQualifierSelect';
import PropertyDescription from '../../core/PropertyDescription';
import SnaksMapEditor from '../snaks/SnaksMapEditor';
import styles from './ClaimQualifiersTable.css';

type PropsType = {
  allowedQualifiers : readonly string[],
  claim : ClaimType,
  claimPropertyDescription : PropertyDescription,
  defaultAddQuailifier? : boolean,
  disabledQualifiers? : readonly string[],
  onClaimUpdate : (claim : ClaimType) => any,
};

type StateType = {
  addQualifierMode : 'SELECT' | 'AUTOSUGGEST' | 'HIDDEN',
  hiddenBehindLabel : boolean,
};

export default class ClaimQualifiersTable
  extends PureComponent<PropsType, StateType> {

  static defaultProps = {
    allowedQualifiers: [],
    defaultAddQuailifier: false,
    disabledQualifiers: [],
  };

  confirmRemoveQualifierTemplate : string;

  constructor(props : PropsType) {
    super( props );

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
  }

  handleQualifierAdd = ( propertyId : string ) => {
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
    const snak : SnakType = defaultSnak
      ? { ...defaultSnak, hash: generateRandomString() }
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

  showFromBehindLabel = () => {
    if ( this.state.hiddenBehindLabel ) {
      this.setState( {
        hiddenBehindLabel: false,
      } );
    }
  }

  showQualifierSelect = () => {
    const { allowedQualifiers } = this.props;
    this.setState( {
      addQualifierMode: allowedQualifiers.length > 0 ? 'SELECT' : 'AUTOSUGGEST',
    } );
  }

  handleQualifiersUpdate = ( qualifiers : QualifiersType ) => {
    this.props.onClaimUpdate( {
      ...this.props.claim,
      qualifiers,
    } );
  }

  removeButtonConfirmMessageF = ( qualifierPropertyDescription : PropertyDescription ) =>
    this.confirmRemoveQualifierTemplate
      .replace( '{qualifierPropertyId}', qualifierPropertyDescription.id )
      .replace( '{qualifierPropertyLabel}', qualifierPropertyDescription.label || qualifierPropertyDescription.id );

  override render() {
    const { allowedQualifiers, claim, disabledQualifiers } = this.props;
    const { addQualifierMode, hiddenBehindLabel } = this.state;

    const qualifiers = claim.qualifiers || {};
    const alreadyPresentQualifiers =
      Object.entries( qualifiers )
      .filter( ([_, qs]) => qs.length > 0 )
      .map( ([propertyId]) => propertyId );

    return <table
      className={styles.wef_claim_qualifiers_table}
      onClick={this.showFromBehindLabel}>
      <SnaksMapEditor
        ignorePropertyIds={disabledQualifiers}
        onSnaksMapUpdate={this.handleQualifiersUpdate}
        readOnly={hiddenBehindLabel}
        removeButtonConfirmMessageF={this.removeButtonConfirmMessageF}
        removeButtonLabel={i18n.buttonLabelRemoveQualifier}
        snaksMap={qualifiers} />
      { addQualifierMode === 'SELECT'
        && <tbody className={styles.wef_claim_new_qualifier}>
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
      { addQualifierMode === 'AUTOSUGGEST'
        && <tbody className={styles.wef_claim_new_qualifier}>
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
