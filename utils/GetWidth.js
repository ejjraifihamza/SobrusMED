import {Dimensions} from 'react-native';

const getWidth = () => {
  let width = Dimensions.get('window').width;
  // Horizontal padding = 20...
  width = width - 38;
  // total five tabs
  return width / 5;
};

export default getWidth;
