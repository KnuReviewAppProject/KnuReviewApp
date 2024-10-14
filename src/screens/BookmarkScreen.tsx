import { useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { SafeAreaView, SectionList, Text, View } from 'react-native';
import useNavigation from '../../node_modules/@react-navigation/core/src/useNavigation';
import { ROOT_NAVIGATION } from '../@types/ROOT_NAVIGATION';
import { getBookmarks } from '../utils/API/LocationAPI';
import { Bookmark } from '../utils/data/type';
import { useUserStore } from '../zustand/store';

// 섹션 데이터 타입 정의
interface Section {
    title: string;
    data: Bookmark[];
  }

const BookmarkScreen = () => {
  // Logic
  const navigation =
    useNavigation<NativeStackNavigationProp<ROOT_NAVIGATION>>();

  const email = useUserStore(state => state.user.email); // zustand에서 사용자 이메일 가져오기

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]); // 북마크 상태

  useFocusEffect(
    React.useCallback(() => {
      // 서버에서 사용자 북마크 가져오기
      const fetchBookmarks = async () => {
        const userBookmarks = await getBookmarks(email);
        setBookmarks(userBookmarks); // 서버에서 가져온 데이터를 상태에 저장
      };

      fetchBookmarks();
    }, [email]),
  );

  // SectionList용 데이터 구조 만들기
  const sections: Section[] = bookmarks.reduce(
    (acc: Section[], bookmark: Bookmark) => {
      const sectionIndex = acc.findIndex(
        (section: Section) => section.title === bookmark.type,
      );

      if (sectionIndex !== -1) {
        // 해당 type이 이미 존재하는 경우 추가
        acc[sectionIndex].data.push(bookmark);
      } else {
        // 새롭게 type을 추가하는 경우
        acc.push({
          title: bookmark.type,
          data: [bookmark],
        });
      }

      return acc;
    },
    [],
  );

  // View
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <SectionList
        sections={sections}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => (
          <View style={{padding: 10}}>
            <Text style={{fontSize: 18}}>{item.name}</Text>
            <Text style={{color: 'gray'}}>{item.email}</Text>
          </View>
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={{fontSize: 22, fontWeight: 'bold', padding: 10}}>
            {title}
          </Text>
        )}
        ListEmptyComponent={
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Text>북마크가 없습니다.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default BookmarkScreen;
