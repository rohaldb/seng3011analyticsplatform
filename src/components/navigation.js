import React from 'react'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import { base } from '../config'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import { Help, Timeline } from 'material-ui-icons'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import NewEventForm from './newEventForm'
//import hopscotch from 'hopscotch'
import Tour from "react-user-tour"

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

/*
const tour = {
  id: 'hello-hopscotch',
  steps: [
    {
      title: 'My content',
      content: 'Here is where I put my content.',
      target: document.getElementById('test'),
      placement: 'bottom'
    }
  ]
}
*/

class Navigation extends React.Component {

  static propTypes = {
    isAdmin: PropTypes.bool.isRequired,
    //tour: PropTypes.object
  }

  state = {
    modalOpen: false,
    isTourActive: false,
    tourStep: 1
  }

  constructor (props) {
    super(props)
    this.startTour = this.startTour.bind(this)
  }

  componentDidMount () {
    // Fetch categories from Firebase /categories
    base.fetch('categories_and_icons', {
      context: this,
    }).then((categories) => {
      this.setState({ categories: Object.keys(categories) })
    })
  }

  startTour() {
    //console.log('starting tour...')
    //hopscotch.listen('error', function(err) {
      //console.log('undefined' + err)
    //})
    //hopscotch.startTour(tour)
    this.setState({isTourActive: true})
  }

  render () {
    const { classes } = this.props
    const { modalOpen } = this.state

    return (
      <div className={classes.root}>
        <AppBar position='static' color='primary'>
          <Toolbar>
            <div style={{flex: 1}}>
            {this.props.location.pathname.startsWith('/event') ?
              <IconButton className={classes.menuicon} color='inherit' aria-label='menu'
                onClick={() => this.props.history.goBack()}
                >
                <Timeline />
              </IconButton>
              : null
            }
            <IconButton className={classes.menuicon} color='inherit' aria-label='menu' onClick={this.startTour}>
              <Help />
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
        <NewEventForm categories={this.state.categories} isOpen={modalOpen} closeCallback={() => this.setState({modalOpen: false})}/>
        <Tour
          active={this.state.isTourActive}
          step={this.state.tourStep}
          onNext={(step) => this.setState({tourStep: step})}
          onBack={(step) => this.setState({tourStep: step})}
          onCancel={() => this.setState({isTourActive: false})}
          steps={this.props.tour}
          closeButtonText={"X"}
        />
      </div>
    )
  }
}

export default withRouter(withRoot(withStyles(styles)(Navigation)))
