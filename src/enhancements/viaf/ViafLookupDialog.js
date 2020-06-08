// @flow

import React, { PureComponent } from 'react';
import { boundMethod } from 'autobind-decorator';
import DialogWrapper from 'wrappers/DialogWrapper';
import fetchJsonp from 'fetch-jsonp';
import i18n from './i18n';
import styles from './styles.css';

type PropsType = {
  defaultQuery? : ?string,
  onSelect : string[] => any,
};

type StateType = {
  autoSuggestResult : any,
  query : ?string,
  queryScheduled : string,
  queryState : 'WAITING' | 'SCHEDULED',
  selected : any[],
};

export default class ViafLookupDialog extends PureComponent<PropsType, StateType> {

  static defaultProps = {
    defaultQuery: '',
  };

  constructor() {
    super( ...arguments );

    this.state = {
      query: this.props.defaultQuery,
      queryScheduled: '',
      queryState: 'WAITING',
      autoSuggestResult: [],
      selected: [],
    };
  }

  @boundMethod
  doLookup( query : string ) {
    const { queryScheduled } = this.state;
    if ( query === queryScheduled ) return;
    this.setState( { queryScheduled: query } );

    if ( query === '' ) {
      this.setState( { autoSuggestResult: [] } );
      return;
    }

    this.setState( { queryState: 'SCHEDULED' } );
    const url = '//viaf.org/viaf/AutoSuggest?query=' + encodeURIComponent( query );
    fetchJsonp( url, {
      jsonpCallback: 'callback',
    } )
      .then( response => response.json() )
      .then( data => {
        if ( this.state.queryScheduled !== query ) return;

        const grouped = ( data.result || [] )
          .filter( entity => typeof entity.viafid === 'string' )
          .filter( entity => entity.viafid.trim() !== '' )
          .reduce( ( acc, cur ) => ( {
            ...acc,
            [ cur.viafid ]: acc[ cur.viafid ]
              ? [ ...acc[ cur.viafid ], cur ]
              : [ cur ],
          } ), {} );

        this.setState( {
          autoSuggestResult: grouped,
          queryState: 'WAITING',
        } );
      } );
  }

  @boundMethod
  handleChange( { currentTarget: { value } } : SyntheticEvent< HTMLInputElement > ) {
    const newQuery = value || '';
    this.setState( { query: newQuery } );

    setTimeout( () => this.doLookup( newQuery.trim() ), 0.5 );
  }

  @boundMethod
  handleSelect() {
    const { onSelect } = this.props;
    const { autoSuggestResult, selected } = this.state;

    const viafIds = Object.keys( autoSuggestResult )
      .filter( viafId => selected.indexOf( viafId ) !== -1 );
    onSelect( viafIds );
  }

  handleTrigger( viafid : string ) {
    return () => this.setState( ( { selected } ) => ( {
      selected: selected.indexOf( viafid ) === -1
        ? [ ...selected, viafid ]
        : selected.filter( item => item !== viafid ),
    } ) );
  }

  render() {
    const { autoSuggestResult, query, queryScheduled, queryState } = this.state;

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
      { Object.keys( autoSuggestResult ).map( ( viafid : string ) => <div className={styles.entry} key={viafid}>
        <label>
          <input
            checked={this.state.selected.indexOf( viafid ) !== -1}
            onChange={this.handleTrigger( viafid )}
            type="checkbox" />
          <a href={'http://www.viaf.org/viaf/' + viafid}>VIAF: {viafid}</a>
          { autoSuggestResult[ viafid ].map( entry => <div className={styles.entryTerm} key={entry.term}>
            { entry.nametype && <i>{entry.nametype + ': '}</i>}
            {entry.term}
          </div> ) }
        </label>
      </div> ) }
      <div className={styles.queryStateDiv}>
        {( i18n.queryState[ queryState ] || '' ).replace( '$1', queryScheduled )}
      </div>
    </DialogWrapper>;
  }

}
