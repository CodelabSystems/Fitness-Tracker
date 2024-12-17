import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useEffect,
} from 'react-native';
import React, {  useState} from 'react';
import {Button, useTheme} from 'react-native-paper';
import {fonts} from '../customText/fonts';
import { useNavigation} from '@react-navigation';
import Dropdown from 'react-native-element-dropdown';
import {useAuthContext} from '../context/GlobaContext';
import axios from 'axios';
import {showToast} from '../../utils/Toast';

export default function Compare() {
  let theme = useTheme();
  let navigation = useNavigation();
  const {meals, ipAddress, userDetail} = useAuthContext();
  const [spinner, setSpinner] = useState(false);
  const [foods, setFoods] = useState(null);
  const [comparedData, setComparedData] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const GetfoodNames = () => {
        // Format the food names into the required structure
        const formattedFoodNames = meals?.map(item => ({
          label: item[4],
          value: item[4],
        }));
        return formattedFoodNames;
      };
      if (meals) {
        const foodNames = GetfoodNames(); // Get the formatted food names
        setFoods(foodNames);
      }
    }, [meals]),
  );

 
  const pickerStyle = {
    fontFamily: 'Poppins-Regular',
    color: theme.colors.appColor,
  };
  const selectedPickerStyle = {
    fontFamily: 'Poppins-Regular',
    color: theme.colors.onBackground,
  };

  return (
    <>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={[
          styles.maincontainer,
          {backgroundColor: theme.colors.background},
        ]}>
        {/* Header */}
        {/* Header content */}
        <View className="flex-column gap-2 my-2 mt-0">
          <CustomText
            style={[
              styles.headerText,
              {color: theme.colors.appColor, fontFamily: fonts.SemiBold},
            ]}
            className="text-lg">
            Meal Comparison Made Easy
          </CustomText>



        {foods && (
          <>
            <Dropdown
              style={styles.dropdown}
              placeholder="Select Food 1"
              data={foods}
              containerStyle={{backgroundColor: theme.colors.background}}
              selectedTextStyle={selectedPickerStyle}
              onChange={item => setFood1(item.value)}
              placeholderStyle={selectedPickerStyle}
            />

            <Dropdown
              style={styles.dropdown}
              placeholder="Select Food 2"
              data={foods}
              labelField="label"
              value={food2}
              itemTextStyle={pickerStyle}
              containerStyle={{backgroundColor: theme.colors.background}}
              selectedTextStyle={selectedPickerStyle}
              onChange={item => setFood2(item.value)}
              placeholderStyle={selectedPickerStyle}
            />
          </>
        )}

        {/* Button for Finding Nutrition Food */}
        <Button
          onPress={spinner ? () => {} : handleCompare}
          mode="contained"
          className="rounded-14">
          {spinner ? (
            <ActivityIndicator size={24} color={theme.colors.background} />
          ) : (
            <CustomText
              style={{
                color: '#fff',
                fontFamily: fonts.Bold,
              }}>
              Compare Meals
            </CustomText>
          )}
        </Button>

        {comparedData && (
          <View style={styles.comparisonContainer}>
            <CustomText
              style={[
                styles.headerText,
                {color: theme.colors.appColor, fontFamily: fonts.SemiBold},
              ]}
              className="text-lg my-3">
              Comparison Results
            </CustomText>

            <View
              style={[
                styles.foodCard,
                {
                },
              ]}>
              <Image
                style={{
                  width: Dimensions.get('window').width / 1.2,
                  alignSelf: 'center',
                }}
                className="rounded-14 my-2"
                source={{uri: comparedData?.food1?.image_url}}
              />
              <CustomText
                style={[styles.foodText, {color: theme.colors.appColor}]}>
                {comparedData?.food1?.foodName}
              </CustomText>
              <CustomText style={styles.foodText}>
                Diet Type: {comparedData?.food1?.dietType}
              </CustomText>
              <CustomText style={styles.foodText}>
                Protein: {comparedData?.food1?.protein}g
              </CustomText>
              <CustomText style={styles.foodText}>
                Calories: {comparedData?.food1?.calories}kcal
              </CustomText>
              <CustomText style={styles.foodText}>
                Carbs: {comparedData?.food1?.carbs}g
              </CustomText>
            </View>

            <View
              style={[
                styles.foodCard,
                {
                  borderColor:
                    comparedData?.food2?.protein > comparedData?.food1?.protein
                      ? theme.colors.appColor
                      : theme.colors.error, // If Food 1 has higher protein, appColor else 'red'
                },
              ]}>
              <Image
                style={{
                  width: Dimensions.get('window').width * 10,
                  height: Dimensions.get('window').width / 1.6,
                  alignSelf: 'center',
                }}
                className="rounded-14 my-2"
                source={{uri: comparedData.food.image_url}}
              />
              <CustomText
                style={[styles.foodText, {color: theme.colors.appColor}]}>
                {comparedData?.food.foodName}
              </CustomText>
              <CustomText style={styles.foodText}>
                Diet Type: {comparedData?.food2?.dietType}
              </CustomText>
              <CustomText style={styles.foodText}>
                Protein: {comparedData.food2?.protein}g
              </CustomText>
              <CustomText style={styles.foodText}>
                Calories: {comparedData?.food2?.calories}kcal
              </CustomText>
              <CustomText style={styles.foodText}>
                Carbs: {comparedData?.carbs}g
              </CustomText>
            </View>
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,2
    fontFamily: 'Poppins-Regular',
  },
  comparisonContainer: {
    marginTop: 20,
    borderRadius: 10,
    marginBottom: 100,
  },
  foodCard: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    borderWidth: 1,
  },
  foodText: {
    fontSize: 16,
    fontFamily: fonts.Regular,
  },
});
