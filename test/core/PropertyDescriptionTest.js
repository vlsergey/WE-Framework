import assert from 'assert';
import PropertyDescription from '../../src/core/PropertyDescription';

import p345 from '../entities/P345';

describe('PropertyDescription', () => {
  describe('Should parse p345', () => {

    const propertyDescription = new PropertyDescription( p345 );
    
    it('Label shall be parsed', () => {
      assert.equal(propertyDescription.label, "IMDb ID");
    });
    
  });
});
