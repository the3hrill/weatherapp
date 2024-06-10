import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import hazysky from './components/hazysky.jpg';
import clearsky from './components/clearsky.jpg';
import cloudysky from './components/cloudysky.jpg';
import rainsky from './components/rainysky.jpg';
import snowsky from './components/snowsky.jpg';
import thunderstormsky from './components/thunderstormsky.jpg';
import cloudynightsky from './components/cloudynightsky.jpg';
import nightsky from './components/nightsky.jpg';

import { Loader } from 'semantic-ui-react';

const URL = `https://api.openweathermap.org/data/3.0/onecall`;
const API_KEY = `8c7fbcce7cff51d4803f93a9321fb947`.trim();
const iconColors = {
  Clouds: 'rgba(128,128,128,0.5)',
  Clear: 'lightblue',
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

const weatherImages = {
  Clouds: cloudysky,
  Clear: clearsky,
  Rain: rainsky,
  Drizzle: rainsky,
  Thunderstorm: thunderstormsky,
  Snow: snowsky,
  Mist: hazysky,
  Smoke: hazysky,
  Haze: hazysky,
  Night: nightsky,
  'Clouds Night': cloudynightsky,
  'Clouds Night Rain': rainsky,
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
  const backgroundImage = weatherImages[icon];

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
    <div
      className="main"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        height: isForecastHidden ? 'block' : 'block',
      }}
    >
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

      <Forecast
        forecast={forecast}
        backgroundColor={backgroundColor}
        style={{ display: isForecastHidden ? 'none' : 'block' }}
      />
    </div>
  );
}
export default App;
