const citiesData = require('./data.json');
export const getCitiesList = () => {
  const citiesListtemp = citiesData.cities;
  citiesListtemp.forEach((item, i) => {
    item.id = (i + 1).toString();
  });
  return citiesListtemp;
};

export const celiusToFahrenheit = (celsius: number) => {
  return (celsius * 9) / 5 + 32 + ' °F';
};

export const showTemperatureByUnit = (
  temperature: number,
  temperatureUnit: string,
) => {
  if (temperatureUnit === 'celsius') {
    return temperature + ' °C';
  }
  return celiusToFahrenheit(temperature);
};


// export const calculateDistance = (lat1, lon1, lat2, lon2) => {
//         const R = 6371e3;
//         const x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
//         const y = (lat2 - lat1);
//         const d = Math.sqrt(x * x + y * y) * R;
//         return d;
//       }
