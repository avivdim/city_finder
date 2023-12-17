import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {showAlert} from '../components/Alert';
import {useSelector, useDispatch} from 'react-redux';
import {setFilteredCitiesList} from '../features/cities/citiesSlice';
import {instance} from '../axios';

type FilterModalProps = {
  visible: boolean;
  onCancel: () => void;
};

type CityItem = {
  name: string;
  country: string;
  description: string;
  continent: string;
  active: boolean;
  coords: {
    lat: number;
    lng: number;
  };
  id?: string;
  image?: string;
};

const checkingDistanceFromCity = async (
  value: string,
  citiesList: CityItem[],
) => {
  try {
    const result = await instance.get(
      `/geo/1.0/direct?q=${value}&limit=1&appid=29bb1a4a240d6150bb05ff118d1651a9`,
    );
    if (result.data.length === 0) return null;
    const {lat, lon} = result.data[0];
    const arrayWithDistance = citiesList.map(city => {
      const distance = Math.sqrt(
        Math.pow(city.coords.lat - lat, 2) + Math.pow(city.coords.lng - lon, 2),
      );
      return {...city, distance};
    });
    const sortedArray = arrayWithDistance.sort((a, b) => {
      return a.distance - b.distance;
    });
    return sortedArray;
  } catch (error) {
    console.log('error', error);
    return null;
  }
};

const FilterModal = (props: FilterModalProps) => {
  const {visible, onCancel} = props;
  const [isDescOrderSelected, setIsDescOrderSelected] = useState(false);
  const [isDistanceFromCitySelected, setIsDistanceFromCitySelected] =
    useState(false);
  const [isResetSelected, setIsResetSelected] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const {citiesList, filteredCitiesList} = useSelector(({cities}) => cities);
  const [value, onChangeText] = useState('Enter city');
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const onSaveClicked = async () => {
    if (isDescOrderSelected) {
      const tempArray = [...filteredCitiesList];
      const sortedArray = tempArray.sort((a, b) => {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      });
      dispatch(setFilteredCitiesList(sortedArray));
      onCancel();
    } else if (isResetSelected) {
      dispatch(setFilteredCitiesList(citiesList));
      onCancel();
    } else if (isDistanceFromCitySelected) {
      const sortedArray = await checkingDistanceFromCity(value, citiesList);
      if (sortedArray) {
        dispatch(setFilteredCitiesList(sortedArray));
        onCancel();
      } else {
        showAlert('לא נמצאה עיר כזו אנא נסה שוב.');
      }
    } else {
      showAlert('Please select at least one checkbox');
    }
  };

  return (
    <Modal
      testID="filterModal"
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => onCancel}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{flexDirection: 'column'}}>
            <View style={styles.checkboxContainer}>
              <CheckBox
                testID="descendingOrderCheckbox"
                disabled={disabled && !isDescOrderSelected}
                value={isDescOrderSelected}
                onValueChange={newValue => {
                  setIsDescOrderSelected(newValue);
                  setDisabled(previusState => !previusState);
                }}
              />
              <Text style={styles.label}>Descending order</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <CheckBox
                testID="resetFiltersCheckbox"
                disabled={disabled && !isResetSelected}
                value={isResetSelected}
                onValueChange={newValue => {
                  setIsResetSelected(newValue);
                  setDisabled(previusState => !previusState);
                }}
              />
              <Text style={styles.label}>Reset filters</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <CheckBox
                testID="distanceFromCityCheckbox"
                disabled={disabled && !isDistanceFromCitySelected}
                value={isDistanceFromCitySelected}
                onValueChange={newValue => {
                  setIsDistanceFromCitySelected(newValue);
                  setDisabled(previusState => !previusState);
                }}
              />
              <Text style={styles.label}>Distance from city</Text>
            </View>
            <TextInput
              style={styles.input}
              editable={disabled && isDistanceFromCitySelected}
              onChangeText={onChangeText}
              value={value}
              placeholder="Enter city or country name"
              keyboardType="numeric"
            />
          </View>
          <BottomButtons onCancel={onCancel} onSaveClicked={onSaveClicked} />
        </View>
      </View>
    </Modal>
  );
};

type BottomButtonsProps = {
  onCancel: () => void;
  onSaveClicked: () => void;
};

const BottomButtons = (props: BottomButtonsProps) => {
  const {onCancel, onSaveClicked} = props;
  return (
    <View style={styles.rowDirection}>
      <Pressable style={[styles.button, styles.buttonClose]} onPress={onCancel}>
        <Text style={styles.textStyle}>Cancel</Text>
      </Pressable>
      <Pressable
        testID="saveButton"
        style={[styles.button, styles.buttonClose]}
        onPress={onSaveClicked}>
        <Text style={styles.textStyle}>Save</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  rowDirection: {
    flexDirection: 'row',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200,
  },
});

export default FilterModal;
