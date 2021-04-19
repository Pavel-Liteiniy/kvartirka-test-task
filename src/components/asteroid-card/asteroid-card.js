import React from 'react'
import { Link } from 'react-router-dom'

import dayjs from 'dayjs'
import updateLocale from 'dayjs/plugin/updateLocale'

import { ReactComponent as AsteroidIcon } from './img/asteroid.svg'
import { ReactComponent as DinoIcon } from './img/dino.svg'

import { withContext } from '../../hoc'
import { getAverage, getNumberFormat } from '../../utils/common'

import './asteroid-card.scss'

dayjs.extend( updateLocale )

dayjs.updateLocale( 'en', {
  months: [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
    'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ]
} )

const Unit = {
  'kilometers': 'км',
  'lunar': 'лун'
}

const AsteroidCard = ( { data, selectedUnit, killList, killListChangeHandler } ) => {
  const { id, name, size, isDanderous, closeApproachData } = data

  const nameMatches = name.match( /\((.+)\)/ )
  const missDistance = getNumberFormat( Math.round( closeApproachData[ 0 ].missDistance[ selectedUnit ] ) )
  const sizeAverage = getNumberFormat( Math.round( getAverage( size.diameterMin, size.diameterMax ) ) )
  const multiplier = sizeAverage / 85
  const closeApproachDate = dayjs( closeApproachData[ 0 ].closeApproachDate ).format( 'DD MMMM YYYY' )
  const isNeedToKill = killList.has( id )

  return (
    <div className={ `asteroid-card${isDanderous ? ` asteroid-card--dangerous` : ``}` }>
      <div className="asteroid-card__data">
        <h3 className="asteroid-card__header">
          <Link to={ `/${id}` }>{ nameMatches[ 1 ] }</Link>
        </h3>
        <ul className="asteroid-card__spec">
          <li>
            <span>Дата</span>
            <div></div>
            <span>{ closeApproachDate }</span>
          </li>
          <li>
            <span>Расстояние</span>
            <div></div>
            <span>{ `${missDistance} ${Unit[ selectedUnit ]}` }</span>
          </li>
          <li>
            <span>Размер</span>
            <div></div>
            <span>{ `${sizeAverage} м` }</span>
          </li>
        </ul>
      </div>
      <div className="asteroid-card__instructions">
        <p className="asteroid-card__status">Оценка: <span>{ isDanderous ? `опасен` : `не опасен` }</span></p>
        <a
          className={ `asteroid-card__add-to-cart${isNeedToKill ? ` asteroid-card__add-to-cart--added` : ``}` }
          onClick={ () => killListChangeHandler( data ) }>{ isNeedToKill ? `Будет уничтожен` : `На уничтожение` }</a>
      </div>
      <AsteroidIcon
        className="asteroid-card__icon asteroid-card__icon--asteroid"
        style={ { width: `${71 * multiplier}px`, height: `${72 * multiplier}px` } } />
      <DinoIcon className="asteroid-card__icon asteroid-card__icon--dino" />
    </div>
  )
}

export default withContext( AsteroidCard )
