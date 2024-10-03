import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import ImageModal from 'react-native-image-modal';
import { ReviewImage } from '../utils/data/type';
import { selectImage } from '../utils/ReviewImage';

interface ReviewCreateRenderItemProps {
  item: ReviewImage;
  onRemove: (id: string) => void;
  images: ReviewImage[];
  setImages: React.Dispatch<React.SetStateAction<ReviewImage[]>>;
}

const ReviewImageRenderItem: React.FC<ReviewCreateRenderItemProps> = ({
  item,
  onRemove,
  images,
  setImages,
}) => {
  if (item.uri === '') {
    // 빈 View 렌더링
    return (
      <TouchableOpacity
        style={{
          width: 74,
          height: 74,
          borderWidth: 1,
          borderColor: '#d9d9d9',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 10,
        }}
        onPress={() => selectImage(images, setImages)}
      >
        <Text>+</Text>
        <Text>{images.length}/3</Text>
      </TouchableOpacity>
    );
  }

  // 이미지가 있을 때 렌더링
  return (
    <View style={{marginRight: 10}}>
      <ImageModal
        modalImageResizeMode="contain" // 모달 내에서는 contain으로 이미지 표시
        swipeToDismiss={true} // 스와이프하여 모달을 닫을 수 있음
        resizeMode="cover" // FlatList에서는 View에 꽉 차게
        style={{width: 74, height: 74, borderRadius: 5}}
        source={{uri: item.uri}}
      />

      <TouchableOpacity
        style={{position: 'absolute', top: 6, right: 6}}
        onPress={() => onRemove(item.id)} // 삭제 함수 호출
      >
        <Image
          source={require('../assets/cancel.png')}
          style={{width: 16, height: 16}}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default ReviewImageRenderItem;
