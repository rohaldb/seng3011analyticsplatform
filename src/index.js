import React from 'react'
import ReactDOM from 'react-dom'
import { Timeline, Event, Login } from './pages'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'typeface-roboto'
// eslint-disable-next-line
import './assets/timeline.css'
import * as firebase from 'firebase'

var config = {
  apiKey: "AIzaSyBSd_5dRD0LcLCK89q0wX23nEVrDkG93H0",
  authDomain: "seng3-2c510.firebaseapp.com",
  databaseURL: "https://seng3-2c510.firebaseio.com",
  projectId: "seng3-2c510",
  storageBucket: "",
  messagingSenderId: "792824470132"
};
firebase.initializeApp(config);

const Root = () => (
  <Router>
    <div style={{fontFamily: 'Roboto'}}>
      <Route path='/login' component={LoginParams} />
      <Route path='/event/:eventID' component={EventParams} />
      <Route exact path='/timeline' component={TimelineParams} />
    </div>
  </Router>
)

// <Route exact path='/' component={timelineParams} />

const EventParams = ({ match, history }) => <Event eventID={match.params.eventID} history={history} />

const TimelineParams = ({ history }) => <Timeline history={history} />

const LoginParams = ({ history }) => <Login history={history} />


ReactDOM.render(<Root />, document.querySelector('#root'))
