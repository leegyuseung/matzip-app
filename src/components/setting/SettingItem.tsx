import React from 'react';
import useThemeStroe, {Theme} from '@/store/theme';

import {colors} from '@/constants/colors';
import {Pressable, PressableProps, StyleSheet, Text} from 'react-native';

interface SettingItemProps extends PressableProps {
  title: string;
  color?: string;
}

function SettingItem({title, color, ...props}: SettingItemProps) {
  const {theme} = useThemeStroe();
  const styles = styling(theme);

  return (
    <Pressable
      style={({pressed}) => [
        styles.container,
        pressed && styles.pressedContainer,
      ]}
      {...props}>
      <Text style={[styles.titleText, {color: color ?? colors[theme].BLACK}]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 10,
      padding: 15,
      backgroundColor: colors[theme].WHITE,
      borderColor: colors[theme].GRAY_200,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderTopWidth: StyleSheet.hairlineWidth,
    },

    pressedContainer: {
      backgroundColor: colors[theme].GRAY_200,
    },

    titleText: {
      fontSize: 16,
      fontWeight: '500',
      color: colors[theme].BLACK,
    },
  });

export default SettingItem;
