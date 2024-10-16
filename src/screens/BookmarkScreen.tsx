import { useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { SafeAreaView, SectionList } from 'react-native';
import useNavigation from '../../node_modules/@react-navigation/core/src/useNavigation';
import { ROOT_NAVIGATION } from '../@types/ROOT_NAVIGATION';
import BookmarkRenderItem from '../components/BookmarkRenderItem';
import BookmarkRenderSectionHeader from '../components/BookmarkRenderSectionHeader';
import EmptyBookmarkMessage from '../components/EmptyBookmarkMessage';
import { getBookmarks } from '../utils/API/LocationAPI';
import { Bookmark, BookmarkSection } from '../utils/data/type';
import { useUserStore } from '../zustand/store';

const BookmarkScreen = () => {
  // Logic
  const navigation =
    useNavigation<NativeStackNavigationProp<ROOT_NAVIGATION>>();

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  const email = useUserStore(state => state.user.email);

  const BookmarkSection: BookmarkSection[] = [];

  bookmarks.forEach(bookmark => {
    const existingBookmarkSection = BookmarkSection.find(
      section => section.title === bookmark.type,
    );

    if (existingBookmarkSection) {
      existingBookmarkSection.data.push(bookmark);
    } else {
      BookmarkSection.push({
        title: bookmark.type,
        data: [bookmark],
      });
    }
  });

  // 삭제 성공 시 호출하여 상태 업데이트
  const handleDeleteSuccess = (id: string) => {
    setBookmarks(prevBookmarks =>
      prevBookmarks.filter(bookmark => bookmark.id !== id),
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      getBookmarks(email, setBookmarks);
    }, []),
  );

  // View
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <SectionList
        sections={BookmarkSection}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => (
          <BookmarkRenderItem
            data={item}
            onDeleteSuccess={() => handleDeleteSuccess(item.id)}
          />
        )}
        renderSectionHeader={({section}) => (
          <BookmarkRenderSectionHeader type={section.title} />
        )}
        ListEmptyComponent={<EmptyBookmarkMessage />}
      />
    </SafeAreaView>
  );
};

export default BookmarkScreen;
