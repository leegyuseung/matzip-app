import React, {useRef} from 'react';
import useForm from '@/hooks/useForm';
import useAuth from '@/hooks/queries/useAuth';
import Toast from 'react-native-toast-message';
import InputField from '@/components/common/InputField';
import CustomButton from '@/components/common/CustomButton';
import {validateLogin} from '@/utils/validation';
import {errorMessages} from '@/constants/messages';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';

function LoginScreen() {
  const {loginMutation} = useAuth();
  const passwordRef = useRef<TextInput | null>(null);
  const login = useForm({
    initialValue: {
      email: '',
      password: '',
    },
    validate: validateLogin,
  });

  const handleSubmit = () => {
    loginMutation.mutate(login.values, {
      onError: error =>
        Toast.show({
          type: 'error',
          text1: error.response?.data.message || errorMessages.UNEXPECT_ERROR,
        }),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="이메일"
          submitBehavior="submit" // 엔터를 눌러도 키보드 안없어진다
          returnKeyType="next" // 엔터 키타입
          inputMode="email" // 키보드 email 모드로 변경
          onSubmitEditing={() => passwordRef.current?.focus()} // 엔터 눌렀을때 password Input으로 포커스 이동
          touched={login.touched.email}
          error={login.errors.email}
          {...login.getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          placeholder="비밀번호"
          returnKeyType="join"
          secureTextEntry
          textContentType="oneTimeCode"
          maxLength={20}
          onSubmitEditing={handleSubmit}
          touched={login.touched.password}
          error={login.errors.password}
          {...login.getTextInputProps('password')}
        />
      </View>
      <CustomButton
        label="로그인"
        variant="filled"
        size="large"
        onPress={handleSubmit}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },

  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
});

export default LoginScreen;
