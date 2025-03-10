import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {Button, useTheme} from 'react-native-paper';
import CustomText from '../../customText/CustomText';
import axios from 'axios';
import {useAuthContext} from '../context/GlobaContext';
import NoData from '../../assets/Image/NoData.svg';

const RecommendedFood = ({
  forDelete,
  nutritionFood,
  userdietDetail,
  setMeals,
}) => {
  
  let theme = useTheme();
  const {ipAddress, userDetail, setCount, count} = useAuthContext();
  const [spinner, setSpinner] = useState(false);

  const handleAddLog = async food => {
    let {dietName, dietType} = userdietDetail;
    let {FoodName, Protein, Calories, Carbs, image_url} = food;
    const foodData = {
      dietName: dietName,
      dietType: dietType,
      protein: Protein,
      calories: Calories,
      carbs: Carbs, // Add if you're tracking carbs
      foodName: FoodName, // Ensure `food.name` exists
      image_url: image_url || '', // Optional image URL
      email: userDetail?.Email,
    };
    try {
      const response = await axios.post(`${ipAddress}/add_to_log`, foodData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setSpinner(false);

      const data = response.data;

      if (data.message) {
        showToast(data.message);
        await setCount(count => count + 1);
        // navigation.goBack();
      } else {
        showToast('Something went wrong');
      }
    } catch (error) {
      setSpinner(false);
      showToast('Something went wrong');
      console.error(error);
    }
  };

  const handleDeleteLog = async item => {
    const userData = {
      email: userDetail?.Email, // Ensure Email is correctly formatted and passed
    };
    let foodId = item[0];
    try {
      // Send a POST request with the email and user ID
      const response = await axios.post(
        `${ipAddress}/delete/${foodId}`,
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      setSpinner(false);
      const data = response.data; // Get response data
      if (data.success) {
        showToast(data.message); // Show success message
        // Correct filter logic: Remove the deleted item
        const filteredData = nutritionFood?.filter(food => food[0] !== item[0]); // Exclude the item with the same ID
        setMeals(filteredData);
        // navigation.goBack(); // Uncomment if you want to navigate back
      } else {
        showToast(data.message || 'Something went wrong'); // Show error message if available
      }
    } catch (error) {
      setSpinner(false);
      showToast('Something went wrong');
      console.error('Error deleting log:', error);
    }
  };



 

  return (
    <View className="my-1 mt-1">
      {nutritionFood?.length == 0 ? (
        <>
          <View className="flex-column justify-center pb-10">
            <NoData
              style={{
                width: Dimensions.get('window').width / 1.2,
                height: Dimensions.get('window').width / 1.3,
              }}
            />
              <CustomText
              className="text-[16px] text-center"
              style={{fontFamily: fonts.Regular}}>
              No logged meals found!
            </CustomText>
          </View>
        </>
      ) : (
        <FlatList
          data={nutritionFood}
          renderItem={renderItem}
          keyExtractor={item => item?.FoodName}
          className="mt-2 mb-10"
        />
      )}
    </View>
  );
};

export default RecommendedFood;
