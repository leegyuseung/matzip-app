import useThemeStroe, {Theme} from '@/store/theme';
import Calendar from '@/components/calendar/Calendar';
import Schedule from '@/components/calendar/Schedule';
import React, {useCallback, useEffect, useState} from 'react';
import useGetCalendarPosts from '@/hooks/queries/useGetCalendarPosts';

import {colors} from '@/constants/colors';
import {useNavigation} from '@react-navigation/native';
import {getMonthYearDetails, getNewMonthYear} from '@/utils/date';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';

function CalendarScreen() {
  const currentMonthYear = getMonthYearDetails(new Date());
  const navigation = useNavigation();
  const [monthYear, setMonthYear] = useState(currentMonthYear);
  const [selectedDate, setSelectedDate] = useState(0);
  const {data: posts} = useGetCalendarPosts(monthYear.year, monthYear.month);
  const {theme} = useThemeStroe();
  const styles = styling(theme);

  const moveToToday = useCallback(() => {
    setSelectedDate(new Date().getDate());
    setMonthYear(getMonthYearDetails(new Date()));
  }, []);

  const handleUpdateMonth = (increment: number) => {
    setSelectedDate(0);
    setMonthYear(prev => getNewMonthYear(prev, increment));
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={moveToToday} style={{paddingHorizontal: 10}}>
          <Text style={{color: colors[theme].PINK_700, fontWeight: 'bold'}}>
            오늘
          </Text>
        </Pressable>
      ),
    });
  }, [navigation, moveToToday, theme]);

  const handlePressSchedule = (postId: number) => {
    navigation.navigate('Feed', {
      screen: 'FeedDetail',
      params: {id: postId},
      initial: false,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        monthYear={monthYear}
        schedules={posts ?? {}}
        onChangeMonth={handleUpdateMonth}
        onPressDate={(date: number) => setSelectedDate(date)}
        selectedDate={selectedDate}
      />
      <ScrollView
        style={styles.scheduleContainer}
        contentContainerStyle={{gap: 20}}>
        {posts?.[selectedDate]?.map(post => (
          <Schedule
            key={post.id}
            subTitle={post.address}
            title={post.title}
            onPress={() => handlePressSchedule(post.id)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].WHITE,
    },

    scheduleContainer: {
      padding: 20,
      backgroundColor: colors[theme].WHITE,
    },
  });

export default CalendarScreen;
