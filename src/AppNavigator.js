import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator, useTheme} from 'react-native-paper';
import Login from './auth/Login';
import Home from './screen/Home';
import onBoardingScreen from './onBoarding/onBoardingScreen';
import Register from './auth/Register';
import BottomNavigator from './screen/BottomNavigation';
import EditProfile from './screen/EditProfile';
import NutritionForm from './component/Modal/NutritionForm';
const Stack = createNativeStackNavigator();
export  function AppNavigator() {
  const {isLogin, setIsLogin} = useAuthContext();
  let theme = useTheme();
  useEffect(() => {
    AsyncStorage.getItem('IsLogin').then(value => {
      if (!value) {
        setIsLogin(true);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isLogin ? (
          <>
            <Stack.Screen name="Onboarding" component={onBoardingScreen} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        ) : (
          <>

            <Stack.Screen name="BottomTab" component={BottomNavigator} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="NutritionForm" component={NutritionForm} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1d', // Dark royal theme
    justifyContent: 'center',
    alignItems: 'center',
  },
});
