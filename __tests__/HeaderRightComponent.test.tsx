import React from 'react';
import {fireEvent} from '@testing-library/react-native';
import HeaderRightComponent from '../src/components/HeaderRightComponent';
import {renderWithRedux} from '../helpers/testHelpers/renderWithRedux';

describe('Testing HeaderRightComponent', () => {
  it('Should start with current temp as celsius', () => {
    const {getByText} = renderWithRedux(<HeaderRightComponent />);
    const temp = getByText('celsius');
    expect(temp).toBeTruthy();
  });

  it('click on button temp unit text should change the unit to fahrenheit and another click back to celsius', () => {
    const {getByTestId} = renderWithRedux(<HeaderRightComponent />);
    const tempButton = getByTestId('tempUnit');

    fireEvent.press(tempButton);
    const {getByText} = renderWithRedux(<HeaderRightComponent />);
    const temp = getByText('fahrenheit');
    expect(temp).toBeTruthy();
    fireEvent.press(tempButton);
    const temp2 = getByText('celsius');
    expect(temp2).toBeTruthy();
  });
});
