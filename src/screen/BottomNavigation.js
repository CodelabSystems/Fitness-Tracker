import {View, StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from 'react-native-paper';
import {Iconify} from 'react-native-iconify';
import Home from './Home.js';
import CustomText from '../customText/CustomText.js';
import {fonts} from '../customText/fonts.js';
import Favorite from './Favorite.js';
import Profile from './Profile.js';
import Nutrition from './Nutrition.js';
import Compare from './Compare.js';

const Bottom = createBottomTabNavigator();
const MyIcons = (route, focused, theme) => {
  let icons;
  let size = 25;

  if (route.name === 'Home') {
    icons = focused ? (
      <Iconify
        icon="solar:home-linear"
        size={28}
        color={theme.colors.appColor}
      />
    ) : (
      <Iconify
        icon="solar:home-linear"
        size={size}
        color={theme.colors.outline}
      />
    );
  } else if (route.name === 'Nutrition') {
    icons = focused ? (
      <Iconify icon="mp:food2" size={28} color={theme.colors.appColor} />
    ) : (
      <Iconify icon="mp:food2" size={size} color={theme.colors.outline} />
    );
  } else if (route.name === 'Favorite2') {
    icons = focused ? (
      <Iconify
        icon="solar:heart:bold"
        size={28}
        color={theme.colors.appColor}
      />
    ) : (
      <Iconify
      icon="solar:heart:bold"

        size={size}
        color={theme.colors.outline}
      />
    );
  } else if (route.name === 'Compare') {
    icons = focused ? (
      <Iconify icon="fluent:branch-20-regular" size={28} color={theme.colors.appColor} />
    ) : (
      <Iconify icon="fluent:branch-20-regular" size={size} color={theme.colors.outline} />
    );
  } else if (route.name === 'Profile') {
    icons = focused ? (
      <Iconify
        icon="fluent:person:-regular"
        size={30}
        color={theme.colors.appColor}
      />
    ) : (
      <Iconify
        icon="fluent:person:-regular"
        size={26}
        color={theme.colors.outline}
      />
    );
  }

  return (
    <>
      {focused && (
        <View
          style={{backgroundColor: theme.colors.appcolor}}
          className="absolute h-1/3 bg-appcolor-900 top-[-5] rounded"
        />
      )}
    </>
  );
};

const CustomTabBarLabel = ({focused, label, theme}) => {
  // const activeColor = !focused ? 'text-appcolor-400' : 'text-appcolor-200'; // Custom Tailwind color classes
  const activeColor = focused ? theme.colors.appColor : 'grey'; // Custom Tailwind color classes
  return (
   <>
   //Custom label
   </>
  );
};

const BottomNavigator = () => {
  const theme = useTheme();
  return (
    <>
      <Bottom.Navigator
        screenOptions={({route}) => ({
          headerShown: false, // Hide headers
          tabBarIcon: ({focused}) => MyIcons(route, focused, theme),
          tabBarActiveTintColor: theme.colors.appcolor, // Active icon color
          tabBarLabel: ({focused}) => (
            <CustomTabBarLabel
              label={route.name}
              focused={focused}
              theme={theme}
            />
          ), // Use the custom label component
          tabBarStyle: {
            backgroundColor: theme.colors.background,
            borderTopWidth: 0,
            height: 70, //iOS height is 90, otherwise 60
            // Android shadow
            elevation: 3, // Elevation for Android (higher value for a deeper shadow)
          },
        })}>
        <Bottom.Screen name="Home" component={Home} />
        <Bottom.Screen name="Nutrition" component={Nutrition} />
        <Bottom.Screen name="Compare" component={Compare} />
        <Bottom.Screen name="Favorite" component={Favorite} />
        <Bottom.Screen name="Profile" component={Profile} />
      </Bottom.Navigator>
    </>
  );
};
export default BottomNavigator;

const styles = StyleSheet.create({
  noConnectionView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  contentView: {
    padding: 2,
    flexDirection: 'column',
    gap: 10,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 28,
    textAlign: 'center',
  },
  childText: {
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  BtnView: {
    borderRadius: 8,
  },
  BtnText: {
    fontSize: 15,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
