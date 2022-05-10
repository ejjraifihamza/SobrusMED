import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Products from '../screens/Products';
import ProductDetails from '../screens/ProductDetails';

const ProductStack = createNativeStackNavigator();

const ProductStackScreen = () => {
  return (
    <ProductStack.Navigator>
      <ProductStack.Screen
        name="Products"
        component={Products}
        options={{
          headerShown: false,
        }}
      />
      <ProductStack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{
          headerShown: false,
        }}
      />
    </ProductStack.Navigator>
  );
};

export default ProductStackScreen;
