import { HeaderBackButton } from '@react-navigation/elements';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, SafeAreaView, TextInput, View } from 'react-native';
import useNavigation from '../../node_modules/@react-navigation/core/src/useNavigation';
import { ROOT_NAVIGATION } from '../@types/ROOT_NAVIGATION';
import SearchLocationRenderItem from '../components/SearchLocationRenderItem';
import { searchKnuLocation } from '../utils/API/LocationAPI';
import { SearchLocation } from '../utils/data/type';

const SearchLocationScreen = () => {
  // Logic
  const navigation =
    useNavigation<NativeStackNavigationProp<ROOT_NAVIGATION>>();

  const [keyword, setKeyword] = useState<string>('');
  const [list, setList] = useState<SearchLocation[]>([]); // 검색 결과 리스트를 담는 state
  const [isLoading, setIsLoading] = useState<boolean>(false); // 검색 중 로딩 상태

  const textInputRef = useRef<TextInput>(null); // TextInput에 대한 ref 생성

  const onChangeKeyword = useCallback((text: string) => {
    setKeyword(text);
  }, []);

  const handleItemPress = (item: SearchLocation) => {
    // 선택된 항목을 LocationMapScreen으로 전송하고, SearchLocationScreen을 닫음
    console.log(JSON.stringify(item, null, 2));
    navigation.navigate('LocationMapTabs', { selectedLocation: item });
  };

  useEffect(() => {
    // TextInput이 렌더링된 후 자동으로 focus
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // 사용자가 입력을 마치고 500ms 후에만 API 요청
    const debounce = setTimeout(() => {
      if (keyword.trim() !== '') {
        setIsLoading(true);
        searchKnuLocation(keyword, setList).finally(() => setIsLoading(false));
      } else {
        setList([]); // 검색어가 없으면 리스트 초기화
      }
    }, 500); // 500ms 대기

    return () => {
      clearTimeout(debounce); // 이전 타이머 정리
    };
  }, [keyword]);

  // View
  return (
    <SafeAreaView
      style={{
        flex: 1,
        margin: 0,
        padding: 0,
        backgroundColor: 'white',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <HeaderBackButton
          onPress={() => navigation.goBack()}
          labelVisible={false}
        />

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginRight: 20,
          }}>
          <TextInput
            ref={textInputRef}
            style={{
              width: '100%',
              height: 40,
              paddingHorizontal: 10,
              borderRadius: 5,
              backgroundColor: '#f4f4f4',
            }}
            value={keyword}
            onChangeText={onChangeKeyword}
            placeholder="검색"
            onSubmitEditing={() => searchKnuLocation(keyword, setList)}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
        </View>
      </View>

      {!isLoading && keyword.trim() !== '' && (
        <FlatList
          data={list}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => <SearchLocationRenderItem data={item} />}
        />
      )}
    </SafeAreaView>
  );
};

export default SearchLocationScreen;
