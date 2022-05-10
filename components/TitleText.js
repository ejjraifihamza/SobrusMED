import React from 'react';
import {Text, StyleSheet} from 'react-native';

const TitleText = props => (
  <Text style={{...styles.text, ...props.style}}>{props.children}</Text>
);

const styles = StyleSheet.create({
  text: {
    fontWeight: '700',
    fontSize: 18,
    color: 'white',
  },
});

export default TitleText;
