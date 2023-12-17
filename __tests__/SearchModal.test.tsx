import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Main from '../src/screens/Main';
import {renderWithRedux} from '../helpers/testHelpers/renderWithRedux';
import {Alert} from 'react-native';

describe('Testing SearchModal', () => {
  it('clicking on filter button should open the search modal', () => {
    const {getByTestId} = renderWithRedux(<Main />);
    const searchButton = getByTestId('searchButton');
    fireEvent.press(searchButton);
    const searchModal = getByTestId('searchModal');
    expect(searchModal).toBeTruthy();
  });

  it('entering wrong value in search input and click save should show error message', async () => {
    jest.spyOn(Alert, 'alert');
    const {getByTestId} = renderWithRedux(<Main />);
    const searchButton = getByTestId('searchButton');
    fireEvent.press(searchButton);
    const searchInput = getByTestId('searchInput');
    fireEvent.changeText(searchInput, 'wrong value');
    const saveButton = getByTestId('saveSearch');
    fireEvent.press(saveButton);
    expect(Alert.alert).toHaveBeenCalled();
  });

  it('entering value in search input and click save should show only this elemtn in list', async () => {
    const {getByTestId} = renderWithRedux(<Main />);
    const searchButton = getByTestId('searchButton');
    fireEvent.press(searchButton);
    const searchInput = getByTestId('searchInput');
    fireEvent.changeText(searchInput, 'Amsterdam');
    const saveButton = getByTestId('saveSearch');
    fireEvent.press(saveButton);
    const flatlist = getByTestId('flatList');
    expect(flatlist.props.data.length).toEqual(1);
  });

  it('reset button should reset the list', async () => {
    const {getByTestId} = renderWithRedux(<Main />);
    const searchButton = getByTestId('searchButton');
    fireEvent.press(searchButton);
    const searchInput = getByTestId('searchInput');
    fireEvent.changeText(searchInput, 'Amsterdam');
    const saveButton = getByTestId('saveSearch');
    fireEvent.press(saveButton);
    const flatlist = getByTestId('flatList');
    expect(flatlist.props.data.length).toEqual(1);

    const searchButton2 = getByTestId('searchButton');
    fireEvent.press(searchButton2);
    const resetButton = getByTestId('clearSearchHistory');
    fireEvent.press(resetButton);
    const flatlist2 = getByTestId('flatList');
    expect(flatlist2.props.data.length).toBeGreaterThan(1);
  });

  it('clicking on item in list should show the weather details', async () => {
    const navigation = {navigate: jest.fn()};
    const {getByTestId} = renderWithRedux(<Main navigation={navigation} />);
    const searchButton = getByTestId('searchButton');
    fireEvent.press(searchButton);
    const searchInput = getByTestId('searchInput');
    fireEvent.changeText(searchInput, 'Amsterdam');
    const saveButton = getByTestId('saveSearch');
    fireEvent.press(saveButton);
    const flatlist = getByTestId('flatList');
    const flatListItem = getByTestId(flatlist.props.data[0].id);
    fireEvent.press(flatListItem);
    expect(navigation.navigate).toHaveBeenCalledWith('CityDetails', {
      item: {
        ...flatlist.props.data[0],
      },
    });
  });
});
