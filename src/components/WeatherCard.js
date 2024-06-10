import React from 'react';
import { Card, Feed } from 'semantic-ui-react';
import daysjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud } from '@fortawesome/free-solid-svg-icons';

import { faCloudSunRain } from '@fortawesome/free-solid-svg-icons';
import { faCloudRain } from '@fortawesome/free-solid-svg-icons';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { faSnowflake } from '@fortawesome/free-solid-svg-icons';
import { faSmog } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { faCloudMoon } from '@fortawesome/free-solid-svg-icons';
import { faCloudMoonRain } from '@fortawesome/free-solid-svg-icons';

function WeatherCard({
  temperature,
  city,
  sunrise,
  sunset,
  humidity,
  icon,
  backgroundColor,
  isForecastHidden,
}) {
  let weathericons = null;
  if (icon === 'Clouds') {
    weathericons = faCloud;
  } else if (icon === 'Clear') {
    weathericons = faSun;
  } else if (icon === 'Rain') {
    weathericons = faCloudRain;
  } else if (icon === 'Drizzle') {
    weathericons = faCloudSunRain;
  } else if (icon === 'Thunderstorm') {
    weathericons = faBolt;
  } else if (icon === 'Snow') {
    weathericons = faSnowflake;
  } else if (icon === 'Mist' || icon === 'Smoke' || icon === 'Haze') {
    weathericons = faSmog;
  } else if (icon === 'Night') {
    weathericons = faMoon;
  } else if (icon === 'Clouds Night') {
    weathericons = faCloudMoon;
  } else if (icon === 'Clouds Night Rain') {
    weathericons = faCloudMoonRain;
  } else {
    weathericons = faSun;
  }
  const weatherIconColors = {
    Clouds: 'rgba(80,80,80,0.5)',
    Clear: 'yellow',
    Rain: 'blue',
    Drizzle: 'blue',
    Thunderstorm: 'rgba(80, 0, 80, 1)', // darker purple
    Snow: 'rgba(200, 200, 200, 1)', // darker white (light grey)
    Mist: 'rgba(50, 50, 50, 1)', // darker grey
    Smoke: 'rgba(50, 50, 50, 1)',
    Haze: 'rgba(50, 50, 50, 1)',
    Night: 'black',
    'Clouds Night': 'rgba(50, 50, 50, 1)',
    'Clouds Night Rain': 'rgba(50, 50, 50, 1)',
    // add more weather conditions and colors as needed
  };

  const cardClass = isForecastHidden
    ? 'weather-card-main expanded'
    : 'weather-card-main';
  return (
    <Card className={cardClass} style={{ backgroundColor }}>
      <Card.Content className="weather-card">
        <Card.Header className="weather-card-child">{city}</Card.Header>
        <div className="icon-container">
          <FontAwesomeIcon
            icon={weathericons}
            className="main-icon"
            color={weatherIconColors[icon]}
          />
        </div>
      </Card.Content>
      <Card.Content>
        <Feed>
          <Feed.Event>
            <Feed.Content>
              <h5 className="weather-card-child">
                {daysjs().format('MMMM D YYYY, h:mm a')}
              </h5>
              <div className="weather-card">
                <div className="weather-card-child">
                  <b>Temperature:</b> {Math.floor(temperature)}°F
                </div>
                <div className="weather-card-child">
                  <b>Humidity:</b> {humidity}%
                </div>
              </div>
              <div className="weather-card">
                <div className="weather-card-child">
                  <b>Sunrise:</b>{' '}
                  {new Date(sunrise * 1000).toLocaleTimeString('en-US')}
                </div>
                <div className="weather-card-child">
                  <b>Sunset:</b>{' '}
                  {new Date(sunset * 1000).toLocaleTimeString('en-US')}
                </div>
              </div>
            </Feed.Content>
          </Feed.Event>
        </Feed>
      </Card.Content>
    </Card>
  );
}
export default WeatherCard;
