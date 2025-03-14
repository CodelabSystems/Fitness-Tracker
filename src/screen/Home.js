import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Divider, useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import useAuthContext from '../context/GlobaContext';

export default function Home() {
  let theme = useTheme();
  let navigation = useNavigation();
  const {userDetail, bmi} = useAuthContext();
  const ShowModal = () => {
    setModalVisible(true);
  };

  const getBMISubtitle = bmi => {
    if (bmi < 18.5) {
      return "A BMI under 18.5 is considered underweight. It's important to focus on gaining healthy weight.";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return 'Your BMI is within the healthy range! Continue maintaining a balanced diet and staying active.';
    } else if (bmi >= 25 && bmi < 29.9) {
      return "You are overweight. It's important to aim for a healthier weight through exercise and a balanced diet.";
    } else {
      return 'Your BMI falls into the obesity category. Consulting a healthcare provider for guidance is recommended.';
    }
  };

  useEffect(() => {
    if (bmi) {
      const subtitle = getBMISubtitle(bmi);
      setSubtitle(subtitle);
    }
  }, []);

  return (
    <>
      <View
        style={[
          styles.maincontainer,
          {backgroundColor: theme.colors.background},
        ]}>
        {/* Header */}
        <View style={styles.mainHeaderView}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <View className="flex-row items-center space-x-2 my-3 px-2">
              <TouchableOpacity onPress={handleNavigate}>
                {userDetail?.ProfileImage ? (
                  <Image
                    className="rounded-full"
                    source={{uri: userDetail.ProfileImage}}
                    style={[
                      {
                        borderColor: theme.colors.appcolor,
                        width: 55,
                        height: 55,
                      },
                    ]}
                  />
                ) : (
               <>
               </>
                )}
              </TouchableOpacity>
              <View className="flex-row items-center space-x-1">
                <CustomText
                  className="text-[19px]"
                  style={{fontFamily: fonts.Medium}}>
                  Good Day,
                </CustomText>
                <CustomText
                  className="text-[19px]"
                  style={{
                    fontFamily: fonts.Bold,
                    color: theme.colors.appColor,
                  }}>
                  {userDetail?.Name}
                </CustomText>
              </View>
            </View>

            <View className="flex-row justify-between px-2">
              <View className="top-6">
        
              </View>
              <Calcaulate style={styles.Calcaulate} />
            </View>

      
            {bmi ? (
              <>
                <View className="my-3  px-2">
                  <CustomText
                    className="text-[18px]"
                    style={{fontFamily: fonts.Medium}}>
                    Exercise for you
                  </CustomText>
                  <Divider
                    style={{
                      width: 159,
                      borderColor: theme.colors.appColor,
                      borderWidth: 0.5,
                    }}
                  />
                </View>
                <View className="px-2">
                  <CustomText
                    className="text-[12px]"
                    style={{
                      fontFamily: fonts.Light,
                      color: theme.colors.appColor,
                    }}>
                    10-Day Exercise Plan Based on BMI:
                  </CustomText>
                </View>
                <Exercise />
              </>
            ) : (
              <>
                <View className="mt-7 px-2 mb-2">
                  <CustomText
                    className="text-[18px]"
                    style={{fontFamily: fonts.Medium}}>
                    Please enter your BMI to get personalized exercise
                    recommendations.
                  </CustomText>
                </View>
                <View className="px-2">
                  <CustomText
                    className="text-[12px]"
                    style={{
                      fontFamily: fonts.Light,
                      color: theme.colors.appColor,
                    }}>
                    We need your BMI to suggest a tailored workout plan.
                  </CustomText>
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </View>

      <CalculateModal
        visible={isModalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
  },
  Calcaulate: {
    width: Dimensions.get('window').width / 2.3,
    height: Dimensions.get('window').width / 2.2,
  },
  profileImage: {
    height: 100,
    weight: 100,
  },
});
