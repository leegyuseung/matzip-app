import DrawerButton from '@/components/common/DrawerButton';
import CalendarScreen from '@/screens/calendar/CalendarScreen';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import CustomDrawerContent from '@/components/common/CustomDrawerContent';

import {colors} from '@/constants/colors';
import {SettingStack} from './SettingNavigation';
import {MapStack} from '@/navigations/MapNavigation';
import {FeedStack} from '@/navigations/FeedNavigation';
import {MainDrawerParamList} from '@/types/navigation';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStaticNavigation} from '@react-navigation/native';

type DrawIconName = 'map' | 'book' | 'calendar';

function DrawerIcons(routeName: keyof MainDrawerParamList, focused: boolean) {
  let iconName: DrawIconName = 'map';

  switch (routeName) {
    case 'Map': {
      iconName = 'map';
      break;
    }
    case 'Feed': {
      iconName = 'book';
      break;
    }
    case 'Calendar': {
      iconName = 'calendar';
      break;
    }
  }

  return (
    <FontAwesome6
      name={iconName}
      iconStyle="solid"
      size={20}
      color={focused ? colors.WHITE : colors.GRAY_300}
    />
  );
}

const MainDrawer = createDrawerNavigator({
  screenOptions: ({route}) => {
    return {
      drawerStyle: {
        width: '60%',
        backgroundColor: colors.WHITE,
      },
      drawerLabelStyle: {
        fontWeight: '600',
      },
      drawerItemStyle: {
        borderRadius: 5,
      },
      drawerType: 'front',
      drawerActiveTintColor: colors.WHITE,
      drawerActiveBackgroundColor: colors.PINK_700,
      drawerInactiveTintColor: colors.GRAY_500,
      drawerInactiveBackgroundColor: colors.GRAY_100,
      drawerIcon: ({focused}) =>
        DrawerIcons(route.name as keyof MainDrawerParamList, focused),
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
    };
  },
  screens: {
    Map: {
      screen: MapStack,
      options: {
        title: '홈',
        headerShown: false,
      },
    },
    Feed: {
      screen: FeedStack,
      options: {
        title: '피드',
        headerShown: false,
      },
    },
    Calendar: {
      screen: CalendarScreen,
      options: {
        title: '캘린더',
        headerLeft: () => <DrawerButton />,
      },
    },

    Setting: {
      screen: SettingStack,
      options: {
        title: '설정',
        headerShown: false,
        drawerItemStyle: {
          height: 0,
        },
      },
    },
  },
  drawerContent: props => <CustomDrawerContent {...props} />,
});

const DrawerNavigation = createStaticNavigation(MainDrawer);

export default DrawerNavigation;
