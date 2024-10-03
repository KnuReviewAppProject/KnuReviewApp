import { launchImageLibrary } from 'react-native-image-picker';
import { ReviewImage } from '../data/type';

// 이미지 선택 함수
export const selectImage = (
  images: ReviewImage[],
  setImages: React.Dispatch<React.SetStateAction<ReviewImage[]>>,
) => {
  if (images.length >= 3) return;

  launchImageLibrary({mediaType: 'photo', selectionLimit: 3}, response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.log('ImagePicker Error: ', response.errorMessage);
    } else if (response.assets) {
      // 선택된 모든 이미지를 처리
      const selectedImages = response.assets.map(asset => ({
        uri: asset.uri!,
        id: asset.fileName || new Date().getTime().toString(),
      }));

      // 기존 이미지 배열에 새로 선택한 이미지를 추가하되, 최대 3개까지만 추가
      setImages(prevImages => {
        const updatedImages = [...prevImages, ...selectedImages];
        return updatedImages.slice(0, 3); // 최대 3개까지만 유지
      });
    }
  });
};

// 이미지 삭제 함수
export const removeImage = (
  id: string,
  images: ReviewImage[],
  setImages: React.Dispatch<React.SetStateAction<ReviewImage[]>>,
) => {
  setImages(images.filter(image => image.id !== id));
};

// 이미지 배열에 빈 뷰 추가 함수
export const getDataWithEmptyView = (
  images: ReviewImage[],
  maxImages: number = 3,
): ReviewImage[] => {
  // 이미지가 maxImages보다 적을 때만 빈 View를 추가
  return images.length < maxImages
    ? [{uri: '', id: 'empty'}, ...images]
    : images;
};
