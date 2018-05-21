import React from 'react'
import { withRouter } from 'react-router'
import withRoot from '../withRoot'
import { withStyles } from 'material-ui'
import '../assets/login.css'
import { fb } from '../config'
import Dialog, {
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog'
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({})

const options = [
  'Aviation',
  'Tech',
  'Sports',
  'Social Media',
  'Commodities',
];


class Login extends React.Component {

  constructor() {
    super()
    this.database = fb.database().ref()
    this.state = {
      name: null,
      userId: null,
      isValid: true,
      open: false,
      value: 'Tech',
    }

    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)

  }

  handleClickListItem = () => {
      this.setState({ open: true });
  };

  handleChange = (event, value) => {
      this.setState({ value });
  };

  handleOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
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
          <Button style={{color: 'red'}}>forgot password?</Button>
          <Button style={{color: 'red'}}
          onClick={() => this.handleOpen()}
          >Join Now</Button>
        </div>
        {this.state.isValid ? null : <p> Username or password is incorrect, please try again </p>}
        <Dialog
          open={this.state.open}
          onClose={() => this.handleClose()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth={false}
        >
          <DialogTitle id="alert-dialog-title" style={{textAlign: 'center', background: 'linear-gradient(60deg, #66bb6a, #338a3e)'}}>Create an Account</DialogTitle>
          <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="password"
                type="password"
                fullWidth
              />
            <DialogContentText style={{color: 'black', fontStyle: 'bold', marginTop: '20px'}}>
                Favourite Industry
            </DialogContentText>
            <RadioGroup
              ref={node => {
                this.radioGroup = node;
              }}
              aria-label="ringtone"
              name="ringtone"
              value={this.state.value}
              onChange={this.handleChange}
            >
              {options.map(option => (
                <FormControlLabel value={option} key={option} control={<Radio />} label={option} />
              ))}
            </RadioGroup>

            <Button className='form_button' onClick={this.handleClose} color="primary" autoFocus>
              Sign Up
            </Button>

          </DialogContent>
        </Dialog>
      </div>
    );
  }

}

export default withRouter(withRoot(withStyles(styles)(Login)))
