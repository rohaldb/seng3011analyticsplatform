import React from 'react'
import ReactDOM from 'react-dom'
import { Landing, Event } from './pages'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'typeface-roboto'
// eslint-disable-next-line
import './assets/landing.css'

const Root = () => (
  <Router>
    <div style={{fontFamily: 'Roboto'}}>
      <Route exact path='/' component={LandingParams} />
      <Route path='/event/:eventID' component={EventParams} />
    </div>
  </Router>
)

const EventParams = ({ match, history }) => <Event eventID={match.params.eventID} history={history} />

const LandingParams = ({ history }) => <Landing history={history} />

ReactDOM.render(<Root />, document.querySelector('#root'))
