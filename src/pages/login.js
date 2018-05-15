import React from 'react'
import withRoot from '../withRoot'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import { Event } from 'material-ui-icons'
import _ from 'lodash'
import Events from '../eventData'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Grid, Chip, Typography, withStyles } from 'material-ui'
import { getDate } from '../time'

const styles = theme => ({

})

class Header extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <h1>{this.props.text}</h1>
      </div>
    )
  }
}

class Footer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div><h3>{this.props.text}</h3></div>
  }
}

class Input extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputVal: ""
    }
    this.changeHandler = this.changeHandler.bind(this)
  }

  changeHandler(e) {
    this.props.parentFunction(e.target.value)
  }

  render() {
    return (
      <div>
        <label>{this.props.labelName}</label>
        <input type={this.props.inputType} id={this.props.id} onChange={this.changeHandler} />
      </div>
    )
  }
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: ""
    }
    this.clickHandler = this.clickHandler.bind(this)
    this.setUsername = this.setUsername.bind(this)
    this.setPassword = this.setPassword.bind(this)
  }

  setUsername(username) {
    this.setState({username: username})
  }

  setPassword(password) {
    this.setState({password: password})
  }

  clickHandler() {
    // put your own code here
    alert(`Username: ${this.state.username} Password: ${this.state.password}`)
  }

  render() {
    return (
      <div>
        <Input id ="username" labelName="Username: " inputType="text" parentFunction={this.setUsername}  />
        <Input id ="password" labelName="Password: " inputType="password" parentFunction={this.setPassword} />
        <button onClick={this.clickHandler}>{this.props.buttonName}</button>
      </div>
    )
  }
}

class Content extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <LoginForm buttonName="Submit"/>
      </div>
    )
  }
}

class Login extends React.Component {
  render() {
    return (
      <div>
        <Header text="React Login Example"/>
        <Content title="Enter your credentials"/>
        <Footer text="Put some style on it"/>
      </div>
    )
  }
}

export default withRoot(withStyles(styles)(Login))
