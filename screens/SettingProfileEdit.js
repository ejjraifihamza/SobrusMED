import React, {useReducer, useState} from 'react';
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

const accountNameReducer = (state, action) => {
  if (action.type === 'DOCTOR_ACCOUNTNAME_INPUT') {
    return {accountName: action.val, isValid: action.val.length >= 5};
  }
  return {
    accountName: '',
    isValid: false,
  };
};
const specialityReducer = (state, action) => {
  if (action.type === 'DOCTOR_SPECIALITY_INPUT') {
    return {speciality: action.val, isValid: action.val.length > 5};
  }
  return {
    speciality: '',
    isValid: false,
  };
};
const emailReducer = (state, action) => {
  if (action.type === 'DOCTOR_EMAIL_INPUT') {
    return {email: action.val, isValid: action.val.includes('@')};
  }
  return {
    email: '',
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
const birthdayReducer = (state, action) => {
  if (action.type === 'DOCTOR_BIRTHDAY_INPUT') {
    return {birthday: action.val, isValid: action.val.length > 5};
  }
  return {
    birthday: '',
    isValid: false,
  };
};
const inpeReducer = (state, action) => {
  if (action.type === 'DOCTOR_INPE_INPUT') {
    return {inpe: action.val, isValid: action.val.length >= 6};
  }
  return {
    inpe: '',
    isValid: false,
  };
};

const SettingProfileEdit = ({navigation, route}) => {
  const [accountNameState, accountNameDispatch] = useReducer(
    accountNameReducer,
    {
      accountName: route.params.doctor.accountName,
      isValid: true,
    },
  );
  const [specialityState, specialityDispatch] = useReducer(specialityReducer, {
    speciality: route.params.doctor.speciality,
    isValid: true,
  });
  const [emailState, emailDispatch] = useReducer(emailReducer, {
    email: route.params.doctor.email,
    isValid: true,
  });
  const [phoneState, phoneDispatch] = useReducer(phoneReducer, {
    phone: route.params.doctor.phone,
    isValid: true,
  });
  const [birthdayState, birthdayDispatch] = useReducer(birthdayReducer, {
    birthday: route.params.doctor.birthday,
    isValid: true,
  });
  const [inpeState, inpeDispatch] = useReducer(inpeReducer, {
    inpe: route.params.doctor.inpe,
    isValid: true,
  });

  const accountNameHandler = text => {
    accountNameDispatch({
      type: 'DOCTOR_ACCOUNTNAME_INPUT',
      val: text,
    });
  };
  const specialityHandler = text => {
    specialityDispatch({
      type: 'DOCTOR_SPECIALITY_INPUT',
      val: text,
    });
  };
  const emailHandler = text => {
    emailDispatch({
      type: 'DOCTOR_EMAIL_INPUT',
      val: text,
    });
  };
  const phoneHandler = text => {
    phoneDispatch({
      type: 'DOCTOR_PHONE_INPUT',
      val: text,
    });
  };
  const birthdayHandler = text => {
    birthdayDispatch({
      type: 'DOCTOR_BIRTHDAY_INPUT',
      val: text,
    });
  };
  const inpeHandler = text => {
    inpeDispatch({
      type: 'DOCTOR_INPE_INPUT',
      val: text,
    });
  };
  const updateSubmitHandler = () => {
    const doctorCredential = {
      accountName: accountNameState.accountName,
      speciality: specialityState.speciality,
      email: emailState.email,
      phone: phoneState.phone,
      birthday: birthdayState.birthday,
      inpe: inpeState.inpe,
    };
    submitHandler(doctorCredential);
  };
  const doctor_id = '62714960cc2c77b3db96d84e';
  const submitHandler = doctorCredential => {
    console.log('bbb');
    // const apiURL = `http://10.0.2.2/doctor/profileUpdate/${doctor_id}`;
    const apiURL = `https://sobrus-med.herokuapp.com/doctor/profileUpdate/${doctor_id}`;
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
            <TitleText style={styles.title}>INFORMATION GÉNÉRALES</TitleText>
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
              value={accountNameState.accountName}
              onChangeText={accountNameHandler}
            />
            <Text
              style={{
                padding: 5,
                borderRadius: 8,
                backgroundColor: accountNameState.isValid
                  ? Colors.headerBackground
                  : '#FF0000',
                position: 'absolute',
                bottom: 38,
                left: 10,
                color: accountNameState.isValid ? '#746A6A' : 'white',
              }}>
              {accountNameState.isValid
                ? `Nom du compte`
                : 'Le nom est trop court'}
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
              value={specialityState.speciality}
              onChangeText={specialityHandler}
            />
            <Text
              style={{
                padding: 5,
                borderRadius: 8,
                backgroundColor: specialityState.isValid
                  ? Colors.headerBackground
                  : '#FF0000',
                position: 'absolute',
                bottom: 38,
                left: 10,
                color: specialityState.isValid ? '#746A6A' : 'white',
              }}>
              {specialityState.isValid
                ? `Spécialité`
                : 'la spécialité est trop court'}
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
              value={emailState.email}
              onChangeText={emailHandler}
            />
            <Text
              style={{
                padding: 5,
                borderRadius: 8,
                backgroundColor: emailState.isValid
                  ? Colors.headerBackground
                  : '#FF0000',
                position: 'absolute',
                bottom: 38,
                left: 10,
                color: emailState.isValid ? '#746A6A' : 'white',
              }}>
              {emailState.isValid ? `Email` : 'où est le "@"'}
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
                : 'Entrez un numéro de téléphone valide'}
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
              value={birthdayState.birthday}
              onChangeText={birthdayHandler}
            />
            <Text
              style={{
                padding: 5,
                borderRadius: 8,
                backgroundColor: birthdayState.isValid
                  ? Colors.headerBackground
                  : '#FF0000',
                position: 'absolute',
                bottom: 38,
                left: 10,
                color: birthdayState.isValid ? '#746A6A' : 'white',
              }}>
              {birthdayState.isValid
                ? `Date de naissance`
                : 'Entrez une date valide'}
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
              value={inpeState.inpe}
              onChangeText={inpeHandler}
            />
            <Text
              style={{
                padding: 5,
                borderRadius: 8,
                backgroundColor: inpeState.isValid
                  ? Colors.headerBackground
                  : '#FF0000',
                position: 'absolute',
                bottom: 38,
                left: 10,
                color: inpeState.isValid ? '#746A6A' : 'white',
              }}>
              {inpeState.isValid ? `INPE` : 'la INPE est trop court'}
            </Text>
          </View>
          <TouchableOpacity
            disabled={
              accountNameState.isValid &&
              emailState.isValid &&
              specialityState.isValid &&
              phoneState.isValid &&
              birthdayState.isValid &&
              inpeState.isValid
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
                  accountNameState.isValid &&
                  emailState.isValid &&
                  specialityState.isValid &&
                  phoneState.isValid &&
                  birthdayState.isValid &&
                  inpeState.isValid
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

export default SettingProfileEdit;
