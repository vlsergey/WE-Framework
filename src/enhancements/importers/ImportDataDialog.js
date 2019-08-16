import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import DialogWrapper from 'wrappers/DialogWrapper';
import { getServerApi } from 'core/ApiUtils';
import i18n from './i18n';
import JQueryButton from 'wrappers/JQueryButton';
import { Parser } from 'wikitext-dom';
import PropTypes from 'prop-types';

const allImporters = [
  require( './ПостановлениеПравительстваРФ' ).default,
  require( './РаспоряжениеПравительстваРФ' ).default,
  require( './РаспоряжениеПрезидентаРФ' ).default,
  require( './УказПрезидентаРФ' ).default,
];

class ImportDataDialog extends PureComponent {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  constructor() {
    super( ...arguments );

    this.state = {
      articleDom: null,
      importers: [],
      queryState: 'LOADING',
    };
  }

  componentDidMount() {
    this.setState( { queryState: 'LOADING' } );
    return getServerApi().getPromise( {
      action: 'parse',
      pageid: mw.config.get( 'wgRelevantArticleId' ),
      prop: 'parsetree',
      disablelimitreport: true,
      disableeditsection: true,
      disablestylededuplication: true,
    } )
      .then( json => {
        const xmlContent = json.parse.parsetree[ '*' ];
        const wikidoc = new DOMParser().parseFromString( xmlContent, 'application/xml' );
        return new Parser().parseDocument( wikidoc );
      } )
      .then( dom => {
        const importers = allImporters.filter( candidate => candidate.canImport( dom ) );
        this.setState( {
          articleDom: dom,
          importers,
          queryState: importers.length === 0 ? 'NO_SUPPORTED_IMPORTERS' : 'HAS_SUPPORTED_IMPORTERS',
        } );
      } )
      .catch( error => {
        this.setState( { articleDom: null, importers: [], queryState: 'ERROR' } );
        console.log( error );
      } );
  }

  handleImporterSelect( importer ) {
    const { dispatch, onClose } = this.props;
    const { articleDom } = this.state;
    return () => {
      onClose();
      importer.process( dispatch, articleDom );
    };
  }

  render() {
    const { onClose } = this.props;
    const { importers, queryState } = this.state;

    const buttons = [];

    buttons.push(
      {
        click: onClose,
        text: i18n.buttonCloseText,
        title: i18n.buttonCloseTitle,
      },
    );

    return <DialogWrapper
      buttons={buttons}
      minHeight={300}
      minWidth={600}
      title={i18n.dialogTitle}>
      <div>{i18n[ 'state_' + queryState ]}</div>
      <ul>
        { importers.map( importer => <li key={importer.key}>
          <JQueryButton
            label={importer.label || 'importers_' + importer.key + '_text'}
            onClick={this.handleImporterSelect( importer )}
            text />
        </li> ) }
      </ul>
    </DialogWrapper>;
  }

}

const mapDispatchToProps = dispatch => ( { dispatch } );
const ImportDataDialogConnected = connect( undefined, mapDispatchToProps )( ImportDataDialog );
export default ImportDataDialogConnected;
