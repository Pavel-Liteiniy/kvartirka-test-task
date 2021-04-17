import React from 'react';

import './navigation.scss';

const Navigation = () => {
  return (
    <div className="header__navigation navigation">
      <nav>
        <ul className="navigation__list">
          <li className="navigation__item navigation__item--selected">
            <a href="#/asteroids">Астероиды</a>
          </li>
          <li className="navigation__item">
            <a href="#/destruction-list">Уничтожение</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
