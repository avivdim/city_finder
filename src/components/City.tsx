import React from 'react';
import {
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

type CityProps = {
  item: CityItem;
  onItemClicked: (item: CityItem) => void;
};

type CityItem = {
  name: string;
  country: string;
  continent: string;
  active: boolean;
  coords: {
    lat: number;
    lng: number;
  };
  id?: string;
  description: string;
  image?: string;
};

const City = (props: CityProps) => {
  const {item, onItemClicked} = props;
  const {name, country, description, image, id} = item;

  return (
    <TouchableOpacity testID={id} onPress={() => onItemClicked(item)}>
      <ImageBackground source={{uri: image}} style={styles.container}>
        <Text style={styles.nameStyle}>{name}</Text>
        <Text style={styles.nameStyle}>{country}</Text>
        <Text style={styles.nameStyle}>{description}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  nameStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default City;
