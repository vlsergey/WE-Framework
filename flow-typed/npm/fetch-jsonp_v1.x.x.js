// flow-typed signature: 5d679be4975d0a1144166f01877b978b
// flow-typed version: c6154227d1/fetch-jsonp_v1.x.x/flow_>=v0.104.x

// Adapted from https://github.com/camsong/fetch-jsonp/blob/master/index.d.ts

declare module "fetch-jsonp" {
  declare module.exports: (url: string, options?: Options) => Promise<Response>;

  declare type Options = {
    timeout?: number,
    jsonpCallback?: string,
    jsonpCallbackFunction?: string,
    ...
  };

  declare class Response {
    json<T>(): Promise<T>,
    ok: boolean
  }
}
