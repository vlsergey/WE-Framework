
const KEYS_TO_CHECK: (string & keyof EntityType)[] = ['labels', 'descriptions', 'aliases', 'claims'];

export default function trimStringValues (entity: EntityType): EntityType {
  const result = {...entity};
  let hasChanges = false;

  for (const key of KEYS_TO_CHECK) {
    const didChange = trimStringValuesImpl<typeof key, unknown, EntityType>(key, entity, result);
    hasChanges = hasChanges || didChange;
  }

  return hasChanges ? result : entity;
}

function trimStringValuesImpl<K extends (string & keyof EntityType), V, R extends {[key in K]?: V}> (
    key: K,
    entity: R,
    result: R
): boolean {
  const oldValue = entity[key];
  if (!oldValue) return false;

  const newValue = trimStringValuesImpl2(oldValue);
  if (newValue === oldValue) return false;

  result[key] = newValue;
  return true;
}

function trimStringValuesImpl2<T> (obj: T): T {
  const result: any = Array.isArray(obj) ? [...obj] : {...obj};
  let hasChanges = false;

  Object.entries(obj).forEach(([key, oldValue]) => {
    let newValue = oldValue;

    if (oldValue === null || oldValue === undefined) {
      result[key] = null;
      return;
    }

    if (typeof oldValue === 'object') {
      newValue = trimStringValuesImpl(oldValue);
    }
    if (typeof oldValue === 'string') {
      newValue = oldValue.trim();
    }

    if (newValue !== oldValue) {
      hasChanges = true;
      result[key] = newValue;
    } else {
      result[key] = oldValue;
    }
  });
  return !hasChanges ? obj : result;
}
