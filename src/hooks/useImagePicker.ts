import Toast from 'react-native-toast-message';
import useMutateImages from '@/hooks/queries/useMutateImages';
import ImageCropPicker from 'react-native-image-crop-picker';

import {useState} from 'react';
import {ImageUri} from '@/types/domain';
import {getFormDataImages} from '@/utils/image';

interface UseImagePickerProps {
  initialImages: ImageUri[];
}

function useImagePicker({initialImages}: UseImagePickerProps) {
  const uploadImage = useMutateImages();
  const [imageUris, setImageUris] = useState<ImageUri[]>(initialImages);

  const addImageUris = (uris: string[]) => {
    setImageUris(prev => [...prev, ...uris.map(uri => ({uri}))]);
  };

  const deleteImageUri = (uri: string) => {
    const newImageUris = imageUris.filter(image => image.uri !== uri);
    setImageUris(newImageUris);
  };

  const handleChangeImage = () => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      includeBase64: true,
      maxFiles: 5,
    })
      .then(images => {
        const formData = getFormDataImages('images', images);

        // 사진은 게시글을 등록하기전에 사진파일 자체는 미리 업로드를 해 두는 방식
        uploadImage.mutate(formData, {
          onSuccess: data => addImageUris(data),
        });
      })
      .catch(e => {
        if (e.code !== 'E_PICKER_CANCELLED') {
          Toast.show({
            type: 'error',
            text1: '권한을 허용했는지 확인해주세요.',
            position: 'bottom',
          });
        }
      });
  };

  return {imageUris, handleChangeImage, delete: deleteImageUri};
}

export default useImagePicker;
