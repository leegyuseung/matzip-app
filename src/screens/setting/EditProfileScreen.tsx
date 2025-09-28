import React from 'react';
import useForm from '@/hooks/useForm';
import useModal from '@/hooks/useModal';
import useAuth from '@/hooks/queries/useAuth';
import Toast from 'react-native-toast-message';
import useThemeStroe, {Theme} from '@/store/theme';
import useImagePicker from '@/hooks/useImagePicker';
import InputField from '@/components/common/InputField';
import Ionicons from '@react-native-vector-icons/ionicons';
import FixedButtomCTA from '@/components/common/FixedBottomCTA';
import EditProfileActionSheet from '@/components/setting/EditProfileActionSheet';

import {baseUrls} from '@/api/axios';
import {colors} from '@/constants/colors';
import {validateEditProfile} from '@/utils/validation';
import {
  Image,
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

function EditProfileScreen() {
  const {theme} = useThemeStroe();
  const styles = styling(theme);
  const {auth, profileMutation} = useAuth();
  const imageAction = useModal();

  const imagePicker = useImagePicker({
    initialImages: auth.imageUri ? [{uri: auth.imageUri}] : [],
    mode: 'single',
    onSettled: imageAction.hide,
  });

  const editProfile = useForm({
    initialValue: {nickname: auth.nickname ?? ''},
    validate: validateEditProfile,
  });

  const handlePressImage = () => {
    imageAction.show();
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    profileMutation.mutate(
      {
        ...editProfile.values,
        imageUri: imagePicker.imageUris[0].uri,
      },
      {
        onSuccess: () =>
          Toast.show({
            type: 'success',
            text1: '프로필이 변경되었습니다.',
            position: 'bottom',
          }),
      },
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Pressable
            onPress={handlePressImage}
            style={[styles.imageContainer, styles.emptyImageContainer]}>
            {imagePicker.imageUris.length === 0 ? (
              <Ionicons
                name="camera-outline"
                size={30}
                color={colors[theme].GRAY_500}
              />
            ) : (
              <Image
                style={styles.image}
                source={{
                  uri: `${
                    Platform.OS === 'ios' ? baseUrls.ios : baseUrls.android
                  }/${imagePicker.imageUris[0].uri}`,
                }}
                resizeMode="cover"
              />
            )}
          </Pressable>
        </View>
        <InputField
          {...editProfile.getTextInputProps('nickname')}
          error={editProfile.errors.nickname}
          touched={editProfile.touched.nickname}
          placeholder="닉네임을 입력해주세요."
        />
      </View>
      <FixedButtomCTA label="저장" onPress={handleSubmit} />
      <EditProfileActionSheet
        isVisible={imageAction.isVisible}
        hideAction={imageAction.hide}
        onChangeImage={imagePicker.handleChangeImage}
      />
    </>
  );
}

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },

    profileContainer: {
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 40,
    },

    imageContainer: {
      width: 100,
      height: 100,
    },

    emptyImageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: colors[theme].GRAY_200,
      borderRadius: 50,
      borderWidth: 1,
    },

    image: {
      width: '100%',
      height: '100%',
    },
  });

export default EditProfileScreen;
