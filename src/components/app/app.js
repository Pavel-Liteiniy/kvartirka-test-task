import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import '../../sass/variables.scss'
import '../../sass/fonts.scss'
import '../../sass/base.scss'
import '../../sass/wrapper.scss'

import Header from '../header'
import Footer from '../footer'
import Navigation from '../navigation'
import AsteroidsList from '../asteroids-list'
import AsteroidDetailedCard from '../asteroid-detailed-card'
import KillList from '../kill-list'
import ErrorBoundry from '../error-boundry'

import { ContextProvider } from '../../context'
import Api from '../../api/api'
import { Page } from '../../const'

const END_POINT = `https://api.nasa.gov/neo/rest/v1`
const API_KEY = `H1ghBeJyjvGt6MdSede0fvq1Owo50sASGlpmI5dO`

export default class App extends Component {
  state = {
    api: new Api( END_POINT, API_KEY ),
    killList: new Map(),
    selectedPage: Page.HOME
  }

  render() {
    return (
      <React.Fragment>
        <ErrorBoundry>
          <ContextProvider
            value={ {
              killListChangeHandler: this.changeKillList,
              changePageHandler: this.changePage,
              ...this.state
            } }>
            <Router>
              <Header>
                <Navigation />
              </Header>
              <main>
                <Route path={ `/` } render={ () => <AsteroidsList /> } exact />
                <Route path={ `/kill-list` } render={ () => <KillList /> } />
                <Route path={ `/asteroid/:id` } render={ ( { match } ) => <AsteroidDetailedCard asteroidId={ match.params.id } /> } />
              </main>
              <Footer />
            </Router>
          </ContextProvider>
        </ErrorBoundry>
      </React.Fragment>
    )
  }

  changeKillList = ( item, clearAll = false ) => {
    if ( clearAll ) {
      return this.setState( prevState => {
        prevState.killList.clear()

        return {
          killList: prevState.killList
        }
      } )
    }

    const { id } = item
    const { killList } = this.state

    if ( killList.has( id ) ) {
      this.setState( prevState => {
        prevState.killList.delete( id )

        return {
          killList: prevState.killList
        }
      } )
    } else {
      this.setState( prevState => {
        prevState.killList.set( id, item )

        return {
          killList: prevState.killList
        }
      } )
    }
  }

  changePage = ( selectedPage ) => {
    this.setState( { selectedPage } )
  }
}
