import React from 'react';
import { Text, View } from 'react-native';

interface BookmarkRenderSectionHeaderProps {
  type: string;
}

const BookmarkRenderSectionHeader: React.FC<
  BookmarkRenderSectionHeaderProps
> = ({type}) => {
  // Logic

  // View
  return (
    <View>
      <Text style={{fontSize: 24, fontWeight: 'bold', padding: 10}}>
        {type}
      </Text>
    </View>
  );
};

export default BookmarkRenderSectionHeader;
