import useMutateImages from '@/hooks/useMutateImages';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useState} from 'react';
import {ImageUri} from '@/types/domain';
import {getFormDataImages} from '@/utils/image';

function useImagePicker() {
  const uploadImage = useMutateImages();
  const [imageUris, setImageUris] = useState<ImageUri[]>([]);

  const addImageUris = (uris: string[]) => {
    setImageUris(prev => [...prev, ...uris.map(uri => ({uri}))]);
  };

  const handleChangeImage = () => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      includeBase64: true,
      maxFiles: 5,
    }).then(images => {
      const formData = getFormDataImages('images', images);

      // 사진은 게시글을 등록하기전에 사진파일 자체는 미리 업로드를 해 두는 방식
      uploadImage.mutate(formData, {
        onSuccess: data => addImageUris(data),
      });
    });
  };

  return {imageUris, handleChangeImage};
}

export default useImagePicker;
