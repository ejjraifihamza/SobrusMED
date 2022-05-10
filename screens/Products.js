import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import MyText from '../components/MyText';
import Card from '../components/Card';
import Colors from '../constants/Colors';
import HeaderCard from '../components/HeaderCard';
import {productDataFilter} from '../utils/dataFilter';

const Products = props => {
  const [Refreshing, setRefreshing] = useState(false);
  const [filterdData, setfilterdData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [search, setsearch] = useState('');

  const FindProduct = text => {
    productDataFilter(text, masterData, setfilterdData, setsearch);
    // if (text) {
    //   const newData = masterData.filter(item => {
    //     const itemData = item.productName
    //       ? item.productName.toUpperCase()
    //       : ''.toUpperCase();
    //     const textData = text.toUpperCase();
    //     return itemData.indexOf(textData) > -1;
    //   });
    //   setfilterdData(newData);
    //   setsearch(text);
    // } else {
    //   setfilterdData(masterData);
    //   setsearch(text);
    // }
  };

  const fetchProducts = () => {
    // const apiURL = 'http://10.0.2.2/doctor/getProducts';
    const apiURL = 'https://sobrus-med.herokuapp.com/doctor/getProducts';
    fetch(apiURL)
      .then(response => response.json())
      .then(responseJson => {
        setfilterdData(responseJson.output.products);
        setmasterData(responseJson.output.products);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchProducts();
    return () => {};
  }, []);

  return (
    <View style={styles.screen}>
      <HeaderCard
        title="Produits"
        info={`${masterData.length} produits`}
        buttonText="+ Suggérer un produit"
        placeholder="Recherche un produit"
        onChangeText={FindProduct}
        value={search}
      />
      {masterData.length === 0 ? (
        <View style={{marginTop: 30}}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={Refreshing} onRefresh={fetchProducts} />
          }>
          <View style={styles.body}>
            <FlatList
              data={filterdData}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    props.navigation.navigate('ProductDetails', {
                      _id: item._id,
                    });
                    console.log('Clicked!');
                  }}>
                  <View style={styles.productInfo}>
                    <View style={styles.firstRow}>
                      <View style={styles.firstInRow}>
                        <Card style={styles.pillsCard}>
                          <Image
                            style={styles.pills}
                            source={require('../assets/icons/Pill-1.png')}
                          />
                        </Card>
                        <View style={styles.userInfo}>
                          <MyText
                            style={{
                              color: '#000',
                              fontFamily: 'SourceSansPro-Bold',
                              fontSize: 14,
                            }}>
                            {item.productName}
                          </MyText>
                          <Text
                            style={{
                              color: Colors.gray,
                              fontFamily: 'SourceSansPro-SemiBold',
                              fontSize: 15,
                            }}>
                            {item.dci}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.moreIcon}>
                        <Pressable
                          onPress={() => {
                            console.log('Pressed');
                          }}>
                          <View>
                            <Image
                              source={require('../assets/icons/More.png')}
                            />
                          </View>
                        </Pressable>
                      </View>
                    </View>
                    <View style={styles.secondRow}>
                      <View style={{position: 'relative', left: 0}}>
                        <Text
                          style={{
                            color: Colors.gray,
                            fontFamily: 'SourceSansPro-Regular',
                            fontSize: 15,
                          }}>
                          {item.therapeuticClass}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
            <View
              style={{
                alignItems: 'center',
                paddingBottom: 100,
                paddingTop: 20,
                backgroundColor: Colors.lightGray,
              }}>
              <Pressable
                onPress={() => {
                  console.log('Pressed');
                }}>
                <Text
                  style={{
                    color: Colors.primary,
                    fontFamily: 'SourceSansPro-SemiBold',
                    fontSize: 17,
                  }}>
                  + Suggérer un produit
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
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
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
  },
  productInfo: {
    width: '100%',
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
    alignItems: 'baseline',
    height: 60,
    width: '80%',
  },
  firstInRow: {
    flexDirection: 'row',
  },
  moreIcon: {
    position: 'relative',
    left: 10,
    bottom: 20,
  },
  secondRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '85%',
  },
});

export default Products;
