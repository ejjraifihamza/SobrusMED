import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Patients from '../screens/Patients';
import PatientDetails from '../screens/PatientDetails';

const PatientStack = createNativeStackNavigator();

const PatientStackScreen = () => {
  return (
    <PatientStack.Navigator>
      <PatientStack.Screen
        name="Patients"
        component={Patients}
        options={{
          headerShown: false,
        }}
      />
      <PatientStack.Screen
        name="PatientDetails"
        component={PatientDetails}
        options={{
          headerShown: false,
        }}
      />
    </PatientStack.Navigator>
  );
};

export default PatientStackScreen;
