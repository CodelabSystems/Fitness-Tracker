import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  Appearance,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import Header from '../component/Header';
import CustomText from '../customText/CustomText';
import {fonts} from '../customText/fonts';
import {Iconify} from 'react-native-iconify';
import {showToast} from '../../utils/Toast';
import RecommendedFood from '../component/RecommandedFood';
import axios from 'axios';
import NoData from '../../assets/Image/NoData.svg';

const Tab = createMaterialTopTabNavigator();

// Exercise Screen
function ExerciseScreen() {
  let theme = useTheme();

  let mode = Appearance.getColorScheme();
 
  const renderItem = (item, handleFav) => {
    return (
      <LinearGradient
        colors={getRandomGradient()} // Apply random gradient colors
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={{
          padding: 16,
          marginVertical: 8,
          borderRadius: 10,
          elevation: 6,
          marginHorizontal: 10,
        }}>
        <View className="flex-row items-center gap-2">
          <Iconify
            icon="iconamoon:cat3egory"
            size={20}
            color={theme.colors.appColor}
          />
          <CustomText
            className="text-[13p2x] top-1"
            style={{
              fontFamily: fonts.Medium,
              color: mode == 'light' ? theme.colors.outline : '#fff',
            }}>
            {item?.category}
          </CustomText>
        </View>
        <TouchableOpacity
          onPress={() => handleFav(item)} // Handle favorite toggle
          style={{
            position: 'absolute',
            right: 12,
            top: 12,
            zIndex: 1,
          }}>
          <Iconify
            icon="solar:heart"
            size={32}
            color={theme.colors.appColor}
          />
        </TouchableOpacity>

        <CustomText
          className="text-[15px]"
          style={{
            fontFamily: fonts.SemiBold,
            color: mode == 'light' ? theme.colors.outline : '#fff',
          }}>
          Day {item?.day}:
        </CustomText>
        <CustomText
          className="text-[18px]"
          style={{
            fontFamily: fonts.Medium,
            color: mode == 'light' ? theme.colors.outline : '#fff',
          }}>
          {item?.exercise}
        </CustomText>
        <CustomText
          className="text-[13px]"
          style={{
            fontFamily: fonts.Regular,
            color: mode == 'light' ? theme.colors.outline : '#fff',
          }}>
          {item?.subtitle}
        </CustomText>
      </LinearGradient>
    );
  };

  const handleFav = exercise => {
    setFavExercise(prev => {
      // If prev is null or undefined, default it to an empty array
      const currentFavExercises = prev || [];
      const isAlreadyFav = currentFavExercises?.some(
        item => item?.day === exercise?.day,
      );
      if (isAlreadyFav) {
        // Remove exercise from favorites
        showToast('Removing Exercise from Favorite ..');
        return currentFavExercises.filter(item => item.day !== exercise.day);
      }
    });
  };

  return (
    <>
      <View
        style={[
          styles.tabContainer,
          {backgroundColor: theme.colors.background},
        ]}>
        {/* <CustomText style={styles.text}>Exercise Content</CustomText> */}
        {favExercise && favExercise.length > 0 ? (
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={favExercise}
            renderItem={({item}) => renderItem(item, handleFav)}
            keyExtractor={item => item.day.toString()}
          />
        ) : (
          <View className="flex-column justify-center">
            <NoData
              style={{
                width: Dimensions.get('window').width / 1.2,
                height: Dimensions.get('window').width / 1.3,
              }}
            />
            <CustomText
              className="text-[16px] text-center"
              style={{fontFamily: fonts.Regular}}>
              No exercises found!
            </CustomText>
          </View>
        )}
      </View>
    </>
  );
}

// Nutrition Food Screen
function NutritionScreen({favFood}) {
  let theme = useTheme();
  const {ipAddress, userDetail, count,meals, setMeals} = useAuthContext();
  const [loading, setLoading] = useState(true);

  // const fetchMeals = async () => {
  //   try {
  //     let data = {
  //       email: userDetail?.Email,
  //     };
  //     const response = await axios.post(`${ipAddress}/userViewLod`, data, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     const responseData = response.data;
  //     if (responseData.meals) {
  //       setMeals(responseData.meals);
  //     } else if (responseData.error) {
  //       console.error(responseData.error);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching meals:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchMeals();
  // }, [count]);

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={[styles.tabContainer, {backgroundColor: theme.colors.background}]}>
      {/* Header */}

      <View className="my-2 mt-6">
        {/* Header */}
        <View>
          <CustomText
            className="text-lg"
            style={{fontFamily: fonts.Medium, color: theme.colors.appColor}}>
            Today's Meal Overview
          </CustomText>
          <CustomText
            className="text-md text-gray-400"
            style={{fontFamily: fonts.Regular}}>
            Based on your logged meals, here’s your overall intake for today.
            Keep track of your nutrition and make informed choices for a
            healthier lifestyle!
          </CustomText>
        </View>

        {/* Detail */}
        {meals?.length > 0 && (
          <View className="my-2">
            <CustomText
              className="text-[16px] mb-3text-gray-300"
              style={{fontFamily: fonts.Regular}}>
              Overall Intake:
            </CustomText>
            <View className="flex-row justify-around items-center mx-1 my-2">
              <View className="flex-row items-center">
                <Image
                  style={{width: 40, height: 40}}
                  source={require('../../assets/Food/Single/carb.png')}
                />
                <CustomText
                  className="text-sm ml-1"
                  style={{fontFamily: fonts.Regular}}>
                  {totalDetail ? totalDetail?.Carbs : ''} g
                </CustomText>
              </View>
              <View className="flex-row items-center">
                <Image
                  style={{width: 40, height: 40}}
                  source={require('../../assets/Food/Single/food.png')}
                />
                <CustomText
                  className="text-sm ml-1"
                  style={{fontFamily: fonts.Regular}}>
                  {totalDetail ? totalDetail?.Protein : ''} g
                </CustomText>
              </View>
              <View className="flex-row items-center">
                <Image
                  style={{width: 40, height: 40}}
                  source={require('../../assets/Food/Single/kcal.png')}
                />
                <CustomText
                  className="text-sm ml-1"
                  style={{fontFamily: fonts.Regular}}>
                  {totalDetail ? totalDetail?.Calories : ''} kcal
                </CustomText>
              </View>
            </View>
          </View>
        )}

        <View className="mt-3">
          <CustomText className="text-lg" style={{fontFamily: fonts.Medium}}>
            Your Logged Meals
          </CustomText>
          <CustomText
            className="text-md text-gray-400"
            style={{fontFamily: fonts.Regular}}>
            Here are the meals you've logged. Keep track of your nutritional
            intake and manage your meals efficiently!
          </CustomText>
        </View>
      </View>
      <RecommendedFood
        forDelete={true}
        nutritionFood={meals}
        setMeals={setMeals}
      />
    </ScrollView>
  );
}

// Main Favorite Component
export default function Favorite() {
  let theme = useTheme();
  const {favExercise, favFood} = useAuthContext();

  return (
    <>
      <Header screenName={'Favorite'} backIcon={false} />
      <View
        style={[
          styles.mainContainer,
          {backgroundColor: theme.colors.background},
        ]}>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {backgroundColor: theme.colors.background},
            tabBarLabelStyle: {
              fontFamily: fonts.Medium,
              fontSize: 14,
              color: theme.colors.appColor,
            },
            tabBarIndicatorStyle: {backgroundColor: theme.colors.appColor},
          }}>
          <Tab.Screen name="Exercise" component={ExerciseScreen} />
          <Tab.Screen name="Nutrition Food" component={NutritionScreen} />
        </Tab.Navigator>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  tabContainer: {
    flex: 1,
    padding: 10,
  },
  text: {
    fontFamily: fonts.Regular,
    fontSize: 16,
  },
});
