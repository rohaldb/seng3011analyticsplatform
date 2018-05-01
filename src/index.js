import React from 'react'
import ReactDOM from 'react-dom'
import { Landing, Event } from './pages'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'typeface-roboto'

const Root = () => (
  <Router>
    <div style={{fontFamily: 'Roboto'}}>
      <Route exact path='/' component={Landing} />
      <Route path='/event/:eventID' component={EventParams} />
    </div>
  </Router>
)

const EventParams = ({ match }) => <Event eventID={match.params.eventID} />

ReactDOM.render(<Root />, document.querySelector('#root'))
