import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import MainButton from '../components/MainButton';
import OrdDate from '../components/OrdDate';
import Colors from '../constants/Colors';
import Card from '../components/Card';
import TitleText from '../components/TitleText';
import PatientModal from '../components/PatientModal';
import ProductModal from '../components/ProductModal';
import {patientDataFilter, productDataFilter} from '../utils/dataFilter';
import {
  addRequest,
  getPatientRequest,
  getProductRequest,
} from '../utils/requests';

const AddPrescription = ({navigation}) => {
  const [filterdData, setfilterdData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [search, setsearch] = useState('');
  const [productFilterdData, setProductFilterdData] = useState([]);
  const [productMasterData, setProductMasterData] = useState([]);
  const [ProductSearch, setProductSearch] = useState('');
  const [patient, setPatient] = useState('choisir un patient');
  const [patientId, setPatientId] = useState('');
  const [product, setProduct] = useState('choisir un produit');
  const [productId, setProductId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [productModalVisible, setProductModalVisible] = useState(false);
  const [dosage, setDosage] = useState('');
  const [duration, setDuration] = useState('');

  const dosageHandler = text => {
    setDosage(text);
  };
  const durationHandler = text => {
    setDuration(text);
  };

  const doctorInput = () => {
    const Prescription = {
      doctor_id: '62714960cc2c77b3db96d84e',
      patient_id: patientId,
      product,
      dosage,
      durationOfTreatment: duration,
    };
    submitHandler(Prescription);
  };

  const submitHandler = Prescription => {
    // const apiURL = `http://10.0.2.2/doctor/addPrescription`;
    const apiURL = `https://sobrus-med.herokuapp.com/doctor/addPrescription`;
    addRequest(
      apiURL,
      'POST',
      Prescription,
      'Votre prescription a été enregistrée avec succès',
      'retour à la page de prescription',
      navigation,
      'Prescription',
      'vos prescription ne sont pas mises à jour avec succès',
      'Réessayez plus tard',
    );
  };

  const FindPatient = text => {
    patientDataFilter(text, masterData, setfilterdData, setsearch);
  };
  const fetchPatients = () => {
    // const apiURL = 'http://10.0.2.2/doctor/getPatients';
    const apiURL = 'https://sobrus-med.herokuapp.com/doctor/getPatients';
    getPatientRequest(apiURL, setfilterdData, setmasterData);
  };

  const FindProduct = text => {
    productDataFilter(
      text,
      productMasterData,
      setProductFilterdData,
      setProductSearch,
    );
  };
  const fetchProducts = () => {
    // const apiURL = 'http://10.0.2.2/doctor/getProducts';
    const apiURL = 'https://sobrus-med.herokuapp.com/doctor/getProducts';
    getProductRequest(apiURL, setProductFilterdData, setProductMasterData);
  };

  useEffect(() => {
    fetchProducts();
    fetchPatients();
    return () => {};
  }, []);

  return (
    <ScrollView>
      <View style={styles.screen}>
        <View
          style={{
            backgroundColor: 'white',
            width: '90%',
            alignItems: 'center',
            marginTop: 15,
            marginBottom: 25,
            shadowColor: 'black',
            shadowOffset: {
              height: 2,
              width: 0,
            },
            shadowRadius: 6,
            shadowOpacity: 0.26,
            // for android
            elevation: 5,
            paddingTop: 20,
            paddingBottom: 10,
          }}>
          <OrdDate date={new Date().toISOString().split('T')[0]} />
          <View
            style={{
              width: '100%',
              marginVertical: 20,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                alignItems: 'flex-end',
                width: '90%',
              }}>
              <Text style={{color: Colors.primary}}>Choisir un modèle</Text>
            </TouchableOpacity>
            <View
              style={{
                width: '100%',
                marginVertical: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={{width: '90%', justifyContent: 'center'}}>
                <View style={{width: '100%', justifyContent: 'center'}}>
                  <View style={styles.chooseField} />
                  <View
                    style={{
                      height: 25,
                      width: 25,
                      borderRadius: 50,
                      borderColor: 'black',
                      overflow: 'hidden',
                      position: 'absolute',
                      left: 15,
                    }}>
                    <Image
                      style={{width: '100%', height: '100%'}}
                      source={{
                        uri: 'https://cdn3.iconfinder.com/data/icons/corona-pandemic-disease/512/003-patient-512.png',
                      }}
                    />
                  </View>
                  <View style={styles.pullDown}>
                    <Image
                      style={{width: '100%', height: '100%'}}
                      source={require('../assets/icons/icons8-pull-down-50.png')}
                    />
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      left: 70,
                    }}>
                    <Text>{patient}</Text>
                  </View>
                  <Text style={styles.fieldText}>Patient</Text>
                </View>
              </TouchableOpacity>
              <PatientModal
                modalVisible={modalVisible}
                FindPatient={FindPatient}
                search={search}
                filterdData={filterdData}
                setPatient={setPatient}
                setPatientId={setPatientId}
                setModalVisible={setModalVisible}
              />
              <ProductModal
                productModalVisible={productModalVisible}
                FindProduct={FindProduct}
                ProductSearch={ProductSearch}
                productFilterdData={productFilterdData}
                setProduct={setProduct}
                setProductId={setProductId}
                setProductModalVisible={setProductModalVisible}
              />
              <View
                style={{width: '90%', justifyContent: 'center', marginTop: 40}}>
                <TouchableOpacity
                  onPress={() => setProductModalVisible(true)}
                  style={{width: '100%', justifyContent: 'center'}}>
                  <View style={styles.chooseField} />

                  <View
                    style={{
                      height: 18,
                      width: 25,
                      borderColor: 'black',
                      overflow: 'hidden',
                      position: 'absolute',
                      left: 15,
                    }}>
                    <Image
                      style={{width: '100%', height: '100%'}}
                      source={require('../assets/icons/drugs-capsules-and-pills-3.png')}
                    />
                  </View>
                  <View style={styles.pullDown}>
                    <Image
                      style={{width: '100%', height: '100%'}}
                      source={require('../assets/icons/icons8-pull-down-50.png')}
                    />
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      left: 70,
                    }}>
                    <Text>
                      {product.split(' ')[0]}
                      {' ...'}
                    </Text>
                  </View>
                  <Text style={styles.fieldText}>Produit</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{width: '90%', justifyContent: 'center', marginTop: 20}}>
                <TextInput
                  onChangeText={dosageHandler}
                  style={styles.inputText}
                  value={dosage}
                  placeholder="entrez votre posologie"
                />
                <Text style={styles.fieldText}>Posologie</Text>
              </View>
              <View
                style={{width: '90%', justifyContent: 'center', marginTop: 20}}>
                <TextInput
                  onChangeText={durationHandler}
                  style={styles.inputText}
                  value={duration}
                  placeholder="entrez votre durée"
                />
                <Text style={styles.fieldText}>Durée du traitement</Text>
              </View>
              <MainButton
                style={{
                  marginTop: 20,
                  paddingVertical: 8,
                  paddingHorizontal: 20,
                }}>
                Ajoute un produit
              </MainButton>
              <TouchableOpacity
                style={{
                  alignItems: 'flex-start',
                  width: '90%',
                  marginTop: 30,
                }}>
                <Text style={{color: Colors.primary}}>
                  + Rédiger un Commentaire
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            width: '90%',
            marginTop: 10,
          }}>
          <Text style={{color: Colors.primary}}>Enregistrer sous modèle</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          style={{width: '100%', alignItems: 'center'}}
          onPress={() => {
            doctorInput();
          }}>
          <Card
            style={{
              backgroundColor: Colors.primary,
              width: '90%',
              paddingVertical: 18,
              marginTop: 20,
            }}>
            <TitleText style={{fontWeight: '400'}}>Enregistrer</TitleText>
          </Card>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 100,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  chooseField: {
    height: 50,
    paddingVertical: 10,
    paddingLeft: 60,
    borderColor: Colors.gray,
    borderWidth: 0.5,
    borderRadius: 10,
    width: '100%',
    backgroundColor: Colors.headerBackground,
  },
  pullDown: {
    height: 20,
    width: 20,
    borderRadius: 50,
    borderColor: 'black',
    overflow: 'hidden',
    position: 'absolute',
    right: 15,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputText: {
    height: 50,
    paddingVertical: 10,
    paddingLeft: 16,
    borderColor: Colors.gray,
    borderWidth: 0.5,
    borderRadius: 10,
    width: '100%',
    backgroundColor: Colors.headerBackground,
  },
  fieldText: {
    padding: 5,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 38,
    left: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default AddPrescription;
