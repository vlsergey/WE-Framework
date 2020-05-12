// @flow

import { entries } from 'utils/ObjectUtils';

const EMPTY_OBJECT : any = Object.freeze( {} );

export default function commitDraftAliases( entity : EntityType ) {

  if ( !entity.draftAliases ) return entity;
  const newAliases : AliasesType = { ...entity.aliases || {} };

  entries( entity.draftAliases ).forEach( ( [ language, draftAlias ] ) => {
    const newAlias : LabelalikeType = draftAlias || EMPTY_OBJECT;
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
