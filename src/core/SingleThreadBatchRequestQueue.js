import expect from 'expect';

export default class SingleThreadBatchRequestQueue {

  constructor( buildPromice ) {
    expect( buildPromice ).toBeA( 'function' );

    this.buildPromice = buildPromice;
    this.maxBatchSize = 50;
    this._queue = [];
    this.state = 'WAITING';
    this.validate = () => true;
  }

  assertItemIsValid( item ) {
    if ( !this.validate( item ) ) throw new Error( 'Item is invalid' );
  }

  queue( item ) {
    this.assertItemIsValid( item );
    if ( !this._queue.includes( item ) ) {
      this._queue.push( item );
    }
    this.checkSchedule();
  }

  checkSchedule() {
    if ( this.state === 'WAITING' && this._queue.length > 0 ) {
      this.state = 'SCHEDULED';

      const buildPromice = this.buildPromice;
      if ( typeof buildPromice !== 'function' )
        throw new Error( 'Build promice (this.buildPromice) is not a function' );

      setTimeout( () => this.request(), 0 );
    }
  }

  request() {
    if ( this.state !== 'SCHEDULED' )
      throw new Error( 'Illegal state: ' + this.state + '; expected SCHEDULED' );

    const buildPromice = this.buildPromice;
    if ( typeof buildPromice !== 'function' )
      throw new Error( 'Build promice (this.buildPromice) is not a function' );

    const nextBatch = this._queue.slice( 0, Math.min( this._queue.length, this.maxBatchSize ) );
    this._queue = this._queue.slice( nextBatch.length );

    return buildPromice( nextBatch ).then( () => {
      mw.log( 'Successfully received ' + nextBatch.length + 'items: ' + nextBatch );
      this.state = 'WAITING';
      this.checkSchedule();
    } ).catch( error => {
      mw.log.error( 'Unable to batch request following items: ' + nextBatch );
      mw.log.error( error );
      this.state = 'WAITING';
      this.checkSchedule();
    } );
  }

}
