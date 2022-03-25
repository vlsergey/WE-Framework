import fetchJsonp from 'fetch-jsonp';
import React, {ChangeEvent, ComponentProps, PureComponent} from 'react';

import DialogWrapper from '../../wrappers/DialogWrapper';
import i18n from './i18n';
import styles from './styles.css';

interface PropsType {
  defaultQuery?: string | null;
  onSelect: (viafIds: string[]) => any;
  onClose?: ComponentProps<typeof DialogWrapper>['onClose'];
}

type QueryState = 'WAITING' | 'SCHEDULED'

interface StateType {
  autoSuggestResult: any;
  query: string | null;
  queryScheduled: string;
  queryState: QueryState;
  selected: any[];
}

export default class ViafLookupDialog extends PureComponent<PropsType, StateType> {

  static defaultProps = {
    defaultQuery: '',
  };

  constructor (props: PropsType) {
    super(props);

    this.state = {
      query: this.props.defaultQuery || null,
      queryScheduled: '',
      queryState: 'WAITING',
      autoSuggestResult: [],
      selected: [],
    };
  }

  doLookup = async (query: string) => {
    const {queryScheduled} = this.state;
    if (query === queryScheduled) return;
    this.setState({queryScheduled: query});

    if (query === '') {
      this.setState({autoSuggestResult: []});
      return;
    }

    this.setState({queryState: 'SCHEDULED'});
    const url = '//viaf.org/viaf/AutoSuggest?query=' + encodeURIComponent(query);
    const response = await fetchJsonp(url, {
      jsonpCallback: 'callback',
    });
    const data = await response.json();
    if (this.state.queryScheduled !== query) return;

    const grouped = (data.result || [])
      .filter((entity: any) => typeof entity.viafid === 'string')
      .filter((entity: any) => entity.viafid.trim() !== '')
      .reduce((acc: any, cur: any) => ({
        ...acc,
        [cur.viafid]: acc[cur.viafid]
          ? [...acc[cur.viafid], cur]
          : [cur],
      }), {});

    this.setState({
      autoSuggestResult: grouped,
      queryState: 'WAITING',
    });
  };

  handleChange = ({currentTarget: {value}}: ChangeEvent< HTMLInputElement >) => {
    const newQuery = value || '';
    this.setState({query: newQuery});

    setTimeout(() => this.doLookup(newQuery.trim()), 0.5);
  };

  handleSelect = () => {
    const {onSelect} = this.props;
    const {autoSuggestResult, selected} = this.state;

    const viafIds = Object.keys(autoSuggestResult)
      .filter(viafId => selected.includes(viafId));
    onSelect(viafIds);
  };

  handleTrigger (viafid: string) {
    return () => { this.setState(({selected}) => ({
      selected: !selected.includes(viafid)
        ? [...selected, viafid]
        : selected.filter(item => item !== viafid),
    })); };
  }

  override render () {
    const {onClose} = this.props;
    const {autoSuggestResult, query, queryScheduled, queryState} = this.state;

    const buttons = [];

    buttons.push({
      text: i18n.buttonLabelSelect,
      label: i18n.buttonLabelSelect,
      click: () => {
        this.handleSelect();
      },
    });

    return <DialogWrapper
      buttons={buttons}
      minHeight={300}
      minWidth={600}
      onClose={onClose}
      title={i18n.dialogTitle}>
      <input
        className={styles.queryInput}
        onChange={this.handleChange}
        type="text"
        value={query || ''} />
      { Object.keys(autoSuggestResult).map((viafid: string) => <div className={styles.entry} key={viafid}>
        <label>
          <input
            checked={this.state.selected.includes(viafid)}
            onChange={this.handleTrigger(viafid)}
            type="checkbox" />
          <a href={'http://www.viaf.org/viaf/' + viafid}>VIAF: {viafid}</a>
          { autoSuggestResult[viafid].map((entry: any) => <div className={styles.entryTerm} key={entry.term}>
            { entry.nametype && <i>{entry.nametype + ': '}</i>}
            {entry.term}
          </div>) }
        </label>
      </div>) }
      <div className={styles.queryStateDiv}>
        {(i18n.queryState[queryState] || '').replace('$1', queryScheduled)}
      </div>
    </DialogWrapper>;
  }

}
