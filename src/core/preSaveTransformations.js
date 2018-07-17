import commitDraftAliases from './commitDraftAliases';
import filterEmptyEntityStructures from './filterEmptyEntityStructures';
import trimStringValues from './trimStringValues';

export default function preSaveTransformations( entity ) {
  let result = entity;
  result = commitDraftAliases( result );
  result = filterEmptyEntityStructures( result );
  result = trimStringValues( result );
  return result;
}
