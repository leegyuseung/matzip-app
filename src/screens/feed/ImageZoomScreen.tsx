import React from 'react';
import useGetPost from '@/hooks/queries/useGetPost';
import ImageCarousel from '@/components/common/ImageCarousel';

import {StyleSheet} from 'react-native';
import {FeedStackParamList} from '@/types/navigation';
import {StackScreenProps} from '@react-navigation/stack';

type Props = StackScreenProps<FeedStackParamList, 'ImageZoom'>;

function ImageZoomScreen({route}: Props) {
  const {id, index} = route.params;
  const {data: post} = useGetPost(id);

  return <ImageCarousel images={post?.imageUris ?? []} pressedIndex={index} />;
}

const styles = StyleSheet.create({});

export default ImageZoomScreen;
