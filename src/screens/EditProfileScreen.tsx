import { HeaderBackButton } from '@react-navigation/elements';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import useNavigation from '../../node_modules/@react-navigation/core/src/useNavigation';
import { EditProfile, EditProfileImage } from '../utils/API/AutAPI';
import { isValidNickName, isValidPassword } from '../utils/RegularExpression';
import { useUserStore } from '../zustand/store';

const EditProfileScreen = () => {
  // Logic
  const user = useUserStore(state => state.user);

  const [nickname, setNickname] = useState<string>('');
  const [pwd1, setPwd1] = useState<string>('');
  const [pwd2, setPwd2] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string | null>(
    user.photoURL,
  );

  const navigation =
    useNavigation<NativeStackNavigationProp<ROOT_NAVIGATION>>();

  const isNickNameValid = isValidNickName(nickname);
  const isPassWordValid = pwd1 === pwd2 ? isValidPassword(pwd2) : false;


  const setUserStore = useUserStore(state => state.setUser)

  const selectDefaultProfile = useCallback(() => {
    setProfileImage(null);
    EditProfileImage(user.uid, user.email, navigation, null);
  }, []);

  const selectImageFromGallery = useCallback(async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      selectionLimit: 1,
      quality: 1,
      maxWidth: 512,
      maxHeight: 512,
      includeBase64: true,
    };

    const response = await launchImageLibrary(options);

    if (response.errorMessage) Alert.alert('Error : ' + response.errorMessage);
    if (response.assets && response.assets.length > 0) {
      const assets = response.assets[0];
      const uri = assets.uri;
      if(uri){
        const fileNameArray = uri?.split('/');
        const fileName = fileNameArray[fileNameArray?.length - 1];
        const imageURL =
          Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
          // 안드로이드
          if (Platform.OS === 'android') {
            if (assets.base64) {
              const android_base64 = assets.base64;
            EditProfileImage(
              user.uid,
              user.email,
              navigation,
              android_base64,
              fileName,
              imageURL,
            );
            }
          }
  
          // iOS
          else if (Platform.OS === 'ios') {
            if(assets.uri){
              const ios_uri = assets.uri;
              EditProfileImage(
                user.uid,
                user.email,
                navigation,
                ios_uri,
                fileName,
                imageURL,
              );
            }
        }
      }
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      headerBackTitleVisible: true,
      headerBackTitle: '',
      headerTitle: '',
      headerLeft: props => (
        <HeaderBackButton
          {...props}
          onPress={() => navigation.goBack()}
          labelVisible={false}
        />
      ),
      headerRight: props => (
        <Pressable
          {...props}
          style={{
            backgroundColor: '#287BF3',
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
          onPress={() =>
            EditProfile(user.uid, user.email, navigation, nickname, pwd2)
          }>
          <Text style={{fontSize: 15, color: 'white'}}>수정하기</Text>
        </Pressable>
      ),
    });
  });

  // View
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <TouchableOpacity
        onPress={() => {
          Alert.alert(
            '프로필 사진 선택',
            '메뉴를 선택해주세요.',
            [
              {
                text: '기본 이미지 설정',
                onPress: () => {
                  selectDefaultProfile();
                },
              },
              {
                text: '갤러리에서 선택',
                onPress: async () => {
                  selectImageFromGallery();
                },
              },
              {text: '취소', style: 'cancel'},
            ],
            {cancelable: true},
          );
        }}>
        <Image
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            marginBottom: 20,
          }}
          source={
            profileImage === null
              ? require('../assets/user.png') // 기본 로컬 이미지
              : {uri: profileImage} // 선택된 이미지 또는 서버에서 받은 이미지
          }
          resizeMode="center"
        />
      </TouchableOpacity>

      <Text style={{fontWeight: 'bold', fontSize: 24, marginBottom: 25}}>
        닉네임
      </Text>

      <View
        style={{
          borderWidth: 5,
          borderColor: '#ECECEC',
          width: '100%',
          marginBottom: 45,
        }}
      />

      <View style={{paddingHorizontal: 30}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: 'black',
              fontWeight: 'bold',
            }}>
            닉네임
          </Text>

          <Pressable
            style={{backgroundColor: '#287BF3', borderRadius: 5, padding: 5}}>
            <Text style={{fontSize: 12, color: 'white'}}>중복 확인</Text>
          </Pressable>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            height: 55,
            paddingLeft: 15,
            borderRadius: 10,
            backgroundColor: '#f4f4f4',
            marginBottom: 15,
          }}>
          <TextInput
            value={nickname}
            onChangeText={(text: string) => setNickname(text)}
            placeholder="닉네임"
            // onSubmitEditing={handleEmailSubmit}
            returnKeyType="next"
            autoCapitalize="none"
            keyboardType="name-phone-pad"
            style={{flex: 1, paddingVertical: 0}}
          />
        </View>

        <View>
          <Text
            style={{
              fontSize: 16,
              color: 'black',
              fontWeight: 'bold',
              marginBottom: 10,
            }}>
            비밀번호
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              height: 55,
              paddingLeft: 15,
              borderRadius: 10,
              backgroundColor: '#f4f4f4',
              marginBottom: 15,
            }}>
            <TextInput
              value={pwd1}
              onChangeText={(text: string) => setPwd1(text)}
              placeholder="비밀번호"
              // onSubmitEditing={handleEmailSubmit}
              returnKeyType="next"
              autoCapitalize="none"
              keyboardType="visible-password"
              style={{flex: 1, paddingVertical: 0}}
            />
          </View>
        </View>

        <View>
          <Text
            style={{
              fontSize: 16,
              color: 'black',
              fontWeight: 'bold',
              marginBottom: 10,
            }}>
            비밀번호 확인
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              height: 55,
              paddingLeft: 15,
              borderRadius: 10,
              backgroundColor: '#f4f4f4',
              marginBottom: 15,
            }}>
            <TextInput
              value={pwd2}
              onChangeText={(text: string) => setPwd2(text)}
              placeholder="비밀번호 확인"
              // onSubmitEditing={handleEmailSubmit}
              returnKeyType="next"
              autoCapitalize="none"
              keyboardType="visible-password"
              style={{flex: 1, paddingVertical: 0}}
            />
          </View>
        </View>

        {pwd1 !== pwd2 && (
          <Text
            style={{
              marginBottom: Platform.OS === 'ios' ? 30 : 70,
              color: '#F33A28',
            }}>
            비밀번호가 일치하지 않습니다.
          </Text>
        )}
      </View>
    </View>
  );
};

export default EditProfileScreen;
