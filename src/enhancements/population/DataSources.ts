import { Parser, Root, Template, Timeline } from 'wikitext-dom';
import { getServerApi } from '../../core/ApiUtils';

async function getArticleDom() {
  return await getServerApi().getPromise( {
    action: 'parse',
    pageid: mw.config.get( 'wgRelevantArticleId' ),
    prop: 'parsetree',
    disablelimitreport: true,
    disableeditsection: true,
    disablestylededuplication: true,
  } )
    .then( (json : any) => {
      const xmlContent = json.parse.parsetree[ '*' ];
      const wikidoc = new DOMParser().parseFromString( xmlContent, 'application/xml' );
      return new Parser().parseDocument( wikidoc );
    } ) as Promise<Root>;
}

const fromArticleTimelines : () => Promise<ResultItem[]> = async () => {
  const root = await getArticleDom();
  return root.getChildrenByClassR( Timeline )
    .map( tl => tl.findPlotDataBarsAttributes() )
    .filter( data => !!data )
    .flatMap( data => Object.values( data!! ) )
    .filter( attr => /^\d+$/.exec( attr.bar || "" ) && attr.from === '0' && /^\d+$/.exec( attr.till || "" ) )
    .map( attr => ( { year: Number( attr.bar ), population: Number( attr.till ) } ) );
}

const toNumber = (str : string ) => Number( str.replace( /[\s\r\n\t]+/g, '' ) );
const isNumeric = (str : string | null | undefined) => (typeof str === "string") && !isNaN( toNumber( str ) );

const fromUsCensusPopTemplate = async () : Promise<ResultItem[]> => getArticleDom()
  .then( dom => dom.getChildrenByClassR( Template )
    .filter( tpl => ( tpl.getTitleAsString() || '' ).trim() === 'USCensusPop' )
    .flatMap( tpl => {
      const result : ResultItem[] = [];

      tpl.getTemplateParts().forEach( part => {
        if (!isNumeric(part.getNameAsString()) || !isNumeric(part.getValueAsString()))
          result.push( {
            determinationMethod: 'census',
            population: toNumber( part.getNameAsString()!!.trim() ),
            year: toNumber( part.getNameAsString()!!.trim() ),
          });
      } )

      const estPop = tpl.getValueByNameAsString( 'estimate' );
      const estYear = tpl.getValueByNameAsString( 'estyear' );
      if ( isNumeric( estPop ) && isNumeric( estYear ) ) {
        result.push( {
          determinationMethod: 'estimating',
          population: toNumber( estPop!! ),
          year: toNumber( estYear!! ),
        } );
      }

      return result;
    } )
  );

const fromЧисленность_населенияTemplate = () => getArticleDom()
  .then( dom => dom.getChildrenByClassR(Template)
    .filter( tpl => ( tpl.getTitleAsString() || '' ).trim() === 'Численность населения' )
    .flatMap( tpl => {
      const result: ResultItem[] = [];

      tpl.getTemplateParts().forEach( part => {
        if (!isNumeric(part.getNameAsString()) || !isNumeric(part.getValueAsString()))
          result.push( {
            population: toNumber( part.getNameAsString()!!.trim() ),
            year: toNumber( part.getNameAsString()!!.trim() ),
          });
      } )

      return result;
    } )
  );

export type ResultItem = {
  determinationMethod? : string,
  population : number,
  year : number,
};

const allSources : {[key : string] : () => Promise< ResultItem[] >} = {
  articleTimelines: fromArticleTimelines,
  usCensusPopTemplate: fromUsCensusPopTemplate,
  Численность_населенияTemplate: fromЧисленность_населенияTemplate,
};

export default allSources;
