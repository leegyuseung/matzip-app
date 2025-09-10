import {Post} from '@/types/domain';
import {getPost} from '@/api/post';
import {queryKeys} from '@/constants/keys';
import {useQuery} from '@tanstack/react-query';
import {useQueryCustomOptions} from '@/types/api';

function useGetPost(id: number, queryOptions?: useQueryCustomOptions<Post>) {
  return useQuery({
    queryFn: () => getPost(id),
    queryKey: [queryKeys.POST, queryKeys.GET_POST, id],
    ...queryOptions,
  });
}

export default useGetPost;
