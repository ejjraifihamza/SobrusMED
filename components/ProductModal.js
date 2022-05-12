import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Colors from '../constants/Colors';

const PatientModal = props => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.productModalVisible}
      onRequestClose={() => {
        props.setProductModalVisible(!props.productModalVisible);
      }}>
      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          backgroundColor: Colors.lightGray,
        }}>
        <View
          style={{
            alignItems: 'center',
            marginVertical: 10,
            width: '90%',
            borderColor: 'black',
            borderWidth: 0.7,
            borderRadius: 10,
          }}>
          <TextInput
            placeholder="Rechercher un produit"
            style={{height: 40, padding: 10}}
            onChangeText={props.FindProduct}
            value={props.ProductSearch}
          />
        </View>
        <ScrollView
          style={{
            width: '90%',
            marginBottom: 20,
          }}>
          <View
            style={{
              width: '100%',
            }}>
            {props.productFilterdData.map(item => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    props.setProduct(item.productName);
                    props.setProductId(item._id);
                    props.setProductModalVisible(false);
                  }}>
                  <View
                    key={item._id}
                    style={{
                      borderBottomColor: 'black',
                      borderBottomWidth: 0.7,
                      paddingVertical: 10,
                    }}>
                    <Text>{item.productName}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default PatientModal;
