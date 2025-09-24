import RetryErrorBoundary from '@/components/common/RetryErrorBoundary';
import useAuth from '@/hooks/queries/useAuth';
import AuthNavigation from '@/navigations/AuthNavigation';
import DrawerNavigation from '@/navigations/DrawerNavigation';

function RootNavigation() {
  const {isLogin} = useAuth();
  return (
    <RetryErrorBoundary>
      {isLogin ? <DrawerNavigation /> : <AuthNavigation />}
    </RetryErrorBoundary>
  );
}

export default RootNavigation;
