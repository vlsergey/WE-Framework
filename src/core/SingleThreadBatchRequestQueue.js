import expect from 'expect';

export default class SingleThreadBatchRequestQueue {

  constructor( buildPromice ) {
    expect( buildPromice ).toBeA( 'function' );

    this.buildPromice = buildPromice;
    this.validate = () => true;
    this.state = 'WAITING';
    this.maxBatchSize = 50;
  }

  assertItemIsValid( item ) {
    if ( !this.validate( item ) ) throw new Error( 'Item is invalid' );
  }

  queue( item ) {
    this.assertItemIsValid( item );
    if ( !this._queue.includes( item ) ) {
      this.queue.push( item );
    }
    this.checkSchedule();
  }

  checkSchedule() {
    if ( this.state === 'WAITING' && this.queue.length > 0 ) {
      this.state = 'SCHEDULED';

      const buildPromice = this.buildPromice;
      if ( typeof buildPromice !== 'function' )
        throw new Error( 'Build promice (this.buildPromice) is not a function' );

      setTimeout( 0, () => this.request() );
    }
  }

  request() {
    if ( this.state !== 'SCHEDULED' )
      throw new Error( 'Illegal state: ' + this.state + '; expected SCHEDULED' );

    const buildPromice = this.buildPromice;
    if ( typeof buildPromice !== 'function' )
      throw new Error( 'Build promice (this.buildPromice) is not a function' );

    const nextBatch = this.queue.slice( 0, Math.max( this.queue.length, this.maxBatchSize ) );
    if ( nextBatch.length < this.queue.length ) {
      this.queue = this.queue.slice( nextBatch.length );
    }

    return buildPromice( nextBatch ).then( () => {
      mw.log.info( 'Successfully received ' + nextBatch.length + 'items: ' + nextBatch );
      this.state = 'WAITING';
      this.checkSchedule();
    } ).catch( ( error ) => {
      mw.log.error( 'Unable to batch request following items: ' + nextBatch );
      mw.log.error( error );
      this.state = 'WAITING';
      this.checkSchedule();
    } );
  }

}
