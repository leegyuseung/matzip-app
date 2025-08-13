import {AppState} from 'react-native';
import {useEffect, useRef, useState} from 'react';

function useAppState() {
  const appState = useRef(AppState.currentState);
  const [isComeback, setIsComeback] = useState(false);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        setIsComeback(true);
      }

      if (appState.current.match(/active/) && nextAppState === 'background') {
        setIsComeback(false);
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return {isComeback};
}

export default useAppState;
