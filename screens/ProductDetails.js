import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, ScrollView, Image} from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/Colors';

const ProductDetails = ({route}) => {
  const [product, setProduct] = useState({});
  const fetchProduct = () => {
    // const apiURL = `http://10.0.2.2/doctor/getProduct/${route.params._id}`;
    const apiURL = `https://sobrus-med.herokuapp.com/doctor/getProduct/${route.params._id}`;
    fetch(apiURL)
      .then(response => response.json())
      .then(responseJson => {
        setProduct(responseJson.output.product);
      })
      .catch(error => {
        console.error(error);
      });
  };
  useEffect(() => {
    fetchProduct();
    return () => {};
  }, []);
  return (
    <ScrollView>
      <View style={styles.screen}>
        <View style={styles.firstContainer}>
          <Card style={styles.pillsCard}>
            <Image
              style={styles.pills}
              source={require('../assets/icons/Pill-1.png')}
            />
          </Card>
          <Text
            style={{
              color: 'black',
              marginTop: 10,
              fontFamily: 'SourceSansPro-Bold',
              fontSize: 18,
            }}>
            {product.productName}
          </Text>
          <Text
            style={{
              color: Colors.gray,
              marginTop: 10,
              fontFamily: 'SourceSansPro-SemiBold',
              fontSize: 16,
            }}>
            {product.dci}
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
            <Text style={styles.title}>INFORMATION GÉNÉRALES</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.text}>Nom du produit</Text>
            <Text style={styles.text}>{product.productName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.text}>DCI</Text>
            <Text style={styles.text}>{product.dci}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.text}>Classe thérapeutique</Text>
            <Text style={styles.text}>{product.therapeuticClass}</Text>
          </View>
          <View style={styles.lastInfoRow}>
            <Text style={styles.text}>Laboratoire</Text>
            <Text style={styles.text}>{product.laboratory}</Text>
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
            <Text style={styles.title}>POSOLOGIES</Text>
          </View>

          <View style={styles.textView}>
            <Text style={styles.text}>Adulte</Text>
            <Text style={styles.text}>
              {product.dosage && product.dosage.adult}
            </Text>
          </View>
          <View style={styles.textView}>
            <Text style={styles.text}>Enfant</Text>
            <Text style={styles.text}>
              {product.dosage && product.dosage.child}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '90%',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 10,
            }}>
            <Text style={styles.text}>Nourissant</Text>
            <Text style={styles.text}>
              {product.dosage && product.dosage.feeding}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
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
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 80,
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
  pillsCard: {
    width: 55,
    height: 55,
    backgroundColor: randomColor,
    borderRadius: 5,
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
  },
  textView: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: Colors.gray,
    borderBottomWidth: 0.3,
    paddingVertical: 10,
  },
  title: {
    color: 'black',
    marginVertical: 15,
    fontFamily: 'SourceSansPro-Bold',
    fontSize: 15,
  },
  text: {
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: 15,
    color: '#676767',
  },
});

export default ProductDetails;
