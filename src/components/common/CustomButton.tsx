import React, {ReactNode} from 'react';
import useThemeStroe, {Theme} from '@/store/theme';

import {colors} from '@/constants/colors';
import {
  StyleSheet,
  Pressable,
  Text,
  PressableProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface CustomButtonProps extends PressableProps {
  label: string | ReactNode;
  variant?: 'filled' | 'outlined';
  size?: 'large' | 'small';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

function CustomButton({
  label,
  variant = 'filled',
  size = 'large',
  style = null,
  textStyle = null,
  ...props
}: CustomButtonProps) {
  const {theme} = useThemeStroe();
  const styles = styling(theme);

  return (
    <Pressable
      style={({pressed}) => [
        styles.container,
        styles[variant],
        styles[size],
        pressed && styles.pressed,
        style,
      ]}
      {...props}>
      {typeof label === 'string' ? (
        <Text style={[styles[`${variant}Text`], textStyle]}>{label}</Text>
      ) : (
        label
      )}
    </Pressable>
  );
}

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderRadius: 3,
      alignItems: 'center',
      justifyContent: 'center',
    },

    filled: {
      backgroundColor: colors[theme].PINK_700,
    },

    outlined: {
      backgroundColor: colors[theme].WHITE,
      borderColor: colors[theme].PINK_700,
      borderWidth: 1,
    },

    filledText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors[theme].WHITE,
    },

    outlinedText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors[theme].PINK_700,
    },

    large: {
      width: '100%',
      height: 45,
    },

    small: {
      paddingHorizontal: 10,
      height: 35,
    },

    pressed: {
      opacity: 0.8,
    },
  });

export default CustomButton;
