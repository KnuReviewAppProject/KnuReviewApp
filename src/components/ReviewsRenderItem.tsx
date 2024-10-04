import React from 'react';
import { Text, View } from 'react-native';
import { Review } from '../utils/data/type';

interface ReviewsRenderItemProps {
    data: Review;
};

const ReviewsRenderItem:React.FC<ReviewsRenderItemProps>= ({data}) => {
  return (
    <View>
      <Text>{data.name}</Text>
    </View>
  );
}

export default ReviewsRenderItem