import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Forecast from './Forecast';

function Appbutton() {
  const [click, setClick] = useState(false);
  const handleclick = () => {
    setClick(!click);
    console.log(click);
  };
  return (
    <div>
      <div onClick={handleclick}>
        {click ? (
          <FontAwesomeIcon icon={faSortDown} />
        ) : (
          <FontAwesomeIcon icon={faSortUp} />
        )}
      </div>
      {click && <Forecast />}
    </div>
  );
}

export default Appbutton;
