import React from 'react';
import {View, Text} from 'react-native';
import Colors from '../constants/Colors';

const OrdDate = props => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      }}>
      <Text
        style={{
          backgroundColor: Colors.primary,
          paddingHorizontal: 5,
          paddingVertical: 10,
          color: '#fff',
          width: '35%',
          fontFamily: 'SourceSansPro-Bold',
          fontSize: 15,
        }}>
        ORDONNANCE
      </Text>
      <Text
        style={{
          backgroundColor: '#E1F5F9',
          fontFamily: 'SourceSansPro-Regular',
          fontSize: 15,
          textAlign: 'right',
          padding: 10,
          width: '65%',
          color: '#516783',
          letterSpacing: 0.5,
        }}>
        Le {props.date}
      </Text>
    </View>
  );
};

export default OrdDate;
