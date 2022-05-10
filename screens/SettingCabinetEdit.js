import React, {useState, useReducer} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

import TitleText from '../components/TitleText';
import Colors from '../constants/Colors';
import Card from '../components/Card';

const officeNameReducer = (state, action) => {
  if (action.type === 'DOCTOR_OFFICENAME_INPUT') {
    return {officeName: action.val, isValid: action.val.length >= 5};
  }
  return {
    officeName: '',
    isValid: false,
  };
};
const officeEmailReducer = (state, action) => {
  if (action.type === 'DOCTOR_OFFICEEMAIL_INPUT') {
    console.log(action.val);
    return {officeEmail: action.val, isValid: action.val.includes('@')};
  }
  return {
    officeEmail: '',
    isValid: false,
  };
};
const addressReducer = (state, action) => {
  if (action.type === 'DOCTOR_ADDRESS_INPUT') {
    return {address: action.val, isValid: action.val.length > 5};
  }
  return {
    address: '',
    isValid: false,
  };
};
const townReducer = (state, action) => {
  if (action.type === 'DOCTOR_TOWN_INPUT') {
    return {town: action.val, isValid: action.val.length > 5};
  }
  return {
    town: '',
    isValid: false,
  };
};
const phoneReducer = (state, action) => {
  if (action.type === 'DOCTOR_PHONE_INPUT') {
    return {phone: action.val, isValid: action.val.length >= 10};
  }
  return {
    phone: '',
    isValid: false,
  };
};
const faxReducer = (state, action) => {
  if (action.type === 'DOCTOR_FAX_INPUT') {
    return {fax: action.val, isValid: action.val.length >= 10};
  }
  return {
    fax: '',
    isValid: false,
  };
};

const SettingCabinetEdit = ({navigation, route}) => {
  const [officeNameState, officeNameDispatch] = useReducer(officeNameReducer, {
    officeName: route.params.doctorOffice.officeName,
    isValid: true,
  });
  const [officeEmailState, officeEmailDispatch] = useReducer(
    officeEmailReducer,
    {
      officeEmail: route.params.doctorOffice.officeEmail,
      isValid: true,
    },
  );
  const [addressState, addressDispatch] = useReducer(addressReducer, {
    address: route.params.doctorOffice.address,
    isValid: true,
  });
  const [townState, townDispatch] = useReducer(townReducer, {
    town: route.params.doctorOffice.town,
    isValid: true,
  });
  const [phoneState, phoneDispatch] = useReducer(phoneReducer, {
    phone: route.params.doctorOffice.phone,
    isValid: true,
  });
  const [faxState, faxDispatch] = useReducer(faxReducer, {
    fax: route.params.doctorOffice.fax,
    isValid: true,
  });
  const officeNameHandler = text => {
    officeNameDispatch({
      type: 'DOCTOR_OFFICENAME_INPUT',
      val: text,
    });
  };
  const officeEmailHandler = text => {
    officeEmailDispatch({
      type: 'DOCTOR_OFFICEEMAIL_INPUT',
      val: text,
    });
  };
  const addressHandler = text => {
    addressDispatch({
      type: 'DOCTOR_ADDRESS_INPUT',
      val: text,
    });
  };
  const townHandler = text => {
    townDispatch({
      type: 'DOCTOR_TOWN_INPUT',
      val: text,
    });
  };
  const phoneHandler = text => {
    phoneDispatch({
      type: 'DOCTOR_PHONE_INPUT',
      val: text,
    });
  };
  const faxHandler = text => {
    faxDispatch({
      type: 'DOCTOR_FAX_INPUT',
      val: text,
    });
  };
  const updateSubmitHandler = () => {
    const doctorCredential = {
      officeName: officeNameState.officeName,
      officeEmail: officeEmailState.officeEmail,
      address: addressState.address,
      town: townState.town,
      phone: phoneState.phone,
      fax: faxState.fax,
    };
    submitHandler(doctorCredential);
  };
  const doctor_id = '62714960cc2c77b3db96d84e';
  const submitHandler = doctorCredential => {
    console.log('bbb');
    // const apiURL = `http://10.0.2.2/doctor/officeUpdate/${doctor_id}`;
    const apiURL = `https://sobrus-med.herokuapp.com/doctor/officeUpdate/${doctor_id}`;
    fetch(apiURL, {
      method: 'PATCH',
      headers: {'Content-type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify(doctorCredential),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        if (responseJson.status === 'success') {
          Alert.alert(
            'vos informations ont été mises à jour avec succès',
            'retour à la page de profil',
            [
              {
                text: "D'accord",
                onPress: () => navigation.navigate('SettingProfile'),
              },
            ],
          );
        } else if (responseJson.status === 'error') {
          Alert.alert(
            'vos informations ne sont pas mises à jour avec succès',
            'Réessayez plus tard',
            [
              {
                text: 'Cancel',
                onPress: () => {
                  console.log('cancel');
                },
              },
            ],
          );
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <ScrollView>
      <View style={{flex: 1}}>
        <View style={styles.secondContainer}>
          <View
            style={{
              width: '100%',
              alignItems: 'flex-start',
              position: 'relative',
              left: 18,
            }}>
            <TitleText style={styles.title}>CABINET</TitleText>
          </View>
          <View style={{width: '88%', justifyContent: 'center', marginTop: 25}}>
            <TextInput
              style={{
                height: 50,
                paddingVertical: 10,
                paddingLeft: 16,
                borderColor: Colors.gray,
                borderWidth: 0.5,
                borderRadius: 10,
                width: '100%',
                backgroundColor: Colors.headerBackground,
              }}
              value={officeNameState.officeName}
              onChangeText={officeNameHandler}
            />
            <Text
              style={{
                padding: 5,
                borderRadius: 8,
                backgroundColor: officeNameState.isValid
                  ? Colors.headerBackground
                  : '#FF0000',
                position: 'absolute',
                bottom: 38,
                left: 10,
                color: officeNameState.isValid ? '#746A6A' : 'white',
              }}>
              {officeNameState.isValid ? `Nom` : 'Le nom est trop court'}
            </Text>
          </View>
          <View style={{width: '88%', justifyContent: 'center', marginTop: 25}}>
            <TextInput
              style={{
                height: 50,
                paddingVertical: 10,
                paddingLeft: 16,
                borderColor: Colors.gray,
                borderWidth: 0.5,
                borderRadius: 10,
                width: '100%',
                backgroundColor: Colors.headerBackground,
              }}
              value={officeEmailState.officeEmail}
              onChangeText={officeEmailHandler}
            />
            <Text
              style={{
                padding: 5,
                borderRadius: 8,
                backgroundColor: officeEmailState.isValid
                  ? Colors.headerBackground
                  : '#FF0000',
                position: 'absolute',
                bottom: 38,
                left: 10,
                color: officeEmailState.isValid ? '#746A6A' : 'white',
              }}>
              {officeEmailState.isValid ? `Email du cabinet` : 'où est le "@"'}
            </Text>
          </View>
          <View style={{width: '88%', justifyContent: 'center', marginTop: 25}}>
            <TextInput
              style={{
                height: 50,
                paddingVertical: 10,
                paddingLeft: 16,
                borderColor: Colors.gray,
                borderWidth: 0.5,
                borderRadius: 10,
                width: '100%',
                backgroundColor: Colors.headerBackground,
              }}
              value={addressState.address}
              onChangeText={addressHandler}
            />
            <Text
              style={{
                padding: 5,
                borderRadius: 8,
                backgroundColor: addressState.isValid
                  ? Colors.headerBackground
                  : '#FF0000',
                position: 'absolute',
                bottom: 38,
                left: 10,
                color: addressState.isValid ? '#746A6A' : 'white',
              }}>
              {addressState.isValid ? `Address` : "l'adresse est trop courte"}
            </Text>
          </View>
          <View style={{width: '88%', justifyContent: 'center', marginTop: 25}}>
            <TextInput
              style={{
                height: 50,
                paddingVertical: 10,
                paddingLeft: 16,
                borderColor: Colors.gray,
                borderWidth: 0.5,
                borderRadius: 10,
                width: '100%',
                backgroundColor: Colors.headerBackground,
              }}
              value={townState.town}
              onChangeText={townHandler}
            />
            <Text
              style={{
                padding: 5,
                borderRadius: 8,
                backgroundColor: townState.isValid
                  ? Colors.headerBackground
                  : '#FF0000',
                position: 'absolute',
                bottom: 38,
                left: 10,
                color: townState.isValid ? '#746A6A' : 'white',
              }}>
              {townState.isValid ? `Ville` : 'La ville est trop courte'}
            </Text>
          </View>
          <View style={{width: '88%', justifyContent: 'center', marginTop: 25}}>
            <TextInput
              style={{
                height: 50,
                paddingVertical: 10,
                paddingLeft: 16,
                borderColor: Colors.gray,
                borderWidth: 0.5,
                borderRadius: 10,
                width: '100%',
                backgroundColor: Colors.headerBackground,
              }}
              value={phoneState.phone}
              onChangeText={phoneHandler}
            />
            <Text
              style={{
                padding: 5,
                borderRadius: 8,
                backgroundColor: phoneState.isValid
                  ? Colors.headerBackground
                  : '#FF0000',
                position: 'absolute',
                bottom: 38,
                left: 10,
                color: phoneState.isValid ? '#746A6A' : 'white',
              }}>
              {phoneState.isValid
                ? `Téléphone`
                : 'Le numéro de téléphone est trop court'}
            </Text>
          </View>
          <View style={{width: '88%', justifyContent: 'center', marginTop: 25}}>
            <TextInput
              style={{
                height: 50,
                paddingVertical: 10,
                paddingLeft: 16,
                borderColor: Colors.gray,
                borderWidth: 0.5,
                borderRadius: 10,
                width: '100%',
                backgroundColor: Colors.headerBackground,
              }}
              value={faxState.fax}
              onChangeText={faxHandler}
            />
            <Text
              style={{
                padding: 5,
                borderRadius: 8,
                backgroundColor: faxState.isValid
                  ? Colors.headerBackground
                  : '#FF0000',
                position: 'absolute',
                bottom: 38,
                left: 10,
                color: faxState.isValid ? '#746A6A' : 'white',
              }}>
              {faxState.isValid ? `Fax` : 'Le fax est trop court'}
            </Text>
          </View>
          <TouchableOpacity
            disabled={
              officeNameState.isValid &&
              officeEmailState.isValid &&
              addressState.isValid &&
              townState.isValid &&
              phoneState.isValid &&
              faxState.isValid
                ? false
                : true
            }
            activeOpacity={0.9}
            style={{width: '100%', alignItems: 'center', marginVertical: 30}}
            onPress={() => {
              updateSubmitHandler();
            }}>
            <Card
              style={{
                backgroundColor:
                  officeNameState.isValid &&
                  officeEmailState.isValid &&
                  addressState.isValid &&
                  townState.isValid &&
                  phoneState.isValid &&
                  faxState.isValid
                    ? Colors.primary
                    : '#FF0000',
                width: '90%',
                paddingVertical: 18,
              }}>
              <TitleText style={{fontWeight: '400'}}>Enregister</TitleText>
            </Card>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  secondContainer: {
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 80,
    borderColor: Colors.gray,
    borderWidth: 0.7,
  },
  title: {color: 'black', fontSize: 15, marginVertical: 15, fontWeight: '600'},
});

export default SettingCabinetEdit;
