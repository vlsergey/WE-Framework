import { Extension, Parser, Template } from 'wikitext-dom';
import { getServerApi } from 'core/ApiUtils';

function getArticleDom() {
  return getServerApi().get( {
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
      const dom = new Parser().parseDocument( wikidoc );
      return dom;
    } );
}

const fromArticleTimelines = () => getArticleDom()
  .then( dom => dom.getChildByClass( Extension )
    .filter( ext => ext.getNameAsString() === 'timeline' )
    .map( tl => tl.findPlotDataBarsAttributes() )
    .filter( data => !!data )
    .flatMap( data => Object.values( data ) )
    .filter( attr => /^\d+$/.exec( attr.bar ) && '0' === attr.from && /^\d+$/.exec( attr.till ) )
    .map( attr => ( { year: Number( attr.bar ), population: Number( attr.till ) } ) ) );

const isNumeric = str => /^\s*\d+\s*$/.exec( str );

const fromUsCensusPopTemplate = () => getArticleDom()
  .then( dom => dom.getChildByClass( Template )
    .filter( tpl => ( tpl.getTitleAsString() || '' ).trim() === 'USCensusPop' )
    .flatMap( tpl => {
      const result = [];

      tpl.findPartNamesAsStrings()
        .filter( name => isNumeric( name.trim() ) )
        .filter( name => isNumeric( tpl.getValueByNameAsString( name ) ) )
        .map( name => ( {
          determinationMethod: 'census',
          population: Number( tpl.getValueByNameAsString( name ) ),
          year: Number( name ),
        } ) )
        .forEach( r => result.push( r ) );

      const estPop = tpl.getValueByNameAsString( 'estimate' );
      const estYear = tpl.getValueByNameAsString( 'estyear' );
      if ( isNumeric( estPop ) && isNumeric( estYear ) ) {
        result.push( {
          determinationMethod: 'estimating',
          population: Number( estPop ),
          year: Number( estYear ),
        } );
      }

      return result;
    } )
  );

const fromЧисленность_населенияTemplate = () => getArticleDom()
  .then( dom => dom.getChildByClass( Template )
    .filter( tpl => ( tpl.getTitleAsString() || '' ).trim() === 'Численность населения' )
    .flatMap( tpl => {
      const result = [];

      tpl.findPartNamesAsStrings()
        .filter( name => isNumeric( name.trim() ) )
        .filter( name => isNumeric( tpl.getValueByNameAsString( name ) ) )
        .map( name => ( {
          population: Number( tpl.getValueByNameAsString( name ) ),
          year: Number( name ),
        } ) )
        .forEach( r => result.push( r ) );

      return result;
    } )
  );

const allSources = {
  articleTimelines: fromArticleTimelines,
  usCensusPopTemplate: fromUsCensusPopTemplate,
  Численность_населенияTemplate: fromЧисленность_населенияTemplate,
};

export default allSources;
