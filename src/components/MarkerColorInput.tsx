import React from 'react';
import CustomMarker from './CustomMarker';
import {colors} from '@/constants/colors';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';

interface MakerColorInputProps {
  color: string;
  onChnageColor: (value: string) => void;
}

function MarkerColorInput({color, onChnageColor}: MakerColorInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.markerLabel}>마커선택</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.markerInputScroll}>
          {[
            colors.PINK_400,
            colors.BLUE_400,
            colors.YELLOW_400,
            colors.GREEN_400,
            colors.PURPLE_400,
          ].map(selectColor => {
            return (
              <Pressable
                key={selectColor}
                style={[
                  styles.markerBox,
                  color === selectColor && styles.pressedMarker,
                ]}
                onPress={() => onChnageColor(selectColor)}>
                <CustomMarker color={selectColor} />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    padding: 15,
  },

  markerLabel: {
    marginBottom: 15,
    color: colors.GRAY_700,
  },

  markerInputScroll: {
    flexDirection: 'row',
    gap: 20,
  },

  markerBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 6,
    backgroundColor: colors.GRAY_100,
  },

  pressedMarker: {
    borderWidth: 2,
    borderColor: colors.RED_500,
  },
});

export default MarkerColorInput;
