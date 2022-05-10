import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import TitleText from '../components/TitleText';
import Colors from '../constants/Colors';

const PatientDetails = ({route}) => {
  console.log('render');
  const [patient, setPatient] = useState({});
  const fetchPatient = () => {
    // const apiURL = `http://10.0.2.2/doctor/getPatient/${route.params._id}`;
    const apiURL = `https://sobrus-med.herokuapp.com/doctor/getPatient/${route.params._id}`;
    fetch(apiURL)
      .then(response => response.json())
      .then(responseJson => {
        setPatient(responseJson.output.patient);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchPatient();
    return () => {};
  }, []);
  return (
    <ScrollView>
      <View style={styles.screen}>
        <View style={styles.firstContainer}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: `${patient.avatar}`}} />
          </View>
          <Text
            style={{
              color: '#302F2F',
              marginTop: 5,
              fontFamily: 'SourceSansPro-Bold',
              fontSize: 18,
            }}>
            {patient.fullName}
          </Text>
          <Text
            style={{
              color: '#B9B9B9',
              marginTop: 7,
              fontFamily: 'SourceSansPro-SemiBold',
              fontSize: 16,
            }}>
            6 ordonnances
          </Text>
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
              <Text style={styles.title}>INFORMATION GÉNÉRALES</Text>
              <TouchableOpacity onPress={() => {}}>
                <Text
                  style={{
                    color: Colors.primary,
                    fontFamily: 'SourceSansPro-Bold',
                    fontSize: 16,
                  }}>
                  Modifier
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.text}>Nom</Text>
            <Text style={styles.text}>
              {patient.fullName && patient.fullName.split(' ')[0]}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.text}>Prénom</Text>
            <Text style={styles.text}>
              {patient.fullName && patient.fullName.split(' ')[1]}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.text}>CIN</Text>
            <Text style={styles.text}>{patient.cin}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.text}>Date de naissance</Text>
            <Text style={styles.text}>
              {patient.birthday &&
                `(${
                  new Date().getFullYear() - patient.birthday.split('-')[0]
                } ans) ${patient.birthday}`}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.text}>Téléphone</Text>
            <Text
              style={{
                color: Colors.primary,
                fontFamily: 'SourceSansPro-SemiBold',
                fontSize: 15,
              }}>
              {patient.phone}
            </Text>
          </View>
          <View style={styles.lastInfoRow}>
            <Text style={styles.text}>Date de création</Text>
            <Text style={styles.text}>
              {patient.createdAt && patient.createdAt.split('T')[0]}{' '}
              {patient.createdAt && patient.createdAt.split('T')[1].slice(0, 5)}
            </Text>
          </View>
        </View>
        <View style={styles.ThirdContainer}>
          <View
            style={{
              width: '100%',
              alignItems: 'flex-start',
              position: 'relative',
              left: 18,
            }}>
            <TitleText style={styles.title}>ORDONNANCES</TitleText>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
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
    width: 50,
    height: 50,
    borderRadius: 50,
    borderColor: 'black',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
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
  ThirdContainer: {
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderColor: Colors.gray,
    borderWidth: 0.7,
    marginBottom: 70,
  },
  title: {
    color: '#302F2F',
    fontSize: 16,
    marginVertical: 15,
    fontFamily: 'SourceSansPro-Bold',
  },
  text: {
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: 15,
    color: '#676767',
  },
});

export default PatientDetails;
