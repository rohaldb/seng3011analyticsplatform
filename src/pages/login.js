import React from 'react'
import withRoot from '../withRoot'
import { withStyles } from 'material-ui'
import '../assets/login.css'
import firebase from 'firebase'
import { DB_CONFIG } from '../config'

const styles = theme => ({

})

class Login extends React.Component {

    constructor() {
      super();

      this.publish = this.publish.bind(this);
      this.app = firebase.initializeApp(DB_CONFIG)
      this.database = this.app.database().ref().child('speed')
      this.state = {
          speed: 10
      }
    }

    componentDidMount() {
        this.database.on('value', snap => {
            this.setState({
                speed: snap.val()
            })
        })
    }

    publish(topicBox) {
        console.log(this.refs.name.value)
    }

  render() {
    return (
      <div className='form'>
        <div className='form_logo'>
          Logo Goes Here...
        </div>
        <div>
            <h1>The value is {this.state.speed}</h1>
        </div>
        <div className='form_title'>
          Login
        </div>
        <form className='form_items'>
          <div className='form_inputs'>
            <label>Username</label>
            <input
              ref="name"
              type='text'
              required
              />
          </div>
          <div className='form_inputs'>
            <label>Password</label>
            <input
              type='password'
              required
              />
          </div>
          <button className='form_button' onClick={(e) => this.publish(e, this.refs.name.value)}>
            Log In
            </button>
        </form>
        <div className='form_other'>
          <a href='/#'>forgot password?</a>
          <a href='/#'>Join Now</a>
        </div>
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(Login))
