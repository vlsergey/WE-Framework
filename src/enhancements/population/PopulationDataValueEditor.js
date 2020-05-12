// @flow

import React, { PureComponent } from 'react';
import { boundMethod } from 'autobind-decorator';
import ButtonCell from 'components/ButtonCell';
import { connect } from 'react-redux';
import i18n from './i18n';
import PopulationLookupDialog from './PopulationLookupDialog';
import PropertyDescription from 'core/PropertyDescription';
import QuantityDataValueEditor from 'components/dataValueEditors/quantity/QuantityDataValueEditor';

type PropsType = {
  datavalue? : ?DataValueType,
  onClaimAdd : any => any,
  onDataValueChange : any => any,
  propertyDescription : PropertyDescription,
  readOnly : boolean,
};

type StateType = {
  dialogOpen : boolean,
};

class PopulationDataValueEditor extends PureComponent<PropsType, StateType> {

  static defaultProps = {
    readOnly: false,
  }

  state = {
    dialogOpen: false,
  }

  @boundMethod
  handleClick() {
    this.setState( { dialogOpen: true } );
  }

  @boundMethod
  handleDialogClose() {
    this.setState( { dialogOpen: false } );
  }

  render() {
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
  onClaimAdd: claimData => dispatch( { type: 'CLAIM_ADD', propertyDescription: ownProps.propertyDescription, claimData } ),
} );

// $FlowFixMe
const PopulationDataValueEditorConnected = connect( undefined, mapDispatchToProps )( PopulationDataValueEditor );
export default PopulationDataValueEditorConnected;
