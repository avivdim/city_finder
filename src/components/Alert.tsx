import {Alert} from 'react-native';

export const showAlert = (body: string) => {
  Alert.alert('Error', body, [
    {
      text: 'Ok',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
  ]);
};
