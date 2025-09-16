import {queryKeys} from '@/constants/keys';
import {useQuery} from '@tanstack/react-query';
import {useQueryCustomOptions} from '@/types/api';
import {getCalendarPosts, ResponseCalendarPost} from '@/api/post';

function useGetCalendarPosts(
  year: number,
  month: number,
  queryOptions?: useQueryCustomOptions<ResponseCalendarPost>,
) {
  return useQuery({
    queryFn: () => getCalendarPosts(year, month),
    queryKey: [
      queryKeys.POST,
      queryKeys.GET_POSTS,
      queryKeys.GET_CALENDAR_POSTS,
      year,
      month,
    ],
    ...queryOptions,
  });
}

export default useGetCalendarPosts;
