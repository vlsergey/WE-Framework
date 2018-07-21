import ButtonCell from 'components/ButtonCell';
import { connect } from 'react-redux';
import ExternalIdDataValueEditor from 'components/dataValueEditors/external-id/ExternalIdDataValueEditor';
import i18n from './i18n';
import React from 'react';
import ViafLookupDialog from './ViafLookupDialog';

const VIAF_2_PROPERTY = {
  viafid: 'P214',
  dnb: 'P227',
  gnd: 'P227',
  lc: 'P244',
  jpg: 'P245',
  bnf: 'P268',
  sudoc: 'P269',
  ndl: 'P349',
  iccu: 'P396',
  nla: 'P409',
  bpn: 'P651',
  nkc: 'P691',
  selibr: 'P906',
  rsl: 'P947',
  bne: 'P950',
  nszl: 'P951',
  ptbnp: 'P1005',
  nta: 'P1006',
  bibsys: 'P1015',
  bav: 'P1017',
  nukat: 'P1207',
  bnc: 'P1273',
  egaxa: 'P1309',
  lnb: 'P1368',
  nsk: 'P1375',
};

class ViafPropertyDataValueEditor extends ExternalIdDataValueEditor {

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

  handleSelect( data ) {
    this.setState( { dialogOpen: false } );

    const { onClaimsFill } = this.props;
    const normalizeF = value => ( value || '' ).trim();

    data.forEach( entry => {
      Object.keys( entry )
        .filter( key => !!VIAF_2_PROPERTY[ key ] )
        .forEach( key => {
          const propertyId = VIAF_2_PROPERTY[ key ];
          onClaimsFill( propertyId, normalizeF, entry[ key ] );
        } );
    } );
  }

  renderButtonCells() {
    return [
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
  }
}

const mapDispatchToProps = dispatch => ( {
  onClaimsFill: ( propertyId, normalizeF, newValue ) => dispatch( { type: 'CLAIMS_FILL', propertyId, normalizeF, newValue } ),
} );

const ViafPropertyDataValueEditorConnected = connect( undefined, mapDispatchToProps )( ViafPropertyDataValueEditor );
export default ViafPropertyDataValueEditorConnected;
