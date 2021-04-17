import React from 'react'
import { ReactComponent as AsteroidIcon } from './img/asteroid.svg'
import { ReactComponent as DinoIcon } from './img/dino.svg'

import './asteroid-card.scss'

const AsteroidCard = () => {
  return (
    <div className="asteroid-card">
      <div className="asteroid-card__data">
        <h3 className="asteroid-card__header">
          <a href="#!">2021 FQ</a>
        </h3>
        <ul className="asteroid-card__spec">
          <li>
            <span>Дата</span>
            <div></div>
            <span>12 сентября 2021</span>
          </li>
          <li>
            <span>Расстояние</span>
            <div></div>
            <span>7 235 024 км </span>
          </li>
          <li>
            <span>Размер</span>
            <div></div>
            <span>85 м</span>
          </li>
        </ul>
      </div>
      <div className="asteroid-card__instructions">
        <p className="asteroid-card__status">Оценка: <span>не опасен</span></p>
        <a className="asteroid-card__add-to-cart" href="#!">На уничтожение</a>
      </div>
      <AsteroidIcon className="asteroid-card__icon asteroid-card__icon--asteroid" />
      <DinoIcon className="asteroid-card__icon asteroid-card__icon--dino" />
    </div>
  )
}

export default AsteroidCard
