import moment from 'moment';
import 'moment/locale/ko'; // 한국어 로케일
import React from 'react';
import { Image, Text, View } from 'react-native';
import { getRelativeTime } from '../utils/common';
import { Review } from '../utils/data/type';

moment.locale('ko'); // 한국어 설정
interface ReviewsRenderItemProps {
    data: Review;
};

const ReviewsRenderItem:React.FC<ReviewsRenderItemProps>= ({data}) => {
  // Logic
  const createdAt = data.createdAt
    ? new Date(
        data.createdAt._seconds * 1000 + data.createdAt._nanoseconds / 1000000,
      ) // Timestamp를 밀리초로 변환하여 Date 객체 생성
    : null;
  
  // View
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={
            data.photoURL === null
              ? require('../assets/user.png') // 기본 로컬 이미지
              : {uri: data.photoURL} // 선택된 이미지 또는 서버에서 받은 이미지
          }
          resizeMode="center"
          style={{
            width: 48,
            height: 48,
            borderRadius: 48 / 2,
            marginRight: 10,
          }}
        />
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '500',
              marginBottom: 5,
            }}>
            {data.nickname}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 12, marginRight: 5, color: '#7a7a7a'}}>
              리뷰 000개
            </Text>
            <Text style={{fontSize: 12, marginRight: 5, color: '#7a7a7a'}}>
              추천 0개
            </Text>
            <Text style={{fontSize: 12, marginRight: 5, color: '#7a7a7a'}}>
              비추천 0개
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
        <View style={{marginBottom: 5}}>
          {createdAt ? (
            <Text>{getRelativeTime(createdAt)}</Text> // 상대적인 시간으로 표시
          ) : (
            <Text>작성일 없음</Text>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 24, // Image보다 크게 설정
              height: 24, // Image보다 크게 설정
              borderRadius: 24 / 2, // 원형을 유지하기 위해 반지름 설정
              backgroundColor: data.recommend === 'good' ? '#D9D9D9' : 'white',
            }}>
            <Image
              source={require('../assets/good.png')}
              resizeMode="contain"
              style={{
                width: 16,
                height: 16,
              }}
            />
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 24, // Image보다 크게 설정
              height: 24, // Image보다 크게 설정
              borderRadius: 24 / 2, // 원형을 유지하기 위해 반지름 설정,
              backgroundColor: data.recommend === 'bad' ? '#D9D9D9' : 'white',
            }}>
            <Image
              source={require('../assets/bad.png')}
              resizeMode="contain"
              style={{
                width: 16, // Image보다 크게 설정
                height: 16, // Image보다 크게 설정
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

export default ReviewsRenderItem