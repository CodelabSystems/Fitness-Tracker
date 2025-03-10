import {
  StyleSheet,
  View,
  TextInput,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {Button, useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import CustomText from '../customText/CustomText';
import Header from '../component/Header';
import {fonts} from '../customText/fonts';
import {showToast} from '../../utils/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Login() {
  let theme = useTheme();
  const {setIsLogin, Checknetinfo, setUserDetail, ipAddress} = useAuthContext();
  let navigation = useNavigation();

  const [spinner, setSpinner] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    name: '',
    email: '',
  });

  let screenName = '';
  const handleChange = (field, value) => {
    setForm(prevForm => ({
      ...prevForm,
      [field]: value,
    }));
  const handleLogin = async () => {
    if (validateForm()) {
      setSpinner(true);
      const userForm = new FormData();
      userForm.append('Email', form.email); // Append the email field
      userForm.append('Password', form.password); // Append the password field
      try {
        // Send POST request with userForm
        let response = await axios.post(`${ipAddress}/UserLogin`, userForm, {
          headers: {
            'Content-Type': 'multipart/form-data', // Ensure Flask processes it as FormData
          },
        });
        if (response.data.success) {
          showToast(response.data.message); // Show success message
          AsyncStorage.setItem('IsLogin', 'true');
          setIsLogin(false);
          let userData = response.data.user;
          AsyncStorage.setItem('user', JSON.stringify(userData));
          setUserDetail(userData); // Update the state with user data
          setSpinner(false);
        } else {
          showToast(response.data.message); // Show failure message
        }
      } catch (error) {
        setSpinner(false);
        if (axios.isAxiosError(error)) {
          if (error.response) {
            showToast(
              `${error.response.data.message || 'Something went wrong'}`,
            );
          } else {
            showToast('Network error, please try again');
          }
        }
      }
    } else {
      showToast('Some invalid data');
    }
  };

  const handleRegister = () => {
    navigate('Register');
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
              Sign in
            </CustomText>
            <CustomText
              style={{
                fontFamily: fonts.Regular,
              }}>
              Sign in to track your fitness progress, get personalized workout
              and diet plans, and achieve your health goals.
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
              placeholder="Email"
              placeholderTextColor="#888"
              keyboardType="email-address"
              onChangeText={value => handleChange('email', value)}
              value={form?.email}
            />

            {errors.email && (
              <CustomText
                className="bottom-2"
                style={[
                  styles.errorText,
                  {color: theme.colors.error, fontFamily: fonts.Light},
                ]}>
                {errors.email}
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
              placeholderTextColor="#888"
              secureTextEntry
              onChangeText={value => handleChange('password', value)}
              value={form?.password}
            />


            <View
              style={{
                fontFamily: fonts.Light,
              }}
              className="my-2 text-center items-center flex-row justify-center space-x-1">
              <CustomText style={{fontFamily: fonts.Light}}>
                Don't have an account?{' '}
              </CustomText>
              <TouchableOpacity onPress={handleRegister}>
                <CustomText
                  style={{
                    color: theme.colors.appColor,
                    fontFamily: fonts.Light,
                  }}
                  className="underline">
                  Register
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },

  headingContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  authHead: {
    fontSize: 30,
    // textAlign: 'center',
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    marginVertical: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  btn: {
    padding: 4,
    marginTop: 20,
    borderRadius: 16,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 100,
  },
});
