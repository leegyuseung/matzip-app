import {LatLng} from 'react-native-maps';
import {NavigatorScreenParams} from '@react-navigation/native';

export type MapStackParamList = {
  MapHome: undefined;
  AddLocation: {location: LatLng};
  SearchLocation: undefined;
};

export type AuthStackParamList = {
  AuthHome: undefined;
  Login: undefined;
  Signup: undefined;
  KakaoLogin: undefined;
};

export type FeedStackParamList = {
  FeedList: undefined;
  FeedDetail: {id: number}; // 피드디테일로 넘어갈때 각각의 id를 param에 넣어서 디테일로 이동시켜준다
  FeedFavorite: undefined;
  EditLocation: {id: number};
  ImageZoom: {id?: number; index: number};
};

export type SettingStackParamList = {
  SettingHome: undefined;
  EditProfile: undefined;
};

export type MainDrawerParamList = {
  Map: NavigatorScreenParams<MapStackParamList>;
  Feed: NavigatorScreenParams<FeedStackParamList>;
  Calendar: undefined;
  Setting: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainDrawerParamList {}
  }
}
