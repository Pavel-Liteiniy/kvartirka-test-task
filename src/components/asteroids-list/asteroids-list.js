import React, { useState, useCallback, useEffect, useMemo } from 'react'

import Spinner from '../spinner'
import ErrorIndicator from '../error-indicator'
import AsteroidCard from '../asteroid-card'

import { withContext } from '../../hoc'

import './asteroids-list.scss'

const AsteroidsList = ( { api } ) => {

  const useRequest = ( request ) => {
    const initialState = useMemo( () => ( {
      data: null,
      settings: {
        isDangerousOnly: false,
        selectedUnit: 'kilometers'
      },
      loading: true,
      error: null,
    } ), [] )

    const [ dataState, setDataState ] = useState( initialState )

    useEffect( () => {
      setDataState( initialState )

      let cancelled = false

      request()
        .then( ( data ) => !cancelled && setDataState( prevState => ( {
          ...prevState,
          data,
          loading: false,
          error: null,
        } ) ) )
        .catch( ( error ) => !cancelled && setDataState( prevState => ( {
          ...prevState,
          data: null,
          loading: false,
          error,
        } ) ) )

      return () => cancelled = true
    }, [ request, initialState ] )

    return [ dataState, setDataState ]
  }

  const useData = ( startDate, endDate ) => {
    const request = useCallback( () => api.getAllAsteroids( startDate, endDate ), [ startDate, endDate ] )

    return useRequest( request )
  }

  const onFilterDangerousChange = () => setDataState( prevDataState => ( {
    ...prevDataState,
    settings: {
      ...prevDataState.settings,
      isDangerousOnly: !prevDataState.settings.isDangerousOnly,
    }
  } ) )

  const onUnitChange = ( evt ) => setDataState( prevDataState => ( {
    ...prevDataState,
    settings: {
      ...prevDataState.settings,
      selectedUnit: evt.target.value
    }
  } ) )

  const [ { data, settings, loading, error }, setDataState ] = useData( `2021-04-21`, `2021-04-28` )

  let listContent = null

  if ( error ) {
    listContent = <ErrorIndicator />
  }

  if ( loading ) {
    listContent = <Spinner />
  }

  if ( !error && !loading ) {
    let filteredItems = data.slice().reverse()

    if ( settings.isDangerousOnly ) {
      filteredItems = filteredItems.filter( item => item.isDanderous )
    }

    listContent = filteredItems.map( item => {
      const { id } = item

      return (
        <li key={ id } className="asteroids-list__item">
          <AsteroidCard data={ item } selectedUnit={ settings.selectedUnit } />
        </li>
      )
    } )
  }

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
        <ul className="asteroids-list__list">
          { listContent }
        </ul>
      </div>
    </section>
  )
}

export default withContext( AsteroidsList )
