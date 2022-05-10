import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import TitleText from '../components/TitleText';
import Colors from '../constants/Colors';

const Settings = ({navigation}) => {
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TitleText style={styles.patientName}>Abderazzaq Hakimi</TitleText>
      </View>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SettingProfile');
          }}
          style={styles.container}>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: 20, height: 20}}>
              <Image
                style={{width: '100%', height: '100%'}}
                source={require('../assets/icons/profile.png')}
              />
            </View>
            <Text style={styles.text}>Profil</Text>
          </View>
          <View style={{width: 20, height: 20}}>
            <Image
              style={{width: '100%', height: '100%'}}
              source={require('../assets/icons/right-arrow1.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: '100%',
          borderTopWidth: 0.3,
          borderBottomWidth: 0.3,
          borderBottomColor: Colors.gray,
          borderTopColor: Colors.gray,
          alignItems: 'center',
        }}>
        <View style={styles.container}>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: 20, height: 20}}>
              <Image
                style={{width: '100%', height: '100%'}}
                source={require('../assets/icons/padlock(1).png')}
              />
            </View>
            <Text style={styles.text}>Changer mon compte</Text>
          </View>
          <View style={{width: 20, height: 20}}>
            <Image
              style={{width: '100%', height: '100%'}}
              source={require('../assets/icons/right-arrow1.png')}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    height: 80,
    backgroundColor: '#F6F7F8',
    justifyContent: 'center',
  },
  patientName: {
    color: 'black',
    position: 'relative',
    left: 20,
  },
  container: {
    flexDirection: 'row',
    width: '80%',
    height: 80,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: 16,
    position: 'relative',
    left: 10,
  },
});

export default Settings;
