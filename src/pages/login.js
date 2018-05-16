import React from 'react'
import withRoot from '../withRoot'
import { withStyles } from 'material-ui'
import '../assets/login.css'
import { fb } from '../config'
import { Link } from 'react-router-dom'

const styles = theme => ({

})

class Login extends React.Component {

    constructor() {
      super();
      this.publish = this.publish.bind(this);
      this.database = fb.database().ref()
      this.state = {
          name: null,
          userId: null,
          isValid: true
      }
    }

    publish(username) {

        this.database.child('users').orderByChild('firstname').equalTo(this.refs.name.value).on("value", snap => {
            if (snap.val() != null) {
                snap.forEach(data => {
                    this.setState({ userId: data.child('id').val() })
                    this.props.history.push({
                      pathname: `/timeline`,
                      state: {
                          userId: this.state.userId
                      }
                    })
                })
            } else {
                this.setState({ isValid: false })
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
            { this.state.isValid ? null : <p> Invalid credentials </p> }
        </form>
      </div>
    );
  }
}

// <Link to={`/timeline`} params={{ testvalue: this.state.name }} style={{color: 'white'}}>
// </Link>
export default withRoot(withStyles(styles)(Login))
