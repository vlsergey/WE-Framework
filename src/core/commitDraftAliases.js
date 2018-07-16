export default function commitDraftAliases( entity ) {

  if ( typeof entity.draftAliases !== 'object' ) return entity;
  const newAliases = { ...entity.aliases || {} };

  Object.keys( entity.draftAliases ).forEach( language => {
    const newAlias = entity.draftAliases[ language ] || {};
    const newAliasText = newAlias.value || '';
    if ( newAliasText.trim() === '' ) return;

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
