import { Extension, Parser } from 'wikitext-dom';
import React, { PureComponent } from 'react';
import DialogWrapper from 'wrappers/DialogWrapper';
import { getServerApi } from 'core/ApiUtils';
import i18n from './i18n';
import JQueryButton from 'wrappers/JQueryButton';
import PropertyLabelCellById from 'components/PropertyLabelCellById';
import PropTypes from 'prop-types';
import styles from './styles.css';

export default class PopulationLookupDialog extends PureComponent {

  static propTypes = {
    onClaimAdd: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  constructor() {
    super( ...arguments );

    this.state = {
      queryScheduled: '',
      queryState: 'WAITING',
      result: [],
      selected: [],
    };

    this.handleImport = this.handleImport.bind( this );
    this.handleLoadFromArticleTimelines = this.handleLoadFromArticleTimelines.bind( this );
    this.handleSelectAll = this.handleSelectAll.bind( this );
  }

  handleLoadFromArticleTimelines() {
    this.setState( { queryState: 'SCHEDULED', queryScheduled: 'TIMELINES' } );

    getServerApi().get( {
      action: 'parse',
      pageid: mw.config.get( 'wgRelevantArticleId' ),
      prop: 'parsetree',
      disablelimitreport: true,
      disableeditsection: true,
      disablestylededuplication: true,
    } ).then( json => {
      const xmlContent = json.parse.parsetree[ '*' ];
      const wikidoc = new DOMParser().parseFromString( xmlContent, 'application/xml' );
      const dom = new Parser().parseDocument( wikidoc );
      return dom;
    } )
      .then( dom => {
        this.setState( { queryState: 'WAITING', queryScheduled: 'TIMELINES' } );
        const newResult = dom.getChildByClass( Extension )
          .filter( ext => ext.getNameAsString() === 'timeline' )
          .map( tl => tl.findPlotDataBarsAttributes() )
          .filter( data => !!data )
          .flatMap( data => Object.values( data ) )
          .filter( attr => /^\d+$/.exec( attr.bar ) && "0" === attr.from && /^\d+$/.exec( attr.till ) )
          .map( attr => ( { year: Number( attr.bar ), population: Number( attr.till ) } ) );
        this.setState( { queryState: 'WAITING', queryScheduled: 'TIMELINES', result: newResult } );
      } )
      .catch( err => {
        this.setState( { queryState: 'ERROR', queryScheduled: 'TIMELINES' } );
        console.log( err );
      } );
  }

  handleImport() {
    const { onClaimAdd, onClose } = this.props;
    const { selected, result } = this.state;
    const toImport = selected.map( i => result[ i ] );

    toImport.map( r => ( {
      'mainsnak': {
        datatype: 'quantity',
        datavalue: {
          type: 'quantity',
          value: {
            amount: '' + r.population,
            unit: '1',
          },
        },
        property: 'P1082',
        snaktype: 'value',
      },
      'qualifiers': {
        P585: [ {
          datatype: 'time',
          datavalue: {
            type: 'time',
            value: {
              after: 0,
              before: 0,
              calendarmodel: 'http://www.wikidata.org/entity/Q1985727',
              precision: 9,
              time: '+' + r.year + '-01-01T00:00:00Z',
              timezone: 0,
            },
          },
          property: 'P585',
          snaktype: 'value',
        } ],
      },
      'qualifiers-order': [ 'P585' ],
    } ) )
      .forEach( onClaimAdd );

    onClose();
  }

  handleTriggerF( i ) {
    return () => this.setState( ( { selected } ) => ( {
      selected: selected.indexOf( i ) === -1
        ? [ ...selected, i ]
        : selected.filter( item => item !== i ),
    } ) );
  }

  handleSelectAll() {
    this.setState( ( { result } ) => ( {
      selected: result.map( ( v, i ) => i ),
    } ) );
  }

  render() {
    const { queryScheduled, queryState, result, selected } = this.state;

    const buttons = [];

    buttons.push(
      {
        text: i18n.buttonLabelSelectAll,
        label: i18n.buttonLabelSelectAll,
        click: this.handleSelectAll,
      },
      {
        text: i18n.buttonLabelImport,
        label: i18n.buttonLabelImport,
        click: this.handleImport,
      },
    );

    return <DialogWrapper
      buttons={buttons}
      minHeight={300}
      minWidth={400}
      title={i18n.dialogTitle}>

      { mw.config.get( 'wgPageContentModel' ) === 'wikitext'
        && <JQueryButton
          label='Article Timelines'
          onClick={this.handleLoadFromArticleTimelines}
          text /> }

      <table>
        <thead>
          <tr>
            <th />
            {/* point in time */}<PropertyLabelCellById propertyId="P585" />
            {/* population */}<PropertyLabelCellById propertyId="P1082" />
          </tr>
        </thead>
        <tbody>
          { result.map( ( resultItem, i ) =>
            <tr className={styles.resultTableRow} key={i} onClick={this.handleTriggerF( i )}>
              <td>
                <input
                  checked={selected.indexOf( i ) !== -1}
                  readOnly
                  type="checkbox" />
              </td>
              <td className={styles.cellYear}>{ resultItem.year }</td>
              <td className={styles.cellPopulation}>{ resultItem.population }</td>
            </tr>
          ) }
        </tbody>
      </table>
      <div className={styles.queryStateDiv}>
        {( i18n.queryState[ queryState ] || '' ).replace( '$1', queryScheduled )}
      </div>
    </DialogWrapper>;
  }

}
