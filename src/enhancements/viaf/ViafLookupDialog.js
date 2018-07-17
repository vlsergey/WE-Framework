import React, { PureComponent } from 'react';
import DialogWrapper from 'wrappers/DialogWrapper';
import fetchJsonp from 'fetch-jsonp';
import i18n from './i18n';
import PropTypes from 'prop-types';
import styles from './styles.css';

export default class ViafLookupDialog extends PureComponent {

  static propTypes = {
    defaultQuery: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
  }

  static defaultProps = {
    defaultQuery: '',
  }

  constructor() {
    super( ...arguments );

    this.state = {
      query: this.props.defaultQuery,
      queryScheduled: '',
      autoSuggestResult: [],
      selected: [],
    };

    this.doLookup = this.doLookup.bind( this );
    this.handleChange = this.handleChange.bind( this );
    this.handleSelect = this.handleSelect.bind( this );
  }

  doLookup( query ) {
    const { queryScheduled } = this.state;
    if ( query === queryScheduled ) return;
    this.setState( { queryScheduled: query } );

    if ( query === '' ) {
      this.setState( { autoSuggestResult: [] } );
      return;
    }

    const url = '//viaf.org/viaf/AutoSuggest?query=' + encodeURIComponent( query );
    fetchJsonp( url, {
      jsonpCallback: 'callback',
    } )
      .then( response => response.json() )
      .then( data => {
        if ( this.state.queryScheduled !== query ) return;

        this.setState( { autoSuggestResult: data.result || [] } );
      } );
  }

  handleChange( event ) {
    const newQuery = event.target.value || '';
    this.setState( { query: newQuery } );

    setTimeout( this.doLookup( newQuery.trim() ), 0.5 );
  }

  handleSelect() {
    const { onSelect } = this.props;
    const { autoSuggestResult, selected } = this.state;

    onSelect( autoSuggestResult
      .filter( entry => selected.indexOf( entry.viafid ) !== -1 ) );
  }

  handleTrigger( viafid ) {
    return () => this.setState( ( { selected } ) => ( {
      selected: selected.indexOf( viafid ) === -1
        ? [ ...selected, viafid ]
        : selected.filter( item => item !== viafid ),
    } ) );
  }

  render() {
    const { autoSuggestResult, query } = this.state;

    const buttons = [];

    buttons.push( {
      text: i18n.buttonLabelSelect,
      label: i18n.buttonLabelSelect,
      click: () => {
        this.handleSelect( );
      },
    } );

    return <DialogWrapper
      buttons={buttons}
      minHeight={300}
      minWidth={600}
      title={i18n.dialogTitle}>
      <input
        className={styles.queryInput}
        onChange={this.handleChange}
        type="text"
        value={query} />
      { autoSuggestResult.map( entry => <div className={styles.entry} key={entry.viafid}>
        <label>
          <input
            checked={this.state.selected.indexOf( entry.viafid ) !== -1}
            onChange={this.handleTrigger( entry.viafid )}
            type="checkbox" />
          { entry.nametype && <i>{entry.nametype + ': '}</i>}
          <a href={'http://www.viaf.org/viaf/' + entry.viafid}>VIAF: {entry.viafid}</a>
          <br />
          <span className={styles.entryTerm}>
            {entry.term}
          </span>
        </label>
      </div> ) }
    </DialogWrapper>;
  }

}
