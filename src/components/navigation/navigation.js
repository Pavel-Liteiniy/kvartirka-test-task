import React from 'react'
import { Link } from 'react-router-dom'

import { withContext } from '../../hoc'
import { Page } from '../../const'

import './navigation.scss'


const Navigation = ( { selectedPage, changePageHandler } ) => {
  return (
    <div className="header__navigation navigation">
      <nav>
        <ul className="navigation__list">
          <li className={ `navigation__item${selectedPage === Page.HOME ? ` navigation__item--selected` : ``}` }>
            <Link to="/" onClick={ () => changePageHandler( Page.HOME ) }>Астероиды</Link>
          </li>
          <li className={ `navigation__item${selectedPage === Page.KILL_LIST ? ` navigation__item--selected` : ``}` }>
            <Link to="/kill-list" onClick={ () => changePageHandler( Page.KILL_LIST ) }>Уничтожение</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default withContext( Navigation )
