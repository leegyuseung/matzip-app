import React from 'react';
import {colors} from '@/constants/colors';
import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';

interface InputFieldProps extends TextInputProps {
  error?: string;
  touched?: boolean;
}

function InputField({error, touched, ...props}: InputFieldProps) {
  return (
    <View>
      <TextInput
        style={[styles.input, touched && Boolean(error) && styles.inputError]}
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
});

export default InputField;
