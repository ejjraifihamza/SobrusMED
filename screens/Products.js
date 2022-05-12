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
import {getProductRequest} from '../utils/requests';

const Products = props => {
  const [Refreshing, setRefreshing] = useState(false);
  const [filterdData, setfilterdData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [search, setsearch] = useState('');

  const FindProduct = text => {
    productDataFilter(text, masterData, setfilterdData, setsearch);
  };

  const fetchProducts = () => {
    // const apiURL = 'http://10.0.2.2/doctor/getProducts';
    const apiURL = 'https://sobrus-med.herokuapp.com/doctor/getProducts';
    getProductRequest(apiURL, setfilterdData, setmasterData);
  };

  const colors = [
    Colors.primary,
    Colors.green,
    Colors.orchid,
    Colors.blue,
    Colors.secondary,
  ];
  let colorIndex = 0;
  const getColor = () => {
    if (colorIndex > 4) colorIndex = 0;
    const color = colors[colorIndex];
    colorIndex++;
    return color;
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
              renderItem={({item}) => (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    props.navigation.navigate('ProductDetails', {
                      _id: item._id,
                    });
                  }}>
                  <View style={styles.productInfo}>
                    <View style={styles.firstRow}>
                      <View style={styles.firstInRow}>
                        <Card
                          style={{
                            ...styles.pillsCard,
                            backgroundColor: getColor(),
                          }}>
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
                paddingBottom: 50,
                paddingTop: 20,
                backgroundColor: Colors.headerBackground,
              }}></View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

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
    borderRadius: 5,
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
