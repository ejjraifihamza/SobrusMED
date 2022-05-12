import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import Pdf from 'react-native-pdf';

const PrescriptionPdf = ({route}) => {
  const source = {
    uri: `file:///${route.params.path}`,
    cache: true,
  };
  return (
    <View style={styles.container}>
      <Pdf
        source={source}
        onError={error => {
          console.log(error);
        }}
        style={styles.pdf}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    padding: 0,
  },
});

export default PrescriptionPdf;
