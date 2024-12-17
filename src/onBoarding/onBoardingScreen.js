import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import CustomText from '../customText/CustomText';
import {useTheme} from 'react-native-paper';
import Onboading1 from '../../assets/Image/boarding1.svg';
import Onboading2 from '../../assets/Image/boarding2.svg';
import Onboading3 from '../../assets/Image/boarding3.svg';
import {useNavigation} from '@react-navigation/native';
import {fonts} from '../customText/fonts';

const FirstScreen = theme => ({
  backgroundColor: '#1a1a2e',

  subtitle: (
    <>
      <View style={{marginTop: 5, marginHorizontal: 4}}>
        <CustomText
          style={{
            fontFamily: fonts.Regular,
            fontSize: 15,
            textAlign: 'center',
          color:'#bdb9b9'

          }}>
          Start tracking your fitness goals, monitor progress, and receive
          personalized exercise and diet plans tailored just for you.
        </CustomText>
      </View>
    </>
  ),
  image: (
    <View style={styles.imageContainer}>
      <Onboading1 style={styles.image} />
    </View>
  ),
});

const SecondScreen = theme => ({
  backgroundColor: '#131320',
  title: (
    <>
      
     
      <CustomText
        style={{
          fontFamily: fonts.Bold,
          fontSize: 18,
          color:'#bdb9b9'

        }}>
        Every Step of the Way
      </CustomText>
    </>
  ),
  subtitle: (
    <>
      <View style={{marginTop: 5, marginHorizontal: 4}}>
        <CustomText
          style={{
            fontFamily: fonts.Regular,
            fontSize: 15,
            textAlign: 'center',
          color:'#bdb9b9'

          }}>
          Monitor your workouts, log your meals, and stay motivated with
          real-time updates on your fitness journey.
        </CustomText>
      </View>
    </>
  ),
  image: (
    <View style={styles.imageContainer}>
      <Onboading3 style={styles.image} />
    </View>
  ),
});

const ThirdScreen = theme => ({
  backgroundColor: '#1a1a2e',
  title: (
    <>
    
      <CustomText
        style={{
          fontFamily: fonts.Bold,
          fontSize: 18,
          color:'#bdb9b9'

        }}>
        Tailored to You
      </CustomText>
    </>
  ),
  subtitle: (
    <>
      <View style={{marginTop: 5, marginHorizontal: 4}}>
        <CustomText
          style={{
            fontFamily: fonts.Regular,
            fontSize: 15,
            textAlign: 'center',
          color:'#bdb9b9'

          }}>
          Based on your age, weight, and height, receive customized exercise
          plans, diet recommendations, and weekly fitness tips.
        </CustomText>
      </View>
    </>
  ),
  image: (
    <View style={styles.imageContainer}>
      <Onboading2 style={styles.image} />
    </View>
  ),
});

export default function OnboardingScreen() {
  const theme = useTheme();
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate('Login');
  };

  return (
    <>
      <Onboarding
        onDone={handleNavigate}
        containerStyles={{flex: 1, justifyContent: 'flex-end'}}
        bottomBarHighlight={false}
      />
    </>
  );
}
