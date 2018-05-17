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

  render () {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <AppBar position='static' color='primary'>
          <Toolbar>
            <div style={{flex: 1}}>
            <IconButton className={classes.menuIcon} color='inherit' aria-label='Menu' onClick={() => this.props.history.pop()}>
              <Home />
            </IconButton>
             EventStock
           </div>
           { this.props.isAdmin ? <Button color="inherit">Add Event</Button> : null }
           <Link to={`/`} style={{color: 'white', textDecoration: 'none'}} className={classes.menuButton}>
            <Button color="inherit">Log Out</Button>
           </Link>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withRoot(withStyles(styles)(Navigation))
