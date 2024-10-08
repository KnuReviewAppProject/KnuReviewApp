import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  Text,
  View
} from 'react-native';
import useNavigation from '../../node_modules/@react-navigation/core/src/useNavigation';
import { ROOT_NAVIGATION } from '../@types/ROOT_NAVIGATION';
import { Logout, Unsubscribe } from '../utils/API/AutAPI';
import { useUserStore } from '../zustand/store';
const ProfileScreen = () => {
  // Logic
  const navigation =
    useNavigation<NativeStackNavigationProp<ROOT_NAVIGATION>>();
  const user = useUserStore(state => state.user);

  const [profileImage, setProfileImage] = useState<string | null>(
    user.photoURL,
  );

  useEffect(() => {
    console.log(user.photoURL);
    setProfileImage(user.photoURL);
  }, [user.photoURL]);

  // View
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <View style={{paddingHorizontal: 30, marginBottom: 50}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: 50,
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}>
          <Image
            style={{
              width: 80,
              height: 80,
              borderRadius: 50,
              marginRight: 20,
            }}
            source={
              profileImage === null
                ? require('../assets/user.png') // 기본 로컬 이미지
                : {uri: profileImage} // 선택된 이미지 또는 서버에서 받은 이미지
            }
            resizeMode="center"
          />
          <Text style={{fontSize: 16, fontWeight: 'bold', marginRight: 20}}>
            {user.nickname}
          </Text>
          <Pressable
            style={{
              backgroundColor: '#287BF3',
              borderRadius: 15,
              paddingHorizontal: 15,
              paddingVertical: 5,
            }}
            onPress={() => navigation.navigate('EditProfile')}>
            <Text style={{color: 'white'}}>회원정보 수정</Text>
          </Pressable>
        </View>
      </View>

      <View
        style={{
          borderWidth: 5,
          borderColor: '#ECECEC',
          width: '100%',
          marginBottom: 15,
        }}
      />

      <Text
        style={{
          alignSelf: 'flex-start',
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 25,
          paddingHorizontal: 30,
        }}>
        리뷰
      </Text>

      <Pressable
        style={{
          flexDirection: 'row',
          width: '100%',
          alignSelf: 'flex-start',
          alignItems: 'center',
          paddingHorizontal: 30,
          marginBottom: 17,
        }}
        onPress={() => navigation.navigate('MyReview')}>
        <Image
          source={require('../assets/hamburger.png')}
          style={{width: 24, height: 24, marginRight: 15}}
        />
        <Text style={{fontSize: 20, fontWeight: 'regular'}}>내가 쓴 글</Text>
      </Pressable>

      <View
        style={{
          width: '100%',
          borderWidth: 1,
          borderColor: '#ECECEC',
          paddingHorizontal: 30,
          marginBottom: 17,
        }}
      />

      <Pressable
        style={{
          flexDirection: 'row',
          width: '100%',
          alignSelf: 'flex-start',
          alignItems: 'center',
          paddingHorizontal: 30,
          marginBottom: 30,
        }}>
        <Image
          source={require('../assets/bookmark.png')}
          style={{width: 24, height: 24, marginRight: 15}}
        />
        <Text style={{fontSize: 20, fontWeight: 'regular'}}>북마크</Text>
      </Pressable>

      <View
        style={{
          borderWidth: 5,
          borderColor: '#ECECEC',
          width: '100%',
          marginBottom: 15,
        }}
      />

      <Text
        style={{
          alignSelf: 'flex-start',
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 25,
          paddingHorizontal: 30,
        }}>
        로그인 활동
      </Text>

      <Pressable
        style={{
          flexDirection: 'row',
          width: '100%',
          alignSelf: 'flex-start',
          alignItems: 'center',
          paddingHorizontal: 30,
          marginBottom: 17,
        }}
        onPress={() => Logout(navigation)}>
        <Image
          source={require('../assets/logout.png')}
          style={{width: 24, height: 24, marginRight: 15}}
        />
        <Text style={{fontSize: 20, fontWeight: 'regular'}}>로그아웃</Text>
      </Pressable>

      <View
        style={{
          width: '100%',
          borderWidth: 1,
          borderColor: '#ECECEC',
          paddingHorizontal: 30,
          marginBottom: 17,
        }}
      />

      <Pressable
        style={{
          flexDirection: 'row',
          width: '100%',
          alignSelf: 'flex-start',
          alignItems: 'center',
          paddingHorizontal: 30,
          marginBottom: 17,
        }}
        onPress={() => Unsubscribe(user.uid, user.email, navigation)}>
        <Image
          source={require('../assets/unsubscribe.png')}
          style={{width: 24, height: 24, marginRight: 15}}
        />
        <Text style={{fontSize: 20, fontWeight: 'regular'}}>회원탈퇴</Text>
      </Pressable>

      <View
        style={{
          width: '100%',
          borderWidth: 1,
          borderColor: '#ECECEC',
          paddingHorizontal: 30,
          marginBottom: 17,
        }}
      />
    </View>
  );
};

export default ProfileScreen;
