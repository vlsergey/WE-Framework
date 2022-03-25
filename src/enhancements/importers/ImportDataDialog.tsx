import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Parser} from 'wikitext-dom';

import {getServerApi} from '../../core/ApiUtils';
import DialogWrapper from '../../wrappers/DialogWrapper';
import JQueryButton from '../../wrappers/JQueryButton';
import i18n from './i18n';
import {ImporterType} from './ImporterType';

const allImporters: ImporterType[] = [
  require('./ПостановлениеПравительстваРФ').default,
  require('./РаспоряжениеПравительстваРФ').default,
  require('./РаспоряжениеПрезидентаРФ').default,
  require('./УказПрезидентаРФ').default,
];

interface PropsType {
  dispatch: any;
  onClose: () => any;
}

interface StateType {
  articleDom: any | null;
  importers: ImporterType[];
  queryState: 'LOADING' | 'ERROR' | 'HAS_SUPPORTED_IMPORTERS' | 'NO_SUPPORTED_IMPORTERS';
}

class ImportDataDialog extends PureComponent<PropsType, StateType> {

  override state: StateType = {
    articleDom: null,
    importers: [],
    queryState: 'LOADING',
  };

  override async componentDidMount () {
    this.setState({queryState: 'LOADING'});
    try {
      const actionResult = await getServerApi().getPromise<ParseActionResult>({
        action: 'parse',
        pageid: mw.config.get('wgRelevantArticleId'),
        prop: 'parsetree',
        disablelimitreport: true,
        disableeditsection: true,
        disablestylededuplication: true,
      });

      const xmlContent = actionResult.parse.parsetree!['*'];
      const wikidoc = new DOMParser().parseFromString(xmlContent, 'application/xml');
      const dom = new Parser().parseDocument(wikidoc);
      const importers = allImporters.filter(candidate => candidate.canImport(dom));
      this.setState({
        articleDom: dom,
        importers,
        queryState: importers.length === 0 ? 'NO_SUPPORTED_IMPORTERS' : 'HAS_SUPPORTED_IMPORTERS',
      });
    } catch (error) {
      this.setState({articleDom: null, importers: [], queryState: 'ERROR'});
      console.log(error);
    }
  }

  handleImporterSelect (importer: ImporterType) {
    const {dispatch, onClose} = this.props;
    const {articleDom} = this.state;
    return () => {
      onClose();
      importer.process(dispatch, articleDom);
    };
  }

  override render () {
    const {onClose} = this.props;
    const {importers, queryState} = this.state;

    const buttons = [];

    buttons.push(
      {
        click: onClose,
        text: i18n.buttonCloseText,
        title: i18n.buttonCloseTitle,
      }
    );

    return <DialogWrapper
      buttons={buttons}
      minHeight={300}
      minWidth={600}
      title={i18n.dialogTitle}>
      <div>{i18n['state_' + queryState]}</div>
      <ul>
        { importers.map(importer => <li key={importer.key}>
          <JQueryButton
            label={importer.label || 'importers_' + importer.key + '_text'}
            onClick={this.handleImporterSelect(importer)}
            text />
        </li>) }
      </ul>
    </DialogWrapper>;
  }

}

const mapDispatchToProps = (dispatch: any) => ({dispatch});
const ImportDataDialogConnected = connect(undefined, mapDispatchToProps)(ImportDataDialog);
export default ImportDataDialogConnected;
