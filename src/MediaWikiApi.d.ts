declare global {

  type BiCallback<A, B> = (a: A, b: B) => unknown;
  type Callback = (...args: unknown[]) => unknown;
  type CallbackWithArg<T> = (arg: T) => unknown;
  interface Hook {
    add: (callback: Callback) => unknown;
    fire: () => unknown;
  }
  interface MwPromise<T> {
    then: (callback: Function) => MwPromise;
    done: (callback: Callback) => MwPromise<T>;
    catch: (callback: Function) => MwPromise<T>;
  }

  type ApiCallParams = Record<string, boolean | number | string | null>;
  type AjaxOptions = Record<string, never>;

  interface Api {
    get: <T>(params: ApiCallParams) => MwPromise<T>;
    post: <T>(params: ApiCallParams, ajaxOptions?: AjaxOptions) => MwPromise<T>;
    postWithToken: <T>(action: String, params: ApiCallParams, ajaxOptions?: AjaxOptions) => MwPromise<T>;
    postWithEditToken: <T>(params: ApiCallParams, ajaxOptions?: AjaxOptions) => MwPromise<T>;

    getPromise: <T>(params: ApiCallParams, ajaxOptions?: AjaxOptions) => Promise<T>;
    postPromise: <T>(params: ApiCallParams, ajaxOptions?: AjaxOptions) => Promise<T>;
    postWithTokenPromise: <T>(action: String, params: ApiCallParams, ajaxOptions?: AjaxOptions) => Promise<T>;
    postWithEditTokenPromise: <T>(params: ApiCallParams, ajaxOptions?: AjaxOptions) => Promise<T>;
  }

  type MW_NUMBER_PARAMETER =
    | 'wgArticleId'
    | 'wgRelevantArticleId';

  const jQuery: any;
  const mw: {
    Api: new () => Api;
    ForeignApi: new (url: string) => Api;
    config: {
      get: <T extends MW_NUMBER_PARAMETER | string>(key: T) => T extends MW_NUMBER_PARAMETER ? number : string;
    };
    hook: (hookKey: string) => Hook;
    hooks: Record<string, Hook>;
    libs: {
      ve: {
        addPlugin: (callback: Callback) => unknown;
      };
    };
    log: (<T>(message: T) => unknown) & {
      info: <T>(message: T) => unknown;
      warn: <T>(message: T) => unknown;
      error: <T>(message: T) => unknown;
    };
    loader: {
      using: (moduleNames: string[], callback?: Callback, errorCallback?: Callback) => MwPromise;
    };
    notify: (message: string, notifyOptions?: {
      autoHide?: boolean;
      tag?: string;
    }) => unknown;
    user: {
      options: {
        get: (option: string) => unknown;
      };
    };
    util: {
      addCSS: (css: string) => unknown;
    };
  };
  const OO: any;
  const ve: {
    ui: {
      Command: new () => unknown;
      Tool: new () => unknown;
      toolFactory: {
        register: (tool: typeof ve.ui.Tool) => unknown;
      };
      wikitextCommandRegistry?: {
        register: (command: typeof ve.ui.Command) => unknown;
      };
    };
    init: {
      mw: {
        DesktopArticleTarget: {
          static: {
            actionGroups: {
              include: {
                push: (toolName: string) => unknown;
              };
            }[];
          };
        };
      };
      target: {
        getSurface: () => {
          getMode: () => (string | string[]);
        };
      };
    };
  };

  interface ExpandTemplatesActionResult {
    expandtemplates: {
      '*': string;
      wikitext: string;
    };
  }

  interface ParseActionResult {
    parse: {
      title: string;
      pageid: number;
      revid: number;
      text?: {
        '*': string;
      };
      parsetree?: {
        '*': string;
      };
    };
  }

  interface QueryPagePropsActionReslt {
    batchcomplete: undefined | '';
    query: {
      pages: Record<string, {
        pageid: number;
        ns: number;
        title: string;
        pageprops?: {
          wikibase_item?: string;
        };
      }>;
    };
  }

  interface WbGetEntitiesActionResult {
    entities: Record<string, EntityType>;
  }

  interface WbEditEntityActionResult {
    entity: {
      id: string;
    };
  }

  interface WbFormatValueActionResult {
    result: string;
  }

  interface WbParseValueActionResult<T> {
    results: {
      raw: string;
      value: T;
      type: string;
    }[];
  }

  interface WbSearchEntitiesActionResult {
    searchinfo: {
      search: string;
    };
    search: [{
      id: string;
      title: string;
      pageid: number;
      description: string;
      aliases: string[];
    }];
  }

}

export {};
