import React, { useState } from 'react'

import AsteroidCard from '../asteroid-card'
import RedButton from '../red-button'
import { withContext } from '../../hoc'

import { Unit } from '../../const'

import './kill-list.scss'

const KillList = ( { killList, changeKillList } ) => {

  const onFilterDangerousChange = () => setState( prevState => ( {
    ...prevState,
    isDangerousOnly: !prevState.isDangerousOnly,
  } ) )

  const onUnitChange = ( evt ) => setState( prevState => ( {
    ...prevState,
    selectedUnit: evt.target.value
  } ) )

  const [ state, setState ] = useState( {
    isDangerousOnly: false,
    selectedUnit: Unit.KILOMETERS
  } )

  const { isDangerousOnly, selectedUnit } = state
  let items = []

  killList.forEach( item => items.push( item ) )

  if ( isDangerousOnly ) {
    items = items.filter( item => item.isDanderous )
  }

  const listContent = items.map( item => {
    const { id } = item

    return (
      <li key={ id } className="kill-list__item">
        <AsteroidCard data={ item } selectedUnit={ selectedUnit } />
      </li>
    )
  } )

  const element = listContent.length > 0 ?
    <React.Fragment>
      <ul className="kill-list__list">{ listContent }</ul>
      <RedButton />
    </React.Fragment>
    : <p className="kill-list__bung">Полнейший вакуум...</p>


  return (
    <section className="kill-list">
      <h2 className="visually-hidden">Список астероидов</h2>
      <div className="kill-list__wrapper wrapper">
        <div className="kill-list__settings-list">
          <form
            method="post"
            action="https://echo.htmlacademy.ru">
            <div className="kill-list__settings-item kill-list__settings-item--checkbox">
              <input
                className="visually-hidden"
                id="dangerous-only"
                name="dangerous-only"
                type="checkbox"
                checked={ isDangerousOnly }
                onChange={ onFilterDangerousChange } />
              <label htmlFor="dangerous-only">Показать только опасные</label>
            </div>
            <div className="kill-list__settings-item kill-list__settings-item--unit">
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
        { element }
      </div>
    </section>
  )
}

export default withContext( KillList )
