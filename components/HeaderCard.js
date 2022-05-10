import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';

import Card from './Card';
import TitleText from './TitleText';
import MyText from './MyText';
import Input from './Input';

import Colors from '../constants/Colors';

const HeaderCard = props => {
  console.log('HeaderCardProps', props);
  return (
    <Card style={styles.card}>
      <View style={styles.productHeader}>
        <View
          style={{justifyContent: 'space-between', alignItems: 'flex-start'}}>
          <TitleText
            style={{
              color: '#000',
              marginVertical: 8,
              fontFamily: 'SourceSansPro-Bold',
              fontSize: 19,
            }}>
            {props.title}
          </TitleText>
          <MyText
            style={{
              color: Colors.gray,
              fontFamily: 'SourceSansPro-SemiBold',
              fontSize: 13,
            }}>
            {props.info}
          </MyText>
        </View>
        <Pressable
          onPress={() => {
            if (props.onPress) {
              props.onPress();
            }
            console.log('nothing!');
          }}>
          <Text
            style={{
              color: Colors.primary,
              fontFamily: 'SourceSansPro-SemiBold',
              fontSize: 16,
            }}>
            {props.buttonText}
          </Text>
        </Pressable>
      </View>
      <View style={styles.searchInput}>
        <Input
          onChangeText={props.onChangeText}
          placeholder={props.placeholder}
          value={props.value}
          style={styles.inputField}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 120,
    maxHeight: '50%',
    borderRadius: 0,
    width: '100%',
    backgroundColor: Colors.lightGray,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  searchInput: {
    alignItems: 'center',
    marginVertical: 15,
    width: '100%',
  },
  inputField: {
    height: 40,
    padding: 10,
  },
});

export default HeaderCard;
