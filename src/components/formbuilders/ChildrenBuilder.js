import React, { PureComponent } from 'react';
import { ChildrenContainer } from './FormShapes';
import ErrorBoundary from './ErrorBoundary';
import FieldsBuilder from './FieldsBuilder';
import FieldsetBuilder from './FieldsetBuilder';
import SpecialBuilder from './SpecialBuilder';

export default class ChildrenBuilder extends PureComponent {

  static propTypes = ChildrenContainer;

  render() {
    const childRenderer = type => {
      switch ( type ) {
      case 'fields': return <FieldsBuilder {...this.props} />;
      case 'fieldsets': return this.renderFieldsets();
      case 'specials': return this.renderSpecials();
      default: return null;
      }
    };

    return Object.keys( this.props ).map( key =>
      <div key={key}>{childRenderer( key )}</div>
    );
  }

  renderFieldsets() {
    const { fieldsets } = this.props;
    if ( !fieldsets || fieldsets.length === 0 )
      return null;

    return fieldsets.map( ( fieldset, index ) =>
      <ErrorBoundary description={'fieldset: ' + JSON.stringify( fieldset )} key={fieldset.key || 'fieldset-' + index}>
        <FieldsetBuilder fieldset={fieldset} />
      </ErrorBoundary>
    );
  }

  renderSpecials() {
    const { specials } = this.props;
    if ( !specials || specials.length === 0 )
      return null;

    return specials.map( ( { key, type, ...etc } ) =>
      <SpecialBuilder key={key || type} type={type} {...etc} />
    );
  }

}
