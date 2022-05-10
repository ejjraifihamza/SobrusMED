import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';

const Input = props => {
  return (
    <TextInput
      onChangeText={props.onChangeText}
      value={props.value}
      {...props}
      style={{...styles.input, ...props.style}}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderColor: 'grey',
    borderWidth: 0.3,
    borderRadius: 3,
    width: '90%',
    backgroundColor: Colors.headerBackground,
  },
});

export default Input;
