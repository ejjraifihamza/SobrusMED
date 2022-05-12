import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Card from '../components/Card';
import OrdDate from '../components/OrdDate';
import TitleText from '../components/TitleText';
import Colors from '../constants/Colors';

const PrescriptionDetails = ({navigation, route}) => {
  const [isClicked, setIsClicked] = useState(false);
  const htmlContent = `
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Amiri&family=Merriweather:ital,wght@0,300;1,300&family=Roboto+Slab:wght@100;200;300;400;500;600;700;800;900&family=Roboto:wght@100&display=swap" rel="stylesheet">
    <title>Document</title>
     <style>
        ${htmlStyles}
    </style>
  </head>
  <body>
    <div class="header">
      <div class="leftHeader">
        <h1>${route.params.item.doctor_id.accountName}</h1>
        <p>${route.params.item.doctor_id.speciality}</p>
      </div>
      <div class="rightHeader">
        <p>${route.params.item.doctor_id.office.phone}</p>
        <p>${route.params.item.doctor_id.office.address}</p>
      </div>
    </div>
    <div class="colored">
      <div class="ord">ORDONNANCE</div>
      <div class="date">Le ${route.params.item.createdAt.split('T')[0]}</div>
    </div>
    <div class="patient">
      <h1 class="name">NOM DU PATIENT:</h1>
      <p class="userName">${route.params.item.patient_id.fullName}</p>
    </div>
    <div class="prescription">
      <h1>${route.params.item.product}</h1>
      <p>${route.params.item.dosage}</p>
      <p>${route.params.item.durationOfTreatment}</p>
    </div>
  </body>
</html>
      `;
  const createPDF = async () => {
    let options = {
      html: htmlContent,
      fileName: 'sobrus',
      directory: 'Download',
    };

    let file = await RNHTMLtoPDF.convert(options);
    setIsClicked(false);
    navigation.navigate('PrescriptionPdf', {path: file.filePath});
  };
  return (
    <ScrollView>
      <View style={styles.screen}>
        <View
          style={{
            backgroundColor: 'white',
            width: '90%',
            height: 450,
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
            paddingVertical: 20,
          }}>
          <OrdDate date={route.params.item.createdAt.split('T')[0]} />
          <View
            style={{
              width: '90%',
              alignItems: 'baseline',
              marginVertical: 20,
            }}>
            <Text
              style={{
                fontFamily: 'SourceSansPro-Regular',
                fontSize: 15,
                color: '#707070',
              }}>
              Nom du patient : {route.params.item.patient_id.fullName}
            </Text>
          </View>
          <View style={{width: '100%', alignItems: 'center'}}>
            <View style={{width: '90%'}}>
              <Text
                style={{
                  fontFamily: 'SourceSansPro-SemiBold',
                  fontSize: 15,
                  color: '#383838',
                }}>
                {route.params.item.product}
              </Text>
              <View
                style={{
                  width: '75%',
                  maxWidth: '100%',
                  paddingVertical: 10,
                }}>
                <Text style={styles.text}>
                  {route.params.item.durationOfTreatment}
                </Text>
                <Text style={styles.text}>{route.params.item.dosage}</Text>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.9}
          style={{width: '100%', alignItems: 'center'}}
          onPress={() => {
            createPDF();
            setIsClicked(true);
          }}>
          <Card style={styles.wildCardBlue}>
            {isClicked ? (
              <View>
                <ActivityIndicator
                  size="small"
                  color={Colors.headerBackground}
                />
              </View>
            ) : (
              <TitleText style={{fontWeight: '400'}}>Imprimer</TitleText>
            )}
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
  wildCardBlue: {
    backgroundColor: Colors.primary,
    width: '90%',
    paddingVertical: 18,
  },
  text: {
    position: 'relative',
    left: 20,
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 15,
    color: '#676767',
  },
});

const htmlStyles = `
*,*::after,*::before{
  margin: 0;
  padding: 0;
}
html{
  padding: 0px;
}
body{
  margin: 0;
  padding: -60px;
}
.header {
  display: flex;
  background-color: "#000";
  justify-content: space-between;
}
.leftHeader {
  width: 50%;
}
.leftHeader h1{
  font-size: 26px;
  font-family: 'Roboto Slab', serif;
  font-weight: 900px;
  color: rgb(101, 123, 133);
}
.rightHeader {
  width: 50%;
}
.rightHeader p,.leftHeader p{
  font-size: 24px;
  opacity: 0.4;
}
.ord {
  background-color: #18b1d4;
  width: 100%;
  padding: 18px;
  color: #e1f5f9;
  font-weight: bolder;
  font-size: 28;
}
.date {
  background-color: #e1f5f9;
  width: 60%;
  font-size: 22;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  padding-left: 64;
  font-family: 'Roboto Slab', serif;
  color: rgb(101, 123, 133);
}
.colored {
  display: flex;
  margin-top: 48px;
}

.patient {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: auto;
  margin-top: 64px;
  margin-bottom: 64;
}

.patient .name {
  font-size: 20;
  margin-right: 8px;
  color: rgb(101, 123, 133);
}

.patient .userName {
  font-size: 20;
  opacity: .4;
}
.prescription h1{
    font-size: 20;
  color: rgb(101, 123, 133);
}
.prescription p{
   opacity: .4;
   margin: 8px 12;
}
`;

export default PrescriptionDetails;
