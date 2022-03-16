import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import ButtonCell from '../../components/ButtonCell';
import QuantityDataValueEditor from '../../components/dataValueEditors/quantity/QuantityDataValueEditor';
import PropertyDescription from '../../core/PropertyDescription';
import i18n from './i18n';
import PopulationLookupDialog from './PopulationLookupDialog';

interface ExternalProps {
  datavalue: null | QuantityDataValue;
  onDataValueChange: (datavalue: null | QuantityDataValue) => unknown;
  propertyDescription: PropertyDescription;
  readOnly?: boolean;
}

interface PropsType extends ExternalProps {
  onClaimAdd: (claimData: ClaimType) => unknown;
}

interface StateType {
  dialogOpen: boolean;
}

class PopulationDataValueEditor extends PureComponent<PropsType, StateType> {

  static defaultProps = {
    readOnly: false,
  };

  override state = {
    dialogOpen: false,
  };

  handleClick = () => { this.setState({dialogOpen: true}); };

  handleDialogClose = () => { this.setState({dialogOpen: false}); };

  override render () {
    const {...etc} = this.props;
    return <QuantityDataValueEditor
      {...etc}
      buttonCells={this.renderButtonCells()} />;
  }

  renderButtonCells () {
    const dialogOpen: boolean = this.state.dialogOpen;

    return [
      <ButtonCell
        icon="ui-icon-lightbulb"
        key="PopulationLookup"
        label={i18n.buttonLabelPopulationLookup}
        onClick={this.handleClick}>
        {(children: any) => <>
          {children}
          { dialogOpen && <PopulationLookupDialog
            onClaimAdd={this.props.onClaimAdd}
            onClose={this.handleDialogClose} /> }
        </>}
      </ButtonCell>,
    ];
  }
}

const mapDispatchToProps = (dispatch: any, ownProps: ExternalProps) => ({
  onClaimAdd: (claimData: ClaimType) => dispatch({type: 'CLAIM_ADD', propertyDescription: ownProps.propertyDescription, claimData}),
});

const PopulationDataValueEditorConnected = connect(undefined, mapDispatchToProps)(PopulationDataValueEditor);
export default PopulationDataValueEditorConnected;
