import React, {useState} from 'react';
import useModal from '@/hooks/useModal';
import Toast from 'react-native-toast-message';
import usePermission from '@/hooks/usePermission';
import MarkerModal from '@/components/map/MarkerModal';
import useMoveMapView from '@/hooks/useMoveMapView';
import useUserLocation from '@/hooks/useUserLocation';
import useGetMarkers from '@/hooks/queries/useGetMarkers';
import MapIconButton from '@/components/map/MapIconButton';
import DrawerButton from '@/components/common/DrawerButton';
import CustomMarker from '@/components/common/CustomMarker';
import MapView, {LatLng, Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import {colors} from '@/constants/colors';
import {numbers} from '@/constants/numbers';
import {MapStackParamList} from '@/types/navigation';
import {Alert, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Navigation = StackNavigationProp<MapStackParamList>;

function MapHomeScreen() {
  const navigation = useNavigation<Navigation>();
  // 노치 높이 정보 가져오기
  const inset = useSafeAreaInsets();
  const [markerId, setMarkerId] = useState<number>();
  const {userLocation, isUserLocationError} = useUserLocation();
  const [selectLocation, setSelectLocation] = useState<LatLng | null>();
  const {mapRef, moveMapView, handleChangeDelta} = useMoveMapView();
  const {data: markers = []} = useGetMarkers();
  const markerModal = useModal();

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

  const handlePressMarker = (id: number, coordinate: LatLng) => {
    setMarkerId(id);
    moveMapView(coordinate);
    markerModal.show();
  };

  const handlePressAddPost = () => {
    if (!selectLocation) {
      Alert.alert(
        '추가할 위치를 선택해주세요',
        '지도를 길게 누르면 위치가 선택됩니다.',
      );
      return;
    }

    navigation.navigate('AddLocation', {location: selectLocation});

    setSelectLocation(null);
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
        {markers.map(({id, color, score, ...coordinate}) => (
          <CustomMarker
            key={id}
            score={score}
            color={color}
            coordinate={coordinate}
            onPress={() => handlePressMarker(id, coordinate)}
          />
        ))}
        {/* 선택한 위치 마커 표하기 */}
        {selectLocation && <Marker coordinate={selectLocation} />}
      </MapView>
      <View style={styles.buttonList}>
        <MapIconButton name={'plus'} onPress={handlePressAddPost} />
        <MapIconButton
          name={'location-crosshairs'}
          onPress={handlePressUserLocation}
        />
      </View>

      <MarkerModal
        markerId={Number(markerId)}
        isVisible={markerModal.isVisible}
        hide={markerModal.hide}
      />
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
});

export default MapHomeScreen;
