import React from 'react'
import { withRouter } from 'react-router'
import withRoot from '../withRoot'
import { withStyles } from 'material-ui'
import '../assets/login.css'
import { fb } from '../config'

const styles = theme => ({})

class Login extends React.Component {

  constructor() {
    super()
    this.database = fb.database().ref()
    this.state = {
      name: null,
      userId: null,
      isValid: true
    }
  }

  getUserId = (username) => {
    this.database.child('users').orderByChild('firstname').equalTo(this.refs.name.value).on("value", snap => {
      if (snap.val() != null) {
        snap.forEach(data => {
          this.props.history.push({
            pathname: `/timeline`,
            state: {
              currentUser: data.val()
            }
          })
        })
      } else {
        this.setState({isValid: false})
      }
    })
  }

  render() {
    return (
      <div className='form'>
        <div className='form_logo'>
          Event<span>S</span>tock
        </div>
        <div className='form_title'>
          Log<span>I</span>n
        </div>
        <div className='form_items'>
          <div className='form_inputs'>
            <div className='form_inputs'>
              <label>Username</label>
              <input ref="name" type='text' required/>
            </div>
          </div>
          <div className='form_inputs'>
            <input
              type='password'/>
            <label>password</label>
          </div>
          <button className='form_button' onClick={(e) => this.getUserId(e, this.refs.name.value)}>
            Log In
          </button>
        </div>
        <div className='form_other'>
          <a>forgot password?</a>
          <a>Join Now</a>
        </div>
        {this.state.isValid ? null : <p> Username or password is incorrect, please try again </p>}
      </div>
    );
  }

}

export default withRouter(withRoot(withStyles(styles)(Login)))
