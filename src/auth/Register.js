import {
  StyleSheet,
  View,
  TextInput,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Button, useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import CustomText from '../customText/CustomText';
import Header from '../component/Header';
import {useAuthContext} from '../context/GlobaContext';
import {fonts} from '../customText/fonts';
import {showToast} from '../../utils/Toast';
import axios from 'axios';

export default function Register() {
  let theme = useTheme();
  const {setIsLogin, Checknetinfo, setUserDetail, ipAddress} = useAuthContext();
  let navigation = useNavigation();
  const [spinner, setSpinner] = useState(false);
  const [errors, setErrors] = useState({});

  let screenName = '';

  const handleChange = (field, value) => {
    setForm(prevForm => ({
      ...prevForm,
      [field]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.username) newErrors.username = 'Username is required';
    if (!form.email) newErrors.email = 'Email is required';
    if (!form.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    setSpinner(false);
    return Object.keys(newErrors).length === 0;
  };


  const NavigateToLogin = () => {
    navigation.goBack();
  };

  return (
    <>
      <Header screenName={screenName} />
      <View
        style={[
          styles.mainContainer,
          {backgroundColor: theme.colors.background},
        ]}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          {/* Heading */}
          <View style={styles.headingContainer}>
            <CustomText
              style={[
                styles.authHead,
                {fontFamily: fonts.Bold, color: theme.colors.onBackground},
              ]}>
              Sign Up
            </CustomText>
            <CustomText
              style={{
                fontFamily: fonts.Regular,
              }}>
              Join now to access personalized fitness plans and achieve your
              health goals.
            </CustomText>
          </View>

          {/* Inputs */}
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                {
                  color: theme.colors.onBackground,
                  borderColor: theme.colors.onBackground,
                },
              ]}
              placeholder="User name"
              placeholderTextColor="#888"
              value={form?.username}
            />

            {errors.username && (
              <CustomText
                className="bottom-2"
                style={[
                  styles.errorText,
                  {color: theme.colors.error, fontFamily: fonts.Light},
                ]}>
                {errors.username}
              </CustomText>
            )}

            <TextInput
              style={[
                styles.input,
                {
                  color: theme.colors.onBackground,
                  borderColor: theme.colors.onBackground,
                },
              ]}
              placeholder="Email"
              value={form?.email}
            />

            {errors.email && (
              <CustomText
                className="bottom-2"
                style={[
                  styles.errorText,
                  {color: theme.colors.error, fontFamily: fonts.Light},
                ]}>
                {error.email}
              </CustomText>
            )}

            <TextInput
              style={[
                styles.input,
                {
                  color: theme.colors.onBackground,
                  borderColor: theme.colors.onBackground,
                },
              ]}
              placeholder="Password"
              value={form?.password}
            />

            {errors.password && (
              <CustomText
                className="bottom-2"
                style={[
                  styles.errorText,
                  {color: theme.colors.error, fontFamily: fonts.Light},
                ]}>
              </CustomText>
            )}


            <View
              style={{
                fontFamily: fonts.Light,
              }}
              className="my-2 text-center items-center flex-row justify-center space-x-1">
              <CustomText style={{fontFamily: fonts.Light}}>
                Already have an account?{' '}
              </CustomText>
              <TouchableOpacity onPress={NavigateToLogin}>
                <CustomText
                  style={{
                    color: theme.colors.appColor,
                    fontFamily: fonts.Light,
                  }}
                  className="underline">
                  Login
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
