import React from 'react';
import {View, StyleSheet, ScrollView, Text, Image} from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/Colors';

const Dashboard = () => {
  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.screen}>
        <Text style={styles.title}>Tableau de bord</Text>
        <View style={{width: '90%'}}>
          <Card style={styles.wildCardGreen}>
            <Text style={styles.number}>6</Text>
            <View style={{flexDirection: 'row'}}>
              <View style={{width: 20, height: 20}}>
                <Image source={require('../assets/icons/User.png')} />
              </View>
              <Text style={styles.bigText}>Nombre de patients au total</Text>
            </View>
          </Card>
          <View style={styles.container}>
            <Card style={styles.smallCardGreen}>
              <Text style={styles.number}>6</Text>
              <Text style={styles.smallText}>Nombre de patients ce mois</Text>
            </Card>
            <Card style={styles.smallCardGreen}>
              <Text style={styles.number}>6</Text>
              <Text style={styles.smallText}>
                Nombre de patients cette semaine
              </Text>
            </Card>
          </View>
          <Card style={styles.wildCardOrchid}>
            <Text style={styles.number}>2</Text>
            <View style={{flexDirection: 'row'}}>
              <View style={{width: 20, height: 20}}>
                <Image
                  style={{width: '100%', height: '100%'}}
                  source={require('../assets/icons/Prescription-2.png')}
                />
              </View>
              <Text style={styles.bigText}>Nombre d’ordonnances au total</Text>
            </View>
          </Card>
          <View style={styles.container}>
            <Card style={styles.smallCardOrchid}>
              <Text style={styles.number}>6</Text>
              <Text style={styles.smallText}>
                Nombre des ordonnances ce mois
              </Text>
            </Card>
            <Card style={styles.smallCardOrchid}>
              <Text style={styles.number}>6</Text>
              <Text style={styles.smallText}>
                Nombre des ordonnances cette semaine
              </Text>
            </Card>
          </View>
          <Card style={styles.wildCardBlue}>
            <Text style={styles.number}>68292</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                width: '40%',
              }}>
              <View style={{width: 35, height: 25}}>
                <Image
                  style={{width: '100%', height: '100%'}}
                  source={require('../assets/icons/Pill-1.png')}
                />
              </View>
              <Text style={styles.bigText}>Produits</Text>
            </View>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 120,
  },
  title: {
    marginVertical: 15,
    color: '#000',
    width: '90%',
    fontFamily: 'SourceSansPro-Bold',
    fontSize: 19,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  wildCardGreen: {
    backgroundColor: Colors.green,
    width: '100%',
  },
  wildCardOrchid: {
    backgroundColor: Colors.orchid,
    width: '100%',
  },
  wildCardBlue: {
    backgroundColor: Colors.blue,
    width: '100%',
  },
  smallCardGreen: {
    backgroundColor: Colors.green,
    width: '48%',
  },
  smallCardOrchid: {backgroundColor: Colors.orchid, width: '48%'},
  number: {
    fontFamily: 'SourceSansPro-Bold',
    fontSize: 26,
    color: 'white',
  },
  bigText: {
    fontFamily: 'SourceSansPro-Bold',
    fontSize: 18,
    color: 'white',
  },
  smallText: {
    fontFamily: 'SourceSansPro-Bold',
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
});

export default Dashboard;
