import React from 'react'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import { Home } from 'material-ui-icons'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import NewEventForm from './newEventForm'

const styles = {
  root: {
    flexGrow: 1,
    color: 'blue'
  },
  menuIcon: {
    marginLeft: -12,
    marginRight: 20
  },
  menuButton: {
    magin: 20
  }
}

class Navigation extends React.Component {

  static propTypes = {
    isAdmin: PropTypes.bool.isRequired
  }

  state = {
    modalOpen: false
  }

  render () {
    const { classes } = this.props
    const { modalOpen } = this.state

    return (
      <div className={classes.root}>
        <AppBar position='static' color='primary'>
          <Toolbar>
            <div style={{flex: 1}}>
            <IconButton className={classes.menuIcon} color='inherit' aria-label='Menu'>
              <Home />
            </IconButton>
           </div>
           <div>
             { this.props.isAdmin ?
             <Button color="inherit" onClick={() => this.setState({modalOpen: true})}>
               Add Event
             </Button>
             : null }
             <Link to={`/`} style={{color: 'white', textDecoration: 'none'}} className={classes.menuButton}>
              <Button color="inherit">Log Out</Button>
             </Link>
           </div>
          </Toolbar>
        </AppBar>

        <NewEventForm isOpen={modalOpen} closeCallback={() => this.setState({modalOpen: false})}/>
      </div>
    )
  }
}

export default withRouter(withRoot(withStyles(styles)(Navigation)))
