const EMPTY_OBJECT = Object.freeze( {} );

export default function commitDraftAliases( entity : EntityType ) {

  if ( !entity.draftAliases ) return entity;
  const newAliases : AliasesType = { ...entity.aliases || {} };

  Object.entries( entity.draftAliases ).forEach( ( [ language, draftAlias ] ) => {
    if ( (draftAlias?.value || '').trim() === '' ) return;

    const newAlias = draftAlias || EMPTY_OBJECT;
    newAliases[ language ] = [
      ...newAliases[ language ] || [],
      newAlias,
    ];
  } );

  const result = {
    ...entity,
    aliases: newAliases,
  };
  delete result.draftAliases;
  return result;
}
