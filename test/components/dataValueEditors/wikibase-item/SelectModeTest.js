import assert from 'assert';
import P21 from '../../../entities/P21';
import PropertyDescription from 'core/PropertyDescription';
import SelectMode from 'components/dataValueEditors/wikibase-item/SelectMode';

describe( 'components/dataValueEditors/wikibase-item', () => {

  const p21Description = new PropertyDescription( P21 );

  describe( 'SelectMode', () => {

    it( 'Correctly calculate hasCompatibleOneOfRestriction()', () => {
      assert.equal( SelectMode.hasCompatibleOneOfRestriction( {
        propertyDescription: p21Description,
        datavalue: {
          value: {
            'entity-type': 'item',
            'numeric-id': 6581072,
            'id': 'Q6581072',
          },
          type: 'wikibase-entityid',
        },
      } ), true );
    } );

  } );

} );
