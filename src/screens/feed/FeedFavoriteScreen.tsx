import React, {Suspense} from 'react';
import Indicator from '@/components/common/Indicator';
import FeedFavoriteList from '@/components/feed/FeedFavoriteList';

import {SafeAreaView, StyleSheet} from 'react-native';

function FeedFavoriteScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Suspense fallback={<Indicator size={'large'} />}>
        <FeedFavoriteList />
      </Suspense>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FeedFavoriteScreen;
