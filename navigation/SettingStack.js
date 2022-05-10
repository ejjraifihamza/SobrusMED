import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Settings from '../screens/Settings';
import SettingProfile from '../screens/SettingProfile';
import SettingProfileEdit from '../screens/SettingProfileEdit';
import SettingCabinetEdit from '../screens/SettingCabinetEdit';

const SettingStack = createNativeStackNavigator();

const SettingStackScreen = () => {
  return (
    <SettingStack.Navigator>
      <SettingStack.Screen
        name="Setting"
        component={Settings}
        options={{
          headerShown: false,
        }}
      />
      <SettingStack.Screen
        name="SettingProfile"
        component={SettingProfile}
        options={{
          headerShown: false,
        }}
      />
      <SettingStack.Screen
        name="SettingProfileEdit"
        component={SettingProfileEdit}
        options={{
          headerShown: false,
        }}
      />
      <SettingStack.Screen
        name="SettingCabinetEdit"
        component={SettingCabinetEdit}
        options={{
          headerShown: false,
        }}
      />
    </SettingStack.Navigator>
  );
};

export default SettingStackScreen;
