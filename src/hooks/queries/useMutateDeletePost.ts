import queryClient from '@/api/queryClient';
import {deletePost} from '@/api/post';
import {Marker} from '@/types/domain';
import {queryKeys} from '@/constants/keys';
import {useMutation} from '@tanstack/react-query';
import {UseMutationCustomOptions} from '@/types/api';

function useMutateDeletePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: deletePost,
    onSuccess: deleteId => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
      // queryClient.invalidateQueries({
      //   queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
      // });
      queryClient.setQueryData<Marker[]>(
        [queryKeys.MARKER, queryKeys.GET_MARKERS],
        existingMarkers =>
          existingMarkers?.filter(marker => marker.id !== deleteId),
      );
    },
    ...mutationOptions,
  });
}

export default useMutateDeletePost;
