import React, {Ref} from 'react';
import {colors} from '@/constants/colors';
import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';

interface InputFieldProps extends TextInputProps {
  ref?: Ref<TextInput>;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
}

function InputField({
  ref,
  error,
  touched,
  disabled = false,
  ...props
}: InputFieldProps) {
  return (
    <View>
      <TextInput
        ref={ref}
        placeholderTextColor={colors.GRAY_500}
        autoCapitalize="none" // 첫 글자 대문자
        spellCheck={false} //  오타체크
        autoCorrect={false} // 자동완성
        style={[
          styles.input,
          disabled && styles.disabled,
          props.multiline && styles.multiline,
          touched && Boolean(error) && styles.inputError,
        ]}
        editable={!disabled}
        {...props}
      />
      {touched && Boolean(error) && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    justifyContent: 'center',
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,
    color: colors.BLACK,
  },

  error: {
    color: colors.RED_500,
    fontSize: 12,
    paddingTop: 5,
  },

  inputError: {
    borderWidth: 1,
    borderColor: colors.RED_300,
  },

  multiline: {
    height: 150,
    paddingVertical: 10,
    textAlignVertical: 'top', // 안드로이드 때문에
  },

  disabled: {
    backgroundColor: colors.GRAY_200,
    color: colors.GRAY_700,
  },
});

export default InputField;
