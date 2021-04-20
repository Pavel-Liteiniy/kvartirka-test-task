import React, { useEffect, useState, useCallback, useMemo } from 'react'

import dayjs from 'dayjs'
import updateLocale from 'dayjs/plugin/updateLocale'

import Spinner from '../spinner'
import ErrorIndicator from '../error-indicator'

import { ReactComponent as AsteroidIcon } from './img/asteroid.svg'
import { ReactComponent as DinoIcon } from './img/dino.svg'

import { withContext } from '../../hoc'
import { getAverage, getNumberFormat } from '../../utils/common'
import { Unit } from '../../const'


import './asteroid-detailed-card.scss'

dayjs.extend( updateLocale )

dayjs.updateLocale( 'en', {
  months: [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
    'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ]
} )

const UnitType = {
  'kilometers': 'км',
  'lunar': 'лун'
}

const useRequest = ( request ) => {
  const initialState = useMemo( () => ( {
    data: null,
    loading: true,
    error: null,
  } ), [] )

  const [ dataState, setDataState ] = useState( initialState )

  useEffect( () => {
    setDataState( initialState )

    let cancelled = false

    request()
      .then( ( data ) => !cancelled && setDataState( {
        data,
        loading: false,
        error: null,
      } ) )
      .catch( ( error ) => !cancelled && setDataState( {
        data: null,
        loading: false,
        error,
      } ) )

    return () => cancelled = true
  }, [ request, initialState ] )

  return dataState
}

const useAsteroidInfo = ( id, api ) => {
  const request = useCallback( () => api.getAsteroid( id ), [ id, api ] )

  return useRequest( request )
}

const createFlightLists = ( items, selectedUnit ) => items.map( ( { closeApproachDate, missDistance, orbitingBody, relativeVelocity }, index ) => {

  return ( <ul key={ index } className="asteroid-detailed-card__spec">
    <li>
      <span>Дата</span>
      <div></div>
      <span>{ dayjs( closeApproachDate ).format( 'DD MMMM YYYY' ) }</span>
    </li>
    <li>
      <span>Расстояние</span>
      <div></div>
      <span>{ `${getNumberFormat( Math.round( missDistance[ selectedUnit ] ) )} ${UnitType[ selectedUnit ]}` }</span>
    </li>
    <li>
      <span>Скорость</span>
      <div></div>
      <span>{ `${getNumberFormat( Math.round( relativeVelocity ) )} км/ч` }</span>
    </li>
    <li>
      <span>Орбита</span>
      <div></div>
      <span>{ orbitingBody }</span>
    </li>
  </ul> )
} )

const AsteroidDetailedCard = ( { asteroidId: id, api, killList, killListChangeHandler } ) => {
  const { data, loading, error } = useAsteroidInfo( id, api )
  const [ selectedUnit, setUnitState ] = useState( Unit.KILOMETERS )

  const onUnitChange = ( evt ) => setUnitState( evt.target.value )

  let content = null

  if ( !loading && !error ) {
    const { name, size, isDanderous, closeApproachData } = data

    const nameMatches = name.match( /\((.+)\)/ )
    const sizeAverage = getNumberFormat( Math.round( getAverage( size.diameterMin, size.diameterMax ) ) )
    const multiplier = sizeAverage / 85

    const isNeedToKill = killList.has( id )

    content = (
      <React.Fragment>
        <div className="asteroid-detailed-card__wrapper wrapper">
          <div className="asteroid-detailed-card__settings-list">
            <form
              method="post"
              action="https://echo.htmlacademy.ru">
              <div className="asteroid-detailed-card__settings-item asteroid-detailed-card__settings-item--unit">
                <span>Расстояние</span>
                <input
                  className="visually-hidden" id="distance-kilometers"
                  name="distance-measure"
                  type="radio"
                  value="kilometers"
                  defaultChecked
                  onChange={ onUnitChange } />
                <label htmlFor="distance-kilometers">в километрах,</label>
                <input
                  className="visually-hidden"
                  id="distance-moon"
                  name="distance-measure"
                  type="radio"
                  value="lunar"
                  onChange={ onUnitChange } />
                <label htmlFor="distance-moon">в дистанциях до луны</label>
              </div>
            </form>
          </div>
          <div className={ `asteroid-detailed-card${isDanderous ? ` asteroid-detailed-card--dangerous` : ``}` }>
            <div className="asteroid-detailed-card__data">
              <h3 className="asteroid-detailed-card__header">
                { nameMatches[ 1 ] }
              </h3>
              <p>{ `Размер - ${sizeAverage} м` }</p>
            </div>
            <div className="asteroid-detailed-card__instructions">
              <p className="asteroid-detailed-card__status">Оценка: <span>{ isDanderous ? `опасен` : `не опасен` }</span></p>
              <button
                className={ `asteroid-detailed-card__add-to-cart${isNeedToKill ? ` asteroid-detailed-card__add-to-cart--added` : ``}` }
                onClick={ () => killListChangeHandler( data ) }>{ isNeedToKill ? `Будет уничтожен` : `На уничтожение` }</button>
            </div>
            <AsteroidIcon
              className="asteroid-detailed-card__icon asteroid-detailed-card__icon--asteroid"
              style={ { width: `${71 * multiplier}px`, height: `${72 * multiplier}px` } } />
            <DinoIcon className="asteroid-detailed-card__icon asteroid-detailed-card__icon--dino" />
          </div>
          <h3>Cписок всех сближений астероида</h3>
          { createFlightLists( closeApproachData, selectedUnit ) }
        </div>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      { loading && <Spinner /> }
      { error && <ErrorIndicator /> }
      { content }
    </React.Fragment>

  )
}

export default withContext( AsteroidDetailedCard )
