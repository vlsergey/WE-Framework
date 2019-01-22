import ButtonCell from 'components/ButtonCell';
import { connect } from 'react-redux';
import i18n from './i18n';
import PopulationLookupDialog from './PopulationLookupDialog';
import QuantityDataValueEditor from 'components/dataValueEditors/quantity/QuantityDataValueEditor';
import React from 'react';

class PopulationDataValueEditor extends QuantityDataValueEditor {

  constructor() {
    super( ...arguments );

    this.state = {
      ...this.state,
      dialogOpen: false,
    };

    this.handleClick = this.handleClick.bind( this );
    this.handleDialogClose = this.handleDialogClose.bind( this );
  }

  handleClick() {
    this.setState( { dialogOpen: true } );
  }

  handleDialogClose() {
    this.setState( { dialogOpen: false } );
  }

  renderButtonCells() {
    return [
      <ButtonCell
        icon="ui-icon-lightbulb"
        key="PopulationLookup"
        label={i18n.buttonLabelPopulationLookup}
        onClick={this.handleClick}>
        {children => <React.Fragment>
          {children}
          { this.state.dialogOpen && <PopulationLookupDialog
            onClaimAdd={this.props.onClaimAdd}
            onClose={this.handleDialogClose} /> }
        </React.Fragment>}
      </ButtonCell>,
    ];
  }
}

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
  onClaimAdd: claim => dispatch( { type: 'CLAIM_ADD', propertyDescription: ownProps.propertyDescription, claim } ),
} );

const PopulationDataValueEditorConnected = connect( undefined, mapDispatchToProps )( PopulationDataValueEditor );
export default PopulationDataValueEditorConnected;
