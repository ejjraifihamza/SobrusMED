export const productDataFilter = (
  text,
  masterData,
  setfilterdData,
  setsearch,
) => {
  if (text) {
    const newData = masterData.filter(item => {
      const itemData = item.productName
        ? item.productName.toUpperCase()
        : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setfilterdData(newData);
    setsearch(text);
  } else {
    setfilterdData(masterData);
    setsearch(text);
  }
};
export const patientDataFilter = (
  text,
  masterData,
  setfilterdData,
  setsearch,
) => {
  if (text) {
    const newData = masterData.filter(item => {
      const itemData = item.fullName
        ? item.fullName.toUpperCase()
        : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setfilterdData(newData);
    setsearch(text);
  } else {
    setfilterdData(masterData);
    setsearch(text);
  }
};
export const patientTwoDataFilter = (
  text,
  masterData,
  setfilterdData,
  setsearch,
) => {
  if (text) {
    const newData = masterData.filter(item => {
      const itemData = item.patient_id.fullName
        ? item.patient_id.fullName.toUpperCase()
        : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setfilterdData(newData);
    setsearch(text);
  } else {
    setfilterdData(masterData);
    setsearch(text);
  }
};
