// flow-typed signature: 00a16733d2ed392e3f56bd1cbd999bd8
// flow-typed version: c6154227d1/isomorphic-fetch_v2.x.x/flow_>=v0.104.x

declare module "isomorphic-fetch" {
  declare module.exports: (
    input: string | Request | URL,
    init?: RequestOptions
  ) => Promise<Response>;
}
