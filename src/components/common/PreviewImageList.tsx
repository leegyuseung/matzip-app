import React from 'react';
import useThemeStroe, {Theme} from '@/store/theme';
import Ionicons from '@react-native-vector-icons/ionicons';

import {baseUrls} from '@/api/axios';
import {ImageUri} from '@/types/domain';
import {colors} from '@/constants/colors';
import {FeedStackParamList} from '@/types/navigation';
import {Image, Platform, Pressable, ScrollView, StyleSheet} from 'react-native';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

interface PreviewImageListProps {
  imageUris: ImageUri[];
  onDelete?: (uri: string) => void;
  showDeleteButton?: boolean;
}

function PreviewImageList({
  imageUris,
  onDelete,
  showDeleteButton = false,
}: PreviewImageListProps) {
  const navigation = useNavigation<NavigationProp<FeedStackParamList>>();
  const route = useRoute<RouteProp<FeedStackParamList>>();
  const handlePressImage = (index: number) => {
    navigation.navigate('ImageZoom', {id: route.params?.id, index});
  };

  const {theme} = useThemeStroe();
  const styles = styling(theme);
  return (
    <ScrollView horizontal contentContainerStyle={styles.container}>
      {imageUris.map(({uri}, index) => {
        return (
          <Pressable
            style={styles.imageContainer}
            key={uri}
            onPress={() => handlePressImage(index)}>
            <Image
              style={styles.image}
              source={{
                uri: `${
                  Platform.OS === 'ios' ? baseUrls.ios : baseUrls.android
                }/${uri}`,
              }}
              resizeMode="cover"
            />
            {showDeleteButton && (
              <Pressable
                style={styles.deleteButton}
                onPress={() => onDelete?.(uri)}>
                <Ionicons name="close" size={16} color={colors[theme].WHITE} />
              </Pressable>
            )}
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styling = (theme: Theme) =>
  StyleSheet.create({
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
      backgroundColor: colors[theme].BLACK,
    },
  });

export default PreviewImageList;
