import {useMemo} from 'react';
import {useSelector} from 'react-redux';

const EMPTY_SET = new Set<string>();

export default function useFilterByClaimPresence (enabled: boolean, propertyIds: readonly string[]): readonly string[] {
  const claims = useSelector((state: ReduxState) => state.entity.claims);

  const propertyIdsWithClaims = useMemo(() => !claims ? EMPTY_SET :
    new Set(Object.entries(claims).filter(([, propClaims]) => propClaims?.length !== 0).map(([propertyId]) => propertyId))
  , [claims]);

  const filtered = useMemo(() =>
    propertyIds.filter(propertyId => propertyIdsWithClaims.has(propertyId))
  , [propertyIds, propertyIdsWithClaims]);

  return enabled ? filtered : propertyIds;
}
