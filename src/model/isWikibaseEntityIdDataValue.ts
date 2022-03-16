export default function isWikibaseEntityIdDataValue(datavalue? : DataValueType | null) : datavalue is WikibaseEntityIdDataValue {
  return datavalue?.type==="wikibase-entityid";
}
