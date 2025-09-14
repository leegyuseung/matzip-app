import React from 'react';
import {ActionSheet} from '../common/ActionSheet';
import useMutateDeletePost from '@/hooks/queries/useMutateDeletePost';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';

interface FeedDetailActionSheetProps {
  isVisible: boolean;
  hideAction: () => void;
  id: number;
}

function FeedDetailActionSheet({
  isVisible,
  hideAction,
  id,
}: FeedDetailActionSheetProps) {
  const deletePost = useMutateDeletePost();
  const navigation = useNavigation();
  const handleDeletePost = () => {
    Alert.alert('삭제하시겠습니까?', '피드와 지도에서 모두 삭제됩니다.', [
      {
        text: '삭제',
        onPress: () =>
          deletePost.mutate(id, {
            onSuccess: () => {
              hideAction();
              navigation.goBack();
            },
          }),
        style: 'destructive',
      },
      {
        text: '취소',
        style: 'cancel',
      },
    ]);
  };
  return (
    <ActionSheet isVisible={isVisible} hideAction={hideAction}>
      <ActionSheet.Background>
        <ActionSheet.Container>
          <ActionSheet.Button isDanger onPress={handleDeletePost}>
            삭제하기
          </ActionSheet.Button>
          <ActionSheet.Devider />
          <ActionSheet.Button>수정하기</ActionSheet.Button>
        </ActionSheet.Container>
        <ActionSheet.Container>
          <ActionSheet.Button onPress={hideAction}>취소</ActionSheet.Button>
        </ActionSheet.Container>
      </ActionSheet.Background>
    </ActionSheet>
  );
}

export default FeedDetailActionSheet;
