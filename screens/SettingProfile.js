import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';

import Colors from '../constants/Colors';
import TitleText from '../components/TitleText';

const SettingProfile = ({navigation}) => {
  const [Refreshing, setRefreshing] = useState(false);
  const [doctor, setDoctor] = useState({});
  const [office, setOffice] = useState({});
  const doctor_id = '62714960cc2c77b3db96d84e';
  const fetchDoctor = () => {
    // const apiURL = `http://10.0.2.2/doctor/profile/${doctor_id}`;
    const apiURL = `https://sobrus-med.herokuapp.com/doctor/profile/${doctor_id}`;
    fetch(apiURL)
      .then(response => response.json())
      .then(responseJson => {
        setDoctor(responseJson.output.doctor);
        setOffice(responseJson.output.doctor.office);
      })
      .catch(error => {
        console.error(error);
      });
  };
  useEffect(() => {
    fetchDoctor();
    return () => {};
  }, []);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={Refreshing} onRefresh={fetchDoctor} />
      }>
      <View style={{flex: 1, marginBottom: 80}}>
        <View style={styles.firstContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={{width: '100%', height: '100%'}}
              source={{uri: `${doctor.avatar}`}}
            />
          </View>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              width: '90%',
              marginTop: 15,
            }}>
            <Text style={{color: Colors.primary}}>
              Changer photo de profile
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.secondContainer}>
          <View
            style={{
              width: '100%',
              alignItems: 'flex-start',
              position: 'relative',
              left: 18,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '90%',
              }}>
              <TitleText style={styles.title}>INFORMATION GÉNÉRALES</TitleText>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SettingProfileEdit', {doctor: doctor});
                }}>
                <TitleText style={{color: Colors.primary}}>Modifier</TitleText>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Text style={{color: '#676767'}}>Nom du compte</Text>
            <Text style={{color: '#676767'}}>{doctor.accountName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={{color: '#676767'}}>Spécialité</Text>
            <Text style={{color: '#676767'}}>{doctor.speciality}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={{color: '#676767'}}>Email</Text>
            <Text style={{color: '#676767'}}>{doctor.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={{color: '#676767'}}>Téléphone</Text>
            <Text style={{color: '#676767'}}>{doctor.phone}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={{color: '#676767'}}>Date de naissance</Text>
            <Text style={{color: '#676767'}}>{doctor.birthday}</Text>
          </View>
          <View style={styles.lastInfoRow}>
            <Text style={{color: '#676767'}}>INPE</Text>
            <Text style={{color: '#676767'}}>{doctor.inpe}</Text>
          </View>
        </View>
        <View style={styles.secondContainer}>
          <View
            style={{
              width: '100%',
              alignItems: 'flex-start',
              position: 'relative',
              left: 18,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '90%',
              }}>
              <TitleText style={styles.title}>CABINET</TitleText>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SettingCabinetEdit', {
                    doctorOffice: doctor.office,
                  });
                }}>
                <TitleText style={{color: Colors.primary}}>Modifier</TitleText>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Text style={{color: '#676767'}}>Nom</Text>
            <Text style={{color: '#676767'}}>
              {office.officeName && office.officeName}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={{color: '#676767'}}>Email du cabinet</Text>
            <Text style={{color: '#676767'}}>
              {office.officeEmail && office.officeEmail}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={{color: '#676767'}}>Adresse</Text>
            <Text style={{color: '#676767'}}>
              {office.address && office.address}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={{color: '#676767'}}>Ville</Text>
            <Text style={{color: '#676767'}}>{office.town && office.town}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={{color: '#676767'}}>Téléphone</Text>
            <Text style={{color: '#676767'}}>
              {office.phone && office.phone}
            </Text>
          </View>
          <View style={styles.lastInfoRow}>
            <Text style={{color: '#676767'}}>FAX</Text>
            <Text style={{color: '#676767'}}>{office.fax && office.fax}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  firstContainer: {
    width: '100%',
    maxHeight: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    marginBottom: 20,
    shadowColor: 'black',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    // for android
    elevation: 5,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderColor: 'black',
    overflow: 'hidden',
  },
  secondContainer: {
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 20,
    borderColor: Colors.gray,
    borderWidth: 0.7,
  },
  infoRow: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: Colors.gray,
    borderBottomWidth: 0.3,
    paddingVertical: 10,
  },
  lastInfoRow: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  title: {color: 'black', fontSize: 15, marginVertical: 15, fontWeight: '600'},
});

export default SettingProfile;
