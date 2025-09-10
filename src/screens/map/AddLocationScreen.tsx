import React, {useState} from 'react';
import useForm from '@/hooks/useForm';
import ImageInput from '@/components/ImageInput';
import ScoreInput from '@/components/ScoreInput';
import InputField from '@/components/InputField';
import DatePicker from 'react-native-date-picker';
import usePermission from '@/hooks/usePermission';
import useGetAddress from '@/hooks/useGetAddress';
import useImagePicker from '@/hooks/useImagePicker';
import CustomButton from '@/components/CustomButton';
import FixedButtomCTA from '@/components/FixedBottomCTA';
import PreviewImageList from '@/components/PreviewImageList';
import MarkerColorInput from '@/components/MarkerColorInput';
import useMutateCreatePost from '@/hooks/queries/useMutateCreatePost';
import {colors} from '@/constants/colors';
import {getDateWithSeparator} from '@/utils/date';
import {validateAddPost} from '@/utils/validation';
import {MapStackParamList} from '@/types/navigation';
import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = StackScreenProps<MapStackParamList, 'AddLocation'>;

function AddLocationScreen({route}: Props) {
  const {location} = route.params;
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();
  const address = useGetAddress(location);
  const imagePicker = useImagePicker();
  const postForm = useForm({
    initialValue: {
      title: '',
      description: '',
      date: new Date(),
      color: colors.PINK_400,
      score: 3,
    },
    validate: validateAddPost,
  });

  const [openDate, setOpenDate] = useState(false);
  const createPost = useMutateCreatePost();
  usePermission('PHOTO');

  const handleSubmit = () => {
    createPost.mutate(
      {
        address,
        ...location,
        ...postForm.values,
        imageUris: imagePicker.imageUris,
      },
      {
        onSuccess: () => navigation.goBack(),
      },
    );
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          {paddingBottom: inset.bottom + 100},
        ]}>
        <InputField disabled value={address} />
        <CustomButton
          variant="outlined"
          label={getDateWithSeparator(postForm.values.date, '. ')}
          onPress={() => setOpenDate(true)}
        />
        <InputField
          placeholder="제목을 입력하세요."
          error={postForm.errors.title}
          touched={postForm.touched.title}
          {...postForm.getTextInputProps('title')}
        />
        <InputField
          multiline
          placeholder="기록하고 싶은 내용을 입력하세요."
          error={postForm.errors.description}
          touched={postForm.touched.description}
          {...postForm.getTextInputProps('description')}
        />
        <MarkerColorInput
          color={postForm.values.color}
          onChnageColor={value => postForm.onChange('color', value)}
          score={postForm.values.score}
        />
        <ScoreInput
          score={postForm.values.score}
          onChangeScore={value => postForm.onChange('score', value)}
        />
        <DatePicker
          modal
          locale="ko"
          mode="date"
          title={null}
          cancelText="취소"
          confirmText="완료"
          date={postForm.values.date}
          open={openDate}
          onConfirm={date => {
            postForm.onChange('date', date);
            setOpenDate(false);
          }}
          onCancel={() => setOpenDate(false)}
        />
        <View style={{flexDirection: 'row'}}>
          <ImageInput onChange={imagePicker.handleChangeImage} />
          <PreviewImageList
            imageUris={imagePicker.imageUris}
            onDelete={imagePicker.delete}
          />
        </View>
      </ScrollView>
      <FixedButtomCTA label="저장" onPress={handleSubmit} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    padding: 20,
  },
});

export default AddLocationScreen;
