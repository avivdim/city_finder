import React from 'react';
import {fireEvent} from '@testing-library/react-native';
import Main from '../src/screens/Main';
import {renderWithRedux} from '../helpers/testHelpers/renderWithRedux';

describe('Testing FilterModal', () => {
  it('clicking on filter button should open the filter modal', () => {
    const {getByTestId} = renderWithRedux(<Main />);
    const filterButton = getByTestId('filterButton');
    fireEvent.press(filterButton);
    const filterModal = getByTestId('filterModal');
    expect(filterModal).toBeTruthy();
  });
  it('clicking on checkbox and then save should sort the list in descending order', async () => {
    const {getByTestId} = renderWithRedux(<Main />);
    const filterButton = getByTestId('filterButton');
    fireEvent.press(filterButton);
    const checkbox = getByTestId('descendingOrderCheckbox');
    fireEvent(checkbox, 'onValueChange', {nativeEvent: {}});
    const saveButton = getByTestId('saveButton');
    fireEvent.press(saveButton);
    const flatlist = getByTestId('flatList');
    expect(flatlist.props.data[0].name).toEqual('Amsterdam');
  });

  it('clicking on clear filters checkbox and then save should reset the list', async () => {
    const {getByTestId} = renderWithRedux(<Main />);
    const filterButton = getByTestId('filterButton');
    fireEvent.press(filterButton);
    const checkbox = getByTestId('descendingOrderCheckbox');
    fireEvent(checkbox, 'onValueChange', {nativeEvent: {}});
    const saveButton = getByTestId('saveButton');
    fireEvent.press(saveButton);
    const flatlist = getByTestId('flatList');
    expect(flatlist.props.data[0].name).toEqual('Amsterdam');

    const filterButton2 = getByTestId('filterButton');
    fireEvent.press(filterButton2);
    const descCheckBox = getByTestId('descendingOrderCheckbox');
    fireEvent(descCheckBox, 'onValueChange', false);
    const resetCheckbox = getByTestId('resetFiltersCheckbox');
    fireEvent(resetCheckbox, 'onValueChange', {nativeEvent: {}});
    const saveButton2 = getByTestId('saveButton');
    fireEvent.press(saveButton2);
    const flatlist2 = getByTestId('flatList');
    expect(flatlist2.props.data[0].name).toEqual('Barcelona');
  });
});
