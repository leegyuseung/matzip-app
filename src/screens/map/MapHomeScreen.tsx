import React, {useState} from 'react';
import Toast from 'react-native-toast-message';
import usePermission from '@/hooks/usePermission';
import useMoveMapView from '@/hooks/useMoveMapView';
import DrawerButton from '@/components/DrawerButton';
import CustomMarker from '@/components/CustomMarker';
import useUserLocation from '@/hooks/useUserLocation';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import MapView, {LatLng, Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import {colors} from '@/constants/colors';
import {numbers} from '@/constants/numbers';
import {Pressable, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

function MapHomeScreen() {
  // 노치 높이 정보 가져오기
  const inset = useSafeAreaInsets();
  const {userLocation, isUserLocationError} = useUserLocation();
  const [selectLocation, setSelectLocation] = useState<LatLng | null>();
  const {mapRef, moveMapView, handleChangeDelta} = useMoveMapView();

  usePermission('LOCATION');

  const handlePressUserLocation = () => {
    if (isUserLocationError) {
      // 위치 권한을 허용해주세요.
      Toast.show({
        type: 'error',
        text1: '위치 권한을 허용해주세요.',
        position: 'bottom',
      });
      return;
    }

    moveMapView(userLocation);
  };

  const handlePressMarker = (coordinate: LatLng) => {
    moveMapView(coordinate);
  };

  return (
    <>
      <DrawerButton
        style={[styles.drawerButton, {top: inset.top + 10}]}
        color={colors.WHITE}
      />
      <MapView
        googleMapId="d0a10d3c5f7b14d66b942e79"
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        region={{
          ...userLocation,
          ...numbers.INITIAL_DELTA,
        }}
        // 확대정도를 유지하기
        onRegionChangeComplete={handleChangeDelta}
        // 길게 눌러서 마커 위치 표시하기
        onLongPress={({nativeEvent}) =>
          setSelectLocation(nativeEvent.coordinate)
        }>
        {[
          {
            id: 1,
            color: colors.PINK_400,
            score: 3,
            coordinate: {
              latitude: 37.5516032365118,
              longitude: 126.98989626020192,
            },
          },
          {
            id: 2,
            color: colors.BLUE_400,
            score: 5,
            coordinate: {
              latitude: 37.5216032365118,
              longitude: 126.98989626020192,
            },
          },
        ].map(marker => (
          <CustomMarker
            key={marker.id}
            score={marker.score}
            color={marker.color}
            coordinate={marker.coordinate}
            onPress={() => handlePressMarker(marker.coordinate)}
          />
        ))}
        {/* 선택한 위치 마커 표하기 */}
        {selectLocation && <Marker coordinate={selectLocation} />}
      </MapView>
      <View style={styles.buttonList}>
        <Pressable style={styles.mapButton} onPress={handlePressUserLocation}>
          <FontAwesome6
            iconStyle="solid"
            size={25}
            color={colors.WHITE}
            name="location-crosshairs"
          />
        </Pressable>
      </View>
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
  buttonList: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    zIndex: 1,
  },
  mapButton: {
    backgroundColor: colors.PINK_700,
    marginVertical: 5,
    height: 45,
    width: 45,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '1px 1px 3px rgba(0,0,0,0.5)',
  },
});

export default MapHomeScreen;
