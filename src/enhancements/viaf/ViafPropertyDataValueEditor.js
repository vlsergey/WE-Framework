import React, { PureComponent } from 'react';
import ButtonCell from 'components/ButtonCell';
import { connect } from 'react-redux';
import ExternalIdDataValueEditor from 'components/dataValueEditors/external-id/ExternalIdDataValueEditor';
import i18n from './i18n';
import PropertyDescription from 'core/PropertyDescription';
import ViafLookupDialog from './ViafLookupDialog';

const VIAF_2_PROPERTY = {
  DNB: 'P227',
  LC: 'P244',
  JPG: 'P245',
  BNF: 'P268',
  SUDOC: 'P269',
  NDL: 'P349',
  ICCU: 'P396',
  NLA: 'P409',
  BPN: 'P651',
  NKC: 'P691',
  SELIBR: 'P906',
  RSL: 'P947',
  BNE: 'P950',
  NSZL: 'P951',
  PTBNP: 'P1005',
  NTA: 'P1006',
  BIBSYS: 'P1015',
  BAV: 'P1017',
  NUKAT: 'P1207',
  BNC: 'P1273',
  EGAXA: 'P1309',
  LNB: 'P1368',
  NSK: 'P1375',
  LAC: 'P1670',
  NLP: 'P1695',
  N6I: 'P1946',
  B2Q: 'P3280',
  DBC: 'P3846',
  BLBNB: 'P4619',
  KRNLK: 'P5034',
};

const DEFAULT_PATTERN = /^(.+)$/i;
const DEFAULT_REPLACE = '$1';

const VIAF_PATTERNS = {
  BNC: /^\.?(a\d{7}\d|x)/,
  BNF: /^http:\/\/catalogue\.bnf\.fr\/ark:\/12148\/cb(\d{8}.)$/,
  DBC: /^(87\d+)\.?(\d+)$/,
  EGAXA: /^vtls(\d+)$/,
  LAC: /^(\d+[A-Z]\d+[EF]?)$/,
  NLP: /^(A[0-9]{7}[0-9X])$/i,
  NUKAT: /^(n\d+)$/,
  DNB: /^http:\/\/d-nb\.info\/gnd\/(\d+)$/,
  LNB: /^LNC10-(\d{9})$/,
  NLA: /^[0]*([^0]\d+)$/,
};

const VIAF_REPLACES = {
  DBC: '$1$2',
  NLP: x => x.toUpperCase(),
};

export function parseJustLinks(
    justlinks : { [string] : string[] },
    onPropertyValueFound : ( string, string ) => any ) {
  Object.keys( justlinks )
    .filter( key => !!VIAF_2_PROPERTY[ key ] )
    .forEach( key => {
      const propertyId : string = VIAF_2_PROPERTY[ key ];
      const pattern : RegExp = VIAF_PATTERNS[ key ] || DEFAULT_PATTERN;
      const replacement : string = VIAF_REPLACES[ key ] || DEFAULT_REPLACE;
      const values : ?string[] = justlinks[ key ];

      values.forEach( value => {
        if ( pattern.test( value ) ) {
          const normalized = value.replace( pattern, replacement );
          if ( normalized !== value ) {
            console.debug( 'Value ' + key + ' with pattern ' + pattern + ' normalized from "' + value + '" to: "' + normalized + '"' );
          }
          onPropertyValueFound( propertyId, normalized );
        } else {
          console.debug( 'Seems unsupported value for ' + key + ' by pattern ' + pattern + ': "' + value + '"' );
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

  constructor() {
    super( ...arguments );

    this.state = {
      dialogOpen: false,
    };

    this.handleClick = this.handleClick.bind( this );
    this.handleDialogClose = this.handleDialogClose.bind( this );
    this.handleSelect = this.handleSelect.bind( this );
  }

  handleClick() {
    this.setState( { dialogOpen: true } );
  }

  handleDialogClose() {
    this.setState( { dialogOpen: false } );
  }

  handleSelect( viafIds : string[] ) {
    this.setState( { dialogOpen: false } );

    const { onClaimsFill } = this.props;

    viafIds.forEach( ( viafid : string ) => {
      onClaimsFill( 'P214', x => x, viafid );
      const onValue = ( propertyId, value ) => onClaimsFill( propertyId, x => x.trim(), value );

      fetch( 'https://viaf.org/viaf/' + viafid + '/justlinks.json', {
        headers: {
          Accept: 'application/vnd.oclc.links+json',
        },
      } )
        .then( body => body.json() )
        .then( justlinks => parseJustLinks( justlinks, onValue ) );
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
      buttons={buttons}
      datavalue={datavalue}
      onDataValueChange={onDataValueChange}
      {...etc} />;
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

const ViafPropertyDataValueEditorConnected = connect( undefined, mapDispatchToProps )( ViafPropertyDataValueEditor );
export default ViafPropertyDataValueEditorConnected;
