import AuthNavigation from '@/navigations/AuthNavigation';
import DrawerNavigation from '@/navigations/DrawerNavigation';

function RootNavigation() {
  const isLogin = false;
  return <>{isLogin ? <DrawerNavigation /> : <AuthNavigation />}</>;
}

export default RootNavigation;
