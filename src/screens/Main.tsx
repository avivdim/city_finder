import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {getCitiesList} from '../utils';
import City from '../components/City';
import Button from '../components/Button';
import FilterModal from '../modal/Filter';
import SearchModal from '../modal/Search';
import {useSelector, useDispatch} from 'react-redux';
import {
  setFilteredCitiesList,
  setCitiesList,
} from '../features/cities/citiesSlice';

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

type FilterButtonProps = {
  setFilterModalVisible: (visible: boolean) => void;
};

type SearchButtonProps = {
  setSearchModalVisible: (visible: boolean) => void;
};
const FilterButton = (props: FilterButtonProps) => {
  const {setFilterModalVisible} = props;
  return (
    <Button
      testID="filterButton"
      title="Filter"
      backgroundColor="#2196F3"
      onPress={() => setFilterModalVisible(true)}
    />
  );
};

const SearchButton = (props: SearchButtonProps) => {
  const {setSearchModalVisible} = props;
  return (
    <Button
      testID="searchButton"
      title="Search"
      backgroundColor="#2196F3"
      onPress={() => setSearchModalVisible(true)}
    />
  );
};

const Main = ({navigation}: any) => {
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const {filteredCitiesList} = useSelector(({cities}) => cities);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCitiesList(getCitiesList()));
    dispatch(setFilteredCitiesList(getCitiesList()));
  }, []);

  const onItemClicked = (item: CityItem) => {
    navigation.navigate('CityDetails', {item});
  };

  return (
    <View>
      <View style={styles.buttonsContainer}>
        <SearchButton setSearchModalVisible={setSearchModalVisible} />
        <FilterButton setFilterModalVisible={setFilterModalVisible} />
      </View>

      <FlatList
        testID="flatList"
        data={filteredCitiesList}
        renderItem={({item}) => (
          <City item={item} onItemClicked={onItemClicked} />
        )}
        keyExtractor={item => item.id}
        ListEmptyComponent={() => <Text>No Data</Text>}
        numColumns={2}
        contentContainerStyle={{paddingBottom: 100}}
      />
      <SearchModal
        visible={searchModalVisible}
        onCancel={() => setSearchModalVisible(false)}
      />
      <FilterModal
        visible={filterModalVisible}
        onCancel={() => setFilterModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 16,
  },
});

export default Main;
