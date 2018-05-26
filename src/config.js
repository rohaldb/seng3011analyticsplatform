import firebase from 'firebase/'
import Rebase from 're-base'

export const DB_CONFIG = {
  apiKey: 'AIzaSyBSd_5dRD0LcLCK89q0wX23nEVrDkG93H0',
  authDomain: 'seng3-2c510.firebaseapp.com',
  databaseURL: 'https://seng3-2c510.firebaseio.com',
  projectId: 'seng3-2c510',
  storageBucket: '',
  messagingSenderId: '792824470132'
}

const fb = firebase.initializeApp(DB_CONFIG)
const base = Rebase.createClass(fb.database())

export { fb, base }
