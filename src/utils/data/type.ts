// Restaurant 타입 정의
export type Restaurant = {
  id: string;
  name: string;
  category: string;
  roadAddress: string;
  address: string;
  phone?: string;
  x: string; // 경도
  y: string; // 위도
  imageUrl: string;
  description?: string;
  options?: string;
  businessHours?: string;
};

// User 타입 정의
export type User = {
  accessToken: string,
  uid: string,
  email: string,
  nickname: string,
  photoURL: string | null,
}

// 리뷰 이미지 타입 정의
export type ReviewImage = {
  uri: string; // 이미지의 URI
  id: string;  // 고유한 ID (파일명 또는 임의 생성된 ID)
};

// 리뷰 데이터 타입 정의
export type Review = {
  id: string,
  nickname: string;
  photoURL: string;
  email: string;
  name: string;
  category: string;
  addressName: string;
  location: object; // location은 좌표 정보 등을 담을 수 있으므로 object로 처리
  rating: number;
  content: string;
  images: ReviewImage[]; // ReviewImage 배열 타입
  recommend: string | null;
  createdAt: {
    _seconds: number;
    _nanoseconds: number;
  }; // 서버에서 생성된 시간 정보
};