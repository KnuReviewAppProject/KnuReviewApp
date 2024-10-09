import React from 'react';
import { Text, View } from 'react-native';

const EmptyReviewMessage = () => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>
        작성한 리뷰가 없습니다.
      </Text>
    </View>
  );
};

export default EmptyReviewMessage;
