import React from 'react';
import {View, StyleSheet} from 'react-native';

const Card = props => {
  return <View style={{...styles.card, ...props.style}}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    // for IOS
    shadowColor: 'black',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    // for android
    elevation: 5,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});

export default Card;
