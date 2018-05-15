import React from 'react'
import withRoot from '../withRoot'
import { withStyles } from 'material-ui'
import '../assets/login.css'

const styles = theme => ({

})

/* Sidebar.jsx */

/* App.jsx */
class Login extends React.Component {
  render() {
    return (
      <div className='form'>
        <div className='form_logo'>
          Logon
        </div>
        <div className='form_title'>
          Login
        </div>
        <form className='form_items'>
          <div className='form_inputs'>
            <input
              type='text'
              required
              />
            <label>username or email</label>
          </div>
          <div className='form_inputs'>
            <input
              type='password'
              required
              />
            <label>password</label>
          </div>
          <button className='form_button'>Log In</button>
        </form>
        <div className='form_other'>
          <a href='#'>forgot password?</a>
          <a href='#'>Join Now</a>
        </div>
      </div>
    );
  }

}

export default withRoot(withStyles(styles)(Login))
