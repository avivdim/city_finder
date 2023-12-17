import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from 'react-native';
import {showAlert} from '../components/Alert';
import {useSelector, useDispatch} from 'react-redux';
import {setFilteredCitiesList} from '../features/cities/citiesSlice';

type BdikaModalProps = {
  visible: boolean;
  onCancel: () => void;
};

const SearchModal = (props: BdikaModalProps) => {
  const {visible, onCancel} = props;
  const [value, onChangeText] = useState('Enter city or country name');
  const {citiesList} = useSelector(({cities}) => cities);
  const dispatch = useDispatch();

  const onSaveClicked = () => {
    const search = citiesList.find(
      city =>
        city.name.toLowerCase() === value.toLowerCase() ||
        city.country.toLowerCase() === value.toLowerCase(),
    );
    if (!search) {
      showAlert('לא נמצאה עיר כזו אנא נסה שוב.');
    } else {
      dispatch(setFilteredCitiesList([search]));
      onCancel();
    }
  };

  const onClearClicked = () => {
    onChangeText('');
    dispatch(setFilteredCitiesList(citiesList));
    onCancel();
  };

  return (
    <Modal
      testID="searchModal"
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => onCancel}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TextInput
            testID="searchInput"
            style={styles.input}
            onChangeText={onChangeText}
            value={value}
            placeholder="Enter city or country name"
            keyboardType="numeric"
          />
          <BottomButtons
            onCancel={onCancel}
            onSaveClicked={onSaveClicked}
            onClearClicked={onClearClicked}
          />
        </View>
      </View>
    </Modal>
  );
};

type BottomButtonsProps = {
  onCancel: () => void;
  onSaveClicked: () => void;
  onClearClicked: () => void;
};

const BottomButtons = (props: BottomButtonsProps) => {
  const {onCancel, onSaveClicked, onClearClicked} = props;
  return (
    <View>
      <Pressable
        testID="clearSearchHistory"
        style={[styles.button, styles.buttonClearHistory]}
        onPress={onClearClicked}>
        <Text style={styles.textStyle}>Clear search history</Text>
      </Pressable>
      <View style={styles.bottomButtonsContainer}>
        <Pressable
          testID="cancelSearch"
          style={[styles.button, styles.buttonClose]}
          onPress={onCancel}>
          <Text style={styles.textStyle}>Cancel</Text>
        </Pressable>
        <Pressable
          testID="saveSearch"
          style={[styles.button, styles.buttonClose]}
          onPress={onSaveClicked}>
          <Text style={styles.textStyle}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
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
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  buttonClearHistory: {
    margin: 10,
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200,
  },
});

export default SearchModal;
