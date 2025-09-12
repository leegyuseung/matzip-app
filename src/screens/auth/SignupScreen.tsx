import React, {useRef} from 'react';
import useForm from '@/hooks/useForm';
import useAuth from '@/hooks/queries/useAuth';
import InputField from '@/components/common/InputField';
import CustomButton from '@/components/common/CustomButton';
import {validateSignup} from '@/utils/validation';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';

function SignupScreen() {
  const {signupMutation, loginMutation} = useAuth();
  const passwordRef = useRef<TextInput | null>(null);
  const passwordConfirmRef = useRef<TextInput | null>(null);

  const signup = useForm({
    initialValue: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validate: validateSignup,
  });

  const handleSubmit = () => {
    const {email, password} = signup.values;

    signupMutation.mutate(
      {email, password},
      {onSuccess: () => loginMutation.mutate({email, password})}, // 회원가입하면 바로 로그인해주기
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="이메일"
          submitBehavior="submit"
          returnKeyType="next"
          inputMode="email"
          onSubmitEditing={() => passwordRef.current?.focus()}
          touched={signup.touched.email}
          error={signup.errors.email}
          {...signup.getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          placeholder="비밀번호"
          textContentType="oneTimeCode"
          secureTextEntry
          submitBehavior="submit"
          returnKeyType="next"
          onSubmitEditing={() => passwordConfirmRef.current?.focus()}
          touched={signup.touched.password}
          error={signup.errors.password}
          {...signup.getTextInputProps('password')}
        />
        <InputField
          ref={passwordConfirmRef}
          placeholder="비밀번호 확인"
          secureTextEntry
          touched={signup.touched.passwordConfirm}
          error={signup.errors.passwordConfirm}
          onSubmitEditing={handleSubmit}
          {...signup.getTextInputProps('passwordConfirm')}
        />
      </View>
      <CustomButton
        label="회원가입"
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

export default SignupScreen;
