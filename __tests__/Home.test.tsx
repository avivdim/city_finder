import React from 'react';
import {fireEvent} from '@testing-library/react-native';
import Main from '../src/screens/Main';
import {renderWithRedux} from '../helpers/testHelpers/renderWithRedux';
import {getCitiesList} from '../src/utils';

describe('Testing Main Page', () => {
  it('should render the Main Page', () => {
    renderWithRedux(<Main />);
  });

  it('clicking on item in the list should navigate to the details page', () => {
    const navigation = {navigate: jest.fn()};
    const {getByTestId} = renderWithRedux(<Main navigation={navigation} />);
    const list = getCitiesList();
    const flatListItem = getByTestId('1');
    fireEvent.press(flatListItem);
    expect(navigation.navigate).toHaveBeenCalledWith('CityDetails', {
      item: {
        ...list[0],
      },
    });
    const flatlist = getByTestId('flatList');
    expect(flatlist.props.data[0].name).toEqual('Barcelona');
  });
});
