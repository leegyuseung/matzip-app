import AuthHomeScreen from '../screens/auth/AuthHomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {createStaticNavigation} from '@react-navigation/native';
import {colors} from '../constants/colors';

const AuthStack = createStackNavigator({
  screenOptions: {
    headerTitleAlign: 'center',
    headerBackButtonDisplayMode: 'minimal',
    headerTintColor: colors.BLACK,
    headerStyle: {
      backgroundColor: colors.WHITE,
      shadowColor: colors.GRAY_500,
    },
    headerTitleStyle: {
      fontSize: 16,
    },
    cardStyle: {
      backgroundColor: 'white',
    },
  },
  screens: {
    AuthHome: {
      screen: AuthHomeScreen,
      options: {
        headerShown: false,
      },
    },
    Login: {
      screen: LoginScreen,
      options: {
        title: '로그인',
      },
    },
    Signup: {
      screen: SignupScreen,
      options: {
        title: '회원가입',
      },
    },
  },
});

const AuthNavigation = createStaticNavigation(AuthStack);
export default AuthNavigation;
