import React from 'react';
import {View, Image, Text, StyleSheet, Pressable} from 'react-native';
import Colors from '../constants/Colors';
import TitleText from './TitleText';

const Header = (props, {navigation}) => {
  return (
    <View style={styles.header}>
      <Pressable>
        <Image source={require('../assets/icons/Headset-1.png')} />
      </Pressable>
      <TitleText style={styles.headerTitle}>
        <Text style={{fontWeight: 'bold'}}>MON</Text>
        {props.title}
      </TitleText>
      <View
        style={{
          width: 30,
          height: 30,
          borderRadius: 50,
          overflow: 'hidden',
        }}>
        <Image
          style={{
            width: '100%',
            height: '100%',
          }}
          source={{
            uri: 'https://cdn4.iconfinder.com/data/icons/professions-1-2/151/3-512.png',
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    backgroundColor: Colors.headerBackground,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 0.7,
    borderBottomColor: Colors.gray,
  },
  headerTitle: {
    color: Colors.primary,
    fontWeight: '300',
  },
});

export default Header;
