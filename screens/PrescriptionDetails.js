import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Card from '../components/Card';
import OrdDate from '../components/OrdDate';
import TitleText from '../components/TitleText';
import Colors from '../constants/Colors';

const PrescriptionDetails = ({route}) => {
  const htmlContent = `
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
      <div class="ord">Ordonnance</div>
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
      fileName: 'test',
      directory: 'Download',
    };

    let file = await RNHTMLtoPDF.convert(options);
    alert(file.filePath);
  };
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
          }}>
          <Card style={styles.wildCardBlue}>
            <TitleText style={{fontWeight: '400'}}>Imprimer</TitleText>
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
body {
  min-width: 1140px;
}
h1 {
  font: bold 100% sans-serif;
}
.header {
  display: flex;
  background-color: "#000";
  justify-content: space-between;
}
.leftHeader {
  position: relative;
  left: 30px;
}
.rightHeader {
  position: relative;
  right: 200px;
}
.ord {
  background-color: #18b1d4;
  width: 100%;
  padding: 20px;
  color: #e1f5f9;
  font-weight: bolder;
  font-size: large;
}
.date {
  background-color: #e1f5f9;
  width: 100%;
  text-align: end;
  position: relative;
  right: 100px;
  padding: 20px;
}
.colored {
  display: flex;
  width: auto;
  justify-content: space-between;
  margin-top: 30px;
}

.patient {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: auto;
  position: relative;
  right: 100px;
  margin-top: 30px;
}
.prescription {
  margin-left: 20px;
}
`;

export default PrescriptionDetails;
