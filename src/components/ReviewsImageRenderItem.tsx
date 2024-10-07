import React from 'react';
import { View } from 'react-native';
import ImageModal from 'react-native-image-modal';
import { ReviewImage } from '../utils/data/type';

interface ReviewsImageRenderItemProps {
  data: ReviewImage;
}

const ReviewsImageRenderItem: React.FC<ReviewsImageRenderItemProps> = ({
  data,
}) => {
  return (
    <View style={{marginRight: 10}}>
      <ImageModal
        modalImageResizeMode="contain" // 모달 내에서는 contain으로 이미지 표시
        swipeToDismiss={true} // 스와이프하여 모달을 닫을 수 있음
        resizeMode="cover" // FlatList에서는 View에 꽉 차게
        style={{width: 74, height: 74, borderRadius: 5}}
        source={{uri: data.uri}}
      />
    </View>
  );
};

export default ReviewsImageRenderItem;
