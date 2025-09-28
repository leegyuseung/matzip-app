import React from 'react';
import useThemeStroe, {Theme} from '@/store/theme';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

import {colors} from '@/constants/colors';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';

interface SearchInputProps extends TextInputProps {
  onSubmit: () => void;
}

function SearchInput({onSubmit, ...props}: SearchInputProps) {
  const {theme} = useThemeStroe();
  const styles = styling(theme);
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        placeholderTextColor={colors[theme].GRAY_500}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        {...props}
      />
      <FontAwesome6
        name="magnifying-glass"
        iconStyle="solid"
        size={20}
        color={colors[theme].BLACK}
        onPress={onSubmit}
      />
    </View>
  );
}

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors[theme].GRAY_200,
      padding: 10,
      borderRadius: 5,
    },

    input: {
      flex: 1,
      fontSize: 16,
      paddingVertical: 0,
      paddingLeft: 0,
      color: colors[theme].BLACK,
    },
  });

export default SearchInput;
