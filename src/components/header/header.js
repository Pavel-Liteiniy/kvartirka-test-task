import React from 'react';
import logoDesktop from './img/logo-desktop.svg';
import logoMobile from './img/logo-mobile.svg';

import './header.scss';

const Header = ( { children } ) => {
  return (
    <header className="header">
      <div className="header__wrapper wrapper">
        <div className="header__pasteboard">
          <h1 className="visually-hidden">ARMAGGEDON V</h1>
          <picture>
            <source media="(min-width: 769px)" srcSet={ logoDesktop } />
            <img src={ logoMobile } alt="Логотип сервиса ARMAGGEDON V" />
          </picture>
          <p className="header__description">Сервис мониторинга и уничтожения астероидов, опасно подлетающих к Земле.</p>
        </div>
        { children }
      </div>
    </header>
  );
};

export default Header;
