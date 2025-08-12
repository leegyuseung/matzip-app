import React from 'react';
import Ionicons from '@react-native-vector-icons/ionicons';
import {colors} from '@/constants/colors';
import {useNavigation} from '@react-navigation/native';
import {MainDrawerParamList} from '@/types/navigation';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {Pressable, StyleProp, StyleSheet, ViewStyle} from 'react-native';

type Navigation = DrawerNavigationProp<MainDrawerParamList>;

interface DrawerButtonProps {
  color?: string;
  style?: StyleProp<ViewStyle>;
}

function DrawerButton({style, color = colors.BLACK}: DrawerButtonProps) {
  const navigation = useNavigation<Navigation>();
  return (
    <Pressable
      style={[styles.container, style]}
      onPress={() => navigation.openDrawer()}>
      <Ionicons name="menu" size={25} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
});

export default DrawerButton;
