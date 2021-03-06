// @flow

import React, { PureComponent } from 'react';
import { boundMethod } from 'autobind-decorator';
import ButtonCell from 'components/ButtonCell';
import { connect } from 'react-redux';
import ExternalIdDataValueEditor from 'components/dataValueEditors/external-id/ExternalIdDataValueEditor';
import i18n from './i18n';
import PropertyDescription from 'core/PropertyDescription';
import queryViafProperties from './queryViafProperties';
import ViafLookupDialog from './ViafLookupDialog';

const DEFAULT_PATTERN = /^(.+)$/i;
const DEFAULT_REPLACE = '$1';

const VIAF_PATTERNS = {
  BNC: /^\.?(a\d{7}\d|x)/,
  BNF: /^http:\/\/catalogue\.bnf\.fr\/ark:\/12148\/cb(\d{8}.)$/,
  DBC: /^(87\d+)\.?(\d+)$/,
  LAC: /^(\d+[A-Z]\d+[EF]?)$/,
  NLP: /^(A[0-9]{7}[0-9X])$/i,
  // RU\NLR\AUTH\771614 => 771614
  NLR: /[^0-9]*(\d+)$/i,
  NUKAT: /^(n\d+)$/,
  // WorldCat, etc.
  Identities: /^.*\/identities\/((viaf|lccn|np)-.+)$/,
  DNB: /^http:\/\/d-nb\.info\/gnd\/(\d+)$/,
  LNB: /^LNC10-(\d{9})$/,
  NLA: /^[0]*([^0]\d+)$/,
};

const VIAF_REPLACES = {
  DBC: '$1$2',
  NLP: x => x.toUpperCase(),
  ISNI: x => x.replace( /^(\d{4})(\d{4})(\d{4})(\d{4})$/, '$1 $2 $3 $4' ),
};

export function parseJustLinks(
    viaf2Property : Map< string, string >,
    justlinks : any,
    onPropertyValueFound : ( string, string ) => any ) {
  Object.keys( justlinks )
    .filter( key => Array.isArray( justlinks[ key ] ) )
    .forEach( key => {
      const propertyId : ?string = viaf2Property.get( key );
      if ( !propertyId ) return;

      const pattern : RegExp = VIAF_PATTERNS[ key ] || DEFAULT_PATTERN;
      const replacement : string | ( string => string ) = VIAF_REPLACES[ key ] || DEFAULT_REPLACE;
      const values : string[] = justlinks[ key ];

      values.forEach( value => {
        if ( pattern.test( value ) ) {
          const normalized = value.replace( pattern, replacement );
          if ( normalized !== value ) {
            console.debug( `Value ${key} with pattern ${String( pattern )} normalized from "${value}" to: "${normalized}"` );
          }
          onPropertyValueFound( propertyId, normalized );
        } else {
          console.debug( `Seems unsupported value for ${key} by pattern ${String( pattern )}: "${value}"` );
        }
      } );
    } );
}

type PropsType = {
  datavalue? : DataValueType,
  onClaimsFill : ( string, string => string, string ) => any,
  onDataValueChange : ?DataValueType => any,
  propertyDescription : PropertyDescription,
  readOnly? : boolean,
};

type StateType = {
  dialogOpen : boolean,
};

class ViafPropertyDataValueEditor
  extends PureComponent<PropsType, StateType> {

  state = {
    dialogOpen: false,
  };

  @boundMethod
  handleClick() {
    this.setState( { dialogOpen: true } );
  }

  @boundMethod
  handleDialogClose() {
    this.setState( { dialogOpen: false } );
  }

  @boundMethod
  handleSelect( viafIds : string[] ) {
    this.setState( { dialogOpen: false } );

    const { onClaimsFill } = this.props;

    viafIds.forEach( async( viafid : string ) => {
      onClaimsFill( 'P214', x => x, viafid );
      const onValue = ( propertyId, value ) => onClaimsFill( propertyId, x => x.trim(), value );

      const viaf2Property = await queryViafProperties();
      const allLinksResponse = await fetch( 'https://viaf.org/viaf/' + viafid + '/justlinks.json', {
        headers: {
          Accept: 'application/vnd.oclc.links+json',
        },
      } );
      if ( !allLinksResponse.ok ) throw new Error( 'Unable to receive all-links JSON from viaf.org: ' + allLinksResponse.statusText );
      const allLinksJson = await allLinksResponse.json();
      await parseJustLinks( viaf2Property, allLinksJson, onValue );
    } );
  }

  render() {
    const { datavalue, onDataValueChange, ...etc } = this.props;

    const buttons = [
      <ButtonCell
        icon="ui-icon-search"
        key="ViafLookup"
        label={i18n.buttonLabelViafLookup}
        onClick={this.handleClick}>
        {children => <React.Fragment>
          {children}
          { this.state.dialogOpen && <ViafLookupDialog
            onClose={this.handleDialogClose}
            onSelect={this.handleSelect} /> }
        </React.Fragment>}
      </ButtonCell>,
    ];

    return <ExternalIdDataValueEditor
      {...etc}
      buttons={buttons}
      datavalue={datavalue}
      onDataValueChange={onDataValueChange} />;
  }
}

const mapDispatchToProps = dispatch => ( {
  onClaimsFill: ( property, normalizeF, newValue ) => dispatch( {
    type: 'CLAIMS_FILL',
    property,
    datatype: 'external-id',
    datavalue: { type: 'string', value: newValue },
    normalizeF,
  } ),
} );

// $FlowFixMe
const ViafPropertyDataValueEditorConnected = connect( undefined, mapDispatchToProps )( ViafPropertyDataValueEditor );
export default ViafPropertyDataValueEditorConnected;
