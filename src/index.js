import React from 'react';
import ReactDOM from 'react-dom';

import './sass/variables.scss'
import './sass/fonts.scss'
import './sass/base.scss'
import './sass/wrapper.scss'

import Header from './components/header'
import Footer from './components/footer'
import Navigation from './components/navigation'
import AsteroidsList from './components/asteroids-list'
import AsteroidCard from './components/asteroid-card'
import Popup from './components/popup'
import RedButton from './components/red-button'


ReactDOM.render(
  <React.StrictMode>
    <Header>
      <Navigation />
    </Header>
    <main>
      <AsteroidsList>
        <AsteroidCard />
        <AsteroidCard />
        <AsteroidCard />
      </AsteroidsList>
      <Popup />
      <RedButton />
    </main>
    <Footer />
  </React.StrictMode>,
  document.getElementById( 'root' )
);
