import React from 'react'
import { ReactComponent as SpaceShipIcon } from './img/space-ship.svg'

import { withContext } from '../../hoc'


import './red-button.scss'

const RedButton = ( { killListChangeHandler } ) => {
  return (
    <div className="red-button">
      <div className="red-button__wrapper wrapper">
        <a
          className="red-button__link"
          href="#!"
          onClick={ evt => {
            evt.preventDefault()
            killListChangeHandler( null, true )
          } }>
          Заказать бригаду имени Брюса&nbspУиллиса
        <SpaceShipIcon className="red-button__icon" />
        </a>
      </div>
    </div>
  )
}

export default withContext( RedButton )
