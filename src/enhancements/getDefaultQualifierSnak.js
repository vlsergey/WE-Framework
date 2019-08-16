import expect from 'expect';

export default function getDefaultQualifierSnak( propertyId ) {
  expect( propertyId ).toBeA( 'string' );

  if ( propertyId === 'P813' ) {
    const today = '+' + new Date().toISOString().replace( /T.*$/, 'T00:00:00Z' );
    return {
      datatype: 'time',
      datavalue: {
        value: {
          time: today,
          timezone: 0,
          before: 0,
          after: 0,
          precision: 11, // day
          calendarmodel: 'http://www.wikidata.org/entity/Q1985727',
        },
        type: 'time',
      },
    };
  }
}
