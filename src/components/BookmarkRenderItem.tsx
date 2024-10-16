import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { deleteBookmark } from '../utils/API/LocationAPI';
import { Bookmark } from '../utils/data/type';

interface BookmarkRenderItemProps {
  data: Bookmark;
  onDeleteSuccess: () => void;
}
const BookmarkRenderItem: React.FC<BookmarkRenderItemProps> = ({
  data,
  onDeleteSuccess,
}) => {
  // Logic
  const renderRightActions = () => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
          width: 80,
          height: '100%',
        }}
        onPress={handleDelete}>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
          }}>
          삭제
        </Text>
      </TouchableOpacity>
    );
  };

  // 삭제 핸들러
  const handleDelete = () => {
    deleteBookmark(
      data.id,
      () => {
        console.log('북마크 삭제 성공');
        onDeleteSuccess(); // 삭제 성공 후 리스트 갱신
      },
      error => {
        console.error('삭제 실패:', error);
      },
    );
  };

  // View
  return (
    <Swipeable
      renderRightActions={renderRightActions}
      onSwipeableRightOpen={handleDelete}>
      <View style={{padding: 15}}>
        <Text style={{fontSize: 18}}>{data.name}</Text>
      </View>
    </Swipeable>
  );
};

export default BookmarkRenderItem;
