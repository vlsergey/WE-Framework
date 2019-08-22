import React, { PureComponent } from 'react';
import ButtonCell from 'components/ButtonCell';
import { connect } from 'react-redux';
import i18n from './i18n';
import PopulationLookupDialog from './PopulationLookupDialog';
import QuantityDataValueEditor from 'components/dataValueEditors/quantity/QuantityDataValueEditor';

type StateType = {
  dialogOpen : boolean,
};

class PopulationDataValueEditor extends PureComponent<any, StateType> {

  state = {
    dialogOpen: false,
  }

  constructor() {
    super( ...arguments );
    this.handleClick = this.handleClick.bind( this );
    this.handleDialogClose = this.handleDialogClose.bind( this );
  }

  handleClick() {
    this.setState( { dialogOpen: true } );
  }

  handleDialogClose() {
    this.setState( { dialogOpen: false } );
  }

  render() {
    const { ...etc } = this.props;
    return <QuantityDataValueEditor
      buttonCells={this.renderButtonCells()}
      {...etc} />;
  }

  renderButtonCells() {
    const dialogOpen : boolean = this.state.dialogOpen;

    return [
      <ButtonCell
        icon="ui-icon-lightbulb"
        key="PopulationLookup"
        label={i18n.buttonLabelPopulationLookup}
        onClick={this.handleClick}>
        {children => <>
          {children}
          { dialogOpen && <PopulationLookupDialog
            onClaimAdd={this.props.onClaimAdd}
            onClose={this.handleDialogClose} /> }
        </>}
      </ButtonCell>,
    ];
  }
}

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
  onClaimAdd: claim => dispatch( { type: 'CLAIM_ADD', propertyDescription: ownProps.propertyDescription, claim } ),
} );

const PopulationDataValueEditorConnected = connect( undefined, mapDispatchToProps )( PopulationDataValueEditor );
export default PopulationDataValueEditorConnected;
