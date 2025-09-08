import {uploadImage} from '@/api/image';
import {useMutation} from '@tanstack/react-query';
import {UseMutationCustomOptions} from '@/types/api';

function useMutateImages(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: uploadImage,
    ...mutationOptions,
  });
}

export default useMutateImages;
