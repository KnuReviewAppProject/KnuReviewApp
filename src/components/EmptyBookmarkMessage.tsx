import React from 'react';
import { Text, View } from 'react-native';

const EmptyBookmarkMessage = () => {
  return (
    <View
      style={{justifyContent: 'center', alignItems: 'center', marginTop: 50}}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>
        저장한 북마크가 없습니다.
      </Text>
    </View>
  );
}

export default EmptyBookmarkMessage