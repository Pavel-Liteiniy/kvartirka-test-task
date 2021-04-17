import React from 'react';

import './asteroids-list.scss';

const AsteroidsList = ( { children } ) => {
  return (
    <section className="asteroids-list">
      <h2 className="visually-hidden">Список астероидов</h2>
      <div className="asteroids-list__wrapper wrapper">
        <div className="asteroids-list__settings-list">
          <form
            method="post"
            action="https://echo.htmlacademy.ru">
            <div className="asteroids-list__settings-item asteroids-list__settings-item--checkbox">
              <input className="visually-hidden" id="dangerous-only" name="dangerous-only" type="checkbox" />
              <label htmlFor="dangerous-only">Показать только опасные</label>
            </div>
            <div className="asteroids-list__settings-item asteroids-list__settings-item--unit">
              <span>Расстояние</span>
              <input className="visually-hidden" id="distance-kilometers" name="distance-measure" type="radio" />
              <label htmlFor="distance-kilometers">в километрах,</label>
              <input className="visually-hidden" id="distance-moon" name="distance-measure" type="radio" />
              <label htmlFor="distance-moon">в дистанциях до луны</label>
            </div>
          </form>
        </div>
        <ul className="asteroids-list__list">
          {
            React.Children.map( children, child => <li className="asteroids-list__item">{ child }</li> )
          }
        </ul>
      </div>
    </section>
  );
};

export default AsteroidsList;
