import React from 'react';
import { ReactComponent as SpaceShipIcon } from './img/space-ship.svg'

import './red-button.scss';

const RedButton = () => {
  return (
    <div className="red-button">
      <div className="red-button__wrapper wrapper">
        <a className="red-button__link" href="#!">
          Заказать бригаду имени Брюса&nbsp;Уиллиса
        <SpaceShipIcon className="red-button__icon" />
        </a>
      </div>
    </div>
  );
};

export default RedButton;
