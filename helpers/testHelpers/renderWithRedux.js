import React from 'react';
import {Provider} from 'react-redux';
import {render} from '@testing-library/react-native';
import {store} from '../../src/app/store';

export function renderWithRedux(renderComponent) {
  return render(<Provider store={store}>{renderComponent}</Provider>);
}
