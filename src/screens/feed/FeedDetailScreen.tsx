import React from 'react';
import {FeedStackParamList} from '@/types/navigation';
import {StackScreenProps} from '@react-navigation/stack';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

type Props = StackScreenProps<FeedStackParamList, 'FeedDetail'>;

function FeedDetailScreen({route}: Props) {
  const {id} = route.params;

  return (
    <SafeAreaView>
      <Text>FeedDetailScreen {id}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default FeedDetailScreen;
