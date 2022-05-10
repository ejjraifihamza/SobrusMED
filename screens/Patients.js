import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import HeaderCard from '../components/HeaderCard';
import Colors from '../constants/Colors';
import {patientDataFilter} from '../utils/dataFilter';

const Patients = ({navigation}) => {
  const [Refreshing, setRefreshing] = useState(false);
  const [filterdData, setfilterdData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [search, setsearch] = useState('');

  const FindPatient = text => {
    patientDataFilter(text, masterData, setfilterdData, setsearch);
  };

  const fetchPatients = () => {
    // const apiURL = 'http://10.0.2.2/doctor/getPatients';
    const apiURL = 'https://sobrus-med.herokuapp.com/doctor/getPatients';
    fetch(apiURL)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson.output);
        setfilterdData(responseJson.output.patients);
        setmasterData(responseJson.output.patients);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchPatients();
    return () => {};
  }, []);
  return (
    <View style={styles.screen}>
      <HeaderCard
        title="Mes patients"
        info={`${masterData.length} patients`}
        buttonText="+ Nouveau patient"
        placeholder="Recherche un patient"
        onChangeText={FindPatient}
        value={search}
      />
      {masterData.length === 0 ? (
        <View style={{marginTop: 30}}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <FlatList
          onRefresh={fetchPatients}
          refreshing={Refreshing}
          data={filterdData}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PatientDetails', {_id: item._id});
              }}>
              <View
                style={{
                  alignItems: 'center',
                  paddingVertical: 10,
                }}>
                <View style={styles.patientCard}>
                  <View style={styles.patientInfo}>
                    <View style={styles.imageContainer}>
                      <Image
                        style={styles.image}
                        source={{uri: `${item.avatar}`}}
                      />
                    </View>
                    <View style={styles.patientInfoText}>
                      <Text
                        style={{
                          color: '#302F2F',
                          fontFamily: 'SourceSansPro-Bold',
                          fontSize: 15,
                        }}>
                        {item.fullName}
                      </Text>
                      <Text
                        style={{
                          color: '#B9B9B9',
                          fontFamily: 'SourceSansPro-SemiBold',
                          fontSize: 15,
                        }}>
                        {`${
                          new Date().getFullYear() - item.birthday.split('-')[0]
                        } ans`}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.moreIcon}>
                    <Pressable
                      onPress={() => {
                        console.log('Pressed');
                      }}>
                      <View>
                        <Image source={require('../assets/icons/More.png')} />
                      </View>
                    </Pressable>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 60,
  },
  patientCard: {
    flexDirection: 'row',
    width: '90%',
    borderColor: Colors.gray,
    borderBottomWidth: 0.3,
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginVertical: 2,
  },
  patientInfo: {
    flexDirection: 'row',
    // padding: 10,
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
  patientInfoText: {
    position: 'relative',
    left: 10,
    bottom: 10,
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    height: 60,
    width: '70%',
  },
  moreIcon: {
    position: 'relative',
    left: 0,
    bottom: 20,
  },
});

export default Patients;
