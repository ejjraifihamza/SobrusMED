import {Alert} from 'react-native';

export const addRequest = (
  apiURL,
  method,
  data,
  firstText,
  secondText,
  navigation,
  whereTo,
  thirdText,
  forthText,
) => {
  fetch(apiURL, {
    method: method,
    headers: {'Content-type': 'application/json'},
    credentials: 'include',
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.status === 'success') {
        Alert.alert(firstText, secondText, [
          {
            text: "D'accord",
            onPress: () => {
              navigation.navigate(whereTo);
            },
          },
        ]);
      } else if (responseJson.status === 'error') {
        Alert.alert(thirdText, forthText, [
          {
            text: 'Cancel',
            onPress: () => {
              console.log('cancel');
            },
          },
        ]);
      }
    })
    .catch(error => {
      console.error(error);
    });
};

export const getPatientRequest = (apiURL, setfilterdData, setmasterData) => {
  fetch(apiURL)
    .then(response => response.json())
    .then(responseJson => {
      setfilterdData(responseJson.output.patients);
      setmasterData(responseJson.output.patients);
    })
    .catch(error => {
      console.error(error);
    });
};
export const getProductRequest = (
  apiURL,
  setProductFilterdData,
  setProductMasterData,
) => {
  fetch(apiURL)
    .then(response => response.json())
    .then(responseJson => {
      setProductFilterdData(responseJson.output.products);
      setProductMasterData(responseJson.output.products);
    })
    .catch(error => {
      console.error(error);
    });
};
export const getPrescriptionRequest = (
  apiURL,
  setfilterdData,
  setmasterData,
) => {
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
