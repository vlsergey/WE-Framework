// https://gist.github.com/clarkbw/966732806e7a38f5b49fd770c62a6099

const enabled = !!performance && typeof performance.mark === 'function';

const timing = () => (next: any) => (action: any) => {
  if (!enabled) return next(action);

  performance.mark(`${action.type}_start`);
  const result = next(action);
  performance.mark(`${action.type}_end`);
  performance.measure(
    `${action.type}`,
    `${action.type}_start`,
    `${action.type}_end`
  );
  return result;
};

const NOOP = () => (next: any) => (action: any) => next(action);

/* eslint no-undef: 0 */
const result = enabled && process.env.NODE_ENV !== 'production' ? timing : NOOP;

export default result;
