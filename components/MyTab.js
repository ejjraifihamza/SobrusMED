import React from 'react';
import {View, Image, Animated} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Dashboard from '../screens/Dashboard';
import Products from '../screens/Products';
import Prescriptions from '../screens/Prescriptions';
import Patients from '../screens/Patients';
import Settings from '../screens/Settings';
// import ProductNavigator from '../navigation/ProductNavigator';
import ProductDetails from '../screens/ProductDetails';
import getWidth from '../utils/GetWidth';
import ProductStackScreen from '../navigation/ProductStack';
import PatientStackScreen from '../navigation/PatientStack';
import PrescriptionStackScreen from '../navigation/PrescriptionStack';
import SettingStackScreen from '../navigation/SettingStack';

const Tab = createBottomTabNavigator();

const MyTab = props => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        style: {
          position: 'absolute',
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 5,
          marginHorizontal: 20,
          // Max Height...
          height: 60,
          borderRadius: 10,
          // Shadow...
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadow0ffset: {
            width: 10,
            height: 10,
          },
        },
      }}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={
                  focused
                    ? require('../assets/icons/home.png')
                    : require('../assets/icons/home-1.png')
                }
              />
            </View>
          ),
        }}
        listeners={({}) => ({
          // onPress Update
          tabPress: e => {
            Animated.spring(props.tab0ffsetValue, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          },
          focus: e => {
            Animated.spring(props.tab0ffsetValue, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          },
        })}
      />
      <Tab.Screen
        name="ProductStack"
        component={ProductStackScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={
                  focused
                    ? require('../assets/icons/drugs-capsules-and-pills-7.png')
                    : require('../assets/icons/drugs-capsules-and-pills-1.png')
                }
              />
            </View>
          ),
        }}
        listeners={({}) => ({
          // onPress Update
          tabPress: e => {
            Animated.spring(props.tab0ffsetValue, {
              toValue: getWidth(),
              useNativeDriver: true,
            }).start();
          },
          focus: e => {
            Animated.spring(props.tab0ffsetValue, {
              toValue: getWidth(),
              useNativeDriver: true,
            }).start();
          },
        })}
      />
      <Tab.Screen
        name="PrescriptionStack"
        component={PrescriptionStackScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={
                  focused
                    ? require('../assets/icons/prescription-1.png')
                    : require('../assets/icons/prescription.png')
                }
              />
            </View>
          ),
        }}
        listeners={({}) => ({
          // onPress Update
          tabPress: e => {
            Animated.spring(props.tab0ffsetValue, {
              toValue: getWidth() * 2,
              useNativeDriver: true,
            }).start();
          },
          focus: e => {
            Animated.spring(props.tab0ffsetValue, {
              toValue: getWidth() * 2,
              useNativeDriver: true,
            }).start();
          },
        })}
      />
      <Tab.Screen
        name="PatientStack"
        component={PatientStackScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={
                  focused
                    ? require('../assets/icons/user-2.png')
                    : require('../assets/icons/user-1.png')
                }
              />
            </View>
          ),
        }}
        listeners={({}) => ({
          // onPress Update
          tabPress: e => {
            Animated.spring(props.tab0ffsetValue, {
              toValue: getWidth() * 3,
              useNativeDriver: true,
            }).start();
          },
          focus: e => {
            Animated.spring(props.tab0ffsetValue, {
              toValue: getWidth() * 3,
              useNativeDriver: true,
            }).start();
          },
        })}
      />
      <Tab.Screen
        name="Settings"
        component={SettingStackScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={
                  focused
                    ? require('../assets/icons/settings-1.png')
                    : require('../assets/icons/settings.png')
                }
              />
            </View>
          ),
        }}
        listeners={({}) => ({
          // onPress Update
          tabPress: e => {
            Animated.spring(props.tab0ffsetValue, {
              toValue: getWidth() * 4,
              useNativeDriver: true,
            }).start();
          },
          focus: e => {
            Animated.spring(props.tab0ffsetValue, {
              toValue: getWidth() * 4,
              useNativeDriver: true,
            }).start();
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default MyTab;
