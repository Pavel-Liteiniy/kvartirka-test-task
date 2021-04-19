import React from 'react'

import { ReactComponent as AsteroidIcon } from './img/asteroid.svg'

import './spinner.scss'

const Spinner = () => {
  return (
    <div className="spinner">
      <div className="spinner__wrapper wrapper">
        <AsteroidIcon className="spinner__icon" />
        <p className="spinner__description">Астероиды<br />приближаются...</p>
      </div>
    </div>
  )
}

export default Spinner
