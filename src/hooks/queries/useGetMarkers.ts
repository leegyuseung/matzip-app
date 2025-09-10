import {Marker} from '@/types/domain';
import {getMarkers} from '@/api/marker';
import {queryKeys} from '@/constants/keys';
import {useQuery} from '@tanstack/react-query';
import {useQueryCustomOptions} from '@/types/api';

function useGetMarkers(queryOptions?: useQueryCustomOptions<Marker[]>) {
  return useQuery({
    queryFn: getMarkers,
    queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
    ...queryOptions,
  });
}

export default useGetMarkers;
