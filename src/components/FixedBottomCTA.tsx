import React from 'react';
import CustomButton from './CustomButton';
import {StyleSheet, View} from 'react-native';
import {colors} from '@/constants/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface FixedButtomCTAProps {
  label: string;
  onPress: () => void;
}

function FixedButtomCTA({label, onPress}: FixedButtomCTAProps) {
  const inset = useSafeAreaInsets();
  return (
    <View style={[styles.fixed, {paddingBottom: inset.bottom || 12}]}>
      <CustomButton label={label} onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  fixed: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingTop: 12,
    paddingHorizontal: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.GRAY_300,
  },
});

export default FixedButtomCTA;
