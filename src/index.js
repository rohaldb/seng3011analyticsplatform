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
      <Route exact path='/' component={() => <Login />} />
      <Route path='/event/:eventID' component={EventParams} />
      <Route exact path='/timeline' component={TimelineParams} />
    </div>
  </Router>
)

const EventParams = ({ location, match }) => {
  return (<Event
    currentUser={location.state.currentUser}
    eventData={location.state.eventData}
    eventID={match.params.eventID}
  />)
}

const TimelineParams = ({ location }) =>
  <Timeline
    currentUser={location.state.currentUser}
  />

ReactDOM.render(<Root />, document.querySelector('#root'))
