import React, { Component } from 'react';
import { DEFAULT_LANGUAGES } from "utils/I18nUtils"
export default class UnsupportedDataValueEditor extends Component {
  
  static propTypes = {
    datavalue: PropTypes.shape( Shapes.DataValue ),
    onDataValueChange: PropTypes.func.isRequired,
    propertyDescription: PropTypes.instanceOf( PropertyDescription ),
  }

  constructor() {
    super( ...arguments );
    
    const { datavalue } = this.props;
    if (datavalue && datavalue.value && datavalue.value.language ) {
      const found = DEFAULT_LANGUAGES.find( code == datavalue.value.language);
      if (found) {
        this.setState({language: found});
      } else {
        this.setState({language: DEFAULT_LANGUAGES[0]});
      }
    } else {
      this.setState({language: DEFAULT_LANGUAGES[0]});
    }

    this.handleLanguageChange = this.handleValueChange.bind( this );
  }

  
  
}
