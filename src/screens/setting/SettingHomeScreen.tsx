import React from 'react';
import useModal from '@/hooks/useModal';
import useThemeStroe from '@/store/theme';
import useAuth from '@/hooks/queries/useAuth';
import SettingItem from '@/components/setting/SettingItem';
import DarkModeActionSheet from '@/components/setting/DarkModeActionSheet';

import {colors} from '@/constants/colors';
import {SettingStackParamList} from '@/types/navigation';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

type Navigation = NavigationProp<SettingStackParamList>;

function SettingHomeScreen() {
  const {theme} = useThemeStroe();
  const navigation = useNavigation<Navigation>();
  const {logoutMutation} = useAuth();
  const darkModeAction = useModal();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.space} />
        <SettingItem
          title="프로필 수정"
          onPress={() => navigation.navigate('EditProfile')}
        />
        <SettingItem title="다크 모드" onPress={darkModeAction.show} />
        <View style={styles.space} />
        <SettingItem
          title="로그아웃"
          color={colors[theme].RED_500}
          onPress={() => logoutMutation.mutate(null)}
        />
        <DarkModeActionSheet
          isVisible={darkModeAction.isVisible}
          hideAction={darkModeAction.hide}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  space: {
    height: 30,
  },

  container: {
    flex: 1,
  },
});

export default SettingHomeScreen;
