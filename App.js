import React, {useRef} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Header from './components/Header';
import MyTab from './components/MyTab';
import getWidth from './utils/GetWidth';
import Colors from './constants/Colors';

const App = () => {
  // Animated Tab Indicator...
  const tab0ffsetValue = useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.screen}>
      <Header title="ORDONNANCE" />
      <NavigationContainer>
        <MyTab tab0ffsetValue={tab0ffsetValue} />
        <Animated.View
          style={{
            width: getWidth() - 24,
            height: 2.5,
            backgroundColor: Colors.blue,
            position: 'absolute',
            bottom: 62,
            // horizontal padding = 20...
            left: 30,
            transform: [{translateX: tab0ffsetValue}],
          }}></Animated.View>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
