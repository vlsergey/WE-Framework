export default function getDefaultQualifierSnak (propertyId: string): null | SnakType {
  if (propertyId !== 'P813') return null;

  const today = '+' + new Date().toISOString().replace(/T.*$/, 'T00:00:00Z');
  const result: SnakType = {
    property: propertyId,
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
    snaktype: 'value'
  };
  return result;
}
