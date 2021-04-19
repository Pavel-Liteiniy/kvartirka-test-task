import React, { useEffect, useReducer, useCallback, useRef } from 'react'
import dayjs from 'dayjs'

import Spinner from '../spinner'
import ErrorIndicator from '../error-indicator'
import AsteroidCard from '../asteroid-card'

import { Unit } from '../../const'
import { withContext } from '../../hoc'

import './asteroids-list.scss'

const Activity = {
  STACK: 'stack-asteroids',
  LOADING: 'loading-asteroids',
  ADVANCE: 'advance-day',
  UNIT: 'unitTypeSetting',
  DANGEROUS: 'isDangerousSetting',
  ERROR: 'error',
}

const AteroidsList = ( { api } ) => {
  const asteroidReducer = ( state, action ) => {
    switch ( action.type ) {
      case Activity.STACK:
        return {
          ...state,
          asteroids: state.asteroids.concat( action.asteroids )
        }
      case Activity.LOADING:
        return {
          ...state,
          loading: action.loading
        }
      case Activity.ERROR:
        return {
          ...state,
          error: action.error,
          loading: false
        }
      case Activity.UNIT:
        return {
          ...state,
          settings: {
            selectedUnit: action.setting,
            isDangerousOnly: state.settings.isDangerousOnly
          }
        }
      case Activity.DANGEROUS:
        return {
          ...state,
          settings: {
            selectedUnit: state.settings.selectedUnit,
            isDangerousOnly: !state.settings.isDangerousOnly
          }
        }
      default:
        return state
    }
  }

  const [ asteroidData, asteroidDispatch ] = useReducer(
    asteroidReducer,
    {
      asteroids: [],
      loading: true,
      error: null,
      settings: {
        selectedUnit: Unit.KILOMETERS,
        isDangerousOnly: false
      }
    } )

  const dayReducer = ( state, action ) => {
    switch ( action.type ) {
      case Activity.ADVANCE:
        return { ...state, day: dayjs( state.day ).add( 1, 'day' ).format( 'YYYY-MM-DD' ) }
      default:
        return state
    }
  }
  const [ date, dateDispatch ] = useReducer( dayReducer, { day: dayjs().format( 'YYYY-MM-DD' ) } )

  useEffect( () => {

    asteroidDispatch( {
      type: Activity.LOADING,
      loading: true,
      error: null
    } )

    api.getAllAsteroids( date.day, date.day )
      .then( asteroids => {
        asteroidDispatch( { type: Activity.STACK, asteroids } )
        asteroidDispatch( { type: Activity.LOADING, loading: false } )
      } )
      .catch( error => {
        asteroidDispatch( { type: Activity.ERROR, error } )
      } )

  }, [ asteroidDispatch, date.day ] )

  let bottomBoundaryRef = useRef( null )
  const scrollObserver = useCallback(
    node => {
      new IntersectionObserver( entries => {
        entries.forEach( en => {
          if ( en.intersectionRatio > 0 ) {
            dateDispatch( { type: Activity.ADVANCE } )
          }
        } )
      } ).observe( node )
    },
    [ dateDispatch ]
  )

  useEffect( () => {
    if ( bottomBoundaryRef.current ) {
      scrollObserver( bottomBoundaryRef.current )
    }
  }, [ scrollObserver, bottomBoundaryRef ] )

  const onFilterDangerousChange = () => asteroidDispatch( { type: Activity.DANGEROUS } )
  const onUnitChange = ( evt ) => asteroidDispatch( { type: Activity.UNIT, setting: evt.target.value } )

  const { asteroids, settings, loading, error } = asteroidData

  return (
    <section className="asteroids-list">
      <h2 className="visually-hidden">Список астероидов</h2>
      <div className="asteroids-list__wrapper wrapper">
        <div className="asteroids-list__settings-list">
          <form
            method="post"
            action="https://echo.htmlacademy.ru">
            <div className="asteroids-list__settings-item asteroids-list__settings-item--checkbox">
              <input
                className="visually-hidden"
                id="dangerous-only"
                name="dangerous-only"
                type="checkbox"
                checked={ settings.isDangerousOnly }
                onChange={ onFilterDangerousChange } />
              <label htmlFor="dangerous-only">Показать только опасные</label>
            </div>
            <div className="asteroids-list__settings-item asteroids-list__settings-item--unit">
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
        { asteroids.map( asteroid => {
          if ( settings.isDangerousOnly && !asteroid.isDanderous ) {
            return null
          }

          return <li key={ asteroid.id }><AsteroidCard data={ asteroid } selectedUnit={ settings.selectedUnit } /></li>
        } ) }
        <div ref={ bottomBoundaryRef }></div>
        { loading && <Spinner /> }
        { error && <ErrorIndicator /> }
      </div>
    </section>
  )
}

export default withContext( AteroidsList )
