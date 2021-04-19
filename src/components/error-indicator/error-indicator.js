import React from 'react'

import { ReactComponent as AstronautIcon } from './img/astronaut.svg'

import './error-indicator.scss'

const ErrorIndicator = () => {
  return (
    <div className="error-indicator">
      <div className="error-indicator__wrapper wrapper">
        <AstronautIcon className="error-indicator__icon" />
        <p className="error-indicator__description">Хьюстон, у нас проблема!</p>
      </div>
    </div>
  )
}

export default ErrorIndicator
