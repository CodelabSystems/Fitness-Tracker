import React, {useState} from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Iconify} from 'react-native-iconify';
import {Button, TextInput, useTheme} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CalculateModal = ({visible, setModalVisible}) => {
  let theme = useTheme();
  const {setBmi, setUserDetail, userDetail} = useAuthContext();
  let userHeight = userDetail ? userDetail?.height : '';
  let userWeight = userDetail ? userDetail?.weight : '';
  const [form, setForm] = useState({height: userHeight, weight: userWeight}); // State for height and weight
  const handleChange = (field, value) => {
    setForm({...form, [field]: value});
  };

  const handleClose = () => {
    setModalVisible(false);
  };
  const handleCalculate = async () => {
    const {height, weight} = form;
    let updateData = {...userDetail, height, weight};
    AsyncStorage.setItem('user', JSON.stringify(updateData));
    setUserDetail(updateData);
    if (height && weight) {
      const bmi = weight / (height / 100) ** 2;
      await setBmi(bmi);
      await AsyncStorage.setItem('BMI', JSON.stringify(bmi));

      handleClose();
      // alert(`Your BMI is: ${bmi.toFixed(2)}`);
    } else {
      showToast('Please enter both height and weight.');
    }
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.modalBackground}>
        <View
          style={[
            styles.alertContainer,
            {
              backgroundColor: theme.colors.background,
              borderColor: 'grey',
              borderWidth: 1,
            },
          ]}>
          <View style={[styles.iconView, {backgroundColor: theme.colors.grey}]}>
            <Iconify
              icon="hugeicons:calculate"
              size={100}
              color={theme.colors.appColor}
            />
          </View>
          <CustomText style={[styles.alertTitle, {fontFamily: fonts.SemiBold}]}>
            Calculate your BMI
          </CustomText>
          <CustomText
            style={[styles.alertMessage, {fontFamily: fonts.Regular}]}>
            Enter your height and weight to calculate your BMI.
          </CustomText>

          {/* Height Input */}
          <TextInput
            label="Height (cm)"
            value={form.height}
            onChangeText={value => handleChange('height', value)}
            style={styles.input}
            contentStyle={styles.inputContent}
            mode="outlined"
            keyboardType="numeric"
          />

          {/* Weight Input */}
          <TextInput
            label="Weight (kg)"
            value={form.weight}
            onChangeText={value => handleChange('weight', value)}
            style={styles.input}
            contentStyle={styles.inputContent}
            mode="outlined"
            keyboardType="numeric"
          />

          <View
            style={[styles.divider, {backgroundColor: theme.colors.lightGrey}]}
          />

          <Button
            mode="contained"
            style={[
              styles.confirmView,
              {backgroundColor: theme.colors.appColor},
            ]}
            onPress={handleCalculate}>
            <CustomText
              style={{
                color: '#fff',
                fontFamily: fonts.Medium,
                fontSize: 17,
              }}>
              Calculate
            </CustomText>
          </Button>

          <View
            style={[styles.divider, {backgroundColor: theme.colors.lightGrey}]}
          />
          <TouchableOpacity onPress={handleClose} style={styles.cancelOption}>
            <CustomText
              style={[
                styles.cancelText,
                {color: theme.colors.error, fontFamily: fonts.Regular},
              ]}>
              Cancel
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};


export const {CalculateModal};
