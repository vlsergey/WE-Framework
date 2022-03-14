import React, { PureComponent } from 'react';
import dataSources, {ResultItem} from './DataSources';
import DialogWrapper from '../../wrappers/DialogWrapper';
import i18n from './i18n';
import generateRandomString from '../../utils/generateRandomString';
import JQueryButton from '../../wrappers/JQueryButton';
import PropertyLabelCellById from '../../components/PropertyLabelCellById';
import styles from './styles.css';
import { toWikibaseEntityIdValue } from '../../model/ModelUtils';

type PropsType = {
  onClaimAdd : (claimData : ClaimType) => any,
  onClose : () => any,
};

type StateType = {
  queryScheduled : string,
  queryState : 'WAITING' | 'SCHEDULED' | 'ERROR',
  result : ResultItem[],
  selected : number[],
};

export default class PopulationLookupDialog
  extends PureComponent<PropsType, StateType> {

  override state : StateType = {
    queryScheduled: '',
    queryState: 'WAITING',
    result: [],
    selected: [],
  };

  handleLoadFromSource = ( sourceId : string, sourceFunction : () => Promise< ResultItem[] > ) => {
    return async() => {
      this.setState( { queryState: 'SCHEDULED', queryScheduled: sourceId } );
      try {
        const result : ResultItem[] = await sourceFunction();
        this.setState( { queryState: 'WAITING', queryScheduled: sourceId, result } );
      } catch ( exc ) {
        this.setState( { queryState: 'ERROR', queryScheduled: sourceId } );
        console.log( exc );
      }
    };
  }

  handleImport = () => {
    const { onClaimAdd, onClose } = this.props;
    const { selected, result } = this.state;
    const toImport = selected.map( i => result[ i ] );

    toImport.map<ClaimType>( (r : any) => {
      const pointInTimeQualifier : QualifierType = {
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
      };
      const populationSnak : SnakType = {
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
      };
      const newClaimQualifiers : QualifiersType = {
        P585: [ pointInTimeQualifier ],
      };
      const newClaimQualifiersOrder : string[] = [ 'P585' ];
      const newClaim : ClaimType = {
        id: generateRandomString(),
        'mainsnak': populationSnak,
        'qualifiers': newClaimQualifiers,
        'qualifiers-order': newClaimQualifiersOrder,
      };

      if ( r.determinationMethod ) {
        newClaimQualifiers.P459 = [ {
          datatype: 'wikibase-item',
          datavalue: {
            value: toWikibaseEntityIdValue( r.determinationMethod === 'census' ? 'Q39825' : 'Q791801' ),
            type: 'wikibase-entityid',
          },
          property: 'P459',
          snaktype: 'value',
        } ];
        newClaimQualifiersOrder.push( 'P459' );
      }

      return newClaim;
    } )
      .forEach( onClaimAdd );

    onClose();
  }

  handleTriggerF = ( i : number ) => {
    return () => this.setState( ( { selected } ) => ( {
      selected: selected.indexOf( i ) === -1
        ? [ ...selected, i ]
        : selected.filter( item => item !== i ),
    } ) );
  }

  handleSelectAll = () =>
    this.setState( ( { result } : { result : ResultItem[] } ) => ( {
      selected: result.map( ( _ : ResultItem, i : number ) => i ),
    } ) );

  override render() {
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
      }
    );

    return <DialogWrapper
      buttons={buttons}
      minHeight={300}
      minWidth={400}
      title={i18n.dialogTitle}>

      { Object.entries( dataSources ).map( ([dataSourceKey, dataSource]) =>
        <JQueryButton
          key={dataSourceKey}
          label={i18n[ 'sourceButtonLabel_' + dataSourceKey ]}
          onClick={this.handleLoadFromSource( dataSourceKey, dataSource )}
          text />
      ) }

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
