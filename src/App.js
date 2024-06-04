import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';

import { Loader } from 'semantic-ui-react';

const URL = `https://api.openweathermap.org/data/3.0/onecall`;
const API_KEY = `8c7fbcce7cff51d4803f93a9321fb947`.trim();
const iconColors = {
  Clouds: 'rgba(128,128,128,0.5)',
  Clear: 'rgba(255,255,0,0.9)',
  Rain: 'blue',
  Drizzle: 'blue',
  Thunderstorm: 'purple',
  Snow: 'white',
  Mist: 'grey',
  Smoke: 'grey',
  Haze: 'grey',
  Night: 'black',
  'Clouds Night': 'grey',
  'Clouds Night Rain': 'grey',
};

function App() {
  const [isForecastHidden, setIsForecastHidden] = useState(true);

  useEffect(() => {
    // Toggle the forecast visibility every 5 seconds
    const interval = setInterval(() => {
      setIsForecastHidden((prevState) => !prevState);
    }, 5000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [city, setCity] = useState(null);
  const [sunset, setSunset] = useState(null);
  const [sunrise, setSunrise] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [icon, setIcon] = useState('');
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  const backgroundColor = iconColors[icon];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      axios
        .get(
          `${URL}?lat=${latitude}&lon=${longitude}&units=imperial&exclude=hourly,minutely&appid=${API_KEY}`
        )
        .then((response) => {
          setLoading(false);
          console.log(response.data);
          setTemperature(response.data.current.temp);
          setCity(response.data.timezone);
          setSunset(response.data.current.sunset);
          setSunrise(response.data.current.sunrise);
          setHumidity(response.data.current.humidity);
          setIcon(response.data.current.weather[0].main);
          setForecast(response.data.daily);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [latitude, longitude]);
  return (
    <div className="main" style={{ backgroundColor: 'lightblue' }}>
      <Header />
      {loading ? (
        <Loader active inline="centered" />
      ) : (
        <WeatherCard
          temperature={temperature}
          city={city}
          sunrise={sunrise}
          sunset={sunset}
          humidity={humidity}
          icon={icon}
          backgroundColor={backgroundColor}
        />
      )}

      <Forecast forecast={forecast} backgroundColor={backgroundColor} />
    </div>
  );
}
export default App;
