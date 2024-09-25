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