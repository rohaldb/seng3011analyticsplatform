import React from 'react'
import ReactDOM from 'react-dom'
import { Landing, Event, Login } from './pages'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'typeface-roboto'
// eslint-disable-next-line
import './assets/landing.css'

const Root = () => (
  <Router>
    <div style={{fontFamily: 'Roboto'}}>
      <Route path='/' component={loginParams} />
      <Route path='/event/:eventID' component={EventParams} />
      <Route exact path='/landing' component={LandingParams} />
    </div>
  </Router>
)

// <Route exact path='/' component={LandingParams} />

const EventParams = ({ match, history }) => <Event eventID={match.params.eventID} history={history} />

const LandingParams = ({ history }) => <Landing history={history} />

const loginParams = ({ history }) => <Login history={history} />

ReactDOM.render(<Root />, document.querySelector('#root'))
