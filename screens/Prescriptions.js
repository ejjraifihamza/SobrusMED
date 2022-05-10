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
import Card from '../components/Card';
import Colors from '../constants/Colors';
import {patientTwoDataFilter} from '../utils/dataFilter';

const Prescriptions = ({navigation}) => {
  const [Refreshing, setRefreshing] = useState(false);
  const [filterdData, setfilterdData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [search, setsearch] = useState('');

  const GoToAddPrescription = () => {
    navigation.navigate('AddPrescription', {prescriptions: masterData});
  };

  const FindPatient = text => {
    patientTwoDataFilter(text, masterData, setfilterdData, setsearch);
  };

  const fetchPrescriptions = () => {
    // const apiURL = 'http://10.0.2.2/doctor/getPrescriptions';
    const apiURL = 'https://sobrus-med.herokuapp.com/doctor/getPrescriptions';
    fetch(apiURL)
      .then(response => response.json())
      .then(responseJson => {
        setfilterdData(responseJson.output.prescriptions);
        setmasterData(responseJson.output.prescriptions);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchPrescriptions();
    return () => {};
  }, []);
  console.log('filteredData', filterdData);
  return (
    <View style={styles.screen}>
      <HeaderCard
        title="Ordonnances"
        info={`${masterData.length} ordonnances`}
        buttonText="+ Nouvelle ordonance"
        placeholder="Recherche un patient"
        onPress={GoToAddPrescription}
        onChangeText={FindPatient}
        value={search}
      />
      {masterData.length === 0 ? (
        <View style={{marginTop: 30}}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <FlatList
          onRefresh={fetchPrescriptions}
          refreshing={Refreshing}
          data={filterdData}
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                navigation.navigate('PrescriptionDetails', {
                  item,
                });
              }}>
              <View style={styles.productInfo}>
                <View style={styles.firstRow}>
                  <View style={styles.firstInRow}>
                    <Card style={styles.pillsCard}>
                      <Image
                        style={styles.pills}
                        source={require('../assets/icons/Prescription-2.png')}
                      />
                    </Card>
                    <View style={styles.userInfo}>
                      <Text
                        style={{
                          color: '#302F2F',
                          fontFamily: 'SourceSansPro-Bold',
                          fontSize: 15,
                        }}>
                        {item.patient_id.fullName}
                      </Text>
                      <Text
                        style={{
                          color: Colors.gray,
                          fontFamily: 'SourceSansPro-SemiBold',
                          fontSize: 15,
                        }}>
                        {item.createdAt && item.createdAt.split('T')[0]}{' '}
                        {item.createdAt &&
                          item.createdAt.split('T')[1].slice(0, 5)}
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
                <View style={styles.secondRow}>
                  <View style={{position: 'relative', left: 33}}>
                    <Text
                      style={{
                        color: Colors.gray,
                        fontFamily: 'SourceSansPro-SemiBold',
                        fontSize: 15,
                      }}>
                      ID : {item._id.slice(0, 10)}
                    </Text>
                  </View>
                  <View style={{width: 80}}>
                    <Text
                      style={{
                        color: 'white',
                        fontFamily: 'SourceSansPro-SemiBold',
                        fontSize: 14,
                        backgroundColor:
                          item.status === 'Enregistré'
                            ? Colors.lightGreen
                            : Colors.orange,
                        textAlign: 'center',
                        paddingVertical: 5,
                        borderRadius: 3,
                      }}>
                      {item.status}
                    </Text>
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

const colors = [
  Colors.blue,
  Colors.green,
  Colors.orchid,
  Colors.secondary,
  Colors.primary,
];
let randomColor = colors[Math.floor(Math.random() * colors.length)];

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    paddingBottom: 70,
  },
  productInfo: {
    // marginVertical: 10,
    width: '100%',
    // justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: Colors.gray,
    borderBottomWidth: 0.3,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  firstRow: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pillsCard: {
    width: 50,
    height: 50,
    backgroundColor: randomColor,
    borderRadius: 5,
  },
  pills: {
    // color: '#fff',
  },
  userInfo: {
    position: 'relative',
    left: 10,
    bottom: 10,
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    height: 60,
    width: '70%',
  },
  firstInRow: {
    flexDirection: 'row',
  },
  moreIcon: {
    position: 'relative',
    left: 30,
    bottom: 20,
  },
  secondRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '85%',
  },
});

export default Prescriptions;
