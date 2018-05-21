import React from 'react'
import { withRouter } from 'react-router'
import withRoot from '../withRoot'
import { withStyles } from 'material-ui'
import '../assets/login.css'
import { fb } from '../config'
import _ from 'lodash'
import Dialog, {
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog'
import Button from '@material-ui/core/Button'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import Typography from 'material-ui/Typography'

const styles = theme => ({})

const options = [
  'Aviation',
  'Tech',
  'Sports',
  'Social Media',
  'Commodities',
]

class Login extends React.Component {

  constructor() {
    super()
    this.database = fb.database().ref()
    this.state = {
      name: null,
      userId: null,
      isValid: true,

      /* sign-up modal */
      open: false,

      /* signup fields */
      username: '',
      email: '',
      password: '',
      confirmpass: '',
      industry: 'Aviation',
      invalid: ''
    }
  }

  handleClickListItem = () => {
    this.setState({ open: true })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  handleOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.resetFields()
    this.setState({open: false})
  }

  resetFields = () => {
    this.setState({
      username: '',
      email: '',
      password: '',
      confirmpass: '',
      industry: 'Aviation',
      invalid: ''
    })
  }

  getUserId = (username) => {
    this.database.child('users').orderByChild('username').equalTo(this.refs.name.value).on("value", snap => {
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

  signup = () => {
    let {
      username,
      email,
      password,
      confirmpass
    } = this.state

    if (username.match(/^\s*$/) || email.match(/^\s*$/) || password === '' || confirmpass === '') {
      this.setState({invalid: 'Please complete all fields.'})
    } else if (username.length < 6) {
      this.setState({invalid: 'Username is too short. At least 3 characters required.'})
    } else if (!email.match(/^[^@]+@[^@.][^@]*(\.[^@.]{2,})+$/)) {
      this.setState({invalid: 'Email is invalid.'})
    } else if (password.length < 6) {
      this.setState({invalid: 'Password is too short. At least 6 characters required.'})
    } else if (password !== confirmpass) {
      this.setState({invalid: 'Passwords do not match.'})
    } else {
      fb.database().ref('users/' + Math.random().toString(36).substr(2, 5)).set({
        username,
        email,
        password,
        admin: false
      })

      this.handleClose()
    }
  }

  render() {
    return (
      <div className='form'>
        <div className='form_logo'>
          Event<span>S</span>tock
        </div>

        <div className='form_items'>
          <form autoComplete="off">
            <div className='form_inputs'>
              <label style={{marginBottom: '20px', fontSize: '20px'}}>Username</label>
              <input style={{fontSize: '16px'}} ref="name" type='text' required/>
            </div>
            <div className='form_inputs'>
              <label style={{marginBottom: '20px', fontSize: '20px'}}>Password</label>
              <input
                style={{fontSize: '16px'}} 
                type='password'/>
            </div>
          </form>
          <Button variant="raised" color="secondary" className='form_button' style={{margin: 10}} onClick={(e) => this.getUserId(e, this.refs.name.value)}>
            Log In
          </Button>
          <Button variant="raised" color="secondary" className='form_button' style={{margin: 10}} >forgot password?</Button>
          <Button variant="raised" color="secondary" className='form_button' style={{margin: 10}} 
          onClick={() => this.handleOpen()}
          >Join Now</Button>
        </div>
        {this.state.isValid ? null : <p> Username or password is incorrect, please try again. </p>}
        <Dialog
          open={this.state.open}
          onClose={() => this.handleClose()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth={false}
        >
          <DialogTitle id="alert-dialog-title" style={{textAlign: 'center', background: '#AB47B8'}}>Create an Account</DialogTitle>
          <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Username"
                type="username"
                fullWidth
                onChange={this.handleChange('username')}
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                onChange={this.handleChange('email')}
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Password"
                type="password"
                onChange={this.handleChange('password')}
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Confirm Password"
                type="password"
                onChange={this.handleChange('confirmpass')}
                fullWidth
              />
            <DialogContentText style={{color: 'black', fontStyle: 'bold', marginTop: '20px'}}>
                Favourite Industry
            </DialogContentText>
            <RadioGroup
              ref={node => {
                this.radioGroup = node
              }}
              aria-label="ringtone"
              name="ringtone"
              value={this.state.industry}
              onChange={this.handleChange('industry')}
            >
              {options.map(option => (
                <FormControlLabel value={option} key={option} control={<Radio />} label={option} />
              ))}
            </RadioGroup>

            {this.state.invalid !== '' ?
              <Typography gutterBottom variant="subheading">
                <i>{this.state.invalid}</i>
              </Typography>
            : null}

            <Button className='form_button' onClick={this.signup} color="primary" autoFocus>
              Sign Up
            </Button>

          </DialogContent>
        </Dialog>
      </div>
    )
  }

}

export default withRouter(withRoot(withStyles(styles)(Login)))
// <div className='form_inputs'>
//   <label>Username</label>
//   <input ref="name" type='text' required/>
// </div>
//           <Button variant="raised" className='form_button' onClick={(e) => this.getUserId(e, this.refs.name.value)}>
            // Log In
          // </Button>
