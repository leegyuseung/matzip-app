import useAppState from '@/hooks/useAppState';
import Geolocation from '@react-native-community/geolocation';
import {LatLng} from 'react-native-maps';
import {useEffect, useState} from 'react';

function useUserLocation() {
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 37.5516032365118,
    longitude: 126.98989626020192,
  });
  const [isUserLocationError, setIsUserLocationError] = useState(false);
  const {isComeback} = useAppState();

  useEffect(() => {
    if (!isComeback) {
      return;
    }

    Geolocation.getCurrentPosition(
      info => {
        setUserLocation(info.coords);
        setIsUserLocationError(false);
      },
      () => {
        setIsUserLocationError(true); // 에러 옵션
      },
      {
        enableHighAccuracy: true, // 높은 정확도 옵션
      },
    );
  }, [isComeback]);

  return {userLocation, isUserLocationError};
}

export default useUserLocation;
