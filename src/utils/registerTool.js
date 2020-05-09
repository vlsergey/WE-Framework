// @flow

/*
* Derived from code: https://ru.wikipedia.org/w/index.php?title=MediaWiki:Gadget-registerTool.js&oldid=96997778
* Source License: GFDL & CC-BY-SA 3.0
*/
/* eslint no-undef: 0 */
const toolsToAdd : { [string] : ToolType } = {};
let addClassicToolbarToolsHooked = false;

type ToolTypeData = {|
  addCallback? : () => any,
  addRightAway? : boolean,
  callback? : () => any,
  icon? : string,
  label? : string,
  modes? : string[],
  name? : string,
  position? : number,
  title? : string,
|};

type ToolType = {|
  addCallback? : () => any,
  addRightAway? : boolean,
  callback : () => any,
  classic? : ToolTypeData,
  group? : string,
  icon? : string,
  label? : string,
  modes? : string[],
  name : string,
  position : number,
  title? : string,
  visual? : ToolTypeData,
|};

type ModeType = 'classic' | 'visual';

export default function registerTool( tool : ToolType ) {
  function moveProperties( tool, mode : ModeType ) : ToolType {
    const result : ToolType = tool[ mode ]
      ? { ...tool, ...tool[ mode ] }
      : tool;
    return result;
  }

  function sortTools( mode : ModeType ) : ToolType[] {
    return Object.keys( toolsToAdd ).sort().reduce( ( result : ToolType[], key : string ) => {
      if ( toolsToAdd[ key ][ mode ] ) {
        result.push( moveProperties( toolsToAdd[ key ], mode ) );
      }
      return result;
    }, [] );
  }

  function addClassicToolbarTools() {
    function addClassicToolbarTool( tool : ToolType ) {
      const toolObj = {
        section: 'main',
        group: tool.group || 'gadgets',
        tools: {},
      };
      toolObj.tools[ tool.name ] = {
        label: tool.label,
        type: 'button',
        icon: tool.icon,
        action: {
          type: 'callback',
          execute() {
            tool.callback();
          },
        },
      };
      $( '#wpTextbox1' ).wikiEditor( 'addToToolbar', toolObj );
      if ( tool.addCallback ) {
        tool.addCallback();
      }

      // Для совместимости со скриптами, которые опираются на событие добавления иконки Викификатора
      mw.hook( 'wikieditor.toolbar.' + tool.name ).fire();

      delete toolsToAdd[ '' + tool.position ].classic;
    }

    const tools = sortTools( 'classic' );

    for ( let i = 0; i < tools.length; i++ ) {
      addClassicToolbarTool( tools[ i ] );
    }

    addClassicToolbarToolsHooked = false;
  }

  function addVeTool( tool : ToolType ) {
    // Create and register a command
    function Command() {
      Command.parent.call( this, tool.name );
    }
    OO.inheritClass( Command, ve.ui.Command );

    // Forbid the command from being executed in the visual mode
    Command.prototype.isExecutable = function() {
      const surface = ve.init.target.getSurface();
      const mode = ( surface || {} ).getMode();
      return surface && tool.modes && ( tool.modes === mode || tool.modes.indexOf( mode ) !== -1 );
    };

    Command.prototype.execute = function( ) {
      tool.callback();
      return true;
    };

    if ( ve.ui.wikitextCommandRegistry ) {
      ve.ui.wikitextCommandRegistry.register( new Command() );
    }

    // Create and register a tool
    function Tool() {
      Tool.parent.apply( this, arguments );
    }
    OO.inheritClass( Tool, ve.ui.Tool );

    Tool.static.name = tool.name;
    Tool.static.group = tool.group || 'gadgets';
    Tool.static.title = tool.title;
    Tool.static.icon = tool.name;
    Tool.static.commandName = tool.name;
    Tool.static.autoAddToCatchall = false;
    Tool.static.deactivateOnSelect = false;

    Tool.prototype.onUpdateState = function() {
      Tool.parent.prototype.onUpdateState.apply( this, arguments );
      this.setActive( false );
    };

    ve.ui.toolFactory.register( Tool );

    ve.init.mw.DesktopArticleTarget.static.actionGroups[ 1 ].include.push( tool.name );

    mw.util.addCSS( '\
      .oo-ui-icon-' + tool.name + ' {\
        background-image: url(' + tool.icon + ');\
      }\
    ' );

    if ( tool.addCallback ) {
      tool.addCallback();
    }
  }

  function registerVeTools() {
    function registerVeTool( tool : ToolType ) {
      mw.libs.ve.addPlugin( () => mw.loader.using( [
        'ext.visualEditor.core',
        'ext.visualEditor.mwwikitext',
        'ext.visualEditor.mwtransclusion',
      ] ).then( () => {
        addVeTool( tool );
      } ) );

      delete toolsToAdd[ '' + tool.position ].visual;
    }

    const tools = sortTools( 'visual' );

    for ( let i = 0; i < tools.length; i++ ) {
      registerVeTool( tools[ i ] );
    }
  }

  // Чтобы в случае совпадений индексов гаджеты не перезаписывали друг друга
  while ( toolsToAdd[ '' + tool.position ] ) {
    tool.position++;
  }
  toolsToAdd[ '' + tool.position ] = tool;

  if ( tool.classic
    && ( [ 'edit', 'submit' ].indexOf( mw.config.get( 'wgAction' ) ) !== -1
      && mw.user.options.get( 'visualeditor-newwikitext' ) != 1
      && mw.user.options.get( 'usebetatoolbar' ) == 1
    )
    && !addClassicToolbarToolsHooked
  ) {
    $.when(
      mw.loader.using( [ 'ext.wikiEditor' ] ),
      $.ready
    ).then( () => {
      mw.hook( 'wikieditor.toolbar.gadgetsgroup' ).add( addClassicToolbarTools );
    } );

    addClassicToolbarToolsHooked = true;
  }

  if ( tool.visual && mw.config.get( 'wgIsArticle' ) ) {
    if ( tool.visual.addRightAway ) {
      // Если гаджет загружается в момент подгрузки визреда, например из [[MediaWiki:Common.js]]
      mw.loader.using( [
        'ext.visualEditor.desktopArticleTarget.init',
        'ext.visualEditor.core',
        'ext.visualEditor.mwwikitext',
        'ext.visualEditor.mwtransclusion',
      ] ).then( () => {
        addVeTool( moveProperties( tool, 'visual' ) );
      } );
    } else {
      mw.loader.using( [ 'ext.visualEditor.desktopArticleTarget.init' ] ).done( registerVeTools );
    }
  }
}
