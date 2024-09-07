import React, { useState } from 'react';
import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const RegisterScreen = () => {
  // Logic
  const [nickname, setNickname] = useState<string>('');
  const [pwd1, setPwd1] = useState<string>('');
  const [pwd2, setPwd2] = useState<string>('');
  const [isNicknameFocused, setIsNicknameFocused] = useState<boolean>(false);
  const [isPwd1Focused, setIsPwd1Focused] = useState<boolean>(false);
  const [isPwd2Focused, setIsPwd2Focused] = useState<boolean>(false);
  const [isPwd1Visible, setIsPwd1Visible] = useState<boolean>(true);
  const [isPwd2Visible, setIsPwd2Visible] = useState<boolean>(true);

  const Register = (nickname: string) => {};

  // View
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 30,
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignSelf: 'flex-start',
          marginBottom: 10,
        }}>
        <Image
          source={require('../assets/register.png')}
          style={{width: 100, height: 100}}
          resizeMode="contain"
        />
      </View>

      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignSelf: 'flex-start',
          marginBottom: 45,
        }}>
        <View>
          <Text style={{fontSize: 25, fontWeight: 'bold'}}>마지막으로</Text>
        </View>

        <View>
          <Text style={{fontSize: 25, fontWeight: 'bold'}}>
            <Text style={{color: '#287BF3'}}>프로필 정보를</Text> 입력하세요.
          </Text>
        </View>
      </View>

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignSelf: 'flex-start',
          marginBottom: 13,
        }}>
        <View>
          <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>
            닉네임
          </Text>
        </View>

        <View style={{backgroundColor: '#287BF3', borderRadius: 5, padding: 5}}>
          <TouchableOpacity>
            <Text style={{fontSize: 12, color: 'white'}}>중복 확인</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            height: 55,
            borderBottomWidth: 3,
            borderColor: isNicknameFocused ? '#287BF3' : '#f4f4f4',
          }}>
          <TextInput
            value={nickname}
            onChangeText={(text: string) => setNickname(text)}
            placeholder="닉네임"
            returnKeyType="next"
            autoCapitalize="none"
            keyboardType="email-address"
            onSubmitEditing={() => Register(nickname)}
            onFocus={() => setIsNicknameFocused(true)}
            onBlur={() => setIsNicknameFocused(false)}
            style={{flex: 1, paddingVertical: 0}}
          />

          <View>
            <TouchableOpacity onPress={() => setNickname('')}>
              <Image
                source={require('../assets/delete_email.png')}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: '#C7C7CD',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignSelf: 'flex-start',
          marginBottom: 20,
        }}>
        <Text style={{fontSize: 16, color: '#287BF3'}}>
          사용 가능한 닉네임 입니다.
        </Text>
      </View>

      <View
        style={{
          width: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignSelf: 'flex-start',
          marginBottom: 20,
        }}>
        <View style={{marginBottom: 13}}>
          <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>
            이메일
          </Text>
        </View>

        <View
          style={{
            width: '100%',
            height: 55,
            backgroundColor: '#f4f4f4',
            justifyContent: 'center',
            alignSelf: 'flex-start',
            paddingLeft: 15,
            borderRadius: 10,
          }}>
          <Text style={{fontSize: 16}}>whdwnsdk8111@naver.com</Text>
        </View>
      </View>

      <View
        style={{
          width: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignSelf: 'flex-start',
          marginBottom: 20,
        }}>
        <View style={{marginBottom: 13}}>
          <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>
            비밀번호
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            height: 55,
            borderBottomWidth: 3,
            borderColor: isPwd1Focused ? '#287BF3' : '#f4f4f4',
            marginBottom: 10,
          }}>
          <TextInput
            value={pwd1}
            onChangeText={(text: string) => setPwd1(text)}
            placeholder="비밀번호"
            returnKeyType="next"
            autoCapitalize="none"
            secureTextEntry={isPwd1Visible}
            keyboardType="visible-password"
            onSubmitEditing={() => Register(nickname)}
            onFocus={() => setIsPwd1Focused(true)}
            onBlur={() => setIsPwd1Focused(false)}
            style={{flex: 1, paddingVertical: 0}}
          />

          <View>
            {isPwd1Visible ? (
              <TouchableOpacity
                onPress={() => setIsPwd1Visible(!isPwd1Visible)}>
                <Image
                  source={require('../assets/visible.png')}
                  resizeMode="contain"
                  style={{
                    width: 28,
                    height: 28,
                  }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setIsPwd1Visible(!isPwd1Visible)}>
                <Image
                  source={require('../assets/invisible.png')}
                  resizeMode="contain"
                  style={{
                    width: 28,
                    height: 28,
                  }}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignSelf: 'flex-start',
            marginBottom: 40,
          }}>
          <Text style={{fontSize: 12}}>
            최소 8자~최대 20자의{' '}
            <Text style={{color: '#287BF3'}}>영어, 숫자, 특수문자</Text> 가능
          </Text>
        </View>

        <View
          style={{
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignSelf: 'flex-start',
            marginBottom: 20,
          }}>
          <View style={{marginBottom: 13}}>
            <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>
              비밀번호 확인
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              height: 55,
              borderBottomWidth: 3,
              borderColor: isPwd2Focused ? '#287BF3' : '#f4f4f4',
              marginBottom: 50,
            }}>
            <TextInput
              value={pwd2}
              onChangeText={(text: string) => setPwd2(text)}
              placeholder="비밀번호"
              returnKeyType="next"
              autoCapitalize="none"
              secureTextEntry={isPwd2Visible}
              keyboardType="visible-password"
              onSubmitEditing={() => Register(nickname)}
              onFocus={() => setIsPwd2Focused(true)}
              onBlur={() => setIsPwd2Focused(false)}
              style={{flex: 1, paddingVertical: 0}}
            />

            <View>
              {isPwd2Visible ? (
                <TouchableOpacity
                  onPress={() => setIsPwd2Visible(!isPwd2Visible)}>
                  <Image
                    source={require('../assets/visible.png')}
                    resizeMode="contain"
                    style={{
                      width: 28,
                      height: 28,
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => setIsPwd2Visible(!isPwd2Visible)}>
                  <Image
                    source={require('../assets/invisible.png')}
                    resizeMode="contain"
                    style={{
                      width: 28,
                      height: 28,
                    }}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        <View
          style={{
            width: '100%',
            height: 55,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#287BF3',
            // backgroundColor: isCodeValid ? '#287BF3' : '#f4f4f4',
            borderRadius: 10,
          }}>
          <TouchableOpacity
          // onPress={() => AuthCode(code)}
          // disabled={!isCodeValid}
          >
            <Text
              style={{
                color: '#fff',
                // color: isCodeValid ? 'white' : 'black',
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              인증
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
