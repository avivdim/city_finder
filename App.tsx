import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from './src/screens/Main';
import CityDetailsScreen from './src/screens/CityDetails';
import {Provider} from 'react-redux';
import {store} from './src/app/store';
import HeaderRightComponent from './src/components/HeaderRightComponent';
import {Screens} from './src/constans';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name={Screens.MAIN}
              component={MainScreen}
              options={{
                headerRight: () => <HeaderRightComponent />,
              }}
            />
            <Stack.Screen
              name={Screens.CITY_DETAILS}
              component={CityDetailsScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
