import React from 'react';
import { useState } from 'react';
import daysjs from 'dayjs';
import {
  Card,
  CardContent,
  CardHeader,
  CardMeta,
  CardDescription,
} from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSunRain } from '@fortawesome/free-solid-svg-icons';
import { faCloudRain } from '@fortawesome/free-solid-svg-icons';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { faSnowflake } from '@fortawesome/free-solid-svg-icons';
import { faSmog } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { faCloudMoon } from '@fortawesome/free-solid-svg-icons';
import { faCloudMoonRain } from '@fortawesome/free-solid-svg-icons';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { faSortUp } from '@fortawesome/free-solid-svg-icons';

function Forecast({ forecast, backgroundColor, icon }) {
  const [click, setClick] = useState(false);
  const handleclick = () => {
    setClick(!click);
    console.log(click);
  };

  const weatherIcons = {
    Clouds: faCloud,
    Rain: faCloudRain,
    Thunderstorm: faBolt,
    Snow: faSnowflake,
    Clear: faSun,
    Mist: faSmog,
    Smoke: faSmog,
    Haze: faSmog,
    Night: faMoon,
    'Clouds Night': faCloudMoon,
    'Clouds Night Rain': faCloudMoonRain,
    Drizzle: faCloudSunRain,

    // add more weather conditions and icons as needed
  };

  const forecastColors = {
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
    // add more weather conditions and colors as needed
  };

  const weatherIconColors = {
    Clouds: 'rgba(80,80,80,0.5)',
    Clear: 'rgba(255,165,0,1)',
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

  return (
    <div style={{ marginTop: 20, padding: 20 }} className="forecast-main">
      <div className={click ? 'card-group active' : 'card-group'}>
        <Card.Group itemsPerRow={4}>
          {forecast.map((data) => {
            const color = forecastColors[data.weather[0].main];
            const icon = weatherIcons[data.weather[0].main];
            const iconColors = weatherIconColors[data.weather[0].main];
            return (
              <Card
                color={color}
                style={{ backgroundColor: color }}
                className="forecast-main-card"
              >
                <CardContent className="forecast-content">
                  <CardHeader className="forecast-day">
                    {daysjs.unix(data.dt).format('dddd')}
                  </CardHeader>
                  <CardContent className="forecasticon-container">
                    <FontAwesomeIcon
                      icon={icon}
                      className="forecast-icon"
                      color={iconColors}
                    />
                  </CardContent>
                  <CardContent className="forecast-header">
                    {Math.round(data.temp.max + data.temp.min / 2)}°F
                  </CardContent>
                  <CardDescription className="forecast-header">
                    💧 {data.humidity}%
                  </CardDescription>
                  <CardDescription className="temp-description">
                    {data.weather[0].description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </Card.Group>
      </div>
      <div className="forecast-button" onClick={handleclick}>
        {click ? (
          <FontAwesomeIcon icon={faSortDown} />
        ) : (
          <FontAwesomeIcon icon={faSortUp} />
        )}
      </div>{' '}
    </div>
  );
}

export default Forecast;
