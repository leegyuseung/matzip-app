import React from 'react';
import Ionicons from '@react-native-vector-icons/ionicons';
import {baseUrls} from '@/api/axios';
import {ImageUri} from '@/types/domain';
import {colors} from '@/constants/colors';
import {Image, Platform, Pressable, ScrollView, StyleSheet} from 'react-native';

interface PreviewImageListProps {
  imageUris: ImageUri[];
  onDelete?: (uri: string) => void;
}

function PreviewImageList({imageUris, onDelete}: PreviewImageListProps) {
  return (
    <ScrollView horizontal contentContainerStyle={styles.container}>
      {imageUris.map(({uri}) => {
        return (
          <Pressable style={styles.imageContainer} key={uri}>
            <Image
              style={styles.image}
              source={{
                uri: `${
                  Platform.OS === 'ios' ? baseUrls.ios : baseUrls.android
                }/${uri}`,
              }}
              resizeMode="cover"
            />
            <Pressable
              style={styles.deleteButton}
              onPress={() => onDelete?.(uri)}>
              <Ionicons name="close" size={16} color={colors.WHITE} />
            </Pressable>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: 70,
    height: 70,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  container: {
    gap: 15,
    paddingHorizontal: 15,
  },
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: colors.BLACK,
  },
});

export default PreviewImageList;
