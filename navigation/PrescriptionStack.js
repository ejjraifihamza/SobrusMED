import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Prescriptions from '../screens/Prescriptions';
import PrescriptionDetails from '../screens/PrescriptionDetails';
import AddPrescription from '../screens/AddPrescription';
import PrescriptionPdf from '../screens/PrescriptionPdf';

const PrescriptionStack = createNativeStackNavigator();

const PrescriptionStackScreen = () => {
  return (
    <PrescriptionStack.Navigator>
      <PrescriptionStack.Screen
        name="Prescription"
        component={Prescriptions}
        options={{
          headerShown: false,
        }}
      />
      <PrescriptionStack.Screen
        name="PrescriptionDetails"
        component={PrescriptionDetails}
        options={{
          headerShown: false,
        }}
      />
      <PrescriptionStack.Screen
        name="AddPrescription"
        component={AddPrescription}
        options={{
          headerShown: false,
        }}
      />
      <PrescriptionStack.Screen
        name="PrescriptionPdf"
        component={PrescriptionPdf}
        options={{
          headerShown: false,
        }}
      />
    </PrescriptionStack.Navigator>
  );
};

export default PrescriptionStackScreen;
