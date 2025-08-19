import React from 'react';
import useForm from '@/hooks/useForm';
import InputField from '@/components/InputField';
import useGetAddress from '@/hooks/useGetAddress';
import CustomButton from '@/components/CustomButton';
import {validateAddPost} from '@/utils/validation';
import {ScrollView, StyleSheet} from 'react-native';
import {MapStackParamList} from '@/types/navigation';
import {StackScreenProps} from '@react-navigation/stack';

type Props = StackScreenProps<MapStackParamList, 'AddLocation'>;

function AddLocationScreen({route}: Props) {
  const {location} = route.params;
  const address = useGetAddress(location);
  const postForm = useForm({
    initialValue: {
      title: '',
      description: '',
    },
    validate: validateAddPost,
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <InputField disabled value={address} />
      <CustomButton variant="outlined" label="날짜 선택" />
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    padding: 20,
  },
});

export default AddLocationScreen;
