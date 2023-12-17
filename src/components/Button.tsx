import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

type ButtonProps = {
  onPress: () => void;
  backgroundColor: string;
  title: string;
  testID?: string;
  disabled?: boolean;
};

const Button = (props: ButtonProps) => {
  const {onPress, backgroundColor, disabled = false, testID, title} = props;

  return (
    <TouchableOpacity
      disabled={disabled}
      testID={testID}
      onPress={onPress}
      style={[styles.appButtonContainer, {backgroundColor: backgroundColor}]}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    borderRadius: 16,
    height: 48,
    width: 148,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
  },
});

export default Button;
