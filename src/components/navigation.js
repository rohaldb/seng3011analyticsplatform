import React from 'react'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import { Home } from 'material-ui-icons'
import IconButton from 'material-ui/IconButton'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const styles = {
  root: {
    flexGrow: 1,
    color: 'blue'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
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
              <Link to={`/`} style={{color: 'white'}}>
                <IconButton className={classes.menuButton} color='inherit' aria-label='Menu'>
                  <Home />
                </IconButton>
              </Link>
             EventStock
           </div>
           { this.props.isAdmin ? 'New Sign Out' : null }
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withRoot(withStyles(styles)(Navigation))
