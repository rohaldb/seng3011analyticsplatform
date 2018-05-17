import React from 'react'
import ReactDOM from 'react-dom'
import { Timeline, Event, Login } from './pages'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'typeface-roboto'
// eslint-disable-next-line
import './assets/timeline.css'

const Root = () => (
  <Router>
    <div style={{fontFamily: 'Roboto'}}>
      <Route exact path='/' component={LoginParams} />
      <Route path='/event/:eventID' component={EventParams} />
      <Route exact path='/timeline' component={TimelineParams} />
    </div>
  </Router>
)

const EventParams = ({ location, match, history }) => {
  return (<Event
    currentUser={location.state.currentUser}
    eventID={match.params.eventID}
    history={history}
  />)
}

const TimelineParams = ({ location, history }) =>
  <Timeline
    currentUser={location.state.currentUser}
    history={history}
  />

const LoginParams = ({ history }) => <Login history={history} />

ReactDOM.render(<Root />, document.querySelector('#root'))
