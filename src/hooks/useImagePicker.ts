import Toast from 'react-native-toast-message';
import ImageCropPicker from 'react-native-image-crop-picker';
import useMutateImages from '@/hooks/queries/useMutateImages';

import {useState} from 'react';
import {Alert} from 'react-native';
import {ImageUri} from '@/types/domain';
import {getFormDataImages} from '@/utils/image';

interface UseImagePickerProps {
  initialImages: ImageUri[];
  mode?: 'multiple' | 'single';
  onSettled?: () => void;
}

function useImagePicker({
  initialImages,
  mode = 'multiple',
  onSettled,
}: UseImagePickerProps) {
  const uploadImage = useMutateImages();
  const [imageUris, setImageUris] = useState<ImageUri[]>(initialImages);

  const addImageUris = (uris: string[]) => {
    setImageUris(prev => [...prev, ...uris.map(uri => ({uri}))]);
  };

  const deleteImageUri = (uri: string) => {
    const newImageUris = imageUris.filter(image => image.uri !== uri);
    setImageUris(newImageUris);
  };

  const replaceImageUri = (uris: string[]) => {
    if (uris.length > 1) {
      Alert.alert('이미지 개수 초과', '추가 가능한 이미지는 최대 1개입니다.');
      return;
    }
    setImageUris([...uris.map(uri => ({uri}))]);
  };

  const handleChangeImage = () => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      includeBase64: true,
      maxFiles: mode === 'multiple' ? 5 : 1,
    })
      .then(images => {
        const formData = getFormDataImages('images', images);

        // 사진은 게시글을 등록하기전에 사진파일 자체는 미리 업로드를 해 두는 방식
        uploadImage.mutate(formData, {
          onSuccess: data =>
            mode === 'multiple' ? addImageUris(data) : replaceImageUri(data),
          onSettled: () => onSettled && onSettled(),
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
