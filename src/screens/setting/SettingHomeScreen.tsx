import React from 'react';
import useAuth from '@/hooks/queries/useAuth';
import SettingItem from '@/components/setting/SettingItem';

import {colors} from '@/constants/colors';
import {SettingStackParamList} from '@/types/navigation';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

type Navigation = NavigationProp<SettingStackParamList>;

function SettingHomeScreen() {
  const navigation = useNavigation<Navigation>();
  const {logoutMutation} = useAuth();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.space} />
        <SettingItem
          title="프로필 수정"
          onPress={() => navigation.navigate('EditProfile')}
        />
        <SettingItem title="다크 모드" />
        <View style={styles.space} />
        <SettingItem
          title="로그아웃"
          color={colors.RED_500}
          onPress={() => logoutMutation.mutate(null)}
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
