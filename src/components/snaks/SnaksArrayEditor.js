import React, { PureComponent } from 'react';
import generateRandomString from 'utils/generateRandomString';
import PropertyDescription from 'core/PropertyDescription';
import SnakAddButtonCell from './SnakAddButtonCell';
import SnakRemoveButtonCell from './SnakRemoveButtonCell';
import SnakTableRow from './SnakTableRow';

type PropsType = {
  displayEmpty? : boolean,
  displayLabels? : boolean,
  onSnaksArrayUpdate : SnakType[] => any,
  propertyDescription : PropertyDescription,
  readOnly : boolean,
  removeButtonConfirmMessage : string,
  removeButtonLabel : string,
  snaksArray? : SnakType[],
};

export default class SnaksArrayEditor extends PureComponent<PropsType> {

  static defaultProps = {
    displayEmpty: false,
    displayLabels: true,
  };

  constructor() {
    super( ...arguments );

    this.emptySnakHash = generateRandomString();
    this.handleEmptySnakChange = this.handleEmptySnakChange.bind( this );
    this.handleSnakAdd = this.handleSnakAdd.bind( this );
    this.handleSnakAddTwice = this.handleSnakAddTwice.bind( this );
  }

  handleEmptySnakChange( snak ) {
    const { datatype, id } = this.props.propertyDescription;

    this.props.onSnaksArrayUpdate( [ {
      ...snak,
      property: id,
      datatype,
    } ] );
  }

  handleSnakAdd() {
    const { datatype, id } = this.props.propertyDescription;

    this.props.onSnaksArrayUpdate( [
      ...( this.props.snaksArray || [] ),
      {
        snaktype: 'value',
        property: id,
        hash: generateRandomString(),
        datatype,
      },
    ] );
  }

  handleSnakAddTwice() {
    const { datatype, id } = this.props.propertyDescription;

    this.props.onSnaksArrayUpdate( [
      ...( this.props.snaksArray || [] ),
      {
        snaktype: 'value',
        property: id,
        hash: generateRandomString(),
        datatype,
      },
      {
        snaktype: 'value',
        property: id,
        hash: generateRandomString(),
        datatype,
      },
    ] );
  }

  handleSnakChangeF( index ) {
    const { datatype, id } = this.props.propertyDescription;

    return snak => this.props.onSnaksArrayUpdate(
      this.props.snaksArray.map( ( item, i ) => i === index ? {
        ...snak,
        property: id,
        datatype,
      } : item )
    );
  }

  handleSnakRemoveF( indexToDelete ) {
    return () => this.props.onSnaksArrayUpdate( this.props.snaksArray
      .filter( ( item, i ) => i !== indexToDelete ) );
  }

  render() {
    const { displayEmpty, displayLabels, propertyDescription, readOnly,
      removeButtonLabel, removeButtonConfirmMessage, snaksArray } = this.props;

    if ( !snaksArray || snaksArray.length === 0 ) {
      if ( !displayEmpty )
        return null;

      const { datatype, id } = this.props.propertyDescription;

      return <tbody>
        <SnakTableRow
          displayLabel={displayLabels}
          firstCell={<SnakAddButtonCell onClick={this.handleSnakAddTwice} />}
          lastCell={<td />}
          onSnakChange={this.handleEmptySnakChange}
          propertyDescription={propertyDescription}
          qualifier={{
            snaktype: 'value',
            property: id,
            hash: this.emptySnakHash,
            datatype,
          }} />
      </tbody>;
    }

    return <tbody>
      { snaksArray.map( ( snak, index ) =>
        <SnakTableRow
          displayLabel={displayLabels}
          firstCell={index === 0
            ? <SnakAddButtonCell onClick={this.handleSnakAdd} />
            : <td />}
          key={snak.hash}
          lastCell={<SnakRemoveButtonCell
            confirmMessage={removeButtonConfirmMessage}
            label={removeButtonLabel}
            onClick={this.handleSnakRemoveF( index )} />}
          onSnakChange={this.handleSnakChangeF( index )}
          propertyDescription={propertyDescription}
          readOnly={readOnly}
          snak={snak} />
      ) }
    </tbody>;
  }
}
