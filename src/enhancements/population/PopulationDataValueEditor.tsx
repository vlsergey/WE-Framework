import React, { PureComponent } from 'react';
import ButtonCell from '../../components/ButtonCell';
import { connect } from 'react-redux';
import i18n from './i18n';
import PopulationLookupDialog from './PopulationLookupDialog';
import PropertyDescription from '../../core/PropertyDescription';
import QuantityDataValueEditor from '../../components/dataValueEditors/quantity/QuantityDataValueEditor';

interface ExternalProps  {
  datavalue : null | DataValueType
  onDataValueChange : (datavalue : null | DataValueType) => any
  propertyDescription : PropertyDescription
  readOnly? : boolean
}

interface PropsType extends ExternalProps {
  onClaimAdd : (claimData : ClaimType) => any
};

type StateType = {
  dialogOpen : boolean,
};

class PopulationDataValueEditor extends PureComponent<PropsType, StateType> {

  static defaultProps = {
    readOnly: false,
  }

  override state = {
    dialogOpen: false,
  }

  handleClick = () => this.setState( { dialogOpen: true } );

  handleDialogClose = () => this.setState( { dialogOpen: false } );

  override render() {
    const { ...etc } = this.props;
    return <QuantityDataValueEditor
      {...etc}
      buttonCells={this.renderButtonCells()} />;
  }

  renderButtonCells() {
    const dialogOpen : boolean = this.state.dialogOpen;

    return [
      <ButtonCell
        icon="ui-icon-lightbulb"
        key="PopulationLookup"
        label={i18n.buttonLabelPopulationLookup}
        onClick={this.handleClick}>
        {(children : any) => <>
          {children}
          { dialogOpen && <PopulationLookupDialog
            onClaimAdd={this.props.onClaimAdd}
            onClose={this.handleDialogClose} /> }
        </>}
      </ButtonCell>,
    ];
  }
}

const mapDispatchToProps = ( dispatch : any, ownProps : ExternalProps ) => ( {
  onClaimAdd: (claimData : ClaimType) => dispatch( { type: 'CLAIM_ADD', propertyDescription: ownProps.propertyDescription, claimData } ),
} );

const PopulationDataValueEditorConnected = connect( undefined, mapDispatchToProps )( PopulationDataValueEditor );
export default PopulationDataValueEditorConnected;
