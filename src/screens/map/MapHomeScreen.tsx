import React, {useEffect, useState} from 'react';
import DrawerButton from '@/components/DrawerButton';
import Geolocation from '@react-native-community/geolocation';
import MapView, {LatLng, PROVIDER_GOOGLE} from 'react-native-maps';

import {StyleSheet} from 'react-native';
import {colors} from '@/constants/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

function MapHomeScreen() {
  // 노치 높이 정보 가져오기
  const inset = useSafeAreaInsets();
  const [userLocation, setUserLocation] = useState<LatLng>();
  const [isUserLocationError, setIsUserLocationError] = useState(false);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        console.log('info', info);
        setUserLocation(info.coords);
      },
      () => {
        setIsUserLocationError(true); // 에러 옵션
      },
      {
        enableHighAccuracy: true, // 높은 정확도 옵션
      },
    );
  }, []);

  return (
    <>
      <DrawerButton
        style={[styles.drawerButton, {top: inset.top + 10}]}
        color={colors.WHITE}
      />
      <MapView style={styles.container} provider={PROVIDER_GOOGLE} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: colors.PINK_700,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    boxShadow: '1px 1px 3px rgba(0,0,0,0.5)',
  },
});

export default MapHomeScreen;
