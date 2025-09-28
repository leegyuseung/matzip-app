import React from 'react';
import useThemeStroe from '@/store/theme';

import {colors} from '@/constants/colors';
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleSheet,
  View,
} from 'react-native';

function Indicator({size = 'small', color}: ActivityIndicatorProps) {
  const {theme} = useThemeStroe();
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color || colors[theme].GRAY_500} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Indicator;
