import React from 'react';
import CustomButton from './CustomButton';
import useThemeStroe, {Theme} from '@/store/theme';

import {colors} from '@/constants/colors';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface FixedButtomCTAProps {
  label: string;
  onPress: () => void;
}

function FixedButtomCTA({label, onPress}: FixedButtomCTAProps) {
  const inset = useSafeAreaInsets();
  const {theme} = useThemeStroe();
  const styles = styling(theme);

  return (
    <View style={[styles.fixed, {paddingBottom: inset.bottom || 12}]}>
      <CustomButton label={label} onPress={onPress} />
    </View>
  );
}

const styling = (theme: Theme) =>
  StyleSheet.create({
    fixed: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      paddingTop: 12,
      paddingHorizontal: 16,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors[theme].GRAY_300,
    },
  });

export default FixedButtomCTA;
