import React from 'react'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import { Home } from 'material-ui-icons'
import IconButton from 'material-ui/IconButton'
import { Link } from 'react-router-dom'

const styles = {
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}

class Navigation extends React.Component {

  render () {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <AppBar position='static' color='primary'>
          <Toolbar>
            <Link to={`/`} style={{color: 'white'}}>
              <IconButton className={classes.menuButton} color='inherit' aria-label='Menu'>
                <Home />
              </IconButton>
            </Link>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withRoot(withStyles(styles)(Navigation))
