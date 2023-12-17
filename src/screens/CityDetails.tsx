import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {instance} from '../axios';
import {showTemperatureByUnit} from '../utils';
import {useSelector} from 'react-redux';
import Loader from '../components/Loader';

const CityDetails = ({route}: any) => {
  const [temperature, setTemperature] = useState('');
  const [weatherDescription, setWeatherDescription] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {item} = route.params;
  const {name, country, coords} = item;
  const {temperatureUnit} = useSelector(({cities}) => cities);
  const {lat, lng} = coords;

  useEffect(() => {
    setIsLoading(true);
    const setWeatherData = async () => {
      try {
        const result = await instance.get(
          `data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=29bb1a4a240d6150bb05ff118d1651a9`,
        );
        const temperatureInCelsius = result.data?.main?.temp;
        setWeatherDescription(result.data?.weather[0]?.description);
        setWindSpeed(result.data?.wind?.speed);
        setTemperature(
          showTemperatureByUnit(temperatureInCelsius, temperatureUnit),
        );
      } catch (error) {
        console.log('error', error);
      } finally {
        setIsLoading(false);
      }
    };
    setWeatherData();
  }, []);

  const textMap = [
    {title: 'Name', value: name},
    {title: 'Country', value: country},
    {title: 'Temperature', value: temperature, testID: 'temperatureText'},
    {title: 'Weather Description', value: weatherDescription},
    {title: 'Wind Speed', value: windSpeed},
  ];

  return (
    <View style={styles.container} testID="cityDetails">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {textMap.map((item, index) => {
            const {title, value, testID} = item;
            return (
              <Text key={index} style={styles.textStyle} testID={testID}>
                {title}: {value}
              </Text>
            );
          })}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default CityDetails;
