import React, {Ref} from 'react';
import useThemeStroe, {Theme} from '@/store/theme';

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
  const {theme} = useThemeStroe();
  const styles = styling(theme);

  return (
    <View>
      <TextInput
        ref={ref}
        placeholderTextColor={colors[theme].GRAY_500}
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

const styling = (theme: Theme) =>
  StyleSheet.create({
    input: {
      borderWidth: 1,
      borderColor: colors[theme].GRAY_200,
      justifyContent: 'center',
      height: 50,
      paddingHorizontal: 10,
      fontSize: 16,
      color: colors[theme].BLACK,
    },

    error: {
      color: colors[theme].RED_500,
      fontSize: 12,
      paddingTop: 5,
    },

    inputError: {
      borderWidth: 1,
      borderColor: colors[theme].RED_300,
    },

    multiline: {
      height: 150,
      paddingVertical: 10,
      textAlignVertical: 'top', // 안드로이드 때문에
    },

    disabled: {
      backgroundColor: colors[theme].GRAY_200,
      color: colors[theme].GRAY_700,
    },
  });

export default InputField;
