export default function sleep (ms?: number): Promise<void> {
  console.debug('TEST: sleep:', ms);
  return new Promise<void>(resolve => setTimeout(resolve, ms));
}
