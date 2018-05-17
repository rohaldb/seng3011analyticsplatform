import React from 'react'
import { withRouter } from 'react-router'
import withRoot from '../withRoot'
import { withStyles } from 'material-ui'
import '../assets/login.css'
import { fb } from '../config'
const styles = theme => ({})

class Login extends React.Component {

  constructor() {
    super();
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
    });
  }

  render() {
    return (
      <div className='form'>
        <div className='form_logo'>
          Logo Goes Here...
        </div>
        <div className='form_title'>
          Login
        </div>
        <div className='form_inputs'>
          <label>Username</label>
          <input ref="name" type='text' required/>
        </div>
        <div className='form_inputs'>
          <label>Password</label>
          <input type='password'/>
        </div>
        <button className='form_button' onClick={(e) => this.getUserId(e, this.refs.name.value)}>
          Log In
        </button>
        {this.state.isValid
          ? null
          : <p>
            Invalid credentials
          </p>}
      </div>
    );
  }
}
export default withRouter(withRoot(withStyles(styles)(Login)))
