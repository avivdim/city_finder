import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setTemperatureUnit} from '../features/cities/citiesSlice';

const switchTemperatureUnit = (temperatureUnit: string, dispatch: any) => {
  if (temperatureUnit === 'celsius') {
    dispatch(setTemperatureUnit('fahrenheit'));
  } else {
    dispatch(setTemperatureUnit('celsius'));
  }
};

const HeaderRightComponent = () => {
  const {temperatureUnit} = useSelector(({cities}) => cities);
  const dispatch = useDispatch();
  return (
    <View>
      <Text>Temp unit: </Text>
      <TouchableOpacity
        testID="tempUnit"
        onPress={() => switchTemperatureUnit(temperatureUnit, dispatch)}>
        <Text style={styles.textLink}>{temperatureUnit}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default HeaderRightComponent;
