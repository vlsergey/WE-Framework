
export function newWikibaseItemDataValue() {
  if ( arguments.length === 0 ) {
    return {
      type: 'wikibase-entityid',
    };
  }

  if ( arguments.length == 1 && typeof arguments[ 0 ] == 'string' ) {
    /** @type {String} */
    const entityId = arguments[ 0 ];
    let entityType;

    switch ( entityId.substr( 0, 1 ) ) {
    case 'P':
    case 'p':
      entityType = 'property';
      break;
    case 'Q':
    case 'q':
      entityType = 'item';
      break;
    default:
      throw new Error( 'Unknown entity type: ' + entityId );
    }

    const numericId = Number( entityId.substr( 1 ) );
    return {
      value: {
        'entity-type': entityType,
        'numeric-id': numericId,
      },
      type: 'wikibase-entityid',
    };
  }

  if ( arguments.length == 2 && typeof arguments[ 0 ] == 'string' && typeof arguments[ 1 ] == 'number' ) {
    /** @type {String} */
    const entityType = arguments[ 0 ];
    /** @type {Number} */
    const numericId = arguments[ 1 ];
    return {
      value: {
        'entity-type': entityType,
        'numeric-id': numericId,
      },
      type: 'wikibase-entityid',
    };
  }

  throw new Error( 'Incorrect number of arguments or their types' );
}


/**
  * @param {String}
  *            property
  * @param {String}
  *            entityType
  * @param {Number}
  *            numericId
  */
export function newWikibaseItemSnak( property, entityType, numericId ) {
  return {
    snaktype: 'value',
    property: property,
    datatype: 'wikibase-item',
    datavalue: newWikibaseItemDataValue( entityType, numericId ),
  };
}
