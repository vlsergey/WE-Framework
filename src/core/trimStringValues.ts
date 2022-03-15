
const KEYS_TO_CHECK: (string & keyof EntityType)[] = ['labels', 'descriptions', 'aliases', 'claims'];

export default function trimStringValues (entity: EntityType): EntityType {
  const result = {...entity};
  let hasChanges = false;

  for (const key of KEYS_TO_CHECK) {
    const oldValue = entity[key];
    if (!oldValue) continue;

    const newValue = trimStringValuesImpl(oldValue);
    if (newValue !== oldValue) {
      hasChanges = true;
      result[key] = newValue;
    }
  }

  return hasChanges ? result : entity;
}

function trimStringValuesImpl (obj: any): any {
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
