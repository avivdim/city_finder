import React from 'react';
import {renderWithRedux} from '../helpers/testHelpers/renderWithRedux';
import CityDetails from '../src/screens/CityDetails';
import {getCitiesList} from '../src/utils';
import {waitFor} from '@testing-library/react-native';

describe('Testing CityDetails', () => {
  it('should show the city details page with correct data', async () => {
    const navigation = {navigate: jest.fn()};
    const {getByTestId} = renderWithRedux(
      <CityDetails
        navigation={navigation}
        route={{params: {item: getCitiesList()[0]}}}
      />,
    );

    await waitFor(async () => {
      const cityDetails = await getByTestId('cityDetails');
      expect(cityDetails).toBeTruthy();
      expect(getByTestId('temperatureText')).toBeTruthy();
    });
  });
});
